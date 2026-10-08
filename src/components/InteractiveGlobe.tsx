import React, { useRef, useEffect } from 'react';

interface InteractiveGlobeProps {
  className?: string;
  size?: number;
}

// Generate realistic continents / landmass point distribution using geo-sampling
function generateGlobePoints(count = 3400): { lat: number; lon: number; isLand: boolean }[] {
  const points: { lat: number; lon: number; isLand: boolean }[] = [];
  
  // Approximate continental boundaries (lat: -90 to 90, lon: -180 to 180)
  const isLandCoordinate = (lat: number, lon: number): boolean => {
    // North America (US, Canada, Mexico)
    if (lat >= 14 && lat <= 72 && lon >= -168 && lon <= -52) {
      if (lat < 28 && lon < -104) return false;
      if (lat > 55 && lon > -55 && lon < -30) return false;
      return true;
    }
    // South America
    if (lat >= -56 && lat < 13 && lon >= -82 && lon <= -34) {
      if (lat > -5 && lon < -78) return false;
      if (lat < -40 && lon > -60) return false;
      return true;
    }
    // Europe & Scandinavia
    if (lat >= 36 && lat <= 71 && lon >= -10 && lon <= 45) {
      if (lat < 42 && lon > 28 && lon < 40) return false; // Black sea approx
      return true;
    }
    // Africa
    if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 52) {
      if (lat > 12 && lon < -16) return false;
      if (lat < -20 && lon > 35) return false;
      return true;
    }
    // Asia (Middle East, India, China, Russia, SEA)
    if (lat >= 8 && lat <= 75 && lon >= 45 && lon <= 180) {
      if (lat < 22 && lon > 125) return false; // Pacific ocean gap
      return true;
    }
    // Australia & New Zealand
    if (lat >= -46 && lat <= -10 && lon >= 112 && lon <= 178) {
      if (lon > 154 && lat > -30 && lat < -10) return false;
      return true;
    }
    // Japan, Philippines, Indonesia archipelagos
    if (lat >= -10 && lat <= 45 && lon >= 95 && lon <= 145) {
      return true;
    }
    // United Kingdom & Ireland
    if (lat >= 50 && lat <= 60 && lon >= -11 && lon <= 2) {
      return true;
    }
    return false;
  };

  // Golden spiral fibonacci sphere sampling for uniform dotted surface
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;

    // Convert Cartesian (x, y, z) to spherical (lat, lon)
    const lat = Math.asin(y) * (180 / Math.PI);
    const lon = Math.atan2(z, x) * (180 / Math.PI);

    const isLand = isLandCoordinate(lat, lon);
    points.push({ lat, lon, isLand });
  }

  return points;
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  className = '',
  size = 560,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive rotation state with gentle auto-rotation and drag momentum
  const rotationRef = useRef<{
    yaw: number;
    pitch: number;
    isDragging: boolean;
    lastMouseX: number;
    lastMouseY: number;
    autoRotateSpeed: number;
    targetYawVel: number;
    targetPitchVel: number;
  }>({
    yaw: -1.35,
    pitch: 0.32,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    autoRotateSpeed: 0.0022,
    targetYawVel: 0,
    targetPitchVel: 0,
  });

  // Pre-generate points once
  const globePointsRef = useRef<{ lat: number; lon: number; isLand: boolean }[]>([]);
  if (globePointsRef.current.length === 0) {
    globePointsRef.current = generateGlobePoints(3400);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const state = rotationRef.current;

      // Handle continuous auto-rotation & inertia decay
      if (!state.isDragging) {
        state.yaw += state.autoRotateSpeed + state.targetYawVel;
        state.pitch += state.targetPitchVel;
        state.targetYawVel *= 0.95;
        state.targetPitchVel *= 0.95;
        // Clamp pitch to keep realistic globe horizon
        state.pitch = Math.max(-0.55, Math.min(0.55, state.pitch));
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.46;

      const cosYaw = Math.cos(state.yaw);
      const sinYaw = Math.sin(state.yaw);
      const cosPitch = Math.cos(state.pitch);
      const sinPitch = Math.sin(state.pitch);

      // Subtle atmospheric halo around globe edge
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius * 1.05);
      glowGrad.addColorStop(0, 'rgba(30, 58, 43, 0.0)');
      glowGrad.addColorStop(0.85, 'rgba(17, 24, 39, 0.04)');
      glowGrad.addColorStop(1, 'rgba(17, 24, 39, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // Faint outer sphere border ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(17, 24, 39, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      const points = globePointsRef.current;

      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const latRad = (pt.lat * Math.PI) / 180;
        const lonRad = (pt.lon * Math.PI) / 180;

        // Spherical coordinate to Cartesian base
        const x0 = Math.cos(latRad) * Math.sin(lonRad);
        const y0 = Math.sin(latRad);
        const z0 = Math.cos(latRad) * Math.cos(lonRad);

        // Rotate by Yaw (around Y axis)
        const x1 = x0 * cosYaw - z0 * sinYaw;
        const z1 = x0 * sinYaw + z0 * cosYaw;

        // Rotate by Pitch (around X axis)
        const y2 = y0 * cosPitch - z1 * sinPitch;
        const z2 = y0 * sinPitch + z1 * cosPitch;

        // Draw points facing the viewer (z2 > 0) with smooth edge falloff
        if (z2 > -0.1) {
          const px = cx + x1 * radius;
          const py = cy - y2 * radius;

          // Depth shading factor: front dots are crisp, edge dots fade smoothly
          const depthAlpha = Math.max(0.06, Math.min(1, (z2 + 0.1) / 1.1));

          if (pt.isLand) {
            // Shopify Admin style high-density dotted landmasses
            const dotSize = Math.max(1.0, 1.45 * depthAlpha);
            ctx.fillStyle = `rgba(17, 24, 39, ${(0.88 * depthAlpha).toFixed(2)})`;
            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Subtle sparse water dots for contour structure
            if (i % 3 === 0 && z2 > 0.08) {
              const dotSize = 0.7 * depthAlpha;
              ctx.fillStyle = `rgba(17, 24, 39, ${(0.18 * depthAlpha).toFixed(2)})`;
              ctx.beginPath();
              ctx.arc(px, py, dotSize, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Draw Shopify-style glowing live traffic pulse points on global commerce hubs
      const activeHubs = [
        { lat: 14.5995, lon: 120.9842, label: 'Manila HQ' }, // PH
        { lat: 37.7749, lon: -122.4194, label: 'San Francisco' }, // US West
        { lat: 40.7128, lon: -74.006, label: 'New York' }, // US East
        { lat: 51.5074, lon: -0.1278, label: 'London' }, // UK
        { lat: 1.3521, lon: 103.8198, label: 'Singapore' }, // SG
        { lat: 35.6762, lon: 139.6503, label: 'Tokyo' }, // JP
        { lat: -33.8688, lon: 151.2093, label: 'Sydney' }, // AU
      ];

      const now = performance.now() * 0.003;

      for (let h = 0; h < activeHubs.length; h++) {
        const hub = activeHubs[h];
        const latRad = (hub.lat * Math.PI) / 180;
        const lonRad = (hub.lon * Math.PI) / 180;

        const x0 = Math.cos(latRad) * Math.sin(lonRad);
        const y0 = Math.sin(latRad);
        const z0 = Math.cos(latRad) * Math.cos(lonRad);

        const x1 = x0 * cosYaw - z0 * sinYaw;
        const z1 = x0 * sinYaw + z0 * cosYaw;

        const y2 = y0 * cosPitch - z1 * sinPitch;
        const z2 = y0 * sinPitch + z1 * cosPitch;

        if (z2 > 0.05) {
          const hx = cx + x1 * radius;
          const hy = cy - y2 * radius;
          const pulse = (Math.sin(now + h * 1.4) + 1) / 2; // 0 to 1

          // Ripple pulse ring
          ctx.beginPath();
          ctx.arc(hx, hy, 3.5 + pulse * 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(29, 92, 83, ${(0.65 * (1 - pulse) * z2).toFixed(2)})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Solid core dot
          ctx.beginPath();
          ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#1D5C53';
          ctx.fill();
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Pointer drag event handlers for mouse & touch interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const state = rotationRef.current;
    state.isDragging = true;
    state.lastMouseX = e.clientX;
    state.lastMouseY = e.clientY;
    state.targetYawVel = 0;
    state.targetPitchVel = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const state = rotationRef.current;
    if (!state.isDragging) return;

    const dx = e.clientX - state.lastMouseX;
    const dy = e.clientY - state.lastMouseY;

    state.yaw += dx * 0.007;
    state.pitch += dy * 0.007;
    state.pitch = Math.max(-0.55, Math.min(0.55, state.pitch));

    state.targetYawVel = dx * 0.0025;
    state.targetPitchVel = dy * 0.0025;

    state.lastMouseX = e.clientX;
    state.lastMouseY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const state = rotationRef.current;
    state.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none transition-transform duration-200"
        title="Interactive 3D World Globe — Click and drag to rotate"
        aria-label="Shopify-style interactive dotted 3D globe representing global live traffic"
      />
    </div>
  );
};
