import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './components/ParticleBackground';
import { LoginScreen } from './components/LoginScreen';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementModal } from './components/ElementModal';
import { ScrollTransitionBanner } from './components/ScrollTransitionBanner';
import { OxideHydroxideModule } from './components/OxideHydroxideModule';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { StudentProfile, ChemicalElement } from './types/chemistry';
import { soundFX } from './utils/soundEffects';
import { googleSheetsService } from './services/googleSheetsService';
import {
  Atom,
  FlaskConical,
  ChevronDown,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  LogOut,
  Sliders,
  FileSpreadsheet,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

export default function App() {
  // Student Profile state
  const [student, setStudent] = useState<StudentProfile | null>(null);

  // App page state: 'table' or 'oxide-hydroxide'
  const [currentPage, setCurrentPage] = useState<'table' | 'oxide-hydroxide'>('table');

  // Selected element for 6-8x zoom modal
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);

  // Scroll transition progress (0: full periodic table -> 1: full topic banner)
  const [scrollProgress, setScrollProgress] = useState(0);

  // Google Sheets Modal State
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);

  // Delete own account modal state (only logged in student can delete their own account)
  const [isDeleteSelfModalOpen, setIsDeleteSelfModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle scroll / wheel in table page to trigger the special fade-out & scale-down transition
  useEffect(() => {
    if (!student || currentPage !== 'table') return;

    let targetProgress = 0;

    const handleWheel = (e: WheelEvent) => {
      // If modal is open, don't scroll transition
      if (selectedElement) return;

      // Requires scrolling deeper with finer increments (deliberate scroll action)
      if (e.deltaY > 0) {
        targetProgress = Math.min(1, targetProgress + 0.08);
      } else if (e.deltaY < 0) {
        targetProgress = Math.max(0, targetProgress - 0.08);
      }
      setScrollProgress(targetProgress);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [student, currentPage, selectedElement]);

  const handleLogin = (profile: StudentProfile) => {
    setStudent(profile);
  };

  const handleLogout = () => {
    soundFX.playClick();
    setStudent(null);
    setCurrentPage('table');
    setScrollProgress(0);
    setSelectedElement(null);
  };

  const handleConfirmDeleteSelf = async () => {
    if (!student) return;
    setIsDeleting(true);
    soundFX.playClick();
    try {
      await googleSheetsService.deleteStudent(student.className, student.studentNo);
      soundFX.playFanfare();
      setIsDeleteSelfModalOpen(false);
      handleLogout();
    } catch (err) {
      console.warn('Failed to delete student:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEnterTopic = () => {
    soundFX.playFanfare();
    setCurrentPage('oxide-hydroxide');
    setScrollProgress(0);
  };

  const handleBackToTable = () => {
    soundFX.playClick();
    setCurrentPage('table');
    setScrollProgress(0);
  };

  return (
    <div className="relative min-h-screen text-slate-100 bg-slate-950 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Animated Particle & Molecule Background Canvas */}
      <ParticleBackground />

      {/* Main Container */}
      {!student ? (
        /* STEP 1: LOGIN SCREEN */
        <LoginScreen onLogin={handleLogin} />
      ) : currentPage === 'table' ? (
        /* STEP 2 & 3: PERIODIC TABLE WITH SCROLL TRANSITION */
        <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
          {/* Top Cyber Header */}
          <header className="relative z-20 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-cyan-500/15 bg-slate-950/70 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/25">
                <Atom className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                  Bảng Tuần Hoàn Nguyên Tố Hóa Học
                  <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono">
                    118 IUPAC
                  </span>
                </h1>
              </div>
            </div>

            {/* Right student profile & actions */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-white">
                  {student.fullName}
                </span>
                <span className="text-[11px] text-cyan-400 font-mono">
                  {student.className} • STT: {student.studentNo}
                </span>
              </div>

              {/* Google Sheets status button */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsSheetsModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow transition-all"
                title="Quản lý Google Sheets & Bảng điểm"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Google Sheets</span>
              </button>

              {/* Direct switch to Oxide/Hydroxide module */}
              <button
                onClick={handleEnterTopic}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Chuyên đề học tập</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Delete own account button (only available when logged in) */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsDeleteSelfModalOpen(true);
                }}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition-all cursor-pointer"
                title="Xóa tài khoản của tôi"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
              </button>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
                title="Đăng xuất / Đổi học sinh"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* PERIODIC TABLE WRAPPER WITH SPECIAL TRANSITION:
              Bảng tuần hoàn ĐỨNG YÊN, KHÔNG trượt lên trên, từ từ MỜ DẦN và PHÓNG THU NHỎ nhẹ
          */}
          <main
            className="flex-1 flex flex-col items-center justify-center py-6 px-2 sm:px-4 relative z-10 transition-all duration-300 origin-center"
            style={{
              opacity: scrollProgress <= 0.35 ? 1 : Math.max(0, 1 - (scrollProgress - 0.35) * 1.5),
              transform: `scale(${1 - (scrollProgress <= 0.35 ? 0 : (scrollProgress - 0.35) * 0.1)})`,
              filter: `blur(${scrollProgress <= 0.35 ? 0 : (scrollProgress - 0.35) * 8}px)`,
              pointerEvents: scrollProgress > 0.55 ? 'none' : 'auto',
            }}
          >
            {/* Center Scroll Transition Instruction Banner */}
            <ScrollTransitionBanner progress={scrollProgress} onEnterTopic={handleEnterTopic} />

            {/* Standard 118-Element Grid with Zoom Modal Trigger */}
            <div className="w-full max-w-[1450px] mx-auto overflow-x-auto pb-4">
              <PeriodicTable
                onSelectElement={(element) => setSelectedElement(element)}
                activeElement={selectedElement}
              />
            </div>
          </main>

          {/* Bottom helper bar showing transition progress slider */}
          <footer className="relative z-20 w-full px-6 py-2.5 bg-slate-950/80 border-t border-cyan-500/10 flex items-center justify-between text-xs text-slate-400 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Cuộn chuột hoặc kéo thanh trượt để chuyển sang Chuyên đề</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[11px]">Tiến trình chuyển cảnh:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={scrollProgress}
                onChange={(e) => setScrollProgress(parseFloat(e.target.value))}
                className="w-28 sm:w-36 accent-cyan-400 cursor-pointer"
              />
              {scrollProgress > 0 && (
                <button
                  onClick={() => setScrollProgress(0)}
                  className="text-[11px] text-cyan-400 hover:underline cursor-pointer"
                >
                  Đặt lại
                </button>
              )}
            </div>
          </footer>

          {/* 6-8x Zoom Element Detail Modal */}
          <ElementModal
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
          />
        </div>
      ) : (
        /* STEP 4 & 5: MODULE "OXIDE VÀ HYDROXIDE" (THEORY, EXAMPLES, PRACTICE, MINI TEST) */
        <OxideHydroxideModule
          onBackToTable={handleBackToTable}
          studentName={student.fullName}
          studentProfile={student}
          onDeleteSelf={() => setIsDeleteSelfModalOpen(true)}
        />
      )}

      {/* Global Google Sheets Modal */}
      <GoogleSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
      />

      {/* CONFIRMATION MODAL: XÓA CHÍNH TÀI KHOẢN KHI ĐÃ ĐĂNG NHẬP */}
      <AnimatePresence>
        {isDeleteSelfModalOpen && student && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              onClick={() => !isDeleting && setIsDeleteSelfModalOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl p-6 z-10 text-white"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Xác nhận xóa tài khoản của bạn?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Bạn đang thực hiện xóa chính tài khoản của mình. Toàn bộ thông tin tài khoản, điểm số và mã PIN bảo mật sẽ bị xóa vĩnh viễn khỏi hệ thống và bảng tính Google Sheet.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 mb-5">
                <div className="text-slate-300">
                  Họ và tên: <strong className="text-white">{student.fullName}</strong>
                </div>
                <div className="text-slate-300">
                  Lớp: <strong className="text-cyan-300">{student.className}</strong> • Số thứ tự: <strong className="text-amber-300">{student.studentNo}</strong>
                </div>
              </div>

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsDeleteSelfModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleConfirmDeleteSelf}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-600/30 cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isDeleting ? 'Đang xóa...' : 'Xác nhận Xóa tài khoản của tôi'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
