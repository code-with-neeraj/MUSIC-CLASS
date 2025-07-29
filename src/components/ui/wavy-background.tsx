"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { createNoise3D } from "simplex-noise";

interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth = 50,
  backgroundFill = "black",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noise = createNoise3D();
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Handle high-DPI (Retina) screens
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.filter = `blur(${blur}px)`;
    ctx.globalAlpha = waveOpacity;

    const waveColors = colors ?? [
      "#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"
    ];

    let time = 0;
    const speedFactor = speed === "slow" ? 0.001 : 0.002;

    const drawWave = (count: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];

        for (let x = 0; x <= width; x += 5) {
          const y = noise(x / 800, i * 0.3, time) * 100 + height / 2;
          ctx.lineTo(x, y);
        }

        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      time += speedFactor;
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [blur, backgroundFill, colors, speed, waveOpacity, waveWidth]);

  return (
    <div
      className={cn(
        "h-screen w-full relative overflow-hidden flex items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={isSafari ? { filter: `blur(${blur}px)` } : {}}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
