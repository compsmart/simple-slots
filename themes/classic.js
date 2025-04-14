import { EffectPresets, EffectsHelper } from './effects.js';

export const ClassicTheme = {
    name: "Classic",
    visualEffects: {
        ...EffectPresets.retro,
        intensity: 0.85,
        reelEffects: {
            enabled: true,
            blurAmount: 6,
            lightTrails: false,
            spinningGlow: true,
            spinColor: '#ffd700' // Gold color for spin glow
        },
        // Add win effects configuration
        winEffects: {
            enabled: true,
            explosions: true,
            shockwave: true,
            flashingSymbols: true,
            spinEffect3d: {
                enabled: true,
                rotations: 1,
                duration: 1000,
                easing: 'easeOutBack'
            }
        },
        backgroundEffects: {
            enabled: false,
            particles: {
                enabled: true,
                count: 60,
                color: '#ffffff',
                size: { min: 2, max: 7 },
                sparkle: true
            },
            pulse: {
                enabled: true,
                color: '#220033',
                speed: 1200,
                intensity: 0.5
            }
        },
        themeSpecific: {
            epicWinAnimation: {
                enabled: true,
                name: "Fruity Jackpot",
                duration: 8000, // 5 seconds
                fruitExplosion: true,
                rainbowTrail: true,
                shimmerEffect: true
            }
        }
    }, symbols: [
        {
            name: "Diamond",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f44336'/%3E%3Cpath d='M40 30L80 30L60 90L40 90' stroke='white' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            imagePath: "images/symbols/classic/diamond.png",
            backgroundColor: "#add8e6",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 }
        },
        {
            name: "Seven",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f44336'/%3E%3Cpath d='M40 30L80 30L60 90L40 90' stroke='white' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            imagePath: "images/symbols/classic/seven.png",
            backgroundColor: "#f44336",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 }
        },
        {
            name: "Bell",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffc107'/%3E%3Ccircle cx='60' cy='50' r='30' fill='%23ffeb3b'/%3E%3Crect x='55' y='80' width='10' height='20' fill='%23795548'/%3E%3Ccircle cx='60' cy='105' r='5' fill='%23795548'/%3E%3C/svg%3E",
            imagePath: "images/symbols/classic/bell.png",
            backgroundColor: "#ffc107",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 }
        },
        {
            name: "Lemon",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffeb3b'/%3E%3Cellipse cx='60' cy='60' rx='40' ry='30' fill='%23fff176'/%3E%3C/svg%3E",
            imagePath: "images/symbols/classic/lemon.png",
            backgroundColor: "#ffeb3b",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 }
        },
        {
            name: "Cherry",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%234caf50'/%3E%3Ccircle cx='40' cy='80' r='20' fill='%23e53935'/%3E%3Ccircle cx='80' cy='80' r='20' fill='%23e53935'/%3E%3Cpath d='M60 30L40 80M60 30L80 80' stroke='%23795548' stroke-width='6' fill='none'/%3E%3C/svg%3E",
            imagePath: "images/symbols/classic/cherry.png",
            backgroundColor: "#4caf50",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 }
        },
    ],
    // Renderer for Classic theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Epic Win Animation
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            const epicWin = specific.epicWinAnimation;
            const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

            ctx.save();

            // Fruity Jackpot animation
            if (epicWin.fruitExplosion) {
                // Exploding fruits from the center
                const fruitCount = 20;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                for (let i = 0; i < fruitCount; i++) {
                    const angle = (i / fruitCount) * Math.PI * 2;
                    const distance = progress * canvas.width * 0.5;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    const size = 30 + Math.sin(timestamp / 200 + i) * 10;

                    // Draw a different fruit based on index
                    const fruitType = i % 5;
                    ctx.fillStyle = ['#ff0000', '#ffff00', '#00ff00', '#ff9900', '#ff00ff'][fruitType];
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw fruit details
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    if (fruitType === 0) { // Cherry stem
                        ctx.moveTo(x, y - size);
                        ctx.lineTo(x, y - size * 1.5);
                    } else if (fruitType === 1) { // Lemon segments
                        ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
                    }
                    ctx.stroke();
                }
            }

            // Rainbow trail effect
            if (epicWin.rainbowTrail) {
                const trailPoints = 40;
                ctx.lineWidth = 15;

                for (let i = 0; i < trailPoints; i++) {
                    const t = (timestamp / 1000 + i / 10) % 6;
                    const hue = (i / trailPoints) * 360;
                    ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${1 - progress * 0.5})`;

                    const x1 = Math.sin(t * 0.5) * canvas.width * 0.4 + canvas.width / 2;
                    const y1 = Math.cos(t * 0.7) * canvas.height * 0.3 + canvas.height / 2;
                    const x2 = Math.sin(t * 0.5 + 0.1) * canvas.width * 0.4 + canvas.width / 2;
                    const y2 = Math.cos(t * 0.7 + 0.1) * canvas.height * 0.3 + canvas.height / 2;

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }

            // Shimmer effect
            if (epicWin.shimmerEffect) {
                ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * Math.sin(timestamp / 200) + 0.3})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Add sparkles
                for (let i = 0; i < 50; i++) {
                    const x = Math.random() * canvas.width;
                    const y = Math.random() * canvas.height;
                    const size = Math.random() * 5 + 2;
                    const opacity = Math.random() * 0.7 + 0.3;

                    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // Big text announcement
            const textProgress = Math.min(1, progress * 2);
            const textSize = 60 + Math.sin(timestamp / 200) * 10;
            ctx.font = `bold ${textSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text with gold gradient
            const gradient = ctx.createLinearGradient(
                canvas.width / 2 - 200,
                canvas.height / 2,
                canvas.width / 2 + 200,
                canvas.height / 2
            );
            gradient.addColorStop(0, '#ffd700');
            gradient.addColorStop(0.5, '#ffffff');
            gradient.addColorStop(1, '#ffd700');

            ctx.fillStyle = gradient;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;

            const scale = 0.5 + textProgress * 0.5;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 3);
            ctx.scale(scale, scale);
            ctx.rotate(Math.sin(timestamp / 500) * 0.1);
            ctx.fillText("JACKPOT!", 0, 0);
            ctx.strokeText("JACKPOT!", 0, 0);
            ctx.restore();

            // Win amount
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.fillText(`${(window.betAmount * 50).toFixed(2)}`, canvas.width / 2, canvas.height / 2);
            ctx.strokeText(`${(window.betAmount * 50).toFixed(2)}`, canvas.width / 2, canvas.height / 2);

            ctx.restore();

            // End animation if complete
            if (progress >= 1) {
                window.isPlayingEpicWinAnimation = false;
            }
        }
    },
    /**
  * Renders an enhanced, dynamic jackpot win animation for a classic 5-reel slot game.
  *
  * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
  * @param {HTMLCanvasElement} canvas - The canvas element.
  * @param {number} elapsedTime - Total time elapsed since the animation started (in ms).
  * @param {number} deltaTime - Time since the last frame (in ms). Useful for physics/particle updates.
  * @param {number} winAmount - The amount won in the jackpot.
  */
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime, winAmount) => {
        const totalDuration = 8000; // Increased duration for more elaborate effects (8 seconds)

        console.log("Using totalDuration:", totalDuration); // <--- ADD THIS LINE

        const progress = Math.min(elapsedTime / totalDuration, 1.0);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // --- Easing Functions ---
        // Simple quadratic easing in/out
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        // Ease out cubic
        const easeOutCubic = t => (--t) * t * t + 1;
        // Ease out bounce (approx)
        const easeOutBounce = t => {
            const n1 = 7.5625;
            const d1 = 2.75;
            if (t < 1 / d1) { return n1 * t * t; }
            else if (t < 2 / d1) { return n1 * (t -= 1.5 / d1) * t + 0.75; }
            else if (t < 2.5 / d1) { return n1 * (t -= 2.25 / d1) * t + 0.9375; }
            else { return n1 * (t -= 2.625 / d1) * t + 0.984375; }
        };

        // --- Helper Functions ---
        const drawStar = (x, y, radius, points, inset, rotation = 0) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.beginPath();
            ctx.moveTo(0, 0 - radius);
            for (let i = 0; i < points; i++) {
                ctx.rotate(Math.PI / points);
                ctx.lineTo(0, 0 - (radius * inset));
                ctx.rotate(Math.PI / points);
                ctx.lineTo(0, 0 - radius);
            }
            ctx.closePath();
            ctx.restore();
        };

        const drawClassicSymbol = (symbolType, x, y, size, rotation = 0, alpha = 1) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.globalAlpha = alpha;
            ctx.lineWidth = Math.max(1, size / 15);
            ctx.strokeStyle = 'rgba(0,0,0,0.5)'; // Subtle outline

            // --- Seven (Red) ---
            if (symbolType === '7') {
                const grad = ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
                grad.addColorStop(0, '#ff4444');
                grad.addColorStop(0.5, '#ff0000');
                grad.addColorStop(1, '#cc0000');
                ctx.fillStyle = grad;
                ctx.font = `bold ${size * 0.9}px 'Arial Black', Gadget, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText("7", 0, size * 0.1); // Adjust vertical alignment
                ctx.strokeText("7", 0, size * 0.1);
            }
            // --- Bar (Gold/Yellow) ---
            else if (symbolType === 'Bar') {
                const grad = ctx.createLinearGradient(0, -size * 0.3, 0, size * 0.3);
                grad.addColorStop(0, '#ffffaa');
                grad.addColorStop(0.5, '#ffd700');
                grad.addColorStop(1, '#daa520');
                ctx.fillStyle = grad;
                const barHeight = size * 0.2;
                const barWidth = size * 0.8;
                ctx.fillRect(-barWidth / 2, -barHeight * 1.5, barWidth, barHeight);
                ctx.strokeRect(-barWidth / 2, -barHeight * 1.5, barWidth, barHeight);
                ctx.fillRect(-barWidth / 2, -barHeight / 2, barWidth, barHeight);
                ctx.strokeRect(-barWidth / 2, -barHeight / 2, barWidth, barHeight);
                ctx.fillRect(-barWidth / 2, barHeight / 2, barWidth, barHeight);
                ctx.strokeRect(-barWidth / 2, barHeight / 2, barWidth, barHeight);

                // Add "BAR" text
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.font = `bold ${size * 0.18}px 'Arial Black', Gadget, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText("BAR", 0, -barHeight);
                ctx.fillText("BAR", 0, 0);
                ctx.fillText("BAR", 0, barHeight);
            }
            // --- Bell (Bronze/Orange) ---
            else if (symbolType === 'Bell') {
                const grad = ctx.createRadialGradient(0, -size * 0.1, size * 0.05, 0, 0, size * 0.5);
                grad.addColorStop(0, '#ffcc99');
                grad.addColorStop(0.7, '#ffa500');
                grad.addColorStop(1, '#b87333'); // Bronze
                ctx.fillStyle = grad;

                // Bell shape
                ctx.beginPath();
                ctx.arc(0, -size * 0.05, size * 0.4, Math.PI * 0.1, Math.PI * 0.9, false); // Top arc
                ctx.lineTo(-size * 0.4, size * 0.3); // Left side
                ctx.arc(0, size * 0.3, size * 0.4, Math.PI, 0, false); // Bottom arc
                ctx.lineTo(size * 0.4, size * 0.3); // Right side
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Clapper
                ctx.fillStyle = '#8B4513'; // SaddleBrown
                ctx.beginPath();
                ctx.arc(0, size * 0.35, size * 0.1, 0, Math.PI * 2);
                ctx.fill();
            }
            // --- Cherry (Pink/Red) ---
            else if (symbolType === 'Cherry') {
                const r = size * 0.25;
                const stemLength = size * 0.4;
                const stemAngle = Math.PI / 6;

                // Cherries
                const grad1 = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
                grad1.addColorStop(0, '#ffcccc');
                grad1.addColorStop(0.7, '#ff0055');
                grad1.addColorStop(1, '#cc0033');

                const grad2 = ctx.createRadialGradient(r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
                grad2.addColorStop(0, '#ffcccc');
                grad2.addColorStop(0.7, '#ff0055');
                grad2.addColorStop(1, '#cc0033');

                ctx.fillStyle = grad1;
                ctx.beginPath();
                ctx.arc(-r * 0.9, size * 0.05, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = grad2;
                ctx.beginPath();
                ctx.arc(r * 0.9, size * 0.05, r, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Stems
                ctx.strokeStyle = '#006400'; // DarkGreen
                ctx.lineWidth = Math.max(1, size / 12);
                ctx.beginPath();
                ctx.moveTo(-r * 0.9, size * 0.05 - r * 0.8);
                ctx.lineTo(0, -stemLength * 0.8);
                ctx.moveTo(r * 0.9, size * 0.05 - r * 0.8);
                ctx.lineTo(0, -stemLength * 0.8);
                ctx.stroke();

                // Leaf
                ctx.fillStyle = '#228B22'; // ForestGreen
                ctx.beginPath();
                ctx.ellipse(0, -stemLength * 0.9, size * 0.2, size * 0.08, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();

            }
            // --- Lemon (Yellow) ---
            else if (symbolType === 'Lemon') {
                const grad = ctx.createRadialGradient(-size * 0.1, -size * 0.1, size * 0.05, 0, 0, size * 0.5);
                grad.addColorStop(0, '#ffffcc');
                grad.addColorStop(0.7, '#ffff00');
                grad.addColorStop(1, '#cccc00');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.ellipse(0, 0, size * 0.45, size * 0.35, 0, 0, Math.PI * 2); // Main body
                ctx.fill();
                ctx.stroke();
                // Stem nub
                ctx.fillStyle = '#9acd32'; // YellowGreen
                ctx.beginPath();
                ctx.arc(size * 0.4, -size * 0.1, size * 0.08, 0, Math.PI * 2);
                ctx.fill();
            }
            // --- Diamond (Blue/White) --- NEW
            else if (symbolType === 'Diamond') {
                const grad = ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.5, '#add8e6'); // LightBlue
                grad.addColorStop(1, '#4682b4'); // SteelBlue
                ctx.fillStyle = grad;

                ctx.beginPath();
                ctx.moveTo(0, -size * 0.5); // Top point
                ctx.lineTo(size * 0.4, -size * 0.1); // Top right facet
                ctx.lineTo(size * 0.25, size * 0.4); // Bottom right facet
                ctx.lineTo(-size * 0.25, size * 0.4); // Bottom left facet
                ctx.lineTo(-size * 0.4, -size * 0.1); // Top left facet
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Facet lines
                ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                ctx.lineWidth = Math.max(1, size / 25);
                ctx.beginPath();
                ctx.moveTo(0, -size * 0.5); ctx.lineTo(0, size * 0.1); // Center line top
                ctx.moveTo(-size * 0.4, -size * 0.1); ctx.lineTo(0, size * 0.1); // Left line
                ctx.moveTo(size * 0.4, -size * 0.1); ctx.lineTo(0, size * 0.1); // Right line
                ctx.moveTo(-size * 0.25, size * 0.4); ctx.lineTo(0, size * 0.1); // Bottom Left line
                ctx.moveTo(size * 0.25, size * 0.4); ctx.lineTo(0, size * 0.1); // Bottom Right line
                ctx.stroke();
            }

            ctx.restore();
        };

        // --- Particle System ---
        // Simple particle array (could be moved outside for persistence)
        if (!window.jackpotParticles) window.jackpotParticles = [];
        const particles = window.jackpotParticles;

        const createParticle = (x, y, color, type = 'sparkle', count = 1) => {
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = type === 'coin' ? Math.random() * 3 + 2 : Math.random() * 5 + 3; // Coins fall slower
                const life = type === 'coin' ? 1500 + Math.random() * 1000 : 500 + Math.random() * 500; // Coins last longer
                const size = type === 'coin' ? 10 + Math.random() * 15 : 3 + Math.random() * 4;
                const gravity = type === 'coin' ? 0.1 : 0.05; // Coins have more gravity
                particles.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: life,
                    initialLife: life,
                    color: color,
                    size: size,
                    gravity: gravity,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.2,
                    type: type
                });
            }
        };

        // Update and draw particles
        ctx.save();
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity * (deltaTime / 16.67); // Adjust gravity for frame rate
            p.life -= deltaTime;
            p.rotation += p.rotationSpeed;

            if (p.life <= 0) {
                particles.splice(i, 1);
            } else {
                const alpha = easeOutCubic(p.life / p.initialLife);
                ctx.globalAlpha = alpha;

                if (p.type === 'coin') {
                    // Draw simple rotating coin particle
                    ctx.fillStyle = p.color;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rotation);
                    // Draw ellipse that flattens as it rotates
                    const widthScale = Math.abs(Math.cos(p.rotation * 2)); // Make it flip
                    ctx.scale(widthScale, 1);
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    // Add shine
                    if (widthScale > 0.5) { // Only show shine when facing forward
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                        ctx.beginPath();
                        ctx.arc(-p.size * 0.15, -p.size * 0.15, p.size * 0.15, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.restore();

                } else { // Sparkle
                    ctx.fillStyle = p.color;
                    drawStar(p.x, p.y, p.size, 4, 0.5, p.rotation);
                    ctx.fill();
                }
            }
        }
        ctx.restore();


        // --- Background ---
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, '#110022'); // Darker purple/blue
        bgGradient.addColorStop(0.5, '#330044');
        bgGradient.addColorStop(1, '#110011'); // Darker near bottom
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle background stars
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
        for (let i = 0; i < 50; i++) {
            const x = (Math.sin(i * 1.23 + elapsedTime / 5000) * 0.5 + 0.5) * canvas.width; // Slow drift
            const y = (Math.cos(i * 3.45 + elapsedTime / 6000) * 0.5 + 0.5) * canvas.height;
            const size = 1 + Math.sin(elapsedTime / 500 + i) * 0.5 + 0.5; // Twinkle
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        // --- Screen Shake Simulation (subtle) ---
        const shakeIntensity = progress > 0.6 ? Math.max(0, (1 - (progress - 0.6) / 0.4)) * 10 : 0; // Shake during celebration start
        const shakeX = (Math.random() - 0.5) * shakeIntensity;
        const shakeY = (Math.random() - 0.5) * shakeIntensity;
        ctx.save();
        ctx.translate(shakeX, shakeY);


        // --- Animation Phases ---
        const phase1Duration = totalDuration * 0.25; // 0 - 2 sec: Reels land
        const phase2Duration = totalDuration * 0.35; // 2 - 4.8 sec: Symbols explode/showcase
        const phase3Duration = totalDuration * 0.40; // 4.8 - 8 sec: Coin rain & final display

        // --- Phase 1: Reels Landing (0% - 25%) ---
        if (progress <= 0.25) {
            const phaseProgress = elapsedTime / phase1Duration;
            const easedProgress = easeOutCubic(phaseProgress); // Use easing for slowdown

            const machineScale = 0.8; // Slightly smaller machine
            const machineWidth = canvas.width * 0.8 * machineScale;
            const machineHeight = canvas.height * 0.7 * machineScale;
            const machineX = centerX - machineWidth / 2;
            const machineY = centerY - machineHeight / 2 + 50; // Lowered a bit

            // Draw basic machine body (less focus now)
            const machineGrad = ctx.createLinearGradient(machineX, machineY, machineX, machineY + machineHeight);
            machineGrad.addColorStop(0, '#a00000');
            machineGrad.addColorStop(0.5, '#8b0000');
            machineGrad.addColorStop(1, '#600000');
            ctx.fillStyle = machineGrad;
            ctx.fillRect(machineX, machineY, machineWidth, machineHeight);

            // Chrome trim
            ctx.strokeStyle = '#e0e0e0';
            ctx.lineWidth = 8;
            ctx.strokeRect(machineX, machineY, machineWidth, machineHeight);

            // Draw display window
            const windowWidth = machineWidth * 0.85;
            const windowHeight = machineHeight * 0.4;
            const windowX = centerX - windowWidth / 2;
            const windowY = machineY + machineHeight * 0.15;
            const reelCount = 5; // Corrected reel count
            const reelWidth = windowWidth / reelCount;
            const reelSpacing = 5; // Space between reels

            ctx.fillStyle = '#111111'; // Darker window background
            ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
            ctx.strokeStyle = '#555555';
            ctx.lineWidth = 2;
            ctx.strokeRect(windowX, windowY, windowWidth, windowHeight);

            // Draw the reels - Slowing down to reveal jackpot symbols (e.g., 5 Diamonds)
            const symbols = ['7', 'Bar', 'Bell', 'Cherry', 'Lemon', 'Diamond']; // Include Diamond
            const jackpotSymbol = 'Diamond'; // Example jackpot symbol
            const symbolHeight = windowHeight * 0.8; // Size of symbol in window
            const verticalSpacing = windowHeight * 0.1;

            for (let i = 0; i < reelCount; i++) {
                const reelX = windowX + i * reelWidth + reelSpacing / 2;
                const currentReelWidth = reelWidth - reelSpacing;

                // Determine stop time for each reel
                const stopTime = (i + 1) / (reelCount + 1) * phase1Duration; // Reels stop sequentially

                ctx.save();
                ctx.beginPath();
                ctx.rect(reelX, windowY, currentReelWidth, windowHeight);
                ctx.clip(); // Clip drawing to the reel area

                if (elapsedTime < stopTime) {
                    // Reel is spinning
                    const spinSpeed = 1500; // Pixels per second
                    const offset = (elapsedTime * spinSpeed / 1000) % (symbolHeight + verticalSpacing);
                    const blurAmount = Math.max(0, 1 - (elapsedTime / stopTime)) * 10; // Blur decreases as it stops
                    ctx.filter = `blur(${blurAmount}px)`;

                    for (let j = -1; j < 3; j++) { // Draw a few symbols vertically
                        const symbolIndex = Math.floor(Math.random() * symbols.length); // Random symbols while spinning
                        const yPos = windowY + offset + j * (symbolHeight + verticalSpacing);
                        drawClassicSymbol(symbols[symbolIndex], reelX + currentReelWidth / 2, yPos + symbolHeight / 2, symbolHeight * 0.8);
                    }
                    ctx.filter = 'none'; // Reset filter

                } else {
                    // Reel has stopped - show jackpot symbol
                    const stopProgress = (elapsedTime - stopTime) / (phase1Duration * 0.1); // Short bounce duration
                    const bounceOffset = stopProgress < 1 ? Math.sin(stopProgress * Math.PI) * 15 : 0; // Simple bounce effect

                    const yPos = windowY + verticalSpacing + bounceOffset;
                    drawClassicSymbol(jackpotSymbol, reelX + currentReelWidth / 2, yPos + symbolHeight / 2, symbolHeight * 0.8);
                }
                ctx.restore(); // Remove clip

                // Draw reel dividers
                if (i < reelCount - 1) {
                    ctx.strokeStyle = '#777';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(reelX + currentReelWidth + reelSpacing / 2, windowY);
                    ctx.lineTo(reelX + currentReelWidth + reelSpacing / 2, windowY + windowHeight);
                    ctx.stroke();
                }
            }
        }

        // --- Phase 2: Symbol Explosion & Showcase (25% - 60%) ---
        if (progress > 0.25 && progress <= 0.60) {
            const phaseProgress = (elapsedTime - phase1Duration) / phase2Duration;
            const easedProgress = easeInOutQuad(phaseProgress);

            // Fade out machine (optional)
            // const machineAlpha = 1.0 - easedProgress;
            // ctx.globalAlpha = machineAlpha;
            // ... redraw machine elements if needed with this alpha ...
            // ctx.globalAlpha = 1.0;

            // Exploding symbols from reels (use the jackpot symbol)
            const jackpotSymbol = 'Diamond'; // Must match phase 1
            const numSymbols = 5; // Number of symbols to burst out
            const startSize = 50;
            const maxSize = 150;
            const explodeRadius = canvas.width * 0.4 * easedProgress;
            const rotationSpeed = Math.PI * 2 * easedProgress;

            if (phaseProgress < 0.1 && phaseProgress > 0) { // Trigger particles at the start
                const windowWidth = canvas.width * 0.8 * 0.8 * 0.85; // Recalculate approx window pos
                const windowX = centerX - windowWidth / 2;
                createParticle(windowX + windowWidth / 2, centerY, '#ffff00', 'sparkle', 50);
                createParticle(windowX + windowWidth / 2, centerY, '#ffffff', 'sparkle', 50);
            }


            for (let i = 0; i < numSymbols; i++) {
                const angle = (i / numSymbols) * Math.PI * 2 - Math.PI / 2 + rotationSpeed; // Rotate the circle
                const x = centerX + Math.cos(angle) * explodeRadius;
                const y = centerY + Math.sin(angle) * explodeRadius;
                const size = startSize + (maxSize - startSize) * easedProgress;
                const alpha = Math.min(1, easedProgress * 4); // Fade in quickly
                const symbolRotation = angle + Math.PI / 2; // Make symbols face outwards

                drawClassicSymbol(jackpotSymbol, x, y, size, symbolRotation, alpha);
            }

            // Add radiating light beams from center
            const beamCount = 10;
            const beamLength = canvas.width * 1.5 * easedProgress;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for bright beams
            for (let i = 0; i < beamCount; i++) {
                const angle = (i / beamCount) * Math.PI * 2 + elapsedTime / 2000; // Slow rotation
                const beamWidth = 50 * (1 - easedProgress); // Beams get thinner

                const grad = ctx.createLinearGradient(0, 0, Math.cos(angle) * beamLength, Math.sin(angle) * beamLength);
                grad.addColorStop(0, `rgba(255, 255, 180, ${0.5 * easedProgress})`); // Yellowish center
                grad.addColorStop(1, `rgba(255, 255, 200, 0)`); // Fade out

                ctx.strokeStyle = grad;
                ctx.lineWidth = beamWidth;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + Math.cos(angle) * beamLength, centerY + Math.sin(angle) * beamLength);
                ctx.stroke();
            }
            ctx.restore();
        }

        // --- Phase 3: Coin Rain & Final Display (60% - 100%) ---
        if (progress > 0.60) {
            const phaseProgress = (elapsedTime - phase1Duration - phase2Duration) / phase3Duration;
            const easedProgress = easeOutCubic(phaseProgress);

            // --- Coin Rain ---
            const maxCoinParticles = 150;
            if (particles.filter(p => p.type === 'coin').length < maxCoinParticles && Math.random() < 0.8) { // Add coins frequently
                const spawnX = Math.random() * canvas.width;
                const spawnY = -50; // Start above screen
                const color = ['#ffd700', '#ffec8b', '#f0e68c'][Math.floor(Math.random() * 3)]; // Gold variations
                createParticle(spawnX, spawnY, color, 'coin', 1);
            }

            // --- Jackpot Display Box ---
            const displayScale = easeOutBounce(Math.min(1, phaseProgress * 2)); // Bounce in effect
            if (displayScale > 0.01) { // Only draw if visible
                const displayWidth = canvas.width * 0.7 * displayScale;
                const displayHeight = canvas.height * 0.2 * displayScale;
                const displayX = centerX - displayWidth / 2;
                const displayY = centerY - displayHeight / 2;
                const borderRadius = 20 * displayScale;

                ctx.save();
                ctx.globalAlpha = Math.min(1, phaseProgress * 3); // Fade in

                // Background box with gradient and rounded corners
                const boxGrad = ctx.createLinearGradient(displayX, displayY, displayX, displayY + displayHeight);
                boxGrad.addColorStop(0, '#222222');
                boxGrad.addColorStop(1, '#000000');
                ctx.fillStyle = boxGrad;
                ctx.beginPath();
                ctx.moveTo(displayX + borderRadius, displayY);
                ctx.lineTo(displayX + displayWidth - borderRadius, displayY);
                ctx.quadraticCurveTo(displayX + displayWidth, displayY, displayX + displayWidth, displayY + borderRadius);
                ctx.lineTo(displayX + displayWidth, displayY + displayHeight - borderRadius);
                ctx.quadraticCurveTo(displayX + displayWidth, displayY + displayHeight, displayX + displayWidth - borderRadius, displayY + displayHeight);
                ctx.lineTo(displayX + borderRadius, displayY + displayHeight);
                ctx.quadraticCurveTo(displayX, displayY + displayHeight, displayX, displayY + displayHeight - borderRadius);
                ctx.lineTo(displayX, displayY + borderRadius);
                ctx.quadraticCurveTo(displayX, displayY, displayX + borderRadius, displayY);
                ctx.closePath();
                ctx.fill();

                // Inner bevel/highlight
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 3 * displayScale;
                ctx.stroke();


                // --- Flashing Lights Border ---
                const lightCount = 24;
                const lightRadius = 10 * displayScale;
                const borderPadding = lightRadius * 1.5;
                for (let i = 0; i < lightCount; i++) {
                    let lx, ly;
                    const segmentLenX = (displayWidth - borderPadding * 2) / (lightCount / 2 - 1);
                    const segmentLenY = (displayHeight - borderPadding * 2) / (lightCount / 2 - 1); // Assuming rect-like distribution for simplicity

                    // Distribute lights around the rounded rectangle perimeter (approximate)
                    const halfCount = lightCount / 2;
                    const quarterCount = lightCount / 4;
                    if (i < quarterCount) { // Top edge
                        lx = displayX + borderPadding + i * (displayWidth - borderPadding * 2) / (quarterCount - 1);
                        ly = displayY + borderPadding;
                    } else if (i < halfCount) { // Right edge
                        lx = displayX + displayWidth - borderPadding;
                        ly = displayY + borderPadding + (i - quarterCount) * (displayHeight - borderPadding * 2) / (quarterCount - 1);
                    } else if (i < halfCount + quarterCount) { // Bottom edge
                        lx = displayX + displayWidth - borderPadding - (i - halfCount) * (displayWidth - borderPadding * 2) / (quarterCount - 1);
                        ly = displayY + displayHeight - borderPadding;
                    } else { // Left edge
                        lx = displayX + borderPadding;
                        ly = displayY + displayHeight - borderPadding - (i - halfCount - quarterCount) * (displayHeight - borderPadding * 2) / (quarterCount - 1);
                    }


                    const blinkSpeed = 150; // ms per blink state change
                    const isLightOn = Math.floor(elapsedTime / blinkSpeed + i) % 2 === 0;
                    const lightColor = ['#ff0000', '#ffff00', '#00ff00', '#00ffff'][i % 4];

                    ctx.fillStyle = isLightOn ? lightColor : '#333333';
                    // Add glow for on lights
                    if (isLightOn) {
                        ctx.shadowColor = lightColor;
                        ctx.shadowBlur = 15 * displayScale;
                    } else {
                        ctx.shadowBlur = 0;
                    }

                    ctx.beginPath();
                    ctx.arc(lx, ly, lightRadius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0; // Reset shadow
                }


                // --- Jackpot Amount Text ---
                const targetAmount = winAmount;
                // Animate the number counting up quickly
                const countUpDuration = 500; // 0.5 seconds to count up
                const countUpProgress = Math.min(1, (elapsedTime - (phase1Duration + phase2Duration)) / countUpDuration);
                const displayedAmount = targetAmount * easeOutCubic(countUpProgress);

                const jackpotText = displayedAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }); // Format as currency
                const fontSize = Math.min(80, displayHeight * 0.5) * displayScale; // Scale font size too

                ctx.font = `bold ${fontSize}px "Orbitron", "Digital-7", monospace`; // Use a digital-style font (Orbitron is a good free alternative)
                ctx.fillStyle = '#ff4444'; // Bright red text
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                // Add text shadow/glow
                ctx.shadowColor = '#ff0000';
                ctx.shadowBlur = 20 * displayScale;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;

                ctx.fillText(jackpotText, centerX, centerY);

                ctx.restore(); // Restore alpha and shadow state
            }

            // Add final celebration sparkles
            if (phaseProgress > 0.5 && Math.random() > 0.7) {
                const sparkleX = centerX + (Math.random() - 0.5) * canvas.width * 0.6;
                const sparkleY = centerY + (Math.random() - 0.5) * canvas.height * 0.4;
                const sparkleColor = ['#ffffff', '#ffff00', '#ffdddd'][Math.floor(Math.random() * 3)];
                createParticle(sparkleX, sparkleY, sparkleColor, 'sparkle', 2);
            }
        }


        // --- Draw "JACKPOT!" Text --- (Appears earlier, grows, stays)
        const textAppearStartTime = totalDuration * 0.15; // Start appearing during reel slow down
        const textGrowDuration = totalDuration * 0.4; // Time to reach full size
        if (elapsedTime > textAppearStartTime) {
            const textProgress = Math.min(1.0, (elapsedTime - textAppearStartTime) / textGrowDuration);
            const easedTextProgress = easeOutBounce(textProgress); // Bounce effect

            const baseFontSize = Math.min(canvas.width / 8, 120); // Responsive base size
            const fontSize = baseFontSize * easedTextProgress;
            const textY = centerY - canvas.height * 0.35; // Position above center

            // Add subtle wobble
            const wobbleAngle = Math.sin(elapsedTime / 200) * 0.03 * (1 - textProgress * 0.5); // Wobble decreases as it settles
            const wobbleY = Math.cos(elapsedTime / 150) * 5 * (1 - textProgress * 0.5);

            if (fontSize > 1) { // Only draw if font size is meaningful
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.translate(centerX, textY + wobbleY);
                ctx.rotate(wobbleAngle);

                ctx.font = `bold ${fontSize}px "Impact", "Arial Black", sans-serif`;

                // Multi-layer Neon Glow Effect
                ctx.shadowColor = '#ff00ff'; // Magenta outer glow
                ctx.shadowBlur = 30 * textProgress;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.fillStyle = 'rgba(0,0,0,0)'; // Invisible fill, only draw shadow
                ctx.fillText("JACKPOT!", 0, 0); // Draw outer glow

                ctx.shadowColor = '#ffff00'; // Yellow inner glow
                ctx.shadowBlur = 15 * textProgress;
                ctx.fillText("JACKPOT!", 0, 0); // Draw inner glow


                // Chrome/Metallic Text Gradient
                const textGradient = ctx.createLinearGradient(-canvas.width * 0.4, 0, canvas.width * 0.4, 0);
                textGradient.addColorStop(0, '#f0f0f0');
                textGradient.addColorStop(0.1, '#ffffff');
                textGradient.addColorStop(0.5, '#bbbbbb');
                textGradient.addColorStop(0.9, '#ffffff');
                textGradient.addColorStop(1, '#f0f0f0');

                ctx.fillStyle = textGradient;
                ctx.shadowBlur = 0; // Turn off shadow for main text fill

                ctx.fillText("JACKPOT!", 0, 0);

                // Add a thin dark outline for definition
                ctx.lineWidth = Math.max(1, fontSize / 30);
                ctx.strokeStyle = '#333333';
                ctx.strokeText("JACKPOT!", 0, 0);

                ctx.restore();
            }

        }

        // Inside renderEnhancedJackpotAnimation, right before the end:
        console.log(`Animation frame: elapsedTime=${elapsedTime.toFixed(0)}, progress=${progress.toFixed(3)}, returning=${progress < 1.0}`);
        // Restore context after screen shake
        ctx.restore();

        // Request next frame if animation is not complete
        return progress < 1.0;
    }

    // --- Example Usage ---
    /*
    const canvas = document.getElementById('slotCanvas');
    const ctx = canvas.getContext('2d');
    let startTime = null;
    let animationActive = true;
    const jackpotWinAmount = 12345.67; // Example win amount
    
    function animationLoop(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        const deltaTime = timestamp - (window.lastFrameTime || timestamp); // Calculate deltaTime
        window.lastFrameTime = timestamp;
    
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
        // Call the enhanced animation function
        animationActive = renderEnhancedJackpotAnimation(ctx, canvas, elapsedTime, deltaTime, jackpotWinAmount);
    
        if (animationActive) {
            requestAnimationFrame(animationLoop);
        } else {
            console.log("Animation Complete!");
            // Optionally clear particles or reset state here
            // window.jackpotParticles = [];
        }
    }
    
    // Start the animation
    // Make sure canvas has width and height set!
    canvas.width = 800;
    canvas.height = 600;
    requestAnimationFrame(animationLoop);
    
    // Ensure fonts are loaded or use web-safe alternatives
    // You might need @font-face rules in CSS for "Orbitron" or "Digital-7"
    */
};


