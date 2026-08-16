import React, { useEffect, useRef } from 'react';

export const GlobeHero: React.FC = () => {
  const starsCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const globeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const globeWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. STARFIELD CANVAS
    const starsCanvas = starsCanvasRef.current;
    if (!starsCanvas) return;
    const starsCtx = starsCanvas.getContext('2d');
    if (!starsCtx) return;

    let SW = (starsCanvas.width = starsCanvas.parentElement?.offsetWidth || 1000);
    let SH = (starsCanvas.height = starsCanvas.parentElement?.offsetHeight || 700);

    const count = SW < 640 ? 35 : 75;
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * SW,
      y: Math.random() * SH,
      r: 0.5 + Math.random() * 1.1,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 0.8
    }));

    function drawStars(t: number) {
      if (!starsCtx) return;
      starsCtx.clearRect(0, 0, SW, SH);
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin((t / 1000) * s.speed + s.phase);
        starsCtx.beginPath();
        starsCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        starsCtx.fillStyle = `rgba(255, 255, 255, ${0.12 + tw * 0.35})`;
        starsCtx.fill();
      }
    }

    // 2. PROCEDURAL ROTATING GLOBE
    const globeCanvas = globeCanvasRef.current;
    const globeWrapEl = globeWrapRef.current;
    if (!globeCanvas || !globeWrapEl) return;
    const gctx = globeCanvas.getContext('2d');
    if (!gctx) return;

    let GW: number, GH: number, GR: number;

    function resizeGlobe() {
      if (!globeWrapEl || !globeCanvas || !gctx) return;
      const rect = globeWrapEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      GW = rect.width;
      GH = rect.height;
      globeCanvas.width = GW * dpr;
      globeCanvas.height = GH * dpr;
      gctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      GR = (Math.min(GW, GH) / 2) * 0.94;
    }

    const CONTINENTS: [number, number][][] = [
      [[-17,15],[-16,12],[-13,7],[-9,5],[3,6],[9,4],[9,-2],[12,-5],[12,-18],[14,-22],[18,-28],[20,-34],[26,-33],[32,-27],[35,-24],[35,-18],[40,-12],[40,-2],[43,2],[48,10],[45,12],[43,13],[38,15],[35,20],[33,24],[25,32],[10,37],[0,36],[-6,33],[-9,30],[-13,28],[-17,21],[-17,15]],
      [[-9,38],[-9,43],[-2,43],[3,42],[3,44],[7,44],[7,47],[13,46],[13,42],[19,40],[23,38],[27,40],[29,41],[35,42],[38,44],[40,46],[38,48],[30,46],[24,49],[24,54],[20,54],[14,54],[10,54],[8,57],[5,58],[10,63],[18,68],[25,70],[30,70],[28,65],[30,60],[38,56],[40,50],[35,45],[30,45],[24,45],[20,45],[13,45],[9,44],[3,43],[-2,43],[-9,43],[-9,38]],
      [[27,40],[35,36],[35,30],[40,30],[44,26],[50,25],[56,26],[60,25],[62,25],[66,24],[68,24],[70,20],[72,10],[76,8],[80,8],[80,13],[77,20],[80,22],[85,22],[90,22],[92,22],[95,20],[98,14],[100,12],[103,13],[104,10],[106,10],[109,12],[109,16],[107,20],[110,22],[113,23],[118,24],[121,25],[122,30],[128,35],[130,35],[132,34],[135,35],[140,36],[141,40],[142,44],[145,44],[143,50],[140,52],[135,55],[135,60],[128,62],[120,62],[110,65],[100,70],[90,72],[80,72],[70,70],[60,68],[55,65],[50,66],[45,68],[40,65],[36,60],[34,55],[32,50],[30,46],[27,40]],
      [[-165,65],[-160,60],[-155,58],[-150,60],[-145,60],[-140,60],[-135,58],[-130,54],[-125,49],[-124,42],[-122,37],[-118,34],[-115,30],[-110,26],[-105,22],[-100,18],[-97,16],[-92,15],[-88,14],[-85,10],[-82,8],[-80,9],[-77,8],[-80,13],[-83,20],[-88,22],[-90,25],[-94,29],[-97,26],[-97,30],[-90,30],[-85,30],[-81,25],[-80,27],[-81,31],[-77,35],[-75,38],[-74,40],[-70,42],[-67,45],[-64,45],[-60,47],[-55,48],[-52,47],[-56,52],[-62,58],[-65,62],[-70,63],[-75,62],[-80,63],[-85,66],[-90,68],[-95,68],[-100,69],[-110,70],[-120,70],[-130,70],[-140,70],[-150,70],[-160,70],[-165,68],[-165,65]],
      [[-80,9],[-77,4],[-77,-2],[-80,-5],[-81,-6],[-80,-10],[-77,-14],[-75,-18],[-71,-18],[-70,-23],[-70,-30],[-71,-35],[-73,-40],[-73,-45],[-70,-52],[-68,-55],[-65,-55],[-68,-50],[-65,-45],[-62,-40],[-58,-35],[-57,-33],[-58,-30],[-55,-27],[-48,-25],[-45,-20],[-40,-15],[-38,-13],[-35,-9],[-38,-5],[-45,-1],[-50,0],[-53,2],[-58,5],[-60,8],[-65,10],[-70,11],[-73,9],[-77,8],[-80,9]],
      [[113,-22],[114,-20],[122,-18],[127,-15],[130,-12],[136,-12],[137,-16],[141,-15],[142,-11],[145,-15],[146,-19],[150,-22],[153,-26],[153,-29],[150,-33],[150,-37],[147,-38],[144,-38],[140,-38],[137,-35],[135,-35],[132,-32],[129,-32],[126,-32],[122,-34],[118,-34],[115,-34],[114,-30],[113,-26],[113,-22]]
    ];

    function pointInPolygon(poly: [number, number][], x: number, y: number): boolean {
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const xi = poly[i][0], yi = poly[i][1];
        const xj = poly[j][0], yj = poly[j][1];
        const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
      }
      return inside;
    }

    function buildContinentDots() {
      const pts: [number, number][] = [];
      for (let lat = -70; lat <= 78; lat += 3.4) {
        for (let lon = -180; lon <= 180; lon += 3.4) {
          for (const poly of CONTINENTS) {
            if (pointInPolygon(poly, lon, lat)) {
              pts.push([lon, lat]);
              break;
            }
          }
        }
      }
      return pts;
    }
    const continentDots = buildContinentDots();

    function buildGraticule() {
      const lines: [number, number][][] = [];
      for (let lat = -60; lat <= 60; lat += 30) {
        const line: [number, number][] = [];
        for (let lon = -180; lon <= 180; lon += 4) line.push([lon, lat]);
        lines.push(line);
      }
      for (let lon = -150; lon <= 180; lon += 30) {
        const line: [number, number][] = [];
        for (let lat = -80; lat <= 80; lat += 4) line.push([lon, lat]);
        lines.push(line);
      }
      return lines;
    }
    const graticule = buildGraticule();

    const TILT = (14 * Math.PI) / 180;
    function project(lon: number, lat: number, rot: number) {
      const lonR = (lon * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      const x0 = Math.cos(latR) * Math.sin(lonR);
      const y0 = Math.sin(latR);
      const z0 = Math.cos(latR) * Math.cos(lonR);

      const x1 = x0 * Math.cos(rot) + z0 * Math.sin(rot);
      const z1 = -x0 * Math.sin(rot) + z0 * Math.cos(rot);
      const y1 = y0;

      const y2 = y1 * Math.cos(TILT) - z1 * Math.sin(TILT);
      const z2 = y1 * Math.sin(TILT) + z1 * Math.cos(TILT);

      return { x: x1, y: y2, z: z2 };
    }

    let rotation = 0;
    resizeGlobe();

    function animate(t: number) {
      drawStars(t);

      if (gctx && GW) {
        gctx.clearRect(0, 0, GW, GH);
        const cx = GW / 2, cy = GH / 2;

        // Graticule grid
        gctx.lineWidth = 1;
        for (const line of graticule) {
          gctx.beginPath();
          let started = false;
          for (const [lon, lat] of line) {
            const p = project(lon, lat, rotation);
            if (p.z < -0.05) {
              started = false;
              continue;
            }
            const sx = cx + p.x * GR;
            const sy = cy - p.y * GR;
            const alpha = 0.05 + Math.max(0, p.z) * 0.1;
            gctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            if (!started) {
              gctx.moveTo(sx, sy);
              started = true;
            } else {
              gctx.lineTo(sx, sy);
            }
          }
          gctx.stroke();
        }

        // Continent dots
        for (const [lon, lat] of continentDots) {
          const p = project(lon, lat, rotation);
          if (p.z < 0.02) continue;
          const sx = cx + p.x * GR;
          const sy = cy - p.y * GR;
          const depth = p.z;
          const r = 0.9 + depth * 1.1;
          gctx.beginPath();
          gctx.arc(sx, sy, r, 0, Math.PI * 2);
          gctx.fillStyle = `rgba(225, 214, 199, ${0.35 + depth * 0.65})`;
          gctx.fill();
        }
      }

      if (!reduceMotion) {
        rotation += 0.0016;
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (starsCanvas) {
        SW = starsCanvas.width = starsCanvas.parentElement?.offsetWidth || 1000;
        SH = starsCanvas.height = starsCanvas.parentElement?.offsetHeight || 700;
      }
      resizeGlobe();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Background Twinkling Stars */}
      <canvas
        ref={starsCanvasRef}
        className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* 3D Rotating Globe Stage */}
      <div className="absolute top-1/2 -right-8 sm:-right-4 md:right-0 lg:right-12 -translate-y-1/2 w-[340px] sm:w-[460px] md:w-[560px] lg:w-[600px] h-[340px] sm:h-[460px] md:h-[560px] lg:h-[600px] z-10 pointer-events-none opacity-80 sm:opacity-90">
        
        {/* Pulse Pings */}
        <div className="absolute inset-0 m-auto w-[66%] h-[66%] rounded-full border border-[#ff6b4a]/40 animate-ping opacity-25" />
        
        {/* Globe Base Sphere */}
        <div
          ref={globeWrapRef}
          className="absolute inset-0 m-auto w-[68%] h-[68%] rounded-full overflow-hidden bg-[radial-gradient(circle_at_33%_28%,#20242e,#0b0c10_78%)] shadow-[inset_-26px_-8px_60px_rgba(0,0,0,0.7),inset_14px_8px_40px_rgba(255,255,255,0.04),0_0_80px_rgba(255,107,74,0.15)] animate-floaty"
        >
          <canvas
            ref={globeCanvasRef}
            className="absolute inset-0 w-full h-full"
          />
        </div>

        {/* Orbit Node Badges */}
        <div className="absolute top-12 left-10 px-3 py-1 rounded-full bg-[#161920]/90 border border-white/15 text-[11px] font-mono font-bold text-white shadow-xl flex items-center gap-1.5 backdrop-blur-md animate-pulse">
          <span className="w-2 h-2 rounded-full bg-[#ff6b4a] shadow-[0_0_8px_#ff6b4a]" />
          <span>🇬🇧 EN · A2</span>
        </div>

        <div className="absolute bottom-16 left-6 px-3 py-1 rounded-full bg-[#161920]/90 border border-white/15 text-[11px] font-mono font-bold text-white shadow-xl flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span>🤖 AI Tutor</span>
        </div>

        <div className="absolute top-1/3 -right-2 px-3 py-1 rounded-full bg-[#161920]/90 border border-white/15 text-[11px] font-mono font-bold text-white shadow-xl flex items-center gap-1.5 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          <span>🔥 14 Streak</span>
        </div>
      </div>
    </>
  );
};
