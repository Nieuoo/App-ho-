import React from 'react';
import { motion } from 'motion/react';
import { soundFX } from '../utils/soundEffects';
import { Flame, Sparkles, ArrowRight, BookOpen, Compass, ChevronDown } from 'lucide-react';

interface ScrollTransitionBannerProps {
  progress: number; // 0 (full periodic table) to 1 (full topic banner)
  onEnterTopic: () => void;
}

export const ScrollTransitionBanner: React.FC<ScrollTransitionBannerProps> = ({
  progress,
  onEnterTopic,
}) => {
  // The banner now requires scrolling down deeper (progress > 0.5) to become visible
  const isBannerVisible = progress >= 0.55;
  const bannerOpacity = progress <= 0.45 ? 0 : Math.min(1, (progress - 0.45) / 0.5);

  const handleClick = () => {
    soundFX.playFanfare();
    onEnterTopic();
  };

  return (
    <div
      className={`fixed inset-0 z-30 flex items-center justify-center p-4 transition-all duration-300 ${
        isBannerVisible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity: bannerOpacity,
        transform: `scale(${0.9 + bannerOpacity * 0.1})`,
      }}
    >
      <div className="w-full max-w-2xl relative rounded-3xl p-8 sm:p-12 glass-panel border-2 border-cyan-400/50 shadow-2xl shadow-cyan-900/60 text-center overflow-hidden">
        {/* Glow corner decorations */}
        <div className="absolute -top-20 -left-20 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold mb-6 shadow-inner">
            <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
            CHUYÊN ĐỀ HỌC TẬP
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Chuyên đề:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Oxide và Hydroxide
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            Khám phá quy luật biến đổi tính acid – base trong chu kỳ và nhóm A, công thức tổng quát, các ví dụ mẫu sinh động và ngân hàng bài tập luyện tập chuyên sâu!
          </p>

          {/* Module cards preview */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-md mb-8 text-left">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-cyan-500/30 flex flex-col items-center text-center">
              <span className="text-xl mb-1">📘</span>
              <span className="text-xs font-bold text-white">Lý thuyết</span>
              <span className="text-[10px] text-slate-400">Infographic CK3</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-sky-500/30 flex flex-col items-center text-center">
              <span className="text-xl mb-1">📗</span>
              <span className="text-xs font-bold text-white">Ví dụ</span>
              <span className="text-[10px] text-slate-400">Phân tích 4 mẫu</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/30 flex flex-col items-center text-center">
              <span className="text-xl mb-1">📙</span>
              <span className="text-xs font-bold text-white">Bài tập</span>
              <span className="text-[10px] text-slate-400">4 Dạng + Mini Test</span>
            </div>
          </div>

          {/* Action button */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:via-sky-400 hover:to-indigo-500 text-white font-extrabold text-base tracking-wide shadow-xl shadow-cyan-500/30 flex items-center gap-3 cursor-pointer group"
          >
            <span>Vào học chuyên đề ngay</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
