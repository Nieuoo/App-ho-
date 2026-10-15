import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChemicalElement } from '../types/chemistry';
import { CATEGORY_LABELS } from '../data/elementsData';
import { SolarSystemAtom } from './SolarSystemAtom';
import { soundFX } from '../utils/soundEffects';
import { X, Sparkles, Flame, Layers, Compass, Sun, FlaskConical, Atom } from 'lucide-react';

interface ElementModalProps {
  element: ChemicalElement | null;
  onClose: () => void;
}

export const ElementModal: React.FC<ElementModalProps> = ({ element, onClose }) => {
  const [activeTab, setActiveTab] = useState<'solar' | 'properties'>('solar');

  if (!element) return null;

  const catInfo = CATEGORY_LABELS[element.category];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop blur & darken */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal dialog enlarged ~6-8x with cyber styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.25, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.25, y: 40 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 280,
            mass: 0.9,
          }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col my-auto rounded-3xl bg-slate-900/95 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/80 overflow-hidden z-10 text-white"
        >
          {/* Header glowing background line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-500 z-20" />

          {/* Close button */}
          <button
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer z-30 group"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>

          {/* Scrollable Content Container */}
          <div className="p-5 sm:p-7 overflow-y-auto max-h-[calc(92vh-10px)] custom-scrollbar">
            {/* Top row: Massive Element Tile & Core Identity */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-5 border-b border-slate-800">
              {/* Massive Element Square */}
              <motion.div
                initial={{ scale: 0.6, rotate: -6 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.05, type: 'spring', stiffness: 300 }}
                className={`w-32 h-32 sm:w-36 sm:h-36 rounded-2xl p-3.5 flex flex-col justify-between items-center text-center border-2 shadow-2xl ${element.colorScheme.bg} ${element.colorScheme.border} relative overflow-hidden shrink-0`}
              >
                {/* Glowing corner gradient */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl pointer-events-none" />

                <div className="w-full flex justify-between items-center text-xs font-mono text-slate-300 font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[11px]">
                    Z={element.z}
                  </span>
                  <span className="text-[10px] text-slate-400">{element.atomicMass}</span>
                </div>

                <div className="my-auto">
                  <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tighter ${element.colorScheme.text}`}>
                    {element.symbol}
                  </span>
                </div>

                <div className="w-full">
                  <div className="text-xs font-bold text-white truncate">{element.nameVi}</div>
                  <div className="text-[10px] text-slate-400 font-mono italic">{element.nameIupac}</div>
                </div>
              </motion.div>

              {/* Identity & Basic Specs */}
              <div className="flex-1 w-full text-center sm:text-left">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${catInfo.color}`}>
                      {catInfo.label}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-800 border border-slate-700 text-cyan-300">
                      Chu kỳ {element.period} • Nhóm {element.groupLabel} ({element.group})
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-950/60 border border-amber-500/40 text-amber-300">
                      {element.metallicCharacter}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {element.nameVi}{' '}
                    <span className="text-base font-mono font-medium text-slate-400">({element.nameIupac})</span>
                  </h2>

                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    {catInfo.desc}
                  </p>
                </motion.div>

                {/* Staggered Quick Metric Badges */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3"
                >
                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <span className="text-[9px] text-slate-400 block">Độ âm điện</span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {element.electronegativity ?? '—'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <span className="text-[9px] text-slate-400 block">Bán kính nguyên tử</span>
                    <span className="text-xs font-mono font-bold text-sky-300">
                      {element.atomicRadius ? `${element.atomicRadius} pm` : '—'}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <span className="text-[9px] text-slate-400 block">Oxide cao nhất</span>
                    <span className="text-xs font-mono font-bold text-amber-300 truncate block">
                      {element.highestOxide}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
                    <span className="text-[9px] text-slate-400 block">Hydroxide tương ứng</span>
                    <span className="text-xs font-mono font-bold text-emerald-300 truncate block">
                      {element.highestHydroxide}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* MAIN NAVIGATION TABS: Solar System Model vs Chemical Properties */}
            <div className="flex items-center gap-2 mt-4 p-1 rounded-2xl bg-slate-950/70 border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('solar');
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'solar'
                    ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-cyan-500/20 border border-amber-400/50 text-amber-300 shadow-md shadow-amber-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sun className={`w-4 h-4 ${activeTab === 'solar' ? 'text-amber-400 animate-spin-slow' : ''}`} />
                <span>Mô hình Hệ Mặt Trời (Rutherford - Bohr)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setActiveTab('properties');
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'properties'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/50 text-cyan-300 shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span>Chuyên đề Oxide - Hydroxide & Tính chất</span>
              </button>
            </div>

            {/* TAB CONTENT 1: SOLAR SYSTEM ATOMIC MODEL */}
            {activeTab === 'solar' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <SolarSystemAtom element={element} />
              </motion.div>
            )}

            {/* TAB CONTENT 2: OXIDE, HYDROXIDE & DETAILS */}
            {activeTab === 'properties' && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-5"
              >
                {/* Electron Configuration */}
                <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/70">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    Cấu hình electron nguyên tử:
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-slate-950/80 border border-cyan-500/20 font-mono text-sm sm:text-base text-cyan-300 font-semibold tracking-wide flex items-center justify-between">
                    <span>{element.electronConfig}</span>
                    <span className="text-[11px] font-normal text-slate-400">
                      {element.period} lớp e • Z={element.z}
                    </span>
                  </div>
                </div>

                {/* Oxide & Hydroxide Cards */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    Chuyên đề Hóa 10: Hợp chất Oxide cao nhất & Hydroxide tương ứng
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Highest Oxide Card */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-slate-900/80 border border-amber-500/30 hover:border-amber-400/50 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          Oxide cao nhất:
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/70 border border-amber-500/40 text-amber-200">
                          {element.oxideNature}
                        </span>
                      </div>
                      <div className="text-2xl font-mono font-bold text-white my-1">
                        {element.highestOxide}
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        Hóa trị cao nhất với Oxygen bằng số thứ tự nhóm A ({element.groupLabel}).
                      </p>
                    </div>

                    {/* Corresponding Hydroxide Card */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          Hydroxide tương ứng:
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/40 text-cyan-200">
                          {element.hydroxideNature}
                        </span>
                      </div>
                      <div className="text-2xl font-mono font-bold text-white my-1">
                        {element.highestHydroxide}
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        {element.metallicCharacter.includes('Kim loại')
                          ? 'Tồn tại dạng base M(OH)ₙ'
                          : element.metallicCharacter.includes('Á kim') || element.metallicCharacter.includes('Phi kim')
                          ? 'Tồn tại dạng oxoacid (acid có oxy)'
                          : 'Không tạo hợp chất'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Applications & Fun Fact */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1">
                      <Compass className="w-3.5 h-3.5 text-sky-400" />
                      Ứng dụng thực tế tiêu biểu:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {element.applications}
                    </p>
                  </div>

                  {element.funFact && (
                    <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
                      <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        Sự thật hóa học thú vị:
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {element.funFact}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Bottom action bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className="text-[11px] font-mono text-slate-400">
                Nhấn [Esc] hoặc bấm vùng bên ngoài để đóng
              </span>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-cyan-900/40 cursor-pointer"
              >
                Đóng chi tiết
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
