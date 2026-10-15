import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StudentProfile, RegisteredStudent, GoogleSheetsConfig } from '../types/chemistry';
import { soundFX } from '../utils/soundEffects';
import { googleSheetsService } from '../services/googleSheetsService';
import { GoogleSheetsModal } from './GoogleSheetsModal';
import {
  Atom,
  Sparkles,
  User,
  GraduationCap,
  Hash,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  UserPlus,
  LogIn,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Users,
  Trophy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: (profile: StudentProfile) => void;
}

// Strict validation function for student's full name (Họ và tên)
export const validateFullName = (name: string): { isValid: boolean; message: string } => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { isValid: false, message: 'Vui lòng nhập Họ và tên của bạn.' };
  }

  if (trimmed.length < 4) {
    return { isValid: false, message: 'Họ và tên quá ngắn (tối thiểu 4 ký tự).' };
  }

  if (trimmed.length > 50) {
    return { isValid: false, message: 'Họ và tên không được vượt quá 50 ký tự.' };
  }

  if (/\d/.test(trimmed)) {
    return { isValid: false, message: 'Họ và tên không được chứa chữ số (0–9).' };
  }

  // Standard Vietnamese and Latin alphabetic characters
  const vietnameseNameRegex =
    /^[a-zA-ZàáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊẾỀỂỄỆÌÍỈĨỊÒÓỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÙÚỦŨỤƯỨỪỬỮỰỲÝỶỸỴĐ\s]+$/;
  if (!vietnameseNameRegex.test(trimmed)) {
    return {
      isValid: false,
      message: 'Họ và tên chỉ được chứa chữ cái tiếng Việt, không chứa ký tự đặc biệt.',
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return {
      isValid: false,
      message: 'Vui lòng nhập cả Họ và Tên (ít nhất 2 từ, ví dụ: Nguyễn Gia Huy).',
    };
  }

  const hasTooShortWord = words.some((w) => w.length < 2);
  if (hasTooShortWord) {
    return {
      isValid: false,
      message: 'Mỗi từ trong Họ và tên phải có ít nhất 2 ký tự (không viết tắt).',
    };
  }

  return { isValid: true, message: 'Họ và tên hợp lệ' };
};

const CLASS_OPTIONS = [
  { value: '10Ti', label: '10Ti (Chuyên Tin)' },
  { value: '10H', label: '10H (Chuyên Hóa)' },
  { value: '10T1', label: '10T1 (Chuyên Toán 1)' },
  { value: '10T2', label: '10T2 (Chuyên Toán 2)' },
  { value: '10L', label: '10L (Chuyên Lý)' },
  { value: '10S', label: '10S (Chuyên Sinh)' },
  { value: '10V', label: '10V (Chuyên Văn)' },
  { value: '10A1', label: '10A1 (Chuyên Anh 1)' },
  { value: '10A2', label: '10A2 (Chuyên Anh 2)' },
  { value: '10Su', label: '10Su (Chuyên Sử)' },
  { value: '10D', label: '10D (Chuyên Địa)' },
  { value: '10P', label: '10P (Chuyên Pháp)' },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Login Form States
  const [loginClass, setLoginClass] = useState('10Ti');
  const [loginStudentNo, setLoginStudentNo] = useState('');
  const [loginPin, setLoginPin] = useState('');

  // Register Form States
  const [regFullName, setRegFullName] = useState('');
  const [regClass, setRegClass] = useState('10Ti');
  const [regStudentNo, setRegStudentNo] = useState('');
  const [regPin, setRegPin] = useState('1234');
  const [regTouched, setRegTouched] = useState(false);

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState<RegisteredStudent[]>([]);
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig | null>(null);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);

  // Class filtering state
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');
  const [isRosterOpen, setIsRosterOpen] = useState<boolean>(true);

  // Load registered students & sheets config
  // Note: If an account is deleted directly from the sheet, reloading or clicking sync will fetch the new list and remove it!
  const reloadData = async () => {
    setIsSyncing(true);
    try {
      const cfg = googleSheetsService.getConfig();
      setSheetsConfig(cfg);
      const list = await googleSheetsService.fetchRegisteredStudents();
      setRegisteredStudents(list);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, []);

  // Group registered students by class
  const studentsByClass = useMemo(() => {
    const map = new Map<string, RegisteredStudent[]>();
    registeredStudents.forEach((st) => {
      const cls = st.className;
      if (!map.has(cls)) {
        map.set(cls, []);
      }
      map.get(cls)!.push(st);
    });
    // Sort students in each class by studentNo
    map.forEach((list) => {
      list.sort((a, b) => parseInt(a.studentNo, 10) - parseInt(b.studentNo, 10));
    });
    return map;
  }, [registeredStudents]);

  // List of unique classes currently having students
  const registeredClasses = useMemo(() => {
    return Array.from(studentsByClass.keys()).sort();
  }, [studentsByClass]);

  // Filtered classes according to selected filter
  const displayedClasses = useMemo(() => {
    if (selectedClassFilter === 'ALL') {
      return registeredClasses;
    }
    return registeredClasses.filter((c) => c === selectedClassFilter);
  }, [registeredClasses, selectedClassFilter]);

  // Validation for Registration Full Name
  const nameValidation = useMemo(() => {
    if (!regFullName) return null;
    return validateFullName(regFullName);
  }, [regFullName]);

  // Real-time duplicate check during registration typing
  const liveDuplicateWarning = useMemo(() => {
    if (mode !== 'register') return null;
    if (!regStudentNo.trim() && !regFullName.trim()) return null;

    const candSTT = parseInt(regStudentNo.trim(), 10);
    const candClass = regClass.trim().toLowerCase();
    const sameClass = registeredStudents.filter(
      (s) => s.className.trim().toLowerCase() === candClass
    );

    if (!isNaN(candSTT) && candSTT > 0) {
      const matchSTT = sameClass.find(
        (s) => parseInt(s.studentNo.trim(), 10) === candSTT
      );
      if (matchSTT) {
        return `⚠️ Số thứ tự ${regStudentNo} trong lớp ${regClass} đã được bạn "${matchSTT.fullName}" đăng ký!`;
      }
    }

    if (regFullName.trim().length >= 4) {
      const candName = regFullName.trim().toLowerCase();
      const matchName = sameClass.find(
        (s) => s.fullName.trim().toLowerCase() === candName
      );
      if (matchName) {
        return `⚠️ Họ tên "${regFullName.trim()}" đã có trong lớp ${regClass} (STT ${matchName.studentNo})!`;
      }
    }

    return null;
  }, [mode, regClass, regStudentNo, regFullName, registeredStudents]);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const sttNum = parseInt(loginStudentNo.trim(), 10);
    if (!loginStudentNo.trim() || isNaN(sttNum) || sttNum < 1 || sttNum > 60) {
      setErrorMsg('Vui lòng nhập Số thứ tự hợp lệ (từ 1 đến 60).');
      soundFX.playWrong();
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await googleSheetsService.loginStudent({
        className: loginClass,
        studentNo: loginStudentNo.trim(),
        pin: loginPin.trim() || undefined,
      });

      if (!result.success || !result.profile) {
        setErrorMsg(result.message);
        soundFX.playWrong();
        setIsSubmitting(false);
        return;
      }

      soundFX.playCorrect();
      setSuccessMsg(result.message);
      setTimeout(() => {
        onLogin(result.profile!);
      }, 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi đăng nhập. Vui lòng thử lại.');
      soundFX.playWrong();
      setIsSubmitting(false);
    }
  };

  // Handle Registration Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegTouched(true);
    setErrorMsg('');
    setSuccessMsg('');

    const validation = validateFullName(regFullName);
    if (!validation.isValid) {
      setErrorMsg(validation.message);
      soundFX.playWrong();
      return;
    }

    const sttNum = parseInt(regStudentNo.trim(), 10);
    if (!regStudentNo.trim() || isNaN(sttNum) || sttNum < 1 || sttNum > 60) {
      setErrorMsg('Vui lòng nhập Số thứ tự (STT) hợp lệ từ 1 đến 60.');
      soundFX.playWrong();
      return;
    }

    if (liveDuplicateWarning) {
      setErrorMsg(liveDuplicateWarning);
      soundFX.playWrong();
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await googleSheetsService.registerStudent({
        fullName: regFullName.trim(),
        className: regClass.trim(),
        studentNo: regStudentNo.trim(),
        pin: regPin.trim() || '1234',
      });

      if (!res.success) {
        setErrorMsg(res.message);
        soundFX.playWrong();
        setIsSubmitting(false);
        return;
      }

      soundFX.playFanfare();
      setSuccessMsg(
        `Đăng ký thành công! Vui lòng nhập Số thứ tự và Mã PIN để đăng nhập.`
      );
      await reloadData();

      // Pre-fill login class & stt for user convenience
      setLoginClass(regClass);
      setLoginStudentNo(regStudentNo);
      setLoginPin('');
      setMode('login');
      setIsSubmitting(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi khi đăng ký tài khoản.');
      soundFX.playWrong();
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative z-10 py-10">
      {/* Decorative cyber glowing circles */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20 animate-pulse" />

      {/* Top Banner: Google Sheets Sync status */}
      <div className="w-full max-w-2xl mb-4 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/75 border border-cyan-500/20 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300 truncate">
            {sheetsConfig ? (
              <>
                Sheet: <strong className="text-emerald-300">{sheetsConfig.spreadsheetName}</strong>
              </>
            ) : (
              'Google Sheets: Chưa kết nối'
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={reloadData}
            disabled={isSyncing}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
            title="Đồng bộ lại dữ liệu từ Google Sheets"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">Đồng bộ</span>
          </button>
          {sheetsConfig && (
            <a
              href={sheetsConfig.spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1"
              title="Mở Google Sheet"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsSheetsModalOpen(true)}
            className="px-2.5 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 font-semibold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
          >
            <span>Cài đặt Sheet</span>
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl space-y-6"
      >
        {/* MAIN LOGIN / REGISTER CARD */}
        <div className="relative rounded-2xl p-6 sm:p-8 glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 backdrop-blur-2xl">
          {/* Top laboratory badge */}
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <FlaskConical className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                  THPT Chuyên Hùng Vương - Hóa học 10
                </span>
                <span className="text-xs text-slate-400">Dự án nhóm 6 - 10Ti</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              ONLINE LAB
            </div>
          </div>

          {/* Title header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white mb-2 shadow-lg shadow-cyan-500/25">
              <Atom className="w-7 h-7 animate-spin-slow" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Bảng Tuần Hoàn & Chuyên Đề
            </h1>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 font-bold text-sm sm:text-base mt-0.5">
              Oxide & Hydroxide (GDPT 2018)
            </p>
          </div>

          {/* MODE SELECTOR TABS: ĐĂNG NHẬP / ĐĂNG KÝ */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900/90 border border-cyan-500/20 mb-5">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-md shadow-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>ĐĂNG NHẬP</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setMode('register');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>ĐĂNG KÝ TÀI KHOẢN</span>
            </button>
          </div>

          {/* Notification Banners */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="flex-1 leading-relaxed">{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 1: FORM ĐĂNG NHẬP */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Bảo mật tài khoản: Vui lòng chọn Lớp, nhập Số thứ tự và Mã PIN để đăng nhập. Chỉ sau khi đăng nhập, bạn mới có thể quản lý hoặc xóa tài khoản của chính mình.
                </span>
              </div>

              {/* Lớp & Số thứ tự */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    Lớp của bạn
                  </label>
                  <select
                    value={loginClass}
                    onChange={(e) => setLoginClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-medium"
                  >
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-cyan-400" />
                    Số thứ tự trong lớp
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={loginStudentNo}
                    onChange={(e) => {
                      setLoginStudentNo(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="VD: 06"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>
              </div>

              {/* Mã PIN / Mật khẩu */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    Mã PIN bảo mật
                  </span>
                  <span className="text-[11px] text-slate-400">Được lưu bí mật trong Sheet</span>
                </label>
                <input
                  type="password"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="Nhập mã PIN đã đăng ký (mặc định: 1234)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-medium font-mono"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:via-sky-400 hover:to-indigo-500 text-white shadow-cyan-500/25 hover:shadow-cyan-400/50 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Đang xác thực...' : 'Đăng nhập vào hệ thống'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          ) : (
            /* TAB 2: ĐĂNG KÝ TÀI KHOẢN */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  Chống trùng lặp tuyệt đối: Mỗi học sinh trong cùng một lớp phải có Họ tên và Số thứ tự riêng biệt. Mã PIN sẽ được lưu trữ trong một tab bảo mật ẩn riêng trên Google Sheet mà chỉ ứng dụng truy cập được.
                </span>
              </div>

              {/* Họ và tên */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    Họ và tên học sinh <span className="text-cyan-400">*</span>
                  </label>
                  {regFullName.trim().length > 0 && (
                    <span
                      className={`text-[11px] font-medium flex items-center gap-1 ${
                        nameValidation?.isValid ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {nameValidation?.isValid ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Hợp lệ
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5" />
                          Chưa đúng chuẩn
                        </>
                      )}
                    </span>
                  )}
                </div>

                <input
                  type="text"
                  value={regFullName}
                  onFocus={() => setRegTouched(true)}
                  onChange={(e) => {
                    setRegFullName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Ví dụ: Nguyễn Gia Huy (tối thiểu 2 từ, chỉ chữ tiếng Việt)"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none transition-all font-medium ${
                    regTouched && nameValidation && !nameValidation.isValid
                      ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/20'
                      : nameValidation?.isValid
                      ? 'border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20'
                      : 'border-slate-700 focus:border-cyan-400'
                  }`}
                />
                <div className="mt-1 text-[11px] text-slate-400">
                  {regTouched && nameValidation && !nameValidation.isValid ? (
                    <span className="text-rose-400">{nameValidation.message}</span>
                  ) : (
                    'Chữ cái tiếng Việt, viết hoa chữ cái đầu, không chứa số/kí tự đặc biệt'
                  )}
                </div>
              </div>

              {/* Lớp & STT */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
                    Lớp đăng ký
                  </label>
                  <select
                    value={regClass}
                    onChange={(e) => setRegClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-medium"
                  >
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-indigo-400" />
                    Số thứ tự trong lớp <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={regStudentNo}
                    onChange={(e) => {
                      setRegStudentNo(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="VD: 15"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-medium"
                  />
                </div>
              </div>

              {/* Live Duplicate Warning */}
              {liveDuplicateWarning && (
                <div className="p-2.5 rounded-lg bg-amber-950/70 border border-amber-500/50 text-amber-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{liveDuplicateWarning}</span>
                </div>
              )}

              {/* Mã PIN bảo vệ */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    Đặt mã PIN bảo mật cá nhân
                  </span>
                  <span className="text-[11px] text-slate-400">Gợi ý: 1234</span>
                </label>
                <input
                  type="text"
                  value={regPin}
                  onChange={(e) => setRegPin(e.target.value)}
                  placeholder="Nhập 4-8 ký tự mã PIN"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 font-medium font-mono"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Mã PIN này được lưu ở trang bảo mật ẩn riêng trên Google Sheet, không hiện ở bảng điểm công khai.
                </p>
              </div>

              {/* Register Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || !!liveDuplicateWarning}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 hover:from-indigo-400 hover:to-pink-500 text-white shadow-indigo-500/25 disabled:opacity-50"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Đang lưu vào Sheet...' : 'Xác nhận Đăng ký tài khoản'}</span>
              </motion.button>
            </form>
          )}
        </div>

        {/* SECTION: DANH SÁCH TÀI KHOẢN ĐÃ ĐĂNG KÝ (PHÂN THEO LỚP - CHẾ ĐỘ XEM AN TOÀN) */}
        <div className="relative rounded-2xl p-5 sm:p-6 bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Danh Sách Học Sinh Đã Đăng Ký
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
                    {registeredStudents.length} học sinh
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Phân chia theo lớp • Điểm kỷ lục • Đăng nhập bằng STT & PIN cá nhân để làm bài hoặc quản lý tài khoản
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={reloadData}
                disabled={isSyncing}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Tải lại từ Google Sheets (Xóa trên Sheet sẽ cập nhật ngay tại đây)"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                <span className="hidden sm:inline">Làm mới</span>
              </button>
              <button
                type="button"
                onClick={() => setIsRosterOpen((prev) => !prev)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={isRosterOpen ? 'Thu gọn' : 'Mở rộng'}
              >
                {isRosterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isRosterOpen && (
            <div className="mt-4 space-y-4">
              {/* Class Filter Chips */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-[11px] text-slate-400 mr-1">Lọc theo lớp:</span>
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedClassFilter('ALL');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedClassFilter === 'ALL'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Tất cả ({registeredStudents.length})
                </button>
                {registeredClasses.map((cls) => {
                  const count = studentsByClass.get(cls)?.length || 0;
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setSelectedClassFilter(cls);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedClassFilter === cls
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                      }`}
                    >
                      Lớp {cls} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Roster grouped by class (View-only for privacy & security) */}
              {registeredStudents.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/50 rounded-xl border border-slate-800">
                  Chưa có tài khoản nào được đăng ký trong hệ thống.
                </div>
              ) : (
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                  {displayedClasses.map((cls) => {
                    const students = studentsByClass.get(cls) || [];
                    const classMeta = CLASS_OPTIONS.find((c) => c.value === cls);
                    const classLabel = classMeta ? classMeta.label : `Lớp ${cls}`;

                    return (
                      <div
                        key={cls}
                        className="rounded-xl border border-slate-800 bg-slate-950/70 overflow-hidden"
                      >
                        {/* Class Header */}
                        <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wide">
                              {classLabel}
                            </h4>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {students.length} tài khoản
                          </span>
                        </div>

                        {/* Students in this Class */}
                        <div className="divide-y divide-slate-800/60">
                          {students.map((st) => (
                            <div
                              key={`${st.className}_${st.studentNo}`}
                              className="p-3 hover:bg-slate-900/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs text-amber-300 shrink-0">
                                  {st.studentNo}
                                </span>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-white">
                                      {st.fullName}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px]">
                                    {/* High scores badges */}
                                    <span
                                      className="px-1.5 py-0.5 rounded bg-sky-950/80 border border-sky-500/30 text-sky-300 font-mono"
                                      title="Số câu Trắc nghiệm đúng cao nhất"
                                    >
                                      TN: {st.maxMcCorrect !== undefined ? `${st.maxMcCorrect}/15` : '0/15'}
                                    </span>
                                    <span
                                      className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 font-mono"
                                      title="Số câu Đúng/Sai đạt cao nhất"
                                    >
                                      Đ/S: {st.maxTfCorrect !== undefined ? `${st.maxTfCorrect}/4` : '0/4'}
                                    </span>
                                    <span
                                      className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 font-mono"
                                      title="Số câu Trả lời ngắn đúng cao nhất"
                                    >
                                      TLN: {st.maxSaCorrect !== undefined ? `${st.maxSaCorrect}/3` : '0/3'}
                                    </span>
                                    <span
                                      className="px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-purple-300 font-mono font-bold flex items-center gap-1"
                                      title="Điểm kiểm tra cao nhất thang 10"
                                    >
                                      <Trophy className="w-3 h-3 text-amber-400" />
                                      KT: {st.maxTestScore10 !== undefined ? `${st.maxTestScore10} đ` : 'Chưa thi'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        onConfigChanged={(cfg) => setSheetsConfig(cfg)}
      />
    </div>
  );
};
