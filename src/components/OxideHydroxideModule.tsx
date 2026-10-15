import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundEffects';
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
import { MiniTestModal } from './MiniTestModal';
import { GoogleSheetsModal } from './GoogleSheetsModal';
import { googleSheetsService } from '../services/googleSheetsService';
import {
  BookOpen,
  Lightbulb,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  Flame,
  ArrowLeft,
  Check,
  X,
  AlertCircle,
  GraduationCap,
  Scale,
  Zap,
  RotateCcw,
  Trophy,
  Dices,
  FileSpreadsheet,
  ExternalLink,
  Trash2,
} from 'lucide-react';

interface OxideHydroxideModuleProps {
  onBackToTable: () => void;
  studentName: string;
  studentProfile?: StudentProfile;
  onDeleteSelf?: () => void;
}

type TabKey = 'theory' | 'examples' | 'exercises';

export interface ActiveMCQuestion extends MultipleChoiceQuestion {
  originalCorrectText: string;
}

export interface ActiveTFQuestion extends TrueFalseQuestion {
  statements: {
    statement: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 1. Lấy ngẫu nhiên 15 câu từ ngân hàng 30 câu Trắc nghiệm & ĐẢO NGẪU NHIÊN VỊ TRÍ ĐÁP ÁN ĐÚNG TRẢI ĐỀU TRONG CÁC CÂU A, B, C, D
function getRandomMCSet(): ActiveMCQuestion[] {
  // 1.1. Lấy ngẫu nhiên 15 câu từ ngân hàng 30 câu
  const sampled = shuffleArray(MULTIPLE_CHOICE_BANK).slice(0, 15);

  // 1.2. Tạo phân bổ vị trí đáp án đúng trải đều khắp A (0), B (1), C (2), D (3)
  // Mỗi chữ cái xuất hiện 3 đến 4 lần trong 15 câu (không bao giờ bị lệch sang toàn B hay toàn D)
  const baseSlots = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]; // 3 câu cho mỗi vị trí A, B, C, D (= 12 câu)
  const extraChoices = shuffleArray([0, 1, 2, 3]).slice(0, 3); // 3 câu còn lại được gán ngẫu nhiên cho 3 vị trí khác nhau
  const targetSlots = shuffleArray([...baseSlots, ...extraChoices]); // Tổng cộng 15 vị trí đã xáo trộn đều ngẫu nhiên

  return sampled.map((q, qIndex) => {
    const correctText = q.options[q.correctAnswerIndex];

    // Lấy 3 phương án sai và xáo trộn thứ tự của chúng
    const wrongOptions = shuffleArray(
      q.options.filter((_, idx) => idx !== q.correctAnswerIndex)
    );

    // Vị trí mục tiêu cho đáp án đúng của câu này (0: A, 1: B, 2: C, 3: D)
    const targetSlot = targetSlots[qIndex % targetSlots.length];

    // Xếp đáp án đúng vào chính xác targetSlot, 3 ô còn lại điền các phương án sai
    const newOptions: string[] = [];
    let wrongPointer = 0;
    for (let slot = 0; slot < 4; slot++) {
      if (slot === targetSlot) {
        newOptions.push(correctText);
      } else {
        newOptions.push(wrongOptions[wrongPointer++]);
      }
    }

    return {
      ...q,
      options: newOptions,
      correctAnswerIndex: targetSlot,
      originalCorrectText: correctText,
    };
  });
}

// 2. Lấy ngẫu nhiên 15 câu từ ngân hàng 30 câu Đúng / Sai & đảo ngẫu nhiên các mệnh đề con
function getRandomTFSet(): ActiveTFQuestion[] {
  const sampled = shuffleArray(TRUE_FALSE_BANK).slice(0, 15);
  return sampled.map((q) => {
    const shuffledStatements = shuffleArray(q.statements);
    return {
      ...q,
      statements: shuffledStatements,
    };
  });
}

// 3. Lấy ngẫu nhiên 15 câu từ ngân hàng 30 câu Trả lời ngắn
function getRandomSASet(): ShortAnswerQuestion[] {
  return shuffleArray(SHORT_ANSWER_BANK).slice(0, 15);
}

export const OxideHydroxideModule: React.FC<OxideHydroxideModuleProps> = ({
  onBackToTable,
  studentName,
  studentProfile,
  onDeleteSelf,
}) => {
  // Tabs & Lock system:
  const [activeTab, setActiveTab] = useState<TabKey>('theory');
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [sheetNotice, setSheetNotice] = useState<string | null>(null);
  const [unlockedTabs, setUnlockedTabs] = useState<Record<TabKey, boolean>>({
    theory: true,
    examples: false,
    exercises: false,
  });

  // Practice exercises state in Tab 3 (3 dạng: Trắc nghiệm, Đúng/Sai, Trả lời ngắn)
  const [exerciseFormat, setExerciseFormat] = useState<'mc' | 'tf' | 'sa'>('mc');

  // Danh sách câu hỏi được random 15 câu từ 30 câu cho từng dạng
  const [mcList, setMcList] = useState<ActiveMCQuestion[]>(() => getRandomMCSet());
  const [tfList, setTfList] = useState<ActiveTFQuestion[]>(() => getRandomTFSet());
  const [saList, setSaList] = useState<ShortAnswerQuestion[]>(() => getRandomSASet());

  // 1. Dạng Trắc nghiệm (15 câu random từ 30, đáp án A-B-C-D đảo ngẫu nhiên)
  const [mcIndex, setMcIndex] = useState(0);
  const [selectedMcOption, setSelectedMcOption] = useState<number | null>(null);
  const [mcSubmitted, setMcSubmitted] = useState(false);
  const [mcHistory, setMcHistory] = useState<Record<number, { selected: number; isCorrect: boolean }>>({});
  const [isMcFinished, setIsMcFinished] = useState(false);

  // 2. Dạng Đúng / Sai (15 câu random từ 30)
  const [tfIndex, setTfIndex] = useState(0);
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean>>({});
  const [tfSubmitted, setTfSubmitted] = useState(false);
  const [tfAlert, setTfAlert] = useState<string | null>(null);
  const [tfHistory, setTfHistory] = useState<
    Record<number, { userAnswers: Record<number, boolean>; correctCount: number; total: number; isPassed: boolean }>
  >({});
  const [isTfFinished, setIsTfFinished] = useState(false);

  // 3. Dạng Trả lời ngắn (15 câu random từ 30)
  const [saIndex, setSaIndex] = useState(0);
  const [saInput, setSaInput] = useState('');
  const [saSubmitted, setSaSubmitted] = useState(false);
  const [saIsCorrect, setSaIsCorrect] = useState<boolean | null>(null);
  const [saHistory, setSaHistory] = useState<
    Record<number, { userInput: string; isCorrect: boolean; acceptedAnswer: string }>
  >({});
  const [isSaFinished, setIsSaFinished] = useState(false);

  // Mini test modal visibility
  const [showMiniTest, setShowMiniTest] = useState(false);

  // Unlock handlers
  const handleUnlockExamples = () => {
    soundFX.playFanfare();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    } catch {}
    setUnlockedTabs((prev) => ({ ...prev, examples: true }));
    setActiveTab('examples');
  };

  const handleUnlockExercises = () => {
    soundFX.playFanfare();
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    } catch {}
    setUnlockedTabs((prev) => ({ ...prev, exercises: true }));
    setActiveTab('exercises');
  };

  // --- Handlers: Multiple Choice ---
  const handleCheckMC = (optIdx: number) => {
    if (mcSubmitted) return;
    setSelectedMcOption(optIdx);
    setMcSubmitted(true);
    const curr = mcList[mcIndex];
    const isCorrect = optIdx === curr.correctAnswerIndex;
    setMcHistory((prev) => ({
      ...prev,
      [mcIndex]: { selected: optIdx, isCorrect },
    }));

    if (isCorrect) {
      soundFX.playCorrect();
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      soundFX.playWrong();
    }
  };

  const handleNextMC = () => {
    soundFX.playClick();
    if (mcIndex < mcList.length - 1) {
      setSelectedMcOption(null);
      setMcSubmitted(false);
      setMcIndex((prev) => prev + 1);
    } else {
      // Hoàn thành cả 15 câu
      setIsMcFinished(true);
      const totalCorrect = Object.values(mcHistory).filter((x) => x.isCorrect).length;
      if (totalCorrect / mcList.length >= 0.7) {
        soundFX.playFanfare();
        try {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        } catch {}
      } else {
        soundFX.playWrong();
      }

      // Lưu điểm Trắc nghiệm vào Google Sheet
      const score10 = Math.round((totalCorrect / mcList.length) * 10 * 10) / 10;
      googleSheetsService
        .recordExerciseScore({
          timestamp: new Date().toLocaleString('vi-VN'),
          fullName: studentProfile?.fullName || studentName,
          className: studentProfile?.className || '10Ti',
          studentNo: studentProfile?.studentNo || '01',
          exerciseType: 'Trắc nghiệm',
          correctCount: totalCorrect,
          totalQuestions: mcList.length,
          percentage: Math.round((totalCorrect / mcList.length) * 100),
          score10,
        })
        .then(() => {
          setSheetNotice(`Đã lưu kết quả Trắc nghiệm (${totalCorrect}/${mcList.length} câu) vào Google Sheet!`);
        });
    }
  };

  const handleResetMC = () => {
    soundFX.playClick();
    setMcList(getRandomMCSet()); // Lấy 15 câu ngẫu nhiên mới từ 30 câu & xáo trộn lại đáp án!
    setMcIndex(0);
    setSelectedMcOption(null);
    setMcSubmitted(false);
    setMcHistory({});
    setIsMcFinished(false);
  };

  // --- Handlers: True / False ---
  const handleCheckTF = () => {
    const q = tfList[tfIndex];
    const answeredCount = Object.keys(tfAnswers).length;
    if (answeredCount < q.statements.length) {
      setTfAlert('Vui lòng chọn ĐÚNG hoặc SAI cho tất cả các nhận định a, b, c, d!');
      soundFX.playWrong();
      return;
    }
    setTfAlert(null);
    setTfSubmitted(true);

    let correctCount = 0;
    q.statements.forEach((st, idx) => {
      if (tfAnswers[idx] === st.isCorrect) {
        correctCount++;
      }
    });

    const isPassed = correctCount >= 3; // Đúng từ 3 ý trở lên được tính là đạt câu này
    setTfHistory((prev) => ({
      ...prev,
      [tfIndex]: {
        userAnswers: { ...tfAnswers },
        correctCount,
        total: q.statements.length,
        isPassed,
      },
    }));

    if (isPassed) {
      soundFX.playCorrect();
      try {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      } catch {}
    } else {
      soundFX.playWrong();
    }
  };

  const handleNextTF = () => {
    soundFX.playClick();
    if (tfIndex < tfList.length - 1) {
      setTfAnswers({});
      setTfSubmitted(false);
      setTfAlert(null);
      setTfIndex((prev) => prev + 1);
    } else {
      setIsTfFinished(true);
      const passedCount = Object.values(tfHistory).filter((x) => x.isPassed).length;
      if (passedCount / tfList.length >= 0.7) {
        soundFX.playFanfare();
        try {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        } catch {}
      } else {
        soundFX.playWrong();
      }

      // Lưu điểm Đúng / Sai vào Google Sheet
      const score10 = Math.round((passedCount / tfList.length) * 10 * 10) / 10;
      googleSheetsService
        .recordExerciseScore({
          timestamp: new Date().toLocaleString('vi-VN'),
          fullName: studentProfile?.fullName || studentName,
          className: studentProfile?.className || '10Ti',
          studentNo: studentProfile?.studentNo || '01',
          exerciseType: 'Đúng / Sai',
          correctCount: passedCount,
          totalQuestions: tfList.length,
          percentage: Math.round((passedCount / tfList.length) * 100),
          score10,
        })
        .then(() => {
          setSheetNotice(`Đã lưu kết quả Đúng / Sai (${passedCount}/${tfList.length} câu) vào Google Sheet!`);
        });
    }
  };

  const handleResetTF = () => {
    soundFX.playClick();
    setTfList(getRandomTFSet()); // Lấy 15 câu ngẫu nhiên mới từ 30 câu!
    setTfIndex(0);
    setTfAnswers({});
    setTfSubmitted(false);
    setTfAlert(null);
    setTfHistory({});
    setIsTfFinished(false);
  };

  // --- Handlers: Short Answer ---
  const handleCheckSA = () => {
    if (!saInput.trim()) return;
    setSaSubmitted(true);
    const curr = saList[saIndex];
    const userClean = saInput.trim().replace(',', '.');
    const userNum = parseFloat(userClean);

    const isCorrect = curr.acceptedAnswers.some((a) => {
      const aClean = a.trim().replace(',', '.');
      const aNum = parseFloat(aClean);
      if (!isNaN(userNum) && !isNaN(aNum)) {
        return Math.abs(userNum - aNum) < 0.01;
      }
      return userClean.toLowerCase() === aClean.toLowerCase();
    });

    setSaIsCorrect(isCorrect);
    setSaHistory((prev) => ({
      ...prev,
      [saIndex]: {
        userInput: saInput.trim(),
        isCorrect,
        acceptedAnswer: curr.acceptedAnswers[0],
      },
    }));

    if (isCorrect) {
      soundFX.playCorrect();
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      soundFX.playWrong();
    }
  };

  const handleNextSA = () => {
    soundFX.playClick();
    if (saIndex < saList.length - 1) {
      setSaInput('');
      setSaSubmitted(false);
      setSaIsCorrect(null);
      setSaIndex((prev) => prev + 1);
    } else {
      setIsSaFinished(true);
      const totalCorrect = Object.values(saHistory).filter((x) => x.isCorrect).length;
      if (totalCorrect / saList.length >= 0.7) {
        soundFX.playFanfare();
        try {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
        } catch {}
      } else {
        soundFX.playWrong();
      }

      // Lưu điểm Trả lời ngắn vào Google Sheet
      const score10 = Math.round((totalCorrect / saList.length) * 10 * 10) / 10;
      googleSheetsService
        .recordExerciseScore({
          timestamp: new Date().toLocaleString('vi-VN'),
          fullName: studentProfile?.fullName || studentName,
          className: studentProfile?.className || '10Ti',
          studentNo: studentProfile?.studentNo || '01',
          exerciseType: 'Trả lời ngắn',
          correctCount: totalCorrect,
          totalQuestions: saList.length,
          percentage: Math.round((totalCorrect / saList.length) * 100),
          score10,
        })
        .then(() => {
          setSheetNotice(`Đã lưu kết quả Trả lời ngắn (${totalCorrect}/${saList.length} câu) vào Google Sheet!`);
        });
    }
  };

  const handleResetSA = () => {
    soundFX.playClick();
    setSaList(getRandomSASet()); // Lấy 15 câu ngẫu nhiên mới từ 30 câu!
    setSaIndex(0);
    setSaInput('');
    setSaSubmitted(false);
    setSaIsCorrect(null);
    setSaHistory({});
    setIsSaFinished(false);
  };

  return (
    <div className="w-full min-h-screen py-6 px-4 sm:px-6 max-w-7xl mx-auto relative z-10 flex flex-col">
      {/* Top Navbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cyan-500/20 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFX.playClick();
              onBackToTable();
            }}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Về Bảng Tuần Hoàn</span>
          </button>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
              CHUYÊN ĐỀ HÓA HỌC 10
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Oxide & Hydroxide
            </h1>
          </div>
        </div>

        {/* User badge, Google Sheets & Mini test quick launch */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-xs">
            <span className="text-slate-400">Học sinh:</span>{' '}
            <strong className="text-cyan-300">{studentName}</strong>
          </div>

          <button
            onClick={() => {
              soundFX.playClick();
              setIsSheetsModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all"
            title="Quản lý Google Sheets & Bảng điểm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Google Sheets</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick();
              setShowMiniTest(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Phòng Thi Mini Test (18 câu)</span>
          </button>

          {onDeleteSelf && (
            <button
              onClick={() => {
                soundFX.playClick();
                onDeleteSelf();
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
              title="Xóa tài khoản của tôi"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
            </button>
          )}
        </div>
      </div>

      {/* Floating or Top Google Sheet Notice Toast */}
      {sheetNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-lg max-w-2xl mx-auto w-full"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{sheetNotice}</span>
          </div>
          <button
            onClick={() => setSheetNotice(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Tabs Control with Strict Unlocking Logic */}
      <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/20 max-w-2xl mx-auto w-full mb-8">
        {/* Tab 1: Lý thuyết */}
        <button
          onClick={() => {
            soundFX.playClick();
            setActiveTab('theory');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'theory'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-lg shadow-cyan-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Lý thuyết</span>
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-200" />
        </button>

        {/* Tab 2: Ví dụ */}
        <button
          disabled={!unlockedTabs.examples}
          onClick={() => {
            if (unlockedTabs.examples) {
              soundFX.playClick();
              setActiveTab('examples');
            }
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            !unlockedTabs.examples
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : activeTab === 'examples'
              ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 cursor-pointer'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 cursor-pointer'
          }`}
        >
          {unlockedTabs.examples ? (
            <Unlock className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-slate-500" />
          )}
          <span>2. Ví dụ</span>
        </button>

        {/* Tab 3: Bài tập */}
        <button
          disabled={!unlockedTabs.exercises}
          onClick={() => {
            if (unlockedTabs.exercises) {
              soundFX.playClick();
              setActiveTab('exercises');
            }
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            !unlockedTabs.exercises
              ? 'opacity-40 cursor-not-allowed text-slate-500'
              : activeTab === 'exercises'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 cursor-pointer'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60 cursor-pointer'
          }`}
        >
          {unlockedTabs.exercises ? (
            <Unlock className="w-4 h-4 text-emerald-400" />
          ) : (
            <Lock className="w-4 h-4 text-slate-500" />
          )}
          <span>3. Bài tập</span>
        </button>
      </div>

      {/* TAB CONTENT AREAS */}
      <div className="flex-1">
        {/* ==================================================== */}
        {/* TAB 1: LÝ THUYẾT (THEORY)                            */}
        {/* ==================================================== */}
        {activeTab === 'theory' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Infographic 1: Quy luật biến đổi tính Acid - Base */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    I. Quy Luật Biến Đổi Tính Acid – Base
                  </h2>
                  <p className="text-xs text-slate-400">
                    Sự biến đổi tuần hoàn theo Chu kỳ và theo Nhóm A
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Chu kỳ */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30">
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-3">
                    <ArrowRight className="w-4 h-4" />
                    Trong một Chu kỳ (từ Trái sang Phải):
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>
                        Điện tích hạt nhân tăng dần, bán kính nguyên tử giảm dần, độ âm điện tăng dần → <strong>Tính kim loại giảm dần, tính phi kim tăng dần</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>
                        <strong>Tính base</strong> của oxide cao nhất và hydroxide tương ứng <strong className="text-rose-300">giảm dần</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span>
                        <strong>Tính acid</strong> của oxide cao nhất và hydroxide tương ứng <strong className="text-emerald-300">tăng dần</strong>.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Nhóm A */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-3">
                    <ArrowRight className="w-4 h-4" />
                    Trong một Nhóm A (từ Trên xuống Dưới):
                  </div>
                  <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>
                        Số lớp electron tăng, bán kính nguyên tử tăng nhanh, lực giữ electron ngoài cùng giảm → <strong>Tính kim loại tăng dần, tính phi kim giảm dần</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>
                        <strong>Tính base</strong> của oxide cao nhất và hydroxide tương ứng <strong className="text-emerald-300">tăng dần</strong> (VD: LiOH &lt; NaOH &lt; KOH &lt; CsOH).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>
                        <strong>Tính acid</strong> của oxide cao nhất và hydroxide tương ứng <strong className="text-rose-300">giảm dần</strong>.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Infographic 2: Công thức tổng quát */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-sky-500/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    II. Công Thức Tổng Quát Oxide & Hydroxide
                  </h2>
                  <p className="text-xs text-slate-400">
                    Nguyên tắc xác định dựa trên số thứ tự nhóm A
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {/* Khối 1: Oxide cao nhất */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-sky-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase text-sky-400 font-bold block">
                        1. OXIDE CAO NHẤT
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-950 border border-sky-500/30 text-[10px] font-mono text-sky-300">
                        Highest Oxide
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-500/20 font-mono text-center text-lg font-bold text-white mb-3">
                      R₂Oₙ
                    </div>

                    {/* Phần định nghĩa chuẩn GDPT 2018 */}
                    <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 mb-3 text-xs leading-relaxed">
                      <span className="font-bold text-sky-300 flex items-center gap-1.5 mb-1">
                        📖 Định nghĩa:
                      </span>
                      <p className="text-slate-200">
                        <strong>Oxide cao nhất</strong> là oxide trong đó nguyên tố thể hiện <strong>hóa trị cao nhất</strong> (số oxi hóa dương cực đại) khi liên kết với oxygen. Đối với các nguyên tố nhóm A (từ IA đến VIIA, trừ F và O), hóa trị cao nhất này bằng chính <strong>số thứ tự nhóm A</strong>.
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 leading-relaxed">
                      <p>
                        • <strong>Quy luật:</strong> Với <strong>n</strong> là số thứ tự nhóm A (1 đến 7). Hóa trị cao nhất bằng số electron hóa trị lớp ngoài cùng.
                      </p>
                      <p className="text-[11px] text-slate-400 italic">
                        * Khi n chẵn thì công thức được rút gọn tối giản: <code>RO</code> (nhóm IIA), <code>RO₂</code> (nhóm IVA), <code>RO₃</code> (nhóm VIA).
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-sky-300">Ví dụ tiêu biểu:</strong> Na₂O (IA), MgO (IIA), Al₂O₃ (IIIA), SiO₂ (IVA), P₂O₅ (VA), SO₃ (VIA), Cl₂O₇ (VIIA).
                  </div>
                </div>

                {/* Khối 2: Hydroxide tương ứng */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase text-indigo-400 font-bold block">
                        2. HYDROXIDE TƯƠNG ỨNG
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/30 text-[10px] font-mono text-indigo-300">
                        Corresponding Hydroxide
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/20 font-mono text-center text-lg font-bold text-white mb-3">
                      R(OH)ₙ hoặc H₈₋ₙRO₄
                    </div>

                    {/* Phần định nghĩa chuẩn GDPT 2018 */}
                    <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 mb-3 text-xs leading-relaxed">
                      <span className="font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
                        📖 Định nghĩa:
                      </span>
                      <p className="text-slate-200">
                        <strong>Hydroxide tương ứng</strong> là hợp chất ngậm nước của oxide cao nhất, trong đó nguyên tố trung tâm vẫn giữ nguyên <strong>hóa trị cao nhất</strong> (số oxi hóa cực đại). Tùy thuộc vào bản chất kim loại hay phi kim mà hydroxide tồn tại ở dạng base hoặc oxoacid.
                      </p>
                    </div>

                    <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                      <li>
                        • <strong>Kim loại:</strong> Tồn tại dưới dạng base hoặc kiềm <code>R(OH)ₙ</code> (VD: NaOH, Mg(OH)₂, Ca(OH)₂).
                      </li>
                      <li>
                        • <strong>Phi kim:</strong> Tồn tại dưới dạng acid có oxygen (oxoacid) như <code>H₂SO₄</code>, <code>HClO₄</code>, <code>H₃PO₄</code>, <code>HNO₃</code>.
                      </li>
                      <li>
                        • <strong>Chất lưỡng tính:</strong> Vừa có tính acid vừa có tính base (VD: <code>Al(OH)₃</code>, <code>Zn(OH)₂</code>).
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    <strong className="text-indigo-300">Ví dụ tiêu biểu:</strong> NaOH, Mg(OH)₂, Al(OH)₃ (lưỡng tính), H₂SiO₃, H₃PO₄, H₂SO₄, HClO₄.
                  </div>
                </div>
              </div>
            </div>

            {/* Infographic 3: Bảng ma trận so sánh Chu kỳ 3 kinh điển */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 overflow-x-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    III. Bảng Tổng Hợp So Sánh Chu Kỳ 3 (Na → Cl)
                  </h2>
                  <p className="text-xs text-slate-400">
                    Bảng chuẩn kiến thức SGK Hóa học 10 (Chân trời sáng tạo / Cánh diều / Kết nối tri thức)
                  </p>
                </div>
              </div>

              {/* Table matrix */}
              <div className="min-w-[750px] border border-slate-700 rounded-2xl overflow-hidden text-xs">
                {/* Header */}
                <div className="grid grid-cols-8 bg-slate-950 font-bold text-slate-300 p-3 text-center border-b border-slate-800">
                  <div>Tiêu chí</div>
                  <div>Na (IA)</div>
                  <div>Mg (IIA)</div>
                  <div>Al (IIIA)</div>
                  <div>Si (IVA)</div>
                  <div>P (VA)</div>
                  <div>S (VIA)</div>
                  <div>Cl (VIIA)</div>
                </div>

                {/* Row 1: Oxide */}
                <div className="grid grid-cols-8 bg-slate-900/60 p-3 text-center border-b border-slate-800/60 font-mono items-center">
                  <div className="font-sans font-bold text-cyan-400">Oxide cao nhất</div>
                  <div className="font-bold text-rose-300">Na₂O</div>
                  <div className="font-bold text-amber-300">MgO</div>
                  <div className="font-bold text-cyan-300">Al₂O₃</div>
                  <div className="font-bold text-teal-300">SiO₂</div>
                  <div className="font-bold text-emerald-300">P₂O₅</div>
                  <div className="font-bold text-indigo-300">SO₃</div>
                  <div className="font-bold text-purple-300">Cl₂O₇</div>
                </div>

                {/* Row 2: Oxide Nature */}
                <div className="grid grid-cols-8 bg-slate-950/60 p-3 text-center border-b border-slate-800/60 text-[11px] items-center">
                  <div className="font-bold text-slate-400">Loại oxide</div>
                  <div className="text-rose-300">Basic oxide (kiềm mạnh)</div>
                  <div className="text-amber-300">Basic oxide</div>
                  <div className="text-cyan-300 font-bold bg-cyan-950/40 rounded py-1">Lưỡng tính (Amphoteric)</div>
                  <div className="text-teal-300">Acidic oxide rất yếu</div>
                  <div className="text-emerald-300">Acidic oxide</div>
                  <div className="text-indigo-300">Acidic oxide mạnh</div>
                  <div className="text-purple-300">Acidic oxide rất mạnh</div>
                </div>

                {/* Row 3: Hydroxide */}
                <div className="grid grid-cols-8 bg-slate-900/60 p-3 text-center border-b border-slate-800/60 font-mono items-center">
                  <div className="font-sans font-bold text-cyan-400">Hydroxide tương ứng</div>
                  <div className="font-bold text-rose-300">NaOH</div>
                  <div className="font-bold text-amber-300">Mg(OH)₂</div>
                  <div className="font-bold text-cyan-300">Al(OH)₃</div>
                  <div className="font-bold text-teal-300">H₂SiO₃</div>
                  <div className="font-bold text-emerald-300">H₃PO₄</div>
                  <div className="font-bold text-indigo-300">H₂SO₄</div>
                  <div className="font-bold text-purple-300">HClO₄</div>
                </div>

                {/* Row 4: Hydroxide Nature */}
                <div className="grid grid-cols-8 bg-slate-950/60 p-3 text-center text-[11px] items-center">
                  <div className="font-bold text-slate-400">Tính chất</div>
                  <div className="text-rose-300 font-bold">Base mạnh (Kiềm)</div>
                  <div className="text-amber-300">Base trung bình</div>
                  <div className="text-cyan-300 font-bold bg-cyan-950/40 rounded py-1">Hydroxide lưỡng tính</div>
                  <div className="text-teal-300">Acid rất yếu</div>
                  <div className="text-emerald-300">Acid trung bình</div>
                  <div className="text-indigo-300 font-bold">Acid mạnh</div>
                  <div className="text-purple-300 font-bold">Acid rất mạnh</div>
                </div>
              </div>

              {/* Trend bar */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  ◀ Tính Base GIẢM DẦN (Na → Cl)
                </span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  Tính Acid TĂNG DẦN (Na → Cl) ▶
                </span>
              </div>
            </div>

            {/* Completion & Unlock Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-emerald-950/60 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Bạn đã hoàn thành việc ôn tập Lý thuyết!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Nhấn nút bên cạnh để mở khóa Mục 2: Ví dụ phân tích mẫu & các dạng bài tập có lời giải.
                </p>
              </div>

              <motion.button
                onClick={handleUnlockExamples}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Đã hiểu lý thuyết → Mở khóa Ví dụ</span>
                <Unlock className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: VÍ DỤ (EXAMPLES)                             */}
        {/* ==================================================== */}
        {activeTab === 'examples' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 4 Phân tích mẫu nguyên tố tiêu biểu */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                1. Phân Tích Mẫu Chi Tiết Cho 4 Nguyên Tố Tiêu Biểu
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sample 1: Na */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-rose-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold text-rose-300">
                      1. Sodium (Na, Z = 11)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-500/40">
                      Chu kỳ 3 • Nhóm IA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Cấu hình electron: <code>[Ne] 3s¹</code> (1 electron hóa trị).
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <p>
                      • <strong>Oxide cao nhất:</strong> <code>Na₂O</code> (basic oxide mạnh, tan trong nước tỏa nhiệt: Na₂O + H₂O → 2NaOH).
                    </p>
                    <p>
                      • <strong>Hydroxide tương ứng:</strong> <code>NaOH</code> (base mạnh / xút ăn da, quỳ tím hóa xanh đậm).
                    </p>
                  </div>
                </div>

                {/* Sample 2: Al */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold text-cyan-300">
                      2. Aluminium (Al, Z = 13)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      Chu kỳ 3 • Nhóm IIIA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Cấu hình electron: <code>[Ne] 3s² 3p¹</code> (3 electron hóa trị).
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <p>
                      • <strong>Oxide cao nhất:</strong> <code>Al₂O₃</code> (amphoteric oxide, tan trong cả acid và kiềm mạnh).
                    </p>
                    <p>
                      • <strong>Hydroxide tương ứng:</strong> <code>Al(OH)₃</code> (hydroxide lưỡng tính kết tủa keo trắng).
                    </p>
                  </div>
                </div>

                {/* Sample 3: P */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold text-emerald-300">
                      3. Phosphorus (P, Z = 15)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      Chu kỳ 3 • Nhóm VA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Cấu hình electron: <code>[Ne] 3s² 3p³</code> (5 electron hóa trị).
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <p>
                      • <strong>Oxide cao nhất:</strong> <code>P₂O₅</code> (acidic oxide, hút ẩm cực mạnh: P₂O₅ + 3H₂O → 2H₃PO₄).
                    </p>
                    <p>
                      • <strong>Hydroxide tương ứng:</strong> <code>H₃PO₄</code> (phosphoric acid, acid 3 nấc độ mạnh trung bình).
                    </p>
                  </div>
                </div>

                {/* Sample 4: Cl */}
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-sm font-bold text-purple-300">
                      4. Chlorine (Cl, Z = 17)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                      Chu kỳ 3 • Nhóm VIIA
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mb-2">
                    Cấu hình electron: <code>[Ne] 3s² 3p⁵</code> (7 electron hóa trị).
                  </p>
                  <div className="space-y-1.5 text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <p>
                      • <strong>Oxide cao nhất:</strong> <code>Cl₂O₇</code> (dichlorine heptoxide, acidic oxide rất mạnh).
                    </p>
                    <p>
                      • <strong>Hydroxide tương ứng:</strong> <code>HClO₄</code> (perchloric acid, một trong các acid mạnh nhất).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Dạng Bài Tập Mẫu Có Lời Giải Chi Tiết */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-400" />
                2. Các Dạng Bài Tập Mẫu & Phương Pháp Giải Chi Tiết
              </h2>

              <div className="space-y-4">
                {/* Dạng 1 */}
                <div className="p-6 rounded-2xl glass-panel border border-sky-500/30">
                  <div className="flex items-center gap-2 text-sky-300 font-bold text-sm mb-2">
                    <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-500/40 text-xs font-mono">
                      DẠNG 1
                    </span>
                    Xác định công thức Oxide cao nhất & Hydroxide từ vị trí trong BTH
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    <strong>Đề bài:</strong> Nguyên tố X có số hiệu nguyên tử Z = 16. Hãy xác định vị trí của X trong bảng tuần hoàn và viết công thức oxide cao nhất cùng hydroxide tương ứng của X.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                    <strong className="text-cyan-300 block">Lời giải chi tiết từng bước:</strong>
                    <p>
                      • Bước 1: Viết cấu hình electron của X (Z = 16): <code>1s² 2s² 2p⁶ 3s² 3p⁴</code> hoặc viết gọn <code>[Ne] 3s² 3p⁴</code>.
                    </p>
                    <p>
                      • Bước 2: Xác định vị trí:
                      <br />- Có 3 lớp electron → Thuộc <strong>Chu kỳ 3</strong>.
                      <br />- Lớp ngoài cùng có 2 + 4 = 6 electron, nguyên tố s/p → Thuộc <strong>Nhóm VIA</strong> (nguyên tố Sulfur - S).
                    </p>
                    <p>
                      • Bước 3: Xác định công thức:
                      <br />- Nhóm VIA nên hóa trị cao nhất với O là VI → Oxide cao nhất là <code>SO₃</code>.
                      <br />- Hydroxide tương ứng của S ở hóa trị cao nhất là oxoacid: <code>H₂SO₄</code> (sulfuric acid).
                    </p>
                  </div>
                </div>

                {/* Dạng 2 */}
                <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30">
                  <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/40 text-xs font-mono">
                      DẠNG 2
                    </span>
                    So sánh tính Acid / Base của các Oxide và Hydroxide
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    <strong>Đề bài:</strong> Cho các nguyên tố: Na (Z=11), Mg (Z=12), Al (Z=13). Hãy sắp xếp các hydroxide tương ứng theo chiều tăng dần tính base và giải thích ngắn gọn.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                    <strong className="text-cyan-300 block">Lời giải chi tiết từng bước:</strong>
                    <p>
                      • Bước 1: Các hydroxide tương ứng lần lượt là: <code>Al(OH)₃</code>, <code>Mg(OH)₂</code>, <code>NaOH</code>.
                    </p>
                    <p>
                      • Bước 2: Vì Na, Mg, Al cùng thuộc Chu kỳ 3. Theo chiều tăng dần của điện tích hạt nhân (11 → 12 → 13), bán kính nguyên tử giảm dần, độ âm điện tăng dần nên tính kim loại giảm dần theo thứ tự: <strong>Na &gt; Mg &gt; Al</strong>.
                    </p>
                    <p>
                      • Bước 3: Do tính kim loại giảm dần nên tính base của hydroxide tương ứng giảm dần theo thứ tự: NaOH &gt; Mg(OH)₂ &gt; Al(OH)₃.
                    </p>
                    <p>
                      • Sắp xếp theo chiều TĂNG DẦN: <code>Al(OH)₃ &lt; Mg(OH)₂ &lt; NaOH</code> (trong đó Al(OH)₃ là hydroxide lưỡng tính, Mg(OH)₂ là base trung bình, NaOH là base mạnh).
                    </p>
                  </div>
                </div>

                {/* Dạng 3 */}
                <div className="p-6 rounded-2xl glass-panel border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-xs font-mono">
                      DẠNG 3
                    </span>
                    Xác định tên nguyên tố dựa vào % khối lượng trong Oxide cao nhất
                  </div>
                  <p className="text-xs text-slate-300 mb-3">
                    <strong>Đề bài:</strong> Một nguyên tố phi kim R thuộc nhóm VA. Trong oxide cao nhất của R, oxygen chiếm 56.34% về khối lượng. Xác định nguyên tử khối và tên của nguyên tố R.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
                    <strong className="text-cyan-300 block">Lời giải chi tiết từng bước:</strong>
                    <p>
                      • Bước 1: R thuộc nhóm VA nên hóa trị cao nhất với oxygen là V. Công thức oxide cao nhất của R là <code>R₂O₅</code>.
                    </p>
                    <p>
                      • Bước 2: Thiết lập phương trình theo % khối lượng của oxygen:
                      <br />
                      <code>%m(O) = (5 × 16) / (2R + 5 × 16) × 100% = 56.34%</code>
                    </p>
                    <p>
                      • Bước 3: Giải phương trình toán học:
                      <br />
                      <code>80 / (2R + 80) = 0.5634</code>
                      <br />
                      <code>⇒ 2R + 80 = 80 / 0.5634 ≈ 142</code>
                      <br />
                      <code>⇒ 2R ≈ 142 - 80 = 62 ⇒ R ≈ 31 (g/mol)</code>.
                    </p>
                    <p>
                      • Kết luận: R có nguyên tử khối bằng 31 g/mol. Vậy R là nguyên tố <strong>Phosphorus (Lưu huỳnh / Photpho, ký hiệu P)</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Completion & Unlock Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-950/60 via-slate-900 to-indigo-950/60 border border-sky-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  Bạn đã nắm vững các dạng bài tập mẫu!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Nhấn nút bên cạnh để mở khóa Mục 3: Luyện tập 3 dạng bài tập tương tác (Trắc nghiệm, Đúng/Sai, Trả lời ngắn) và Mini Test.
                </p>
              </div>

              <motion.button
                onClick={handleUnlockExercises}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Đã hiểu ví dụ → Mở khóa Bài tập</span>
                <Unlock className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: BÀI TẬP LUYỆN TẬP (PRACTICE EXERCISES)        */}
        {/* ==================================================== */}
        {activeTab === 'exercises' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Launch Mini Test Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-cyan-950/60 border-2 border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                  <Award className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider block">
                    ĐÁNH GIÁ NĂNG LỰC HÓA HỌC 10
                  </span>
                  <h3 className="text-xl font-black text-white">
                    Bài Kiểm Tra Tổng Hợp: 18 Câu (15 Phút)
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    12 câu Trắc nghiệm + 2 Đúng/Sai + 4 Trả lời ngắn • Bù 2 câu điền ngắn thay cho tự luận • Chấm điểm tự động 100%!
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => {
                  soundFX.playFanfare();
                  setShowMiniTest(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center gap-2 cursor-pointer shrink-0"
              >
                <span>Bắt đầu Bài Kiểm Tra</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* 3 Exercise Formats Sub-navigation */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Ngân Hàng Bài Tập Luyện Tập (3 Dạng):
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setExerciseFormat('mc');
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    exerciseFormat === 'mc'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  1. Trắc nghiệm (15 câu)
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setExerciseFormat('tf');
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    exerciseFormat === 'tf'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  2. Đúng / Sai (15 câu)
                </button>

                <button
                  onClick={() => {
                    soundFX.playClick();
                    setExerciseFormat('sa');
                  }}
                  className={`p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                    exerciseFormat === 'sa'
                      ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  3. Trả lời ngắn (15 câu)
                </button>
              </div>
            </div>

            {/* Active Exercise Box */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30">
              {/* --- DẠNG 1: TRẮC NGHIỆM 4 LỰA CHỌN (15 CÂU RANDOM TỪ 30) --- */}
              {exerciseFormat === 'mc' && (
                <div>
                  {isMcFinished ? (
                    // MÀN HÌNH TỔNG KẾT VÀ KHEN THƯỞNG 15 CÂU TRẮC NGHIỆM
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {(() => {
                        const totalCorrect = Object.values(mcHistory).filter((x) => x.isCorrect).length;
                        const totalQuestions = mcList.length;
                        const percentage = Math.round((totalCorrect / totalQuestions) * 100);
                        const isPassed = percentage >= 70;

                        return (
                          <div>
                            {/* Banner Chúc mừng hoặc Tiếc nuối */}
                            <div
                              className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl ${
                                isPassed
                                  ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-cyan-950/80 border-emerald-400/60 shadow-emerald-500/20'
                                  : 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-amber-950/80 border-rose-500/50 shadow-rose-500/20'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div
                                  className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 border ${
                                    isPassed
                                      ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400'
                                      : 'bg-rose-500/20 border-rose-400/40 text-rose-400'
                                  }`}
                                >
                                  {isPassed ? (
                                    <Trophy className="w-12 h-12 animate-bounce" />
                                  ) : (
                                    <AlertCircle className="w-12 h-12" />
                                  )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                                        isPassed
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                          : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                      }`}
                                    >
                                      {isPassed ? '🏆 Đạt Chỉ Tiêu Xuất Sắc (≥ 70%)' : '💡 Tiếc Nuối - Chưa Đạt Chỉ Tiêu'}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      THPT Chuyên Hùng Vương • Hóa học 10
                                    </span>
                                  </div>

                                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                                    {isPassed
                                      ? 'Chúc mừng bạn đã hoàn thành xuất sắc bài tập Trắc nghiệm!'
                                      : 'Rất tiếc! Bạn chưa đạt mức 70% số câu đúng.'}
                                  </h3>

                                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                                    {isPassed
                                      ? `Khen thưởng học sinh ${studentName}! Bạn đã trả lời đúng ${totalCorrect}/${totalQuestions} câu (${percentage}%), thể hiện sự nắm vững kiến thức về biến đổi oxide và hydroxide.`
                                      : `Học sinh ${studentName} đã trả lời đúng ${totalCorrect}/${totalQuestions} câu (${percentage}%). Đừng nản lòng! Hãy xem lại chi tiết bài làm bên dưới và thử sức lại để đạt điểm tối đa nhé.`}
                                  </p>

                                  {/* Thanh tiến trình */}
                                  <div className="mt-4 max-w-md">
                                    <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1">
                                      <span>Tỷ lệ chính xác:</span>
                                      <span className={isPassed ? 'text-emerald-400' : 'text-rose-400'}>
                                        {totalCorrect} / {totalQuestions} câu ({percentage}%)
                                      </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                      <div
                                        className={`h-full transition-all duration-1000 ${
                                          isPassed
                                            ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                                            : 'bg-gradient-to-r from-rose-500 to-amber-500'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Nút hành động */}
                              <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-800">
                                <button
                                  onClick={handleResetMC}
                                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all border border-slate-700"
                                >
                                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                                  <span>Làm lại đề Trắc nghiệm mới (Random 15/30 câu)</span>
                                </button>
                                <button
                                  onClick={() => {
                                    soundFX.playClick();
                                    setExerciseFormat('tf');
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                                >
                                  <span>Luyện tập dạng Đúng / Sai</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Danh sách xem lại 15 câu trắc nghiệm */}
                            <div className="mt-8 space-y-4">
                              <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Bảng xem lại chi tiết 15 câu trắc nghiệm (Đã làm):
                              </h4>

                              <div className="space-y-3">
                                {mcList.map((q, idx) => {
                                  const res = mcHistory[idx];
                                  const isCorrect = res?.isCorrect;
                                  const selectedIdx = res?.selected;

                                  return (
                                    <div
                                      key={q.id}
                                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                                        isCorrect
                                          ? 'bg-emerald-950/20 border-emerald-500/30'
                                          : 'bg-rose-950/20 border-rose-500/30'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-white">
                                          Câu {idx + 1}: {q.question}
                                        </span>
                                        <span
                                          className={`px-2 py-0.5 rounded-md font-mono font-bold uppercase text-[10px] ${
                                            isCorrect
                                              ? 'bg-emerald-500/20 text-emerald-300'
                                              : 'bg-rose-500/20 text-rose-300'
                                          }`}
                                        >
                                          {isCorrect ? '✓ Đúng' : '✗ Sai'}
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-2">
                                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                                          Bạn chọn:{' '}
                                          <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                                            {selectedIdx !== undefined
                                              ? `${String.fromCharCode(65 + selectedIdx)}. ${q.options[selectedIdx]}`
                                              : 'Chưa chọn'}
                                          </strong>
                                        </div>
                                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                                          Đáp án đúng:{' '}
                                          <strong className="text-emerald-400">
                                            {String.fromCharCode(65 + q.correctAnswerIndex)}. {q.options[q.correctAnswerIndex]}
                                          </strong>
                                        </div>
                                      </div>

                                      <p className="text-[11px] text-slate-400 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                                        💡 <strong>Giải thích:</strong> {q.explanation}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  ) : (
                    // LÀM BÀI TRẮC NGHIỆM TỪNG CÂU
                    <div>
                      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-cyan-400 font-bold">
                            CÂU HỎI TRẮC NGHIỆM {mcIndex + 1} / {mcList.length}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] flex items-center gap-1">
                            <Dices className="w-3 h-3 text-cyan-400" />
                            Random 15/30 câu • Đảo ngẫu nhiên A, B, C, D
                          </span>
                        </div>
                        <button
                          onClick={handleResetMC}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all border border-slate-700"
                          title="Lấy ngẫu nhiên 15 câu khác từ kho 30 câu và xáo trộn lại đáp án"
                        >
                          <RotateCcw className="w-3 h-3 text-cyan-400" />
                          <span>Đổi đề ngẫu nhiên mới</span>
                        </button>
                      </div>

                      {(() => {
                        const q = mcList[mcIndex];
                        return (
                          <div>
                            <h4 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
                              {q.question}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                              {q.options.map((opt, idx) => {
                                const isSelected = selectedMcOption === idx;
                                const isCorrectOpt = idx === q.correctAnswerIndex;
                                let style = 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800';

                                if (mcSubmitted) {
                                  if (isCorrectOpt) {
                                    style = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/40';
                                  } else if (isSelected && !isCorrectOpt) {
                                    style = 'bg-rose-950/80 border-rose-400 text-rose-200';
                                  } else {
                                    style = 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60';
                                  }
                                }

                                return (
                                  <button
                                    key={idx}
                                    disabled={mcSubmitted}
                                    onClick={() => handleCheckMC(idx)}
                                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 cursor-pointer ${style}`}
                                  >
                                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                                      {String.fromCharCode(65 + idx)}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Interactive Feedback & Explanation */}
                            {mcSubmitted && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-2xl border mb-6 ${
                                  selectedMcOption === q.correctAnswerIndex
                                    ? 'bg-emerald-950/40 border-emerald-500/40'
                                    : 'bg-rose-950/40 border-rose-500/40'
                                }`}
                              >
                                <div className="flex items-center gap-2 font-bold text-sm mb-2">
                                  {selectedMcOption === q.correctAnswerIndex ? (
                                    <>
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                      <span className="text-emerald-300">Chính xác tuyệt vời! Lời khen ngợi cho bạn!</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="w-5 h-5 text-rose-400" />
                                      <span className="text-rose-300">Chưa chính xác! Xem hướng dẫn chi tiết bên dưới:</span>
                                    </>
                                  )}
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                                  💡 <strong>Giải thích chi tiết:</strong> {q.explanation}
                                </p>
                              </motion.div>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                              {q.hint && (
                                <span className="text-xs text-slate-400 italic">
                                  Gợi ý: {q.hint}
                                </span>
                              )}
                              <button
                                onClick={handleNextMC}
                                className="ml-auto px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/30"
                              >
                                <span>
                                  {mcIndex < mcList.length - 1
                                    ? `Câu tiếp theo (Câu ${mcIndex + 2}/15)`
                                    : 'Hoàn thành 15 câu & Xem kết quả'}
                                </span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* --- DẠNG 2: ĐÚNG / SAI (15 CÂU RANDOM TỪ 30) --- */}
              {exerciseFormat === 'tf' && (
                <div>
                  {isTfFinished ? (
                    // MÀN HÌNH TỔNG KẾT VÀ KHEN THƯỞNG 15 CÂU ĐÚNG/SAI
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {(() => {
                        const totalQuestions = tfList.length;
                        const passedCount = Object.values(tfHistory).filter((x) => x.isPassed).length;
                        const percentage = Math.round((passedCount / totalQuestions) * 100);
                        const isPassed = percentage >= 70;

                        return (
                          <div>
                            {/* Banner Chúc mừng hoặc Tiếc nuối */}
                            <div
                              className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl ${
                                isPassed
                                  ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-sky-950/80 border-emerald-400/60 shadow-emerald-500/20'
                                  : 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-amber-950/80 border-rose-500/50 shadow-rose-500/20'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div
                                  className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 border ${
                                    isPassed
                                      ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400'
                                      : 'bg-rose-500/20 border-rose-400/40 text-rose-400'
                                  }`}
                                >
                                  {isPassed ? (
                                    <Trophy className="w-12 h-12 animate-bounce" />
                                  ) : (
                                    <AlertCircle className="w-12 h-12" />
                                  )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                                        isPassed
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                          : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                      }`}
                                    >
                                      {isPassed ? '🏆 Đạt Chỉ Tiêu Xuất Sắc (≥ 70%)' : '💡 Tiếc Nuối - Chưa Đạt Chỉ Tiêu'}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      THPT Chuyên Hùng Vương • Dạng Đúng / Sai
                                    </span>
                                  </div>

                                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                                    {isPassed
                                      ? 'Chúc mừng bạn đã hoàn thành xuất sắc dạng bài Đúng / Sai!'
                                      : 'Rất tiếc! Bạn chưa đạt mức 70% số câu đúng.'}
                                  </h3>

                                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                                    {isPassed
                                      ? `Khen thưởng học sinh ${studentName}! Bạn đã hoàn thành tốt ${passedCount}/${totalQuestions} câu (${percentage}%), phản biện chính xác từng mệnh đề về tính acid-base và hóa trị.`
                                      : `Học sinh ${studentName} đã hoàn thành tốt ${passedCount}/${totalQuestions} câu (${percentage}%). Hãy xem lại các nhận định bị sai ở bảng bên dưới và làm lại để rèn luyện tư duy phản biện nhé.`}
                                  </p>

                                  <div className="mt-4 max-w-md">
                                    <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1">
                                      <span>Tỷ lệ câu đạt (≥ 3/4 ý):</span>
                                      <span className={isPassed ? 'text-emerald-400' : 'text-rose-400'}>
                                        {passedCount} / {totalQuestions} câu ({percentage}%)
                                      </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                      <div
                                        className={`h-full transition-all duration-1000 ${
                                          isPassed
                                            ? 'bg-gradient-to-r from-emerald-500 to-sky-400'
                                            : 'bg-gradient-to-r from-rose-500 to-amber-500'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-800">
                                <button
                                  onClick={handleResetTF}
                                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all border border-slate-700"
                                >
                                  <RotateCcw className="w-4 h-4 text-sky-400" />
                                  <span>Làm lại đề Đúng / Sai mới (Random 15/30 câu)</span>
                                </button>
                                <button
                                  onClick={() => {
                                    soundFX.playClick();
                                    setExerciseFormat('sa');
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all"
                                >
                                  <span>Luyện tập Trả lời ngắn</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Bảng xem lại 15 câu Đúng/Sai */}
                            <div className="mt-8 space-y-4">
                              <h4 className="text-sm font-bold text-sky-300 uppercase tracking-wider flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Bảng xem lại chi tiết 15 câu Đúng / Sai (Đã làm):
                              </h4>

                              <div className="space-y-4">
                                {tfList.map((q, qIdx) => {
                                  const h = tfHistory[qIdx];
                                  const isPassedItem = h?.isPassed;

                                  return (
                                    <div
                                      key={q.id}
                                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                                        isPassedItem
                                          ? 'bg-emerald-950/20 border-emerald-500/30'
                                          : 'bg-rose-950/20 border-rose-500/30'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                                        <span className="font-bold text-white text-sm">
                                          Câu {qIdx + 1}: {q.context}
                                        </span>
                                        <span
                                          className={`px-2.5 py-1 rounded-md font-mono font-bold uppercase text-[10px] ${
                                            isPassedItem
                                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                              : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                          }`}
                                        >
                                          {isPassedItem
                                            ? `✓ Đạt (${h?.correctCount || 0}/4 ý)`
                                            : `✗ Chưa đạt (${h?.correctCount || 0}/4 ý)`}
                                        </span>
                                      </div>

                                      <div className="space-y-2 mb-3">
                                        {q.statements.map((st, sIdx) => {
                                          const userVal = h?.userAnswers?.[sIdx];
                                          const isStatementCorrect = userVal === st.isCorrect;

                                          return (
                                            <div
                                              key={sIdx}
                                              className={`p-2.5 rounded-xl border text-[11px] ${
                                                isStatementCorrect
                                                  ? 'bg-slate-900/80 border-emerald-500/40 text-slate-200'
                                                  : 'bg-slate-900/80 border-rose-500/40 text-slate-200'
                                              }`}
                                            >
                                              <div className="flex items-start justify-between gap-2">
                                                <span>
                                                  <strong className="text-cyan-400 font-mono">
                                                    {String.fromCharCode(97 + sIdx)})
                                                  </strong>{' '}
                                                  {st.statement}
                                                </span>
                                                <span
                                                  className={`font-mono font-bold shrink-0 text-[10px] px-2 py-0.5 rounded ${
                                                    isStatementCorrect
                                                      ? 'bg-emerald-500/20 text-emerald-300'
                                                      : 'bg-rose-500/20 text-rose-300'
                                                  }`}
                                                >
                                                  Bạn: {userVal === true ? 'ĐÚNG' : userVal === false ? 'SAI' : '—'} • Đáp án: {st.isCorrect ? 'ĐÚNG' : 'SAI'}
                                                </span>
                                              </div>
                                              <p className="mt-1 text-[10px] text-slate-400 italic">
                                                💡 {st.explanation}
                                              </p>
                                            </div>
                                          );
                                        })}
                                      </div>

                                      <p className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                                        📌 <strong>Tổng kết câu:</strong> {q.explanation}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  ) : (
                    // LÀM BÀI ĐÚNG / SAI TỪNG CÂU
                    <div>
                      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-sky-400 font-bold">
                            CÂU HỎI ĐÚNG / SAI {tfIndex + 1} / {tfList.length}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-[10px] flex items-center gap-1">
                            <Dices className="w-3 h-3 text-sky-400" />
                            Random 15/30 câu • Đảo ngẫu nhiên các mệnh đề a, b, c, d
                          </span>
                        </div>
                        <button
                          onClick={handleResetTF}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all border border-slate-700"
                          title="Lấy ngẫu nhiên 15 câu khác từ kho 30 câu"
                        >
                          <RotateCcw className="w-3 h-3 text-sky-400" />
                          <span>Đổi đề ngẫu nhiên mới</span>
                        </button>
                      </div>

                      {(() => {
                        const q = tfList[tfIndex];
                        return (
                          <div>
                            <h4 className="text-base font-bold text-white mb-4 leading-relaxed">
                              {q.context}
                            </h4>

                            {tfAlert && (
                              <div className="p-3 mb-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{tfAlert}</span>
                              </div>
                            )}

                            <div className="space-y-3 mb-6">
                              {q.statements.map((st, idx) => {
                                const userVal = tfAnswers[idx];
                                const isChecked = tfSubmitted;
                                const isStatementCorrect = userVal === st.isCorrect;

                                return (
                                  <div
                                    key={idx}
                                    className={`p-4 rounded-2xl border transition-all text-xs ${
                                      isChecked
                                        ? isStatementCorrect
                                          ? 'bg-emerald-950/30 border-emerald-500/50'
                                          : 'bg-rose-950/30 border-rose-500/50'
                                        : 'bg-slate-900/70 border-slate-800'
                                    }`}
                                  >
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                      <span className="text-slate-200 font-medium">
                                        <strong className="text-cyan-400 font-mono">
                                          {String.fromCharCode(97 + idx)})
                                        </strong>{' '}
                                        {st.statement}
                                      </span>

                                      <div className="flex items-center gap-2 shrink-0">
                                        <button
                                          disabled={tfSubmitted}
                                          onClick={() => {
                                            soundFX.playClick();
                                            setTfAnswers((prev) => ({ ...prev, [idx]: true }));
                                          }}
                                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            userVal === true
                                              ? 'bg-emerald-500 text-white shadow'
                                              : 'bg-slate-800 text-slate-400 hover:text-white'
                                          }`}
                                        >
                                          ĐÚNG
                                        </button>
                                        <button
                                          disabled={tfSubmitted}
                                          onClick={() => {
                                            soundFX.playClick();
                                            setTfAnswers((prev) => ({ ...prev, [idx]: false }));
                                          }}
                                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                            userVal === false
                                              ? 'bg-rose-500 text-white shadow'
                                              : 'bg-slate-800 text-slate-400 hover:text-white'
                                          }`}
                                        >
                                          SAI
                                        </button>
                                      </div>
                                    </div>

                                    {/* Chấm luôn từng ý sau khi nộp */}
                                    {isChecked && (
                                      <div className="mt-3 pt-3 border-t border-slate-800/80">
                                        <div className="flex items-center gap-2 mb-1">
                                          {isStatementCorrect ? (
                                            <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                                              <CheckCircle2 className="w-3.5 h-3.5" />
                                              Bạn chọn {userVal ? 'ĐÚNG' : 'SAI'} — Hoàn toàn chính xác!
                                            </span>
                                          ) : (
                                            <span className="text-rose-400 font-bold text-[11px] flex items-center gap-1">
                                              <AlertCircle className="w-3.5 h-3.5" />
                                              Bạn chọn {userVal ? 'ĐÚNG' : 'SAI'} — Chưa đúng! Đáp án chuẩn: {st.isCorrect ? 'ĐÚNG' : 'SAI'}
                                            </span>
                                          )}
                                        </div>
                                        <p className="text-[11px] text-slate-300 italic">
                                          💡 {st.explanation}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-800">
                              {!tfSubmitted ? (
                                <button
                                  onClick={handleCheckTF}
                                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                                >
                                  <Check className="w-4 h-4" />
                                  <span>Kiểm tra kết quả ngay</span>
                                </button>
                              ) : (
                                <div className="text-xs text-slate-300">
                                  Đã chấm xong! Nhấn <strong>Câu tiếp theo</strong> để tiếp tục.
                                </div>
                              )}

                              <button
                                onClick={handleNextTF}
                                className="ml-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-600/30"
                              >
                                <span>
                                  {tfIndex < tfList.length - 1
                                    ? `Câu tiếp theo (Câu ${tfIndex + 2}/15)`
                                    : 'Hoàn thành 15 câu & Xem kết quả'}
                                </span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}

              {/* --- DẠNG 3: TRẢ LỜI NGẮN (15 CÂU RANDOM TỪ 30) --- */}
              {exerciseFormat === 'sa' && (
                <div>
                  {isSaFinished ? (
                    // MÀN HÌNH TỔNG KẾT VÀ KHEN THƯỞNG 15 CÂU TRẢ LỜI NGẮN
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {(() => {
                        const totalQuestions = saList.length;
                        const totalCorrect = Object.values(saHistory).filter((x) => x.isCorrect).length;
                        const percentage = Math.round((totalCorrect / totalQuestions) * 100);
                        const isPassed = percentage >= 70;

                        return (
                          <div>
                            {/* Banner Chúc mừng hoặc Tiếc nuối */}
                            <div
                              className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl ${
                                isPassed
                                  ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-indigo-950/80 border-emerald-400/60 shadow-emerald-500/20'
                                  : 'bg-gradient-to-br from-rose-950/80 via-slate-900 to-amber-950/80 border-rose-500/50 shadow-rose-500/20'
                              }`}
                            >
                              <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div
                                  className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 border ${
                                    isPassed
                                      ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-400'
                                      : 'bg-rose-500/20 border-rose-400/40 text-rose-400'
                                  }`}
                                >
                                  {isPassed ? (
                                    <Trophy className="w-12 h-12 animate-bounce" />
                                  ) : (
                                    <AlertCircle className="w-12 h-12" />
                                  )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                                    <span
                                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${
                                        isPassed
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                          : 'bg-rose-500/20 text-rose-300 border border-rose-400/30'
                                      }`}
                                    >
                                      {isPassed ? '🏆 Đạt Chỉ Tiêu Xuất Sắc (≥ 70%)' : '💡 Tiếc Nuối - Chưa Đạt Chỉ Tiêu'}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                      THPT Chuyên Hùng Vương • Dạng Trả Lời Ngắn (Số Học)
                                    </span>
                                  </div>

                                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                                    {isPassed
                                      ? 'Chúc mừng bạn đã xuất sắc làm chủ dạng Trả lời ngắn!'
                                      : 'Rất tiếc! Bạn chưa đạt mức 70% số câu đúng.'}
                                  </h3>

                                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                                    {isPassed
                                      ? `Khen thưởng học sinh ${studentName}! Bạn đã tính toán đúng ${totalCorrect}/${totalQuestions} câu (${percentage}%), chuẩn xác về số học và quy cách làm tròn.`
                                      : `Học sinh ${studentName} đã tính toán đúng ${totalCorrect}/${totalQuestions} câu (${percentage}%). Hãy xem lại cách sửa và hướng dẫn giải các bài bị sai ở bảng bên dưới để cải thiện kỹ năng tính toán nhé.`}
                                  </p>

                                  <div className="mt-4 max-w-md">
                                    <div className="flex justify-between text-xs font-mono font-bold text-slate-300 mb-1">
                                      <span>Tỷ lệ câu đúng:</span>
                                      <span className={isPassed ? 'text-emerald-400' : 'text-rose-400'}>
                                        {totalCorrect} / {totalQuestions} câu ({percentage}%)
                                      </span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                                      <div
                                        className={`h-full transition-all duration-1000 ${
                                          isPassed
                                            ? 'bg-gradient-to-r from-emerald-500 to-indigo-400'
                                            : 'bg-gradient-to-r from-rose-500 to-amber-500'
                                        }`}
                                        style={{ width: `${percentage}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-800">
                                <button
                                  onClick={handleResetSA}
                                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition-all border border-slate-700"
                                >
                                  <RotateCcw className="w-4 h-4 text-indigo-400" />
                                  <span>Làm lại đề Trả lời ngắn mới (Random 15/30 câu)</span>
                                </button>
                                <button
                                  onClick={() => {
                                    soundFX.playFanfare();
                                    setShowMiniTest(true);
                                  }}
                                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition-all shadow-lg shadow-amber-500/25"
                                >
                                  <Award className="w-4 h-4" />
                                  <span>Bắt đầu Bài Kiểm Tra (18 câu)</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Bảng xem lại 15 câu Trả lời ngắn */}
                            <div className="mt-8 space-y-4">
                              <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                                <BookOpen className="w-4 h-4" />
                                Bảng xem lại chi tiết 15 câu & Cách sửa (Đã làm):
                              </h4>

                              <div className="space-y-4">
                                {saList.map((q, idx) => {
                                  const h = saHistory[idx];
                                  const isCorrect = h?.isCorrect;

                                  return (
                                    <div
                                      key={q.id}
                                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                                        isCorrect
                                          ? 'bg-emerald-950/20 border-emerald-500/30'
                                          : 'bg-rose-950/20 border-rose-500/30'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-white">
                                          Câu {idx + 1}: {q.question}
                                        </span>
                                        <span
                                          className={`px-2 py-0.5 rounded-md font-mono font-bold uppercase text-[10px] ${
                                            isCorrect
                                              ? 'bg-emerald-500/20 text-emerald-300'
                                              : 'bg-rose-500/20 text-rose-300'
                                          }`}
                                        >
                                          {isCorrect ? '✓ Đúng' : '✗ Sai'}
                                        </span>
                                      </div>

                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] mb-2">
                                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                                          Số bạn đã nhập:{' '}
                                          <strong className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>
                                            {h?.userInput ? h.userInput : 'Chưa nhập'}
                                          </strong>
                                        </div>
                                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                                          Đáp án chuẩn:{' '}
                                          <strong className="text-emerald-400 font-mono">
                                            {q.acceptedAnswers[0]} {q.unit || ''}
                                          </strong>
                                        </div>
                                      </div>

                                      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] space-y-1">
                                        <span className="font-bold text-cyan-300 block">
                                          💡 Cách sửa & Lời giải chi tiết:
                                        </span>
                                        <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  ) : (
                    // LÀM BÀI TRẢ LỜI NGẮN TỪNG CÂU
                    <div>
                      <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono text-indigo-400 font-bold">
                            CÂU TRẢ LỜI NGẮN {saIndex + 1} / {saList.length}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono flex items-center gap-1">
                            <Dices className="w-3 h-3 text-indigo-400" />
                            Random 15/30 câu • Chỉ nhập số • Làm tròn chuẩn
                          </span>
                        </div>
                        <button
                          onClick={handleResetSA}
                          className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition-all border border-slate-700"
                          title="Lấy ngẫu nhiên 15 câu khác từ kho 30 câu"
                        >
                          <RotateCcw className="w-3 h-3 text-indigo-400" />
                          <span>Đổi đề ngẫu nhiên mới</span>
                        </button>
                      </div>

                      {(() => {
                        const q = saList[saIndex];
                        return (
                          <div>
                            <h4 className="text-base font-bold text-white mb-4 leading-relaxed">
                              {q.question}
                            </h4>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  value={saInput}
                                  onChange={(e) => {
                                    // Chỉ cho phép nhập số (0-9), dấu chấm/phẩy, dấu trừ
                                    const clean = e.target.value.replace(/[^0-9.,-]/g, '');
                                    setSaInput(clean);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCheckSA();
                                  }}
                                  placeholder="Chỉ nhập giá trị số (ví dụ: 31 hoặc 0.2)..."
                                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-400 transition-all"
                                />
                                {q.unit && (
                                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                                    {q.unit}
                                  </span>
                                )}
                              </div>

                              <button
                                onClick={handleCheckSA}
                                className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs tracking-wide cursor-pointer shadow-lg shadow-cyan-600/30 transition-all"
                              >
                                Kiểm tra đáp án
                              </button>
                            </div>

                            {/* Báo đúng/sai và cách sửa ngay sau khi chấm */}
                            {saSubmitted && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-2xl border mb-6 text-xs ${
                                  saIsCorrect
                                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                                }`}
                              >
                                <div className="flex items-center gap-2 font-bold text-sm mb-2">
                                  {saIsCorrect ? (
                                    <>
                                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                      <span className="text-emerald-300">
                                        Chính xác tuyệt vời! Bạn đã tính toán chuẩn xác.
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="w-5 h-5 text-rose-400" />
                                      <span className="text-rose-300">
                                        Chưa chính xác! Xem cách sửa và lời giải chi tiết bên dưới:
                                      </span>
                                    </>
                                  )}
                                </div>

                                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 space-y-1.5 mt-2">
                                  <div className="flex flex-wrap items-center gap-4 text-[11px]">
                                    <span>
                                      Số bạn nhập: <strong className={saIsCorrect ? 'text-emerald-400' : 'text-rose-400 font-mono'}>{saInput}</strong>
                                    </span>
                                    <span>
                                      Đáp án chuẩn: <strong className="text-emerald-400 font-mono">{q.acceptedAnswers[0]} {q.unit || ''}</strong>
                                    </span>
                                  </div>

                                  <div className="pt-2 border-t border-slate-800 text-[11px]">
                                    <strong className="text-cyan-300 block mb-1">
                                      💡 Cách sửa & Các bước tính toán chuẩn:
                                    </strong>
                                    <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                              {q.hint && (
                                <span className="text-xs text-slate-400 italic">
                                  Gợi ý: {q.hint}
                                </span>
                              )}
                              <button
                                onClick={handleNextSA}
                                className="ml-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
                              >
                                <span>
                                  {saIndex < saList.length - 1
                                    ? `Câu tiếp theo (Câu ${saIndex + 2}/15)`
                                    : 'Hoàn thành 15 câu & Xem kết quả'}
                                </span>
                                <ArrowRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Mini Test Modal */}
      {showMiniTest && (
        <MiniTestModal
          onClose={() => setShowMiniTest(false)}
          studentName={studentName}
          studentProfile={studentProfile}
        />
      )}

      {/* Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
      />
    </div>
  );
};
