import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { ChemicalElement } from '../types/chemistry';
import { getShellInfoList, ShellInfo } from '../utils/atomicShells';
import { soundFX } from '../utils/soundEffects';
import { Play, Pause, RotateCw, Eye, Sun, Sparkles, Orbit, Compass, Layers, Info } from 'lucide-react';

interface SolarSystemAtomProps {
  element: ChemicalElement;
  compact?: boolean;
}

export const SolarSystemAtom: React.FC<SolarSystemAtomProps> = ({ element, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [selectedShellIndex, setSelectedShellIndex] = useState<number | null>(null);
  const [hoveredElectron, setHoveredElectron] = useState<string | null>(null);

  const shells = useMemo(() => getShellInfoList(element.z), [element.z]);
  const protons = element.z;
  const neutrons = Math.max(0, Math.round(element.atomicMass - element.z));
  const totalElectrons = element.z;

  // Animation frame loop for continuous orbit angles
  const [time, setTime] = useState(0);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    const animate = (now: number) => {
      const delta = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      if (isPlaying) {
        setTime((prev) => prev + delta * speedMultiplier);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, speedMultiplier]);

  // Dimensions
  const svgSize = compact ? 340 : 460;
  const center = svgSize / 2;
  const maxRadius = svgSize / 2 - (compact ? 24 : 32);
  const minRadius = compact ? 42 : 55;
  const numShells = shells.length;
  const radiusStep = numShells > 1 ? (maxRadius - minRadius) / (numShells - 1) : 0;

  // Base orbital speeds (inner orbits move faster, Keplerian: ~1/sqrt(n))
  const getOrbitSpeed = (shellIndex: number) => {
    const n = shellIndex + 1;
    return (1.2 / Math.sqrt(n)) * 0.9;
  };

  const valenceShell = shells[shells.length - 1];

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Top Controls Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 px-3 py-2 rounded-2xl bg-slate-900/80 border border-cyan-500/20 mb-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Mô hình Hệ Mặt Trời</span>
          </div>

          <span className="hidden sm:inline-block text-[11px] text-slate-400">
            Rutherford - Bohr (1911 - 1913)
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setIsPlaying(!isPlaying);
            }}
            className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
            }`}
            title={isPlaying ? 'Tạm dừng chuyển động' : 'Tiếp tục chuyển động'}
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isPlaying ? 'Dừng' : 'Chạy'}</span>
          </button>

          {/* Speed Selector */}
          <div className="flex items-center rounded-lg bg-slate-800/80 border border-slate-700 p-0.5">
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setSpeedMultiplier(spd);
                }}
                className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-all cursor-pointer ${
                  speedMultiplier === spd
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* 2D / 3D Perspective Toggle */}
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setViewMode(viewMode === '2d' ? '3d' : '2d');
            }}
            className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 transition-all cursor-pointer ${
              viewMode === '3d'
                ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Đổi góc nhìn 2D phẳng / 3D nghiêng hành tinh"
          >
            <Orbit className="w-3 h-3 text-cyan-400" />
            <span>{viewMode === '3d' ? 'Góc nghiêng 3D' : 'Góc phẳng 2D'}</span>
          </button>
        </div>
      </div>

      {/* Main Solar System Canvas Container */}
      <div className="relative w-full flex items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 border border-cyan-500/30 overflow-hidden shadow-inner">
        {/* Subtle space stars background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950/60 to-slate-950 pointer-events-none" />

        {/* 3D Perspective Wrapper */}
        <div
          className="transition-transform duration-700 ease-out flex items-center justify-center"
          style={{
            transform:
              viewMode === '3d'
                ? 'perspective(750px) rotateX(46deg) rotateZ(-12deg) scale(0.96)'
                : 'perspective(750px) rotateX(0deg) rotateZ(0deg) scale(1)',
          }}
        >
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="overflow-visible"
          >
            <defs>
              {/* Sun/Nucleus Core Gradient */}
              <radialGradient id={`sun-core-${element.z}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
                <stop offset="35%" stopColor="#f59e0b" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#ea580c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#c2410c" stopOpacity="0.6" />
              </radialGradient>

              {/* Sun Corona Outer Glow */}
              <radialGradient id={`sun-corona-${element.z}`} cx="50%" cy="50%" r="50%">
                <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#f97316" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </radialGradient>

              {/* Electron Sphere Gradient (Cyan for inner, Amber for valence) */}
              <radialGradient id={`electron-inner-${element.z}`} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </radialGradient>

              <radialGradient id={`electron-valence-${element.z}`} cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </radialGradient>

              {/* Filter for glowing corona */}
              <filter id="glow-corona" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* ORBIT TRACKS (Quỹ đạo các hành tinh / Lớp electron) */}
            {shells.map((shell, idx) => {
              const radius = numShells === 1 ? (minRadius + maxRadius) / 2 : minRadius + idx * radiusStep;
              const isSelected = selectedShellIndex === idx;
              const isDimmed = selectedShellIndex !== null && selectedShellIndex !== idx;
              const isValence = shell.isValence;

              return (
                <g key={`orbit-${idx}`} opacity={isDimmed ? 0.25 : 1} className="transition-opacity duration-300">
                  {/* Orbit track ring */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={
                      isSelected
                        ? '#38bdf8'
                        : isValence
                        ? '#f59e0b'
                        : '#334155'
                    }
                    strokeWidth={isSelected ? 2.2 : isValence ? 1.6 : 1}
                    strokeDasharray={isValence ? '5,4' : '3,3'}
                    className="cursor-pointer hover:stroke-cyan-400 transition-colors"
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedShellIndex(selectedShellIndex === idx ? null : idx);
                    }}
                  />

                  {/* Shell Label badge on the orbit track */}
                  <g
                    transform={`translate(${center + radius}, ${center})`}
                    className="cursor-pointer"
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedShellIndex(selectedShellIndex === idx ? null : idx);
                    }}
                  >
                    <rect
                      x="-14"
                      y="-10"
                      width="28"
                      height="18"
                      rx="4"
                      fill="#0f172a"
                      stroke={isValence ? '#f59e0b' : '#38bdf8'}
                      strokeWidth="1"
                      opacity="0.9"
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill={isValence ? '#fcd34d' : '#7dd3fc'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {shell.shellLetter}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* CENTRAL NUCLEUS - "MẶT TRỜI" (Hạt nhân mang điện dương Z+) */}
            <g
              transform={`translate(${center}, ${center})`}
              className="cursor-pointer"
              onClick={() => {
                soundFX.playClick();
                setSelectedShellIndex(null);
              }}
            >
              {/* Pulsating solar corona layers */}
              <circle
                r={compact ? 34 : 42}
                fill={`url(#sun-corona-${element.z})`}
                filter="url(#glow-corona)"
                className="animate-pulse"
              />
              <circle
                r={compact ? 26 : 32}
                fill={`url(#sun-core-${element.z})`}
                className="drop-shadow-lg"
              />

              {/* Sun Inner Flare Rings */}
              <circle
                r={compact ? 21 : 27}
                fill="none"
                stroke="#fed7aa"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="4,3"
                className="animate-spin-slow"
              />

              {/* Central Nucleus Label */}
              <text
                y="-4"
                textAnchor="middle"
                fill="#ffffff"
                fontSize={compact ? '12' : '15'}
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                className="drop-shadow"
              >
                {element.symbol}
              </text>
              <text
                y={compact ? '9' : '12'}
                textAnchor="middle"
                fill="#ffedd5"
                fontSize={compact ? '9' : '10'}
                fontFamily="monospace"
                fontWeight="bold"
                className="drop-shadow"
              >
                +{element.z}
              </text>
            </g>

            {/* ELECTRONS ("HÀNH TINH" - Chuyển động quanh Hạt nhân) */}
            {shells.map((shell, shellIdx) => {
              const radius = numShells === 1 ? (minRadius + maxRadius) / 2 : minRadius + shellIdx * radiusStep;
              const isDimmed = selectedShellIndex !== null && selectedShellIndex !== shellIdx;
              const speed = getOrbitSpeed(shellIdx);
              // Base rotation angle based on elapsed time
              const baseAngle = time * speed;
              const isValence = shell.isValence;

              return (
                <g key={`electrons-${shellIdx}`} opacity={isDimmed ? 0.15 : 1} className="transition-opacity duration-300">
                  {Array.from({ length: shell.electrons }).map((_, eIdx) => {
                    const angleOffset = (2 * Math.PI * eIdx) / shell.electrons;
                    const angle = baseAngle + angleOffset;
                    const ex = center + radius * Math.cos(angle);
                    const ey = center + radius * Math.sin(angle);
                    const electronId = `e-${shell.shellLetter}-${eIdx + 1}`;
                    const isHovered = hoveredElectron === electronId;

                    return (
                      <g
                        key={electronId}
                        transform={`translate(${ex}, ${ey})`}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredElectron(electronId)}
                        onMouseLeave={() => setHoveredElectron(null)}
                      >
                        {/* Orbit motion comet trail / glow */}
                        <circle
                          r={isValence ? (compact ? 6 : 7.5) : compact ? 5 : 6}
                          fill={isValence ? '#eab308' : '#0284c7'}
                          opacity={isHovered ? 0.9 : 0.4}
                          className="animate-ping"
                          style={{ animationDuration: '2.5s' }}
                        />

                        {/* Electron body */}
                        <circle
                          r={isValence ? (compact ? 5 : 6) : compact ? 4.2 : 5}
                          fill={`url(#${isValence ? `electron-valence-${element.z}` : `electron-inner-${element.z}`})`}
                          stroke={isHovered ? '#ffffff' : isValence ? '#fef08a' : '#bae6fd'}
                          strokeWidth="1.2"
                          className="drop-shadow"
                        />

                        {/* Negative charge sign */}
                        <text
                          y="2.5"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize={compact ? '8' : '9'}
                          fontWeight="bold"
                          fontFamily="monospace"
                        >
                          −
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* On-canvas Bottom Quick Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Mặt Trời: Hạt nhân (+{protons})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-300">
              Hành tinh: {totalElectrons} e⁻ ({shells.length} lớp)
            </span>
            <span className="hidden sm:inline text-amber-400">
              • {valenceShell.electrons} e lớp ngoài cùng
            </span>
          </div>
        </div>
      </div>

      {/* THREE-COLUMN STATS: Protons, Neutrons, Electrons */}
      <div className="grid grid-cols-3 gap-2.5 w-full mt-3">
        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-center">
          <span className="text-[10px] text-amber-300 block font-medium">Hạt Proton (p⁺)</span>
          <span className="text-base font-mono font-black text-amber-400">
            {protons}
          </span>
          <span className="text-[9px] text-slate-400 block">Điện tích: +{protons}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
          <span className="text-[10px] text-slate-300 block font-medium">Hạt Neutron (n⁰)</span>
          <span className="text-base font-mono font-black text-slate-200">
            {neutrons}
          </span>
          <span className="text-[9px] text-slate-400 block">Khối lượng ≈ {neutrons}u</span>
        </div>

        <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-center">
          <span className="text-[10px] text-cyan-300 block font-medium">Hạt Electron (e⁻)</span>
          <span className="text-base font-mono font-black text-cyan-400">
            {totalElectrons}
          </span>
          <span className="text-[9px] text-slate-400 block">{numShells} lớp quay quanh</span>
        </div>
      </div>

      {/* ELECTRON SHELL BREAKDOWN TABS (Interactive inspection) */}
      <div className="w-full mt-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Phân bố electron theo từng lớp (Quỹ đạo hành tinh):</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400">
            {shells.map((s) => s.electrons).join(' • ')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
          {shells.map((shell, idx) => {
            const isSelected = selectedShellIndex === idx;
            const isValence = shell.isValence;

            return (
              <button
                key={shell.shellNumber}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setSelectedShellIndex(isSelected ? null : idx);
                }}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-400 text-white ring-2 ring-cyan-400/30'
                    : isValence
                    ? 'bg-amber-950/30 border-amber-500/40 text-amber-200 hover:border-amber-400'
                    : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                  <span className="font-bold">Lớp {shell.shellLetter}</span>
                  <span className="text-slate-400">n={shell.shellNumber}</span>
                </div>
                <div className="text-sm font-mono font-extrabold flex items-center justify-between">
                  <span className={isValence ? 'text-amber-400' : 'text-cyan-300'}>
                    {shell.electrons} e⁻
                  </span>
                  <span className="text-[9px] text-slate-500 font-normal">
                    /{shell.maxCapacity}
                  </span>
                </div>
                {isValence && (
                  <span className="text-[9px] text-amber-300 font-medium block truncate mt-0.5">
                    ★ Hóa trị
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Inspection Callout for Selected Shell */}
        {selectedShellIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2.5 p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-xs flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-cyan-300">
                Lớp {shells[selectedShellIndex].shellLetter} (n={shells[selectedShellIndex].shellNumber}):
              </span>{' '}
              <span className="text-slate-300">
                Chứa {shells[selectedShellIndex].electrons} electron (sức chứa tối đa{' '}
                {shells[selectedShellIndex].maxCapacity} e⁻).
              </span>
              {shells[selectedShellIndex].isValence && (
                <span className="ml-1 text-amber-300 font-semibold">
                  Đây là lớp ngoài cùng, quyết định hóa trị và tính chất hóa học của {element.nameVi}!
                </span>
              )}
            </div>
            <button
              onClick={() => setSelectedShellIndex(null)}
              className="text-[11px] text-cyan-400 hover:underline cursor-pointer ml-2 shrink-0"
            >
              Xem tất cả
            </button>
          </motion.div>
        )}
      </div>

      {/* EDUCATIONAL RUTHERFORD - BOHR SCIENTIFIC COMPARISON CARD */}
      <div className="w-full mt-3 p-3 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-indigo-300 block mb-0.5">
              Quy luật Hệ Mặt Trời trong nguyên tử (Rutherford - Bohr):
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Tương tự các hành tinh quay quanh Mặt Trời do lực hấp dẫn, các <strong>electron (e⁻)</strong> mang điện âm chuyển động không ngừng trên các quỹ đạo tròn xác định quanh <strong>hạt nhân mang điện dương (+{element.z})</strong> nhờ lực hút tĩnh điện Coulomb. Lớp ngoài cùng gồm <strong>{valenceShell.electrons} e⁻ hóa trị</strong> chính là yếu tố tạo nên hợp chất oxide cao nhất <strong>{element.highestOxide}</strong> và hydroxide <strong>{element.highestHydroxide}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
