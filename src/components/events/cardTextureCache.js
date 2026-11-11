// High-performance canvas texture generator for openSUSE 3D Card Stream
// Generates balanced, premium, multi-colored retro posters matching Synergy '26
import * as THREE from 'three';

const textureCache = new Map();

// Sophisticated, diverse color themes across tracks & events
const EVENT_THEMES = {
  // Track 1: CLI & Terminal - Warm Amber CRT
  'evt-track-1': {
    primary: '#f59e0b',
    secondary: '#fbbf24',
    bgDark: '#0e0b04',
    tagText: 'TRACK 01 // CLI',
    badgeText: '★ TERMINAL TITANS ★',
    accent: '#f59e0b',
  },
  // Track 2: Security - Arctic Cyber Cyan
  'evt-track-2': {
    primary: '#00f0ff',
    secondary: '#38bdf8',
    bgDark: '#020b12',
    tagText: 'TRACK 02 // SEC',
    badgeText: '★ ROOT ACCESS ★',
    accent: '#00f0ff',
  },
  // Track 3: DevOps - Cloud Cobalt & Slate
  'evt-track-3': {
    primary: '#38bdf8',
    secondary: '#60a5fa',
    bgDark: '#030a14',
    tagText: 'TRACK 03 // CLOUD',
    badgeText: '★ GEEKOOPS INFRA ★',
    accent: '#38bdf8',
  },
  // Track 4: Kernel & Runtime - Deep Purple / Indigo
  'evt-track-4': {
    primary: '#a855f7',
    secondary: '#c084fc',
    bgDark: '#0a0314',
    tagText: 'TRACK 04 // KERNEL',
    badgeText: '★ LINUX RUNTIME ★',
    accent: '#a855f7',
  },
  // Track 5: MicroOS - Titanium Teal
  'evt-track-5': {
    primary: '#14b8a6',
    secondary: '#2dd4bf',
    bgDark: '#020e0c',
    tagText: 'TRACK 05 // SYSTEM',
    badgeText: '★ IMMUTABLE CORE ★',
    accent: '#14b8a6',
  },
  // Track 6: AI & Agents - Cyber Violet
  'evt-track-6': {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    bgDark: '#0d071a',
    tagText: 'TRACK 06 // AI',
    badgeText: '★ GEEKO AGENTS ★',
    accent: '#8b5cf6',
  },
  // Flagship 20H Hackathon - Signature openSUSE Green
  'evt-buildathon': {
    primary: '#73ba25',
    secondary: '#4ade80',
    bgDark: '#040d07',
    tagText: 'SIGNATURE HACK',
    badgeText: '★ 20-HOUR CLOCK ★',
    accent: '#73ba25',
  },
  // Arcade - Cyber Cyan Retro Arcade
  'evt-arcade': {
    primary: '#00f0ff',
    secondary: '#38bdf8',
    bgDark: '#021217',
    tagText: 'ARCADE ARENA',
    badgeText: '★ RETRO TOURNAMENT ★',
    accent: '#00f0ff',
  },
  // Fireside - Warm Sunset Campfire
  'evt-fireside': {
    primary: '#f97316',
    secondary: '#fb923c',
    bgDark: '#140602',
    tagText: 'COMMUNITY',
    badgeText: '★ FIRESIDE CHAT ★',
    accent: '#f97316',
  },
  // Keynotes - Cosmic Blue
  'evt-keynote': {
    primary: '#0ea5e9',
    secondary: '#38bdf8',
    bgDark: '#020914',
    tagText: 'KEYNOTE',
    badgeText: '★ MAIN AUDITORIUM ★',
    accent: '#0ea5e9',
  },
  // Awards & Closing - Rich Metallic Gold
  'evt-awards': {
    primary: '#eab308',
    secondary: '#facc15',
    bgDark: '#120c02',
    tagText: 'CEREMONY',
    badgeText: '★ ₹50,000 CASH POOL ★',
    accent: '#eab308',
  },
};

function getTheme(event) {
  if (EVENT_THEMES[event.id]) return EVENT_THEMES[event.id];

  const cat = (event.category || '').toLowerCase();
  const name = (event.name || '').toLowerCase();

  if (name.includes('arcade') || name.includes('game') || cat.includes('arcade')) {
    return EVENT_THEMES['evt-arcade'];
  }
  if (name.includes('fireside') || name.includes('chat')) {
    return EVENT_THEMES['evt-fireside'];
  }
  if (name.includes('keynote') || cat.includes('keynote')) {
    return EVENT_THEMES['evt-keynote'];
  }
  if (name.includes('award') || name.includes('closing') || name.includes('final')) {
    return EVENT_THEMES['evt-awards'];
  }
  if (cat.includes('workshop') || name.includes('workshop')) {
    return {
      primary: '#06b6d4',
      secondary: '#67e8f9',
      bgDark: '#020d10',
      tagText: 'WORKSHOP',
      badgeText: '★ HANDS-ON LAB ★',
      accent: '#06b6d4',
    };
  }
  if (cat.includes('talk')) {
    return {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      bgDark: '#080312',
      tagText: 'TECH TALK',
      badgeText: '★ BREAKOUT STAGE ★',
      accent: '#8b5cf6',
    };
  }

  // Neutral default
  return {
    primary: '#38bdf8',
    secondary: '#7dd3fc',
    bgDark: '#050a0d',
    tagText: 'OFFICIAL EVENT',
    badgeText: '★ CONNECT 2027 ★',
    accent: '#38bdf8',
  };
}

export function getOrCreateCardTexture(event) {
  if (!event || !event.id) return null;
  if (textureCache.has(event.id)) {
    return textureCache.get(event.id);
  }

  const width = 500;
  const height = 720;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const theme = getTheme(event);
  const accent = theme.accent;

  function renderPoster(loadedImage = null) {
    ctx.clearRect(0, 0, width, height);

    // 1. Dark Neutral Obsidian Base (No overall green wash!)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, theme.bgDark);
    bgGrad.addColorStop(0.6, '#080a0c');
    bgGrad.addColorStop(1, '#030405');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle Micro Grid Pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSize = 25;
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

    // 3. Central Artwork Frame (Takes up ~60% of the poster)
    const artX = 22;
    const artY = 66;
    const artW = width - 44;
    const artH = 390;

    if (loadedImage) {
      // Draw actual photo / poster image
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(artX, artY, artW, artH, 10);
      ctx.clip();
      ctx.drawImage(loadedImage, artX, artY, artW, artH);

      // Smooth dark vignette at bottom for seamless text readability
      const imgFade = ctx.createLinearGradient(0, artY, 0, artY + artH);
      imgFade.addColorStop(0, 'rgba(0, 0, 0, 0.05)');
      imgFade.addColorStop(0.65, 'rgba(0, 0, 0, 0.25)');
      imgFade.addColorStop(1, 'rgba(8, 10, 12, 0.95)');
      ctx.fillStyle = imgFade;
      ctx.fillRect(artX, artY, artW, artH);

      // Subtle fine scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      for (let y = artY; y < artY + artH; y += 4) {
        ctx.fillRect(artX, y, artW, 2);
      }
      ctx.restore();
    } else {
      // Fallback clean high-tech frame
      const fallGrad = ctx.createRadialGradient(
        artX + artW / 2,
        artY + artH / 2,
        20,
        artX + artW / 2,
        artY + artH / 2,
        220
      );
      fallGrad.addColorStop(0, `${accent}25`);
      fallGrad.addColorStop(1, '#050709');
      ctx.fillStyle = fallGrad;
      ctx.fillRect(artX, artY, artW, artH);

      // Clean crosshair geometry
      ctx.strokeStyle = `${accent}40`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(artX + artW / 2 - 35, artY + artH / 2);
      ctx.lineTo(artX + artW / 2 + 35, artY + artH / 2);
      ctx.moveTo(artX + artW / 2, artY + artH / 2 - 35);
      ctx.lineTo(artX + artW / 2, artY + artH / 2 + 35);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 26px "Space Grotesk", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(event.shortName || event.name.slice(0, 18), width / 2, artY + artH / 2 + 8);
      ctx.textAlign = 'left';
    }

    // Artwork Border (Clean, subtle accent)
    ctx.strokeStyle = `${accent}80`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(artX, artY, artW, artH);

    // Inner Corner Brackets for Artwork
    const bLen = 14;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(artX + 6, artY + 6 + bLen);
    ctx.lineTo(artX + 6, artY + 6);
    ctx.lineTo(artX + 6 + bLen, artY + 6);
    ctx.stroke();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(artX + artW - 6 - bLen, artY + 6);
    ctx.lineTo(artX + artW - 6, artY + 6);
    ctx.lineTo(artX + artW - 6, artY + 6 + bLen);
    ctx.stroke();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(artX + 6, artY + artH - 6 - bLen);
    ctx.lineTo(artX + 6, artY + artH - 6);
    ctx.lineTo(artX + 6 + bLen, artY + artH - 6);
    ctx.stroke();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(artX + artW - 6 - bLen, artY + artH - 6);
    ctx.lineTo(artX + artW - 6, artY + artH - 6);
    ctx.lineTo(artX + artW - 6, artY + artH - 6 - bLen);
    ctx.stroke();

    // 4. Top Header Tags
    // Left: Category Tag
    ctx.fillStyle = 'rgba(10, 14, 18, 0.85)';
    ctx.fillRect(22, 18, 175, 34);
    ctx.strokeStyle = `${accent}90`;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(22, 18, 175, 34);

    ctx.fillStyle = accent;
    ctx.font = 'bold 10.5px "Press Start 2P", monospace';
    ctx.fillText((theme.tagText || 'EVENT').slice(0, 14), 32, 40);

    // Right: Day Tag
    const dayStr = event.days ? event.days.join(' & ') : 'DAY 1';
    ctx.fillStyle = 'rgba(10, 14, 18, 0.85)';
    ctx.fillRect(width - 177, 18, 155, 34);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(width - 177, 18, 155, 34);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 10px "Press Start 2P", monospace';
    ctx.fillText(dayStr.toUpperCase().slice(0, 11), width - 164, 40);

    // 5. Highlight Badge Stamp on Artwork (Top Center/Floating)
    const badgeText = event.badge ? `★ ${event.badge} ★` : theme.badgeText;
    ctx.fillStyle = 'rgba(10, 12, 16, 0.88)';
    const bWidth = ctx.measureText(badgeText).width + 36;
    ctx.fillRect(artX + 14, artY + 14, bWidth, 26);
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(artX + 14, artY + 14, bWidth, 26);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px "Press Start 2P", monospace';
    ctx.fillText(badgeText.toUpperCase().slice(0, 26), artX + 24, artY + 31);

    // 6. Big Event Name (y = 475 to 535)
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
    ctx.shadowBlur = 8;
    ctx.font = 'bold 23px "Press Start 2P", monospace';

    const titleWords = (event.name || 'Event Title').toUpperCase().split(' ');
    let line1 = '';
    let line2 = '';
    for (let w of titleWords) {
      if ((line1 + w).length <= 15) {
        line1 += (line1 ? ' ' : '') + w;
      } else if ((line2 + w).length <= 16) {
        line2 += (line2 ? ' ' : '') + w;
      }
    }

    ctx.fillText(line1, 24, 492);
    if (line2) {
      ctx.fillText(line2, 24, 524);
    }
    ctx.shadowBlur = 0;

    // 7. Prize Banner / Highlight Strip (y = 545 to 585)
    const prizeY = line2 ? 546 : 526;
    const prizeText = event.prize || 'OFFICIAL OPENSUSE MERCH & TROPHIES';
    const displayPrize = prizeText.length > 32 ? prizeText.slice(0, 30) + '..' : prizeText;

    ctx.fillStyle = 'rgba(15, 20, 24, 0.7)';
    ctx.fillRect(22, prizeY, width - 44, 36);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(22, prizeY, width - 44, 36);

    ctx.fillStyle = '#fbbf24'; // Warm amber gold
    ctx.font = 'bold 9.5px "Press Start 2P", monospace';
    ctx.fillText(`★ PRIZE: ${displayPrize.toUpperCase()}`, 32, prizeY + 23);

    // 8. Venue & Telemetry line (y = 600 to 625)
    const teleY = prizeY + 48;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11.5px "JetBrains Mono", monospace';
    const venue = event.venue ? event.venue.slice(0, 36) : 'Newton School of Technology';
    ctx.fillText(`LOC: ${venue}`, 24, teleY);

    // 9. Bottom Action Button Strip (Tactile Obsidian Glass Button, Not loud green!)
    const btnY = height - 60;
    ctx.fillStyle = 'rgba(18, 24, 30, 0.9)';
    ctx.fillRect(22, btnY, width - 44, 42);

    ctx.strokeStyle = accent;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(22, btnY, width - 44, 42);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▶ INSPECT EVENT ◀', width / 2, btnY + 26);
    ctx.textAlign = 'left';

    // 10. Outer Card Border (Clean, non-flashy slate border with subtle corner accents)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Outer corner pixel squares in theme accent
    ctx.fillStyle = accent;
    const sq = 8;
    ctx.fillRect(6, 6, sq, sq);
    ctx.fillRect(width - 14, 6, sq, sq);
    ctx.fillRect(6, height - 14, sq, sq);
    ctx.fillRect(width - 14, height - 14, sq, sq);
  }

  renderPoster(null);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  if (event.poster) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      renderPoster(img);
      texture.needsUpdate = true;
    };
    img.onerror = () => {};
    img.src = event.poster;
  }

  textureCache.set(event.id, texture);
  return texture;
}
