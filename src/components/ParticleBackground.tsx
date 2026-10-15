import React, { useEffect, useRef } from 'react';

interface MoleculeNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  symbol: string;
  color: string;
  connections: number[];
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Chemistry symbols pool
    const symbols = ['H', 'O', 'N', 'C', 'Na', 'Cl', 'Mg', 'Al', 'P', 'S', 'e⁻', 'OH⁻', 'H⁺'];
    const colors = [
      'rgba(56, 189, 248, 0.7)',  // sky/cyan
      'rgba(129, 140, 248, 0.7)', // indigo
      'rgba(52, 211, 153, 0.7)',  // emerald
      'rgba(244, 114, 182, 0.7)', // pink
      'rgba(251, 191, 36, 0.7)',  // amber
    ];

    const nodeCount = Math.min(50, Math.floor((width * height) / 25000));
    const nodes: MoleculeNode[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 4 + 8,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      });
    }

    // Floating hexagon benzene rings
    interface Ring {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      angle: number;
      vAngle: number;
      alpha: number;
    }

    const rings: Ring[] = Array.from({ length: 6 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 25 + 20,
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.005,
      alpha: Math.random() * 0.08 + 0.04,
    }));

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep cyber gradient backdrop
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        100,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a1024');
      bgGrad.addColorStop(0.5, '#060a16');
      bgGrad.addColorStop(1, '#02040a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating benzene rings
      rings.forEach((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.angle += r.vAngle;
        if (r.x < -50) r.x = width + 50;
        if (r.x > width + 50) r.x = -50;
        if (r.y < -50) r.y = height + 50;
        if (r.y > height + 50) r.y = -50;

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.angle);
        ctx.strokeStyle = `rgba(56, 189, 248, ${r.alpha})`;
        ctx.lineWidth = 1.5;

        // Draw hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3;
          const px = Math.cos(a) * r.size;
          const py = Math.sin(a) * r.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner aromatic circle
        ctx.beginPath();
        ctx.arc(0, 0, r.size * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${r.alpha * 0.8})`;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });

      // Update and connect nodes
      const maxDist = 130;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < 10 || n1.x > width - 10) n1.vx *= -1;
        if (n1.y < 10 || n1.y > height - 10) n1.vy *= -1;

        // Mouse gentle repulsion
        const dxM = n1.x - mouseX;
        const dyM = n1.y - mouseY;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 120 && distM > 0) {
          n1.x += (dxM / distM) * 1.5;
          n1.y += (dyM / distM) * 1.5;
        }

        // Connect bonds to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes & chemical symbols
      nodes.forEach((n) => {
        // Glowing halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = n.color.replace('0.7', '0.08');
        ctx.fill();

        // Node center
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Symbol text
        ctx.font = '600 9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fillText(n.symbol, n.x, n.y - n.radius - 3);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
