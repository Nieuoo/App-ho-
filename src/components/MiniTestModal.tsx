import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  MULTIPLE_CHOICE_BANK,
  TRUE_FALSE_BANK,
  SHORT_ANSWER_BANK,
} from '../data/questionBank';
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  ShortAnswerQuestion,
  StudentProfile,
} from '../types/chemistry';
import { soundFX } from '../utils/soundEffects';
import { googleSheetsService } from '../services/googleSheetsService';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Send,
  Award,
  BookOpen,
  X,
  FileText,
  Calculator,
  FileSpreadsheet,
  ExternalLink,
} from 'lucide-react';

interface MiniTestModalProps {
  onClose: () => void;
  studentName: string;
  studentProfile?: StudentProfile;
}

interface ShuffledMCQuestion extends MultipleChoiceQuestion {
  shuffledOptions: { text: string; originalIndex: number }[];
}

// Helper to evaluate Short Answer answers
function isSAAnswerCorrect(userAns: string | undefined, acceptedAnswers: string[]): boolean {
  if (!userAns || !userAns.trim()) return false;
  const userClean = userAns.trim().replace(',', '.');
  const userNum = parseFloat(userClean);

  return acceptedAnswers.some((accepted) => {
    const accClean = accepted.trim().replace(',', '.');
    const accNum = parseFloat(accClean);
    if (!isNaN(userNum) && !isNaN(accNum)) {
      return Math.abs(userNum - accNum) < 0.01;
    }
    return (
      accClean.toLowerCase() === userClean.toLowerCase() ||
      accClean.toLowerCase().replace(/₂|₃|₄|₅|₆|₇/g, (c) => {
        const map: Record<string, string> = { '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7' };
        return map[c] || c;
      }) === userClean.toLowerCase()
    );
  });
}

export const MiniTestModal: React.FC<MiniTestModalProps> = ({
  onClose,
  studentName,
  studentProfile,
}) => {
  // Test State
  const [isStarted, setIsStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [testSeed, setTestSeed] = useState(0);
  const [sheetSyncStatus, setSheetSyncStatus] = useState<string | null>(null);

  // Generate randomized test (12 MC + 2 TF + 4 SA = 18 questions - Đã bỏ tự luận, bù vào 2 câu trả lời ngắn)
  const testQuestions = useMemo(() => {
    // Fisher-Yates shuffle
    const shuffle = <T,>(arr: T[]): T[] => {
      const res = [...arr];
      for (let i = res.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [res[i], res[j]] = [res[j], res[i]];
      }
      return res;
    };

    // 1. Shuffle & pick 12 MC questions with balanced correct slots (3 A, 3 B, 3 C, 3 D)
    const targetSlots12 = shuffle([0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3]);
    const sampledMC = shuffle(MULTIPLE_CHOICE_BANK).slice(0, 12);
    const shuffledMC = sampledMC.map((q, qIdx) => {
      const correctOpt = { text: q.options[q.correctAnswerIndex], originalIndex: q.correctAnswerIndex };
      const wrongOpts = shuffle(
        q.options
          .map((text, idx) => ({ text, originalIndex: idx }))
          .filter((item) => item.originalIndex !== q.correctAnswerIndex)
      );

      const targetSlot = targetSlots12[qIdx];
      const shuffledOptions: { text: string; originalIndex: number }[] = [];
      let wrongPtr = 0;
      for (let s = 0; s < 4; s++) {
        if (s === targetSlot) {
          shuffledOptions.push(correctOpt);
        } else {
          shuffledOptions.push(wrongOpts[wrongPtr++]);
        }
      }

      return {
        ...q,
        shuffledOptions,
      } as ShuffledMCQuestion;
    });

    // 2. Pick 2 TF questions
    const pickedTF = shuffle(TRUE_FALSE_BANK).slice(0, 2);

    // 3. Pick 4 Short Answer questions (bù thêm 2 câu trả lời ngắn thay cho phần tự luận đã bỏ)
    const pickedSA = shuffle(SHORT_ANSWER_BANK).slice(0, 4);

    return {
      mc: shuffledMC,
      tf: pickedTF,
      sa: pickedSA,
      totalCount: 18,
    };
  }, [testSeed]);

  // Student Answers Store
  const [mcAnswers, setMcAnswers] = useState<Record<string, number>>({});
  const [tfAnswers, setTfAnswers] = useState<Record<string, Record<number, boolean>>>({});
  const [saAnswers, setSaAnswers] = useState<Record<string, string>>({});

  // Countdown timer
  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isSubmitted]);

  const handleStart = () => {
    soundFX.playFanfare();
    setIsStarted(true);
    setTimeLeft(15 * 60);
  };

  const handleRestart = () => {
    soundFX.playClick();
    setTestSeed((prev) => prev + 1);
    setIsStarted(false);
    setIsSubmitted(false);
    setMcAnswers({});
    setTfAnswers({});
    setSaAnswers({});
    setTimeLeft(15 * 60);
  };

  // Submit & evaluate
  const handleSubmitTest = () => {
    soundFX.playFanfare();
    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {}

    // Calculate score details & sync to Google Sheets
    let mcCount = 0;
    testQuestions.mc.forEach((q) => {
      const selectedIndex = mcAnswers[q.id];
      if (selectedIndex !== undefined) {
        const originalSelected = q.shuffledOptions[selectedIndex]?.originalIndex;
        if (originalSelected === q.correctAnswerIndex) {
          mcCount += 1;
        }
      }
    });

    let tfStatementsCount = 0;
    testQuestions.tf.forEach((q) => {
      const answers = tfAnswers[q.id] || {};
      q.statements.forEach((st, idx) => {
        if (answers[idx] === st.isCorrect) {
          tfStatementsCount += 1;
        }
      });
    });

    let saCount = 0;
    testQuestions.sa.forEach((q) => {
      if (isSAAnswerCorrect(saAnswers[q.id], q.acceptedAnswers)) {
        saCount += 1;
      }
    });

    const raw = mcCount + tfStatementsCount * 0.25 + saCount;
    const scale10 = Math.round(((raw / 18) * 10) * 10) / 10;
    const timeSpentStr = formatTime(15 * 60 - timeLeft);

    setSheetSyncStatus('saving');
    googleSheetsService
      .recordMiniTestScore({
        timestamp: new Date().toLocaleString('vi-VN'),
        fullName: studentProfile?.fullName || studentName,
        className: studentProfile?.className || '10Ti',
        studentNo: studentProfile?.studentNo || '01',
        score10: scale10,
        rawScore: Math.round(raw * 100) / 100,
        mcCorrect: mcCount,
        tfStatementsCorrect: tfStatementsCount,
        saCorrect: saCount,
        timeSpent: timeSpentStr,
      })
      .then((saved) => {
        setSheetSyncStatus(saved ? 'saved' : 'local');
      })
      .catch(() => {
        setSheetSyncStatus('local');
      });
  };

  // Score Calculation (Total 18 raw points: 12 MC + 2 TF + 4 SA)
  const testScore = useMemo(() => {
    let score = 0;
    const maxScore = 18; // 12 MC + 2 TF + 4 SA = 18 raw points

    // MC questions (1 pt each)
    testQuestions.mc.forEach((q) => {
      const selectedIndex = mcAnswers[q.id];
      if (selectedIndex !== undefined) {
        const originalSelected = q.shuffledOptions[selectedIndex]?.originalIndex;
        if (originalSelected === q.correctAnswerIndex) {
          score += 1;
        }
      }
    });

    // TF questions (1 pt each if all 4 statements right, 0.25 pt per statement)
    testQuestions.tf.forEach((q) => {
      const answers = tfAnswers[q.id] || {};
      q.statements.forEach((st, idx) => {
        if (answers[idx] === st.isCorrect) {
          score += 0.25;
        }
      });
    });

    // SA questions (1 pt each, total 4 questions)
    testQuestions.sa.forEach((q) => {
      if (isSAAnswerCorrect(saAnswers[q.id], q.acceptedAnswers)) {
        score += 1;
      }
    });

    // Scale to 10-point scale
    const scale10 = (score / maxScore) * 10;

    return {
      raw: Math.round(score * 100) / 100,
      max: maxScore,
      scale10: Math.round(scale10 * 10) / 10,
    };
  }, [testQuestions, mcAnswers, tfAnswers, saAnswers]);

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/90 backdrop-blur-md"
      />

      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/80 z-10 text-white overflow-hidden">
        {/* Header bar */}
        <div className="p-4 sm:p-6 bg-slate-950/80 border-b border-cyan-500/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                Bài Kiểm Tra Đánh Giá Năng Lực
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                  18 CÂU • 15 PHÚT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Thí sinh: <span className="text-cyan-300 font-semibold">{studentName}</span> • Chấm điểm tự động 100% (12 TN + 2 Đ/S + 4 Trả lời ngắn)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isStarted && !isSubmitted && (
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-400/40 text-cyan-300 font-mono text-sm font-bold shadow">
                <Clock className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className={timeLeft < 180 ? 'text-rose-400 animate-pulse' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!isStarted ? (
            /* Intro State */
            <div className="py-8 text-center max-w-lg mx-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border-2 border-cyan-400/40 text-cyan-400 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/20">
                <FileText className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-black text-white mb-2">
                Phòng Thi Trắc Nghiệm & Trả Lời Ngắn Hóa Học 10
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                Đề thi gồm <strong className="text-cyan-300">18 câu hỏi</strong> chuẩn GDPT 2018 (12 trắc nghiệm 4 lựa chọn, 2 câu đúng/sai, <strong className="text-indigo-300">4 câu trả lời ngắn</strong> — đã bỏ phần tự luận). Toàn bộ bài làm được chấm điểm tự động và công bố kết quả ngay khi nộp bài!
              </p>

              <div className="w-full grid grid-cols-2 gap-3 mb-8 text-left text-xs">
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <span className="text-slate-400 block mb-1">⏱️ Thời gian:</span>
                  <span className="text-white font-bold">15 phút (Đếm ngược)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                  <span className="text-slate-400 block mb-1">🎯 Thang điểm:</span>
                  <span className="text-white font-bold">10.0 Điểm (Tự động 100%)</span>
                </div>
              </div>

              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Bắt đầu tính giờ làm bài</span>
                <Clock className="w-4 h-4" />
              </motion.button>
            </div>
          ) : isSubmitted ? (
            /* Results Screen */
            <div className="space-y-6">
              {/* Score banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-400/40 text-center">
                <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold block mb-1">
                  KẾT QUẢ BÀI THI CỦA {studentName.toUpperCase()}
                </span>
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300 font-mono my-2">
                  {testScore.scale10} / 10.0
                </div>
                <p className="text-xs text-slate-300">
                  Điểm thô: <span className="font-bold text-white">{testScore.raw}</span> / {testScore.max} điểm • Thời gian hoàn thành: {formatTime(15 * 60 - timeLeft)}
                </p>

                {/* Google Sheets Sync Badge */}
                {sheetSyncStatus && (
                  <div
                    className={`mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold ${
                      sheetSyncStatus === 'saved'
                        ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                        : 'bg-cyan-950/80 border border-cyan-500/50 text-cyan-300'
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span>
                      {sheetSyncStatus === 'saved'
                        ? 'Đã tự động lưu điểm bài thi vào Google Sheet (Tab Diem_KiemTra)!'
                        : 'Đã lưu điểm bài thi vào hệ thống và hàng đợi đồng bộ Sheet.'}
                    </span>
                    {googleSheetsService.getConfig() && (
                      <a
                        href={googleSheetsService.getConfig()?.spreadsheetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-white underline hover:text-emerald-200 inline-flex items-center gap-0.5"
                      >
                        <span>Mở Sheet</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                )}

                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={handleRestart}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Làm đề mới ngẫu nhiên khác
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs cursor-pointer"
                  >
                    Đóng bảng điểm
                  </button>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div>
                <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Lời Giải & Đáp Án Chi Tiết Từng Câu:
                </h4>

                {/* 1. Review MC */}
                <div className="space-y-4">
                  <h5 className="text-xs font-semibold text-slate-400">PHẦN 1: TRẮC NGHIỆM 4 LỰA CHỌN (12 CÂU)</h5>
                  {testQuestions.mc.map((q, idx) => {
                    const userSelectedIdx = mcAnswers[q.id];
                    const originalSelected =
                      userSelectedIdx !== undefined
                        ? q.shuffledOptions[userSelectedIdx]?.originalIndex
                        : undefined;
                    const isCorrect = originalSelected === q.correctAnswerIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-white">
                            Câu {idx + 1}: {q.question}
                          </span>
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 shrink-0">
                              <CheckCircle2 className="w-4 h-4" /> Đúng (+1đ)
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 shrink-0">
                              <XCircle className="w-4 h-4" /> Sai (0đ)
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-300 space-y-1 mb-2">
                          <p>
                            Đáp án bạn chọn:{' '}
                            <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                              {userSelectedIdx !== undefined
                                ? q.shuffledOptions[userSelectedIdx]?.text
                                : '(Chưa chọn)'}
                            </strong>
                          </p>
                          {!isCorrect && (
                            <p>
                              Đáp án đúng:{' '}
                              <strong className="text-emerald-300">
                                {q.options[q.correctAnswerIndex]}
                              </strong>
                            </p>
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                          💡 <strong>Giải thích:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* 2. Review TF */}
                <div className="space-y-4 mt-6">
                  <h5 className="text-xs font-semibold text-slate-400">PHẦN 2: ĐÚNG / SAI (2 CÂU)</h5>
                  {testQuestions.tf.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-700">
                      <p className="text-xs font-bold text-white mb-2">
                        Câu {idx + 13}: {q.context}
                      </p>
                      <div className="space-y-2 mb-3">
                        {q.statements.map((st, sIdx) => {
                          const userVal = tfAnswers[q.id]?.[sIdx];
                          const isOk = userVal === st.isCorrect;
                          return (
                            <div
                              key={sIdx}
                              className={`p-2 rounded-lg text-xs flex justify-between items-center ${
                                isOk ? 'bg-emerald-950/40 text-emerald-300' : 'bg-rose-950/40 text-rose-300'
                              }`}
                            >
                              <span>
                                {String.fromCharCode(97 + sIdx)}) {st.statement}
                              </span>
                              <span className="font-bold font-mono">
                                {st.isCorrect ? 'ĐÚNG' : 'SAI'} (Bạn: {userVal === undefined ? '—' : userVal ? 'Đ' : 'S'})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg">
                        💡 <strong>Giải thích:</strong> {q.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* 3. Review SA (4 questions) */}
                <div className="space-y-4 mt-6">
                  <h5 className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>PHẦN 3: TRẢ LỜI NGẮN (4 CÂU - ĐÃ BÙ 2 CÂU TỪ PHẦN TỰ LUẬN)</span>
                    <span className="text-indigo-400 font-mono text-[11px]">1.0đ / câu</span>
                  </h5>
                  {testQuestions.sa.map((q, idx) => {
                    const userVal = saAnswers[q.id];
                    const isOk = isSAAnswerCorrect(userVal, q.acceptedAnswers);
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isOk ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs font-bold text-white">
                            Câu {idx + 15}: {q.question}
                          </p>
                          {isOk ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 shrink-0">
                              <CheckCircle2 className="w-4 h-4" /> Đúng (+1đ)
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 shrink-0">
                              <XCircle className="w-4 h-4" /> Sai (0đ)
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-300 mb-2">
                          Bạn trả lời: <strong className={isOk ? 'text-emerald-300 font-mono' : 'text-rose-300 font-mono'}>{userVal || '(Trống)'}</strong> • Đáp án chuẩn: <strong className="text-emerald-300 font-mono">{q.acceptedAnswers[0]} {q.unit || ''}</strong>
                        </p>
                        <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg">
                          💡 <strong>Giải thích & Cách sửa:</strong> {q.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Active Testing State */
            <div className="space-y-8">
              {/* SECTION 1: Multiple Choice (12 questions) */}
              <div>
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                    PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN (12 CÂU • CÂU 1 - 12)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Đã làm: {Object.keys(mcAnswers).length} / 12
                  </span>
                </div>

                <div className="space-y-6">
                  {testQuestions.mc.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80"
                    >
                      <div className="flex items-start gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-semibold text-white leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        {q.shuffledOptions.map((opt, optIdx) => {
                          const isSelected = mcAnswers[q.id] === optIdx;
                          const letter = String.fromCharCode(65 + optIdx);
                          return (
                            <button
                              key={optIdx}
                              onClick={() => {
                                soundFX.playClick();
                                setMcAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                              }}
                              className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-2.5 cursor-pointer ${
                                isSelected
                                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md shadow-cyan-950'
                                  : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-800/80'
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? 'bg-cyan-500 text-white'
                                    : 'bg-slate-800 text-slate-400'
                                }`}
                              >
                                {letter}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: True / False (2 questions) */}
              <div>
                <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
                    PHẦN II: CÂU HỎI ĐÚNG / SAI (2 CÂU • CÂU 13 - 14)
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Chọn Đúng hoặc Sai cho mỗi nhận định (0.25đ / ý)
                  </span>
                </div>

                <div className="space-y-6">
                  {testQuestions.tf.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80"
                    >
                      <div className="flex items-start gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold text-xs">
                          {idx + 13}
                        </span>
                        <p className="text-sm font-semibold text-white">{q.context}</p>
                      </div>

                      <div className="space-y-2 mt-3">
                        {q.statements.map((st, sIdx) => {
                          const currentVal = tfAnswers[q.id]?.[sIdx];
                          return (
                            <div
                              key={sIdx}
                              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                            >
                              <span className="text-slate-200">
                                <strong className="text-cyan-400">
                                  {String.fromCharCode(97 + sIdx)})
                                </strong>{' '}
                                {st.statement}
                              </span>
                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={() => {
                                    soundFX.playClick();
                                    setTfAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: { ...(prev[q.id] || {}), [sIdx]: true },
                                    }));
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    currentVal === true
                                      ? 'bg-emerald-500 text-white shadow'
                                      : 'bg-slate-800 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  ĐÚNG
                                </button>
                                <button
                                  onClick={() => {
                                    soundFX.playClick();
                                    setTfAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: { ...(prev[q.id] || {}), [sIdx]: false },
                                    }));
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    currentVal === false
                                      ? 'bg-rose-500 text-white shadow'
                                      : 'bg-slate-800 text-slate-400 hover:text-white'
                                  }`}
                                >
                                  SAI
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: Short Answer (4 questions - 2 original + 2 compensated from Essay) */}
              <div>
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                      PHẦN III: TRẢ LỜI NGẮN (4 CÂU • CÂU 15 - 18)
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Bù 2 câu từ Tự luận • Nhập số hoặc kết quả tính toán
                  </span>
                </div>

                <div className="space-y-6">
                  {testQuestions.sa.map((q, idx) => (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/80"
                    >
                      <div className="flex items-start gap-2 mb-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs">
                          {idx + 15}
                        </span>
                        <p className="text-sm font-semibold text-white leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <input
                          type="text"
                          value={saAnswers[q.id] || ''}
                          onChange={(e) =>
                            setSaAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder="Nhập số kết quả (ví dụ: 14 hoặc 0.2)..."
                          className="w-full sm:w-80 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
                        />
                        {q.unit && (
                          <span className="text-xs font-mono text-slate-400 font-semibold">
                            Đơn vị: {q.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Submit Confirmation */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Hãy kiểm tra lại tất cả 18 câu (12 TN + 2 Đ/S + 4 Trả lời ngắn) trước khi nộp bài.
                </span>
                <motion.button
                  onClick={handleSubmitTest}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Nộp bài & Chấm điểm tự động</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
