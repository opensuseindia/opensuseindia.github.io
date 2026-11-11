import React, { useEffect, useRef, useState } from 'react';

/**
 * Authentic openSUSE Linux Creative Custom Cursor
 * Features:
 * - Default Mode: Phosphor Green Linux Terminal Arrow (Hotspot at exact 0,0)
 * - Interactive Mode: Smoothly morphs into Linux Cyber Reticle + `>_ EXEC` / `OK 200` prompt
 * - Input Mode: Terminal I-Beam with blinking insertion caret + `INSERT` badge
 * - Trailing Telemetry: Silky smooth lerp TTY HUD with `tty0 : [x, y]`
 * - 100% Guaranteed Click-Through (ALL elements strictly `pointer-events-none`)
 * - Continuous RAF position locking so React state updates NEVER cause cursor desync
 * - Smooth 150ms transitions between modes without any coordinate jumping
 */
export default function CustomCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isInput, setIsInput] = useState(false);

  // Synchronous state refs to prevent re-render delays
  const isHoveredRef = useRef(false);
  const isInputRef = useRef(false);
  const isClickedRef = useRef(false);

  // DOM Refs
  const rootRef = useRef(null);
  const pointerContainerRef = useRef(null);
  const hudRef = useRef(null);
  const coordTextRef = useRef(null);

  // Position tracking
  const targetPos = useRef({ x: -100, y: -100 });
  const isInsideWindow = useRef(false);
  const rafId = useRef(null);
  const frameCount = useRef(0);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const checkInteractive = (target) => {
      if (!target || !(target instanceof Element)) {
        return { isInteractive: false, isText: false };
      }

      const isText = Boolean(
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[contenteditable="true"]')
      );

      if (isText) return { isInteractive: false, isText: true };

      const isInteractive = Boolean(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'SELECT' ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('role') === 'link' ||
        target.getAttribute('role') === 'tab' ||
        target.getAttribute('role') === 'checkbox' ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('interactive') ||
        target.classList.contains('mc-btn') ||
        target.classList.contains('mc-slot') ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.closest('[role="link"]') ||
        target.closest('[role="tab"]') ||
        target.closest('.cursor-pointer') ||
        target.closest('.interactive') ||
        target.closest('.mc-btn') ||
        target.closest('.mc-slot')
      );

      return { isInteractive, isText: false };
    };

    const updateTargetMode = (target) => {
      const { isInteractive, isText } = checkInteractive(target);

      if (isText !== isInputRef.current) {
        isInputRef.current = isText;
        setIsInput(isText);
      }

      if (isInteractive !== isHoveredRef.current) {
        isHoveredRef.current = isInteractive;
        setIsHovered(isInteractive);
      }
    };

    const onMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      targetPos.current.x = x;
      targetPos.current.y = y;

      if (!isInsideWindow.current) {
        isInsideWindow.current = true;
        if (rootRef.current) rootRef.current.style.opacity = '1';
      }

      // Immediate 0-latency transform for primary cursor tip
      if (pointerContainerRef.current) {
        pointerContainerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onMouseDown = () => {
      isClickedRef.current = true;
      setIsClicked(true);
    };

    const onMouseUp = () => {
      isClickedRef.current = false;
      setIsClicked(false);
    };

    const onMouseOver = (e) => {
      updateTargetMode(e.target);
    };

    const onMouseLeaveDoc = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        isInsideWindow.current = false;
        if (rootRef.current) rootRef.current.style.opacity = '0';
      }
    };

    const onMouseEnterDoc = () => {
      isInsideWindow.current = true;
      if (rootRef.current) rootRef.current.style.opacity = '1';
    };

    const onWindowBlur = () => {
      isInsideWindow.current = false;
      if (rootRef.current) rootRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc);
    document.addEventListener('mouseenter', onMouseEnterDoc);
    window.addEventListener('blur', onWindowBlur);

    // Continuous 60-120fps RAF loop
    let hudX = -100;
    let hudY = -100;

    const renderLoop = () => {
      const tx = targetPos.current.x;
      const ty = targetPos.current.y;

      // Keep pointer locked every frame (protects against React re-render resets)
      if (pointerContainerRef.current) {
        pointerContainerRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }

      // Buttery smooth lerp for trailing TTY telemetry (comfortably distanced from cursor)
      hudX += (tx - hudX) * 0.22;
      hudY += (ty - hudY) * 0.22;

      if (hudRef.current) {
        hudRef.current.style.transform = `translate3d(${hudX + 26}px, ${hudY + 22}px, 0)`;
      }

      // Telemetry coordinate text update without React re-renders
      frameCount.current += 1;
      if (frameCount.current % 3 === 0 && coordTextRef.current) {
        coordTextRef.current.textContent = `${Math.round(tx)}, ${Math.round(ty)}`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.removeEventListener('mouseenter', onMouseEnterDoc);
      window.removeEventListener('blur', onWindowBlur);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[999999] select-none opacity-0 transition-opacity duration-150"
      style={{ isolation: 'isolate' }}
    >
      {/* ========================================================= */}
      {/* 1. PRIMARY CURSOR CONTAINER (Strictly pointer-events-none)*/}
      {/* ========================================================= */}
      <div
        ref={pointerContainerRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
      >
        {/* ======================================================= */}
        {/* STATE A: TEXT INPUT MODE (Blinking I-Beam + INSERT Tag) */}
        {/* ======================================================= */}
        <div
          className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center transition-all duration-150 ease-out pointer-events-none ${
            isInput
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-50'
          }`}
        >
          <div className="w-[3px] h-5 bg-[#00f0ff] shadow-[0_0_8px_#00f0ff] animate-pulse pointer-events-none" />
          <span className="font-pixel text-[7.5px] text-geeko-400 ml-1.5 bg-black/90 px-1.5 py-0.5 border border-geeko-500/50 shadow-md pointer-events-none">
            INSERT
          </span>
        </div>

        {/* ======================================================= */}
        {/* STATE B: SLEEK MODERN CHEVRON ARROW (User Reference)   */}
        {/* Solid dark body + thick rounded white/silver border    */}
        {/* Exact Hotspot at top apex (0, 0)                       */}
        {/* ======================================================= */}
        <div
          className={`absolute top-0 left-0 origin-top-left transition-all duration-150 ease-out pointer-events-none ${
            !isInput && !isHovered
              ? `opacity-100 scale-100 ${isClicked ? 'scale-90' : ''}`
              : 'opacity-0 scale-50'
          }`}
        >
          <svg
            width="24"
            height="30"
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible pointer-events-none"
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.75)) drop-shadow(0 0 5px rgba(115,186,37,0.4))',
            }}
          >
            {/* Sleek Modern Chevron Cursor perfectly matching reference */}
            <path
              d="M 2 2 L 0.8 22.5 L 7.5 17.5 L 17.5 16 Z"
              fill="#18181b"
              stroke="#ffffff"
              strokeWidth="2.4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ======================================================= */}
        {/* STATE C: INTERACTIVE CYBER RETICLE + `>_ EXEC` PROMPT   */}
        {/* Perfectly centered on (0, 0) mouse position            */}
        {/* ======================================================= */}
        <div
          className={`absolute top-0 left-0 flex items-center justify-center transition-all duration-150 ease-out pointer-events-none ${
            !isInput && isHovered
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-50'
          }`}
        >
          {/* Centered Reticle Frame (Compact, Clean & Precise: 20px) */}
          <div
            className={`relative -translate-x-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-transform duration-100 pointer-events-none drop-shadow-[0_0_5px_rgba(115,186,37,0.45)] ${
              isClicked ? 'scale-75' : 'scale-100'
            }`}
          >
            {/* 4 Corner Cyber Brackets (Compact 5px brackets) */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-[1.5px] border-l-[1.5px] border-white/95 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] border-white/95 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-[1.5px] border-l-[1.5px] border-white/95 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-[1.5px] border-r-[1.5px] border-white/95 pointer-events-none" />

            {/* Glowing openSUSE Center Target Dot */}
            <div
              className={`w-1 h-1 rounded-none transition-all duration-100 pointer-events-none ${
                isClicked
                  ? 'bg-white scale-125 shadow-[0_0_8px_#ffffff]'
                  : 'bg-geeko-400 shadow-[0_0_6px_#73ba25]'
              }`}
            />
          </div>

          {/* Linux Prompt Tag: `>_ EXEC` / `>_ OK 200` */}
          <div
            className={`absolute left-3.5 -top-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-none bg-[#040807]/95 border font-mono text-[8.5px] shadow-[0_0_12px_rgba(115,186,37,0.25)] whitespace-nowrap backdrop-blur-sm transition-all duration-150 pointer-events-none ${
              isClicked
                ? 'border-geeko-400 text-geeko-300 shadow-[0_0_14px_rgba(115,186,37,0.5)]'
                : 'border-geeko-500/60 text-white'
            }`}
          >
            <span className="text-geeko-400 font-bold pointer-events-none">&gt;_</span>
            <span className={`pointer-events-none font-bold tracking-wider ${isClicked ? 'text-geeko-300' : 'text-white'}`}>
              {isClicked ? 'OK 200' : 'EXEC'}
            </span>
            <span
              className={`w-1 h-2 inline-block animate-pulse ml-0.5 pointer-events-none ${
                isClicked ? 'bg-white' : 'bg-geeko-400'
              }`}
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SECONDARY SMOOTH TRAILING TTY TELEMETRY HUD            */}
      {/* Set comfortably distanced from cursor                     */}
      {/* ========================================================= */}
      {!isInput && (
        <div
          ref={hudRef}
          className="fixed top-0 left-0 pointer-events-none will-change-transform hidden md:block"
        >
          <div className="px-2 py-0.5 rounded-none bg-[#040807]/90 border border-[#173f35] font-mono text-[8px] tracking-tighter whitespace-nowrap shadow-lg flex items-center gap-1 backdrop-blur-sm pointer-events-none">
            <span className="text-geeko-400 font-bold pointer-events-none">tty0</span>
            <span className="text-slate-500 pointer-events-none">:</span>
            <span className="text-slate-300 pointer-events-none">
              [<span ref={coordTextRef} className="pointer-events-none">0, 0</span>]
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
