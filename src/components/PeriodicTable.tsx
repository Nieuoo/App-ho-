import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChemicalElement, ElementCategory } from '../types/chemistry';
import { ELEMENTS, CATEGORY_LABELS } from '../data/elementsData';
import { soundFX } from '../utils/soundEffects';
import { Search, Filter, Sparkles, Layers, Info, Check, Sun } from 'lucide-react';

interface PeriodicTableProps {
  onSelectElement: (element: ChemicalElement) => void;
  activeElement: ChemicalElement | null;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({
  onSelectElement,
  activeElement,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>('all');
  const [hoveredZ, setHoveredZ] = useState<number | null>(null);

  // Group columns headers (1 to 18)
  const groupHeaders = [
    { num: 1, label: 'IA' },
    { num: 2, label: 'IIA' },
    { num: 3, label: 'IIIB' },
    { num: 4, label: 'IVB' },
    { num: 5, label: 'VB' },
    { num: 6, label: 'VIB' },
    { num: 7, label: 'VIIB' },
    { num: 8, label: 'VIIIB' },
    { num: 9, label: 'VIIIB' },
    { num: 10, label: 'VIIIB' },
    { num: 11, label: 'IB' },
    { num: 12, label: 'IIB' },
    { num: 13, label: 'IIIA' },
    { num: 14, label: 'IVA' },
    { num: 15, label: 'VA' },
    { num: 16, label: 'VIA' },
    { num: 17, label: 'VIIA' },
    { num: 18, label: 'VIIIA' },
  ];

  // Map elements by grid coordinate
  const elementMap = useMemo(() => {
    const map = new Map<string, ChemicalElement>();
    ELEMENTS.forEach((el) => {
      // For lanthanides (57-71) & actinides (89-103), they will be placed in rows 8 & 9
      if (el.category === 'lanthanide') {
        const col = el.z - 57 + 3; // Col 3 to 17
        map.set(`8-${col}`, el);
      } else if (el.category === 'actinide') {
        const col = el.z - 89 + 3; // Col 3 to 17
        map.set(`9-${col}`, el);
      } else {
        map.set(`${el.period}-${el.group}`, el);
      }
    });
    return map;
  }, []);

  // Filtered matching elements
  const isElementMatched = (el: ChemicalElement) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      el.symbol.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      el.nameVi.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      el.nameIupac.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      el.z.toString() === searchTerm.trim();

    const matchesCategory =
      selectedCategory === 'all' || el.category === selectedCategory;

    return matchesSearch && matchesCategory;
  };

  const handleElementClick = (el: ChemicalElement) => {
    soundFX.playSelectElement();
    onSelectElement(el);
  };

  const handleElementHover = (el: ChemicalElement) => {
    setHoveredZ(el.z);
    soundFX.playClick();
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Top Search & Filter toolbar */}
      <div className="w-full max-w-7xl px-4 mb-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, ký hiệu (Na, Cl), số Z (11)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category selector */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-750 border border-slate-700'
            }`}
          >
            Tất cả (118)
          </button>
          {Object.entries(CATEGORY_LABELS).map(([catKey, info]) => (
            <button
              key={catKey}
              onClick={() => setSelectedCategory(catKey as ElementCategory)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategory === catKey
                  ? 'bg-cyan-900/80 text-cyan-200 border-cyan-400 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              {info.label.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Solar System Model Exploration Banner */}
      <div className="w-full max-w-7xl px-4 mb-3">
        <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-950/40 via-cyan-950/40 to-slate-900/60 border border-amber-500/30 flex items-center justify-between gap-3 text-xs shadow-lg shadow-amber-950/10">
          <div className="flex items-center gap-2.5 text-amber-200">
            <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-300">
              <Sun className="w-4 h-4 animate-spin-slow" />
            </div>
            <span>
              <strong>Khám phá mới:</strong> Bấm vào bất kỳ nguyên tố nào để xem{' '}
              <span className="text-amber-400 font-bold">Mô hình Hệ Mặt Trời (Rutherford - Bohr)</span> với các electron chuyển động quanh hạt nhân và số e từng lớp!
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2.5 py-1 rounded-lg shrink-0">
            118 Nguyên tố chuẩn IUPAC
          </span>
        </div>
      </div>

      {/* Main Periodic Table Container (occupying ~80-85% screen width) */}
      <div className="w-full max-w-[94vw] xl:max-w-[85vw] p-4 sm:p-6 rounded-3xl glass-panel border border-cyan-500/20 shadow-2xl overflow-x-auto relative">
        <div className="min-w-[1040px] flex flex-col gap-1.5">
          {/* Header Row: Groups 1-18 */}
          <div className="grid grid-cols-[36px_repeat(18,1fr)] gap-1 text-center font-mono text-[10px] text-slate-400 pb-1">
            <div className="text-slate-500 font-bold">CK\N</div>
            {groupHeaders.map((grp) => (
              <div
                key={grp.num}
                className="py-0.5 rounded bg-slate-900/40 border border-slate-800/50 flex flex-col justify-center"
              >
                <span className="font-bold text-cyan-400">{grp.label}</span>
                <span className="text-[9px] text-slate-400">{grp.num}</span>
              </div>
            ))}
          </div>

          {/* Periods 1 to 7 */}
          {[1, 2, 3, 4, 5, 6, 7].map((period) => (
            <div
              key={period}
              className="grid grid-cols-[36px_repeat(18,1fr)] gap-1 items-stretch"
            >
              {/* Period number indicator */}
              <div className="flex items-center justify-center font-mono font-bold text-xs text-cyan-400 bg-slate-900/60 rounded border border-slate-800/60">
                {period}
              </div>

              {/* Columns 1 to 18 */}
              {Array.from({ length: 18 }, (_, colIdx) => colIdx + 1).map((col) => {
                // Placeholder for Lanthanide placeholder cell at (6, 3)
                if (period === 6 && col === 3) {
                  return (
                    <div
                      key={`placeholder-6-3`}
                      className="p-1 rounded-lg border border-dashed border-fuchsia-500/40 bg-fuchsia-950/20 flex flex-col items-center justify-center text-center text-[10px] text-fuchsia-300 font-mono"
                    >
                      <span className="text-[9px]">57-71</span>
                      <span className="font-bold">La-Lu</span>
                      <span className="text-[8px] text-fuchsia-400/80">Lantan</span>
                    </div>
                  );
                }

                // Placeholder for Actinide placeholder cell at (7, 3)
                if (period === 7 && col === 3) {
                  return (
                    <div
                      key={`placeholder-7-3`}
                      className="p-1 rounded-lg border border-dashed border-pink-500/40 bg-pink-950/20 flex flex-col items-center justify-center text-center text-[10px] text-pink-300 font-mono"
                    >
                      <span className="text-[9px]">89-103</span>
                      <span className="font-bold">Ac-Lr</span>
                      <span className="text-[8px] text-pink-400/80">Actini</span>
                    </div>
                  );
                }

                const el = elementMap.get(`${period}-${col}`);

                if (!el) {
                  return <div key={`empty-${period}-${col}`} className="w-full" />;
                }

                const matched = isElementMatched(el);
                const isHovered = hoveredZ === el.z;

                return (
                  <motion.button
                    key={el.z}
                    onClick={() => handleElementClick(el)}
                    onMouseEnter={() => handleElementHover(el)}
                    onMouseLeave={() => setHoveredZ(null)}
                    whileHover={{ scale: 1.09, zIndex: 30 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-1 rounded-lg text-left transition-all duration-150 flex flex-col justify-between cursor-pointer border ${
                      el.colorScheme.bg
                    } ${
                      isHovered
                        ? 'border-cyan-300 ring-2 ring-cyan-400/60 shadow-lg shadow-cyan-500/30'
                        : el.colorScheme.border
                    } ${
                      !matched
                        ? 'opacity-20 grayscale pointer-events-none'
                        : 'opacity-100 hover:shadow-cyan-500/20'
                    }`}
                    style={{ minHeight: '58px' }}
                  >
                    {/* Z & A row */}
                    <div className="flex justify-between items-start text-[9px] font-mono leading-none">
                      <span className="font-bold text-slate-300">{el.z}</span>
                      <span className="text-[8px] text-slate-400 truncate max-w-[28px]">
                        {Math.round(el.atomicMass * 10) / 10}
                      </span>
                    </div>

                    {/* Chemical Symbol */}
                    <div className="text-center my-auto">
                      <span
                        className={`text-base sm:text-lg font-black font-mono tracking-tight leading-none ${el.colorScheme.text}`}
                      >
                        {el.symbol}
                      </span>
                    </div>

                    {/* Vietnamese Name */}
                    <div className="text-[8px] leading-tight text-slate-300 font-medium truncate text-center w-full">
                      {el.nameVi}
                    </div>

                    {/* Mini hover floating molecule particle effect */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -10 }}
                        className="absolute -top-4 right-0 px-1 py-0.5 rounded bg-cyan-900 border border-cyan-400 text-[8px] font-mono text-cyan-200 pointer-events-none shadow"
                      >
                        {el.highestOxide}
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}

          {/* Spacer between main table and rare earth series */}
          <div className="h-4 flex items-center justify-center">
            <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          </div>

          {/* Row 8: Lanthanides (57 to 71) */}
          <div className="grid grid-cols-[36px_repeat(18,1fr)] gap-1 items-stretch">
            <div className="flex items-center justify-center font-mono font-bold text-[9px] text-fuchsia-400 bg-fuchsia-950/40 rounded border border-fuchsia-800/40 col-span-3">
              Họ Lantan (4f)
            </div>
            {Array.from({ length: 15 }, (_, i) => i + 3).map((col) => {
              const el = elementMap.get(`8-${col}`);
              if (!el) return <div key={`empty-8-${col}`} />;
              const matched = isElementMatched(el);
              const isHovered = hoveredZ === el.z;

              return (
                <motion.button
                  key={el.z}
                  onClick={() => handleElementClick(el)}
                  onMouseEnter={() => handleElementHover(el)}
                  onMouseLeave={() => setHoveredZ(null)}
                  whileHover={{ scale: 1.09, zIndex: 30 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-1 rounded-lg text-left transition-all duration-150 flex flex-col justify-between cursor-pointer border ${
                    el.colorScheme.bg
                  } ${
                    isHovered
                      ? 'border-fuchsia-300 ring-2 ring-fuchsia-400/60 shadow-lg'
                      : el.colorScheme.border
                  } ${
                    !matched ? 'opacity-20 grayscale pointer-events-none' : 'opacity-100'
                  }`}
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex justify-between items-start text-[9px] font-mono leading-none">
                    <span className="font-bold text-slate-300">{el.z}</span>
                    <span className="text-[8px] text-slate-400 truncate max-w-[28px]">
                      {Math.round(el.atomicMass)}
                    </span>
                  </div>
                  <div className="text-center my-auto">
                    <span className="text-base font-black font-mono tracking-tight leading-none text-fuchsia-300">
                      {el.symbol}
                    </span>
                  </div>
                  <div className="text-[8px] leading-tight text-slate-300 truncate text-center w-full">
                    {el.nameVi}
                  </div>
                </motion.button>
              );
            })}
            <div className="col-span-1" />
          </div>

          {/* Row 9: Actinides (89 to 103) */}
          <div className="grid grid-cols-[36px_repeat(18,1fr)] gap-1 items-stretch">
            <div className="flex items-center justify-center font-mono font-bold text-[9px] text-pink-400 bg-pink-950/40 rounded border border-pink-800/40 col-span-3">
              Họ Actini (5f)
            </div>
            {Array.from({ length: 15 }, (_, i) => i + 3).map((col) => {
              const el = elementMap.get(`9-${col}`);
              if (!el) return <div key={`empty-9-${col}`} />;
              const matched = isElementMatched(el);
              const isHovered = hoveredZ === el.z;

              return (
                <motion.button
                  key={el.z}
                  onClick={() => handleElementClick(el)}
                  onMouseEnter={() => handleElementHover(el)}
                  onMouseLeave={() => setHoveredZ(null)}
                  whileHover={{ scale: 1.09, zIndex: 30 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-1 rounded-lg text-left transition-all duration-150 flex flex-col justify-between cursor-pointer border ${
                    el.colorScheme.bg
                  } ${
                    isHovered
                      ? 'border-pink-300 ring-2 ring-pink-400/60 shadow-lg'
                      : el.colorScheme.border
                  } ${
                    !matched ? 'opacity-20 grayscale pointer-events-none' : 'opacity-100'
                  }`}
                  style={{ minHeight: '56px' }}
                >
                  <div className="flex justify-between items-start text-[9px] font-mono leading-none">
                    <span className="font-bold text-slate-300">{el.z}</span>
                    <span className="text-[8px] text-slate-400 truncate max-w-[28px]">
                      {Math.round(el.atomicMass)}
                    </span>
                  </div>
                  <div className="text-center my-auto">
                    <span className="text-base font-black font-mono tracking-tight leading-none text-pink-300">
                      {el.symbol}
                    </span>
                  </div>
                  <div className="text-[8px] leading-tight text-slate-300 truncate text-center w-full">
                    {el.nameVi}
                  </div>
                </motion.button>
              );
            })}
            <div className="col-span-1" />
          </div>
        </div>
      </div>

      {/* Color Coding Legend Banner */}
      <div className="w-full max-w-7xl px-4 mt-6">
        <div className="p-4 rounded-2xl glass-panel-subtle flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-semibold mr-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Chú giải màu sắc:
          </div>

          {Object.entries(CATEGORY_LABELS).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key as ElementCategory)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedCategory === key
                  ? 'border-cyan-400 bg-cyan-950/60 text-white shadow-sm'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${cat.color.split(' ')[0].replace('bg-', 'bg-')}`}
              />
              <span className="text-[11px] font-medium">{cat.label.split(' (')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
