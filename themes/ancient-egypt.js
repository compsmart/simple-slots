// filepath: c:\projects\copilot-agent\slot-game\themes\ancient-egypt.js
import { EffectPresets, EffectsHelper } from './effects.js';

export const AncientEgyptTheme = {
    name: "AncientEgypt",
    visualEffects: {
        ...EffectPresets.neon,
        intensity: 0.75,
        neonGlow: {
            enabled: true,
            color: '#ffd700', // Gold color
            size: 10,
            pulseSpeed: 1500,
            intensity: 0.8
        },
        electricEdges: {
            enabled: false,
            color: '#ffeebb',
            arcs: 4,
            speed: 1000,
            intensity: 0.6
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
                count: 40,
                color: '#ffd700',
                size: { min: 1, max: 4 }
            },
            pulse: {
                enabled: true,
                color: '#332200',
                speed: 3000,
                intensity: 0.4
            }
        },
        themeSpecific: {
            sandStorm: {
                enabled: true,
                intensity: 0.7,
                color: '#d4b683'
            },
            hieroglyphGlow: {
                enabled: true,
                color: '#ffcc00'
            },
            epicWinAnimation: {
                enabled: true,
                name: "Pharaoh's Treasure",
                duration: 8000, // 6 seconds
                pyramidExplosion: true,
                goldenRain: true,
                sphinxReveal: false
            }
        }
    },
    symbols: [
        {
            name: "Pharaoh Mask",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23DAA520'/%3E%3Crect x='35' y='30' width='50' height='60' rx='10' ry='10' fill='%23005792'/%3E%3Crect x='45' y='35' width='30' height='40' fill='%23FDBE34'/%3E%3Crect x='40' y='85' width='40' height='10' fill='%23005792'/%3E%3Ccircle cx='50' cy='60' r='5' fill='white'/%3E%3Ccircle cx='70' cy='60' r='5' fill='white'/%3E%3C/svg%3E",
            backgroundColor: "#DAA520",
            multiplier: 12,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 }
        },
        {
            name: "Scarab Beetle",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%2300838f'/%3E%3Cellipset cx='60' cy='60' rx='35' ry='25' fill='%2300bcd4'/%3E%3Cpath d='M60 35 V 85 M40 45 L 80 75 M 80 45 L 40 75' stroke='%23263238' stroke-width='4'/%3E%3C/svg%3E",
            backgroundColor: "#00838f",
            multiplier: 6,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 }
        },
        {
            name: "Eye of Horus",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%238d6e63'/%3E%3Cpath d='M30 60 Q 60 40 90 60 Q 60 80 30 60 Z' fill='white' stroke='black' stroke-width='3'/%3E%3Ccircle cx='60' cy='60' r='10' fill='%231e88e5'/%3E%3Cpath d='M60 70 L 50 90 M60 70 L 75 85 Q 90 95 90 80' stroke='black' stroke-width='4' fill='none'/%3E%3C/svg%3E",
            backgroundColor: "#8d6e63",
            multiplier: 4,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 }
        },
        {
            name: "Ankh",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffab00'/%3E%3Cpath d='M60 55 V 100 M 40 75 H 80' stroke='%233e2723' stroke-width='8'/%3E%3Cellipse cx='60' cy='40' rx='15' ry='20' stroke='%233e2723' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            backgroundColor: "#ffab00",
            multiplier: 3,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 }
        },
        {
            name: "Papyrus Scroll",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23c8e6c9'/%3E%3Crect x='30' y='30' width='60' height='60' rx='5' ry='5' fill='%23f5f5dc' stroke='%238d6e63' stroke-width='3'/%3E%3Cpath d='M35 40 h 50 M 35 50 h 40 M 35 60 h 50 M 35 70 h 30 M 35 80 h 45' stroke='%235d4037' stroke-width='2'/%3E%3C/svg%3E",
            backgroundColor: "#c8e6c9",
            multiplier: 2,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 }
        }
    ],
    // Renderer for Ancient Egypt theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Epic Win Animation for Ancient Egypt theme
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            const epicWin = specific.epicWinAnimation;
            const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

            ctx.save();

            // Pyramid explosion effect
            if (epicWin.pyramidExplosion) {
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2 + 50;

                // Draw the pyramid
                const pyramidHeight = 200;
                const pyramidBase = 250;
                const pyramidTop = centerY - pyramidHeight;
                const pyramidLeft = centerX - pyramidBase / 2;
                const pyramidRight = centerX + pyramidBase / 2;

                // Base pyramid
                ctx.fillStyle = '#ffd700';
                ctx.beginPath();
                ctx.moveTo(centerX, pyramidTop - 20 * Math.sin(timestamp / 200));
                ctx.lineTo(pyramidLeft, centerY);
                ctx.lineTo(pyramidRight, centerY);
                ctx.closePath();
                ctx.fill();

                // Add texture lines
                ctx.strokeStyle = '#8d6e63';
                ctx.lineWidth = 2;
                for (let i = 0; i < 5; i++) {
                    const y = pyramidTop + (centerY - pyramidTop) * (i / 5);
                    const width = pyramidBase * (i / 5);
                    ctx.beginPath();
                    ctx.moveTo(centerX - width / 2, y);
                    ctx.lineTo(centerX + width / 2, y);
                    ctx.stroke();
                }

                // Explosion particles
                const particles = 30;
                for (let i = 0; i < particles; i++) {
                    const angle = (i / particles) * Math.PI * 2;
                    const distance = progress * canvas.width * 0.4;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY - 50 + Math.sin(angle) * distance;

                    // Draw particle
                    ctx.fillStyle = i % 2 === 0 ? '#ffd700' : '#f5f5dc';

                    // Randomize particle shape
                    if (i % 3 === 0) { // Triangle
                        ctx.beginPath();
                        ctx.moveTo(x, y - 15);
                        ctx.lineTo(x - 10, y + 5);
                        ctx.lineTo(x + 10, y + 5);
                        ctx.closePath();
                        ctx.fill();
                    } else { // Square
                        ctx.fillRect(x - 8, y - 8, 16, 16);
                    }
                }
            }

            // Golden rain effect
            if (epicWin.goldenRain) {
                const raindrops = 100;

                for (let i = 0; i < raindrops; i++) {
                    const x = (i / raindrops) * canvas.width + (Math.sin(timestamp / 1000 + i) * 30);
                    const speed = 3 + (i % 5) * 2;
                    const y = ((timestamp / speed + i * 30) % canvas.height);

                    // Draw gold coins
                    ctx.fillStyle = '#ffd700';
                    ctx.beginPath();
                    ctx.arc(x, y, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#b7950b';
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Add coin details
                    ctx.beginPath();
                    ctx.arc(x, y, 3, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }



            // Big text announcement
            const textProgress = Math.min(1, progress * 2);
            const textSize = 60 + Math.sin(timestamp / 200) * 10;
            ctx.font = `bold ${textSize}px "Papyrus", fantasy`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text with gold gradient
            const gradient = ctx.createLinearGradient(
                canvas.width / 2 - 200,
                canvas.height / 2 - 100,
                canvas.width / 2 + 200,
                canvas.height / 2 - 100
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
            ctx.fillText("PHARAOH'S FORTUNE!", 0, 0);
            ctx.strokeText("PHARAOH'S FORTUNE!", 0, 0);
            ctx.restore();

            // Win amount
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = '#ffd700';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.fillText(`${(window.betAmount * 100).toFixed(2)}`, canvas.width / 2, canvas.height / 2 - 50);
            ctx.strokeText(`${(window.betAmount * 100).toFixed(2)}`, canvas.width / 2, canvas.height / 2 - 50);

            ctx.restore();

            // End animation if complete
            if (progress >= 1) {
                window.isPlayingEpicWinAnimation = false;
            }
        }
        // Sand Storm effect
        if (specific?.sandStorm?.enabled) {
            const sandSettings = specific.sandStorm;
            const intensity = sandSettings?.intensity || 0.3;
            const sandColor = sandSettings?.color || '#d4b683';

            // Initialize sand particles if they don't exist
            if (!ctx.sandParticles) {
                ctx.sandParticles = [];
                const particleCount = Math.floor(100 * intensity);

                for (let i = 0; i < particleCount; i++) {
                    ctx.sandParticles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 3 + 1,
                        speedX: (Math.random() - 0.3) * 2, // Mostly moving right
                        speedY: (Math.random() - 0.5) * 1, // Slight vertical movement
                        opacity: Math.random() * 0.5 + 0.2
                    });
                }
            }

            // Get the current wind intensity based on time
            const windPulse = (Math.sin(timestamp / 5000) * 0.3 + 0.7); // 0.4 to 1.0

            // Update and draw sand particles
            ctx.save();
            ctx.sandParticles.forEach(particle => {
                // Update position with wind effect
                particle.x += particle.speedX * windPulse;
                particle.y += particle.speedY;

                // Wrap around screen edges
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.y > canvas.height) particle.y = 0;
                if (particle.y < 0) particle.y = canvas.height;

                // Draw the sand particle
                ctx.fillStyle = sandColor;
                ctx.globalAlpha = particle.opacity * intensity;

                // Create elongated particle for sand/dust effect
                ctx.beginPath();
                ctx.ellipse(
                    particle.x,
                    particle.y,
                    particle.size * 2, // Horizontal radius
                    particle.size, // Vertical radius
                    0, // Rotation
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });
            ctx.restore();

            // Add a subtle sand overlay across the screen
            const overlayIntensity = intensity * 0.15 * windPulse;
            ctx.fillStyle = `${sandColor}${Math.floor(overlayIntensity * 255).toString(16).padStart(2, '0')}`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Hieroglyph Glow effect
        if (specific?.hieroglyphGlow?.enabled) {
            const glowSettings = specific.hieroglyphGlow;
            const intensity = glowSettings?.intensity || 0.6;
            const glowColor = glowSettings?.color || '#ffcc00';

            // Calculate the reel area dimensions
            const SYMBOL_SIZE = 100;
            const REEL_COUNT = 5;
            const VISIBLE_ROWS = 3;

            const reelWidth = SYMBOL_SIZE;
            const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
            const startX = reelSpacing;
            const startY = 100;
            const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;
            const totalWidth = REEL_COUNT * reelWidth + (REEL_COUNT - 1) * reelSpacing;

            // Define Egyptian hieroglyphs as small path commands
            const hieroglyphs = [
                // Ankh symbol
                (x, y, size) => {
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y + size * 0.7);
                    ctx.moveTo(x - size * 0.3, y + size * 0.3);
                    ctx.lineTo(x + size * 0.3, y + size * 0.3);
                    ctx.moveTo(x, y - size * 0.2);
                    ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
                    ctx.stroke();
                },
                // Eye of Horus simplified
                (x, y, size) => {
                    ctx.beginPath();
                    ctx.moveTo(x - size * 0.3, y);
                    ctx.quadraticCurveTo(x, y - size * 0.2, x + size * 0.3, y);
                    ctx.quadraticCurveTo(x, y + size * 0.2, x - size * 0.3, y);
                    ctx.moveTo(x, y);
                    ctx.lineTo(x + size * 0.2, y + size * 0.2);
                    ctx.stroke();
                },
                // Pyramid symbol
                (x, y, size) => {
                    ctx.beginPath();
                    ctx.moveTo(x - size * 0.3, y + size * 0.2);
                    ctx.lineTo(x, y - size * 0.3);
                    ctx.lineTo(x + size * 0.3, y + size * 0.2);
                    ctx.closePath();
                    ctx.stroke();
                },
                // Sun disc
                (x, y, size) => {
                    ctx.beginPath();
                    ctx.arc(x, y, size * 0.15, 0, Math.PI * 2);
                    ctx.moveTo(x - size * 0.3, y);
                    ctx.lineTo(x + size * 0.3, y);
                    ctx.moveTo(x, y - size * 0.3);
                    ctx.lineTo(x, y + size * 0.3);
                    ctx.stroke();
                },
                // Wave pattern (water)
                (x, y, size) => {
                    ctx.beginPath();
                    ctx.moveTo(x - size * 0.3, y);
                    ctx.quadraticCurveTo(x - size * 0.15, y - size * 0.2, x, y);
                    ctx.quadraticCurveTo(x + size * 0.15, y + size * 0.2, x + size * 0.3, y);
                    ctx.stroke();
                }
            ];

            // Calculate the glow pulse
            const pulseSpeed = glowSettings?.pulseSpeed || 4000;
            const pulseFactor = (Math.sin(timestamp / pulseSpeed) * 0.3 + 0.7) * intensity;

            // Draw hieroglyphs around the reels
            ctx.save();

            // Set style for hieroglyphs
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 2;
            ctx.globalAlpha = pulseFactor;

            // Add a subtle golden glow effect behind the reels
            const centerX = startX + totalWidth / 2;
            const centerY = startY + reelViewportHeight / 2;
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 10,
                centerX, centerY, totalWidth / 1.5
            );
            gradient.addColorStop(0, `${glowColor}${Math.floor(pulseFactor * 30).toString(16).padStart(2, '0')}`);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw hieroglyphs along the borders
            const hieroglyphSize = 20;
            const spacing = 50; // Distance between hieroglyphs

            // Draw hieroglyphs at the top
            for (let x = hieroglyphSize; x < canvas.width; x += spacing) {
                const index = Math.floor(x / spacing) % hieroglyphs.length;
                hieroglyphs[index](x, hieroglyphSize, hieroglyphSize);
            }

            // Draw hieroglyphs at the bottom
            for (let x = hieroglyphSize + spacing / 2; x < canvas.width; x += spacing) {
                const index = Math.floor(x / spacing) % hieroglyphs.length;
                hieroglyphs[index](x, canvas.height - hieroglyphSize, hieroglyphSize);
            }

            // Draw hieroglyphs on the left
            for (let y = hieroglyphSize * 2; y < canvas.height - hieroglyphSize; y += spacing) {
                const index = Math.floor(y / spacing) % hieroglyphs.length;
                hieroglyphs[index](hieroglyphSize, y, hieroglyphSize);
            }

            // Draw hieroglyphs on the right
            for (let y = hieroglyphSize * 2 + spacing / 2; y < canvas.height - hieroglyphSize; y += spacing) {
                const index = Math.floor(y / spacing) % hieroglyphs.length;
                hieroglyphs[index](canvas.width - hieroglyphSize, y, hieroglyphSize);
            }

            ctx.restore();
        }
    },
    /**
 * Renders an Epic Win Animation with improved graphics and effects.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {number} elapsedTime - Total time elapsed since animation start (ms).
 * @param {number} deltaTime - Time elapsed since last frame (ms).
 */
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime) => {
        const duration = 7000; // Increased duration for more spectacle (7 seconds)
        const progress = Math.min(elapsedTime / duration, 1.0);

        // --- Easing Function (Ease-in-out Quad) ---
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

        // --- Configuration ---
        const config = {
            pyramidBaseWidth: canvas.width * 0.6,
            pyramidHeightRatio: 0.75, // height relative to base width
            pyramidColor1: '#c7a76a', // Lighter sand stone
            pyramidColor2: '#a1814a', // Darker sand stone
            pyramidOutline: '#4d3a1f', // Dark brown outline
            gold1: '#ffd700', // Bright Gold
            gold2: '#f0c000', // Medium Gold
            gold3: '#b8860b', // Dark Gold / Bronze
            skyColor1: '#0b1a33', // Deep night blue
            skyColor2: '#203050', // Lighter night blue
            sandColor1: '#e6b143', // Dune highlight
            sandColor2: '#996633', // Dune shadow
            textColor: '#ffe070', // Golden yellow text
            textOutline: '#604010', // Dark brown text outline
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            starCount: 150,
            coinCount: 100,
            fragmentCount: 50,
        };

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // --- Helper Functions ---
        const drawStar = (x, y, radius, alpha) => {
            ctx.fillStyle = `rgba(255, 255, 200, ${alpha * (0.5 + Math.random() * 0.5)})`; // Twinkle effect
            ctx.beginPath();
            ctx.arc(x, y, radius * (0.8 + Math.random() * 0.4), 0, Math.PI * 2);
            ctx.fill();
        };

        const drawHieroglyph = (x, y, size, alpha, seed) => {
            ctx.globalAlpha = alpha;
            ctx.fillStyle = config.pyramidOutline;
            ctx.font = `${size}px Arial`; // Using simple characters for variety
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const glyphs = ['𓂀', '𓋹', ' V', ' ~', '𓅊', 'II', 'O']; // Eye, Ankh, simple shapes
            ctx.fillText(glyphs[Math.floor(seed * glyphs.length) % glyphs.length], x, y);
            ctx.globalAlpha = 1.0;
        };

        const drawCoin = (x, y, size, rotation, tilt, type) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            const thickness = Math.max(1, size * 0.15 * Math.abs(Math.cos(tilt))); // Simulate thickness based on tilt
            const radiusX = size / 2;
            const radiusY = size / 2 * Math.abs(Math.sin(tilt)); // Ellipse for 3D effect

            // Determine color based on type
            let grad1, grad2, grad3;
            if (type === 'gold') {
                grad1 = config.gold1; grad2 = config.gold2; grad3 = config.gold3;
            } else if (type === 'silver') {
                grad1 = '#f0f0f0'; grad2 = '#c0c0c0'; grad3 = '#a8a8a8';
            } else { // Gem (e.g., Ruby)
                grad1 = '#ff7070'; grad2 = '#d03030'; grad3 = '#a01010';
            }

            // Edge (darker side)
            ctx.fillStyle = grad3;
            ctx.beginPath();
            ctx.ellipse(0, thickness / 2, radiusX, radiusY, 0, 0, Math.PI * 2);
            ctx.fill();

            // Face (gradient)
            const coinGradient = ctx.createLinearGradient(-radiusX, -radiusY, radiusX, radiusY);
            coinGradient.addColorStop(0, grad1);
            coinGradient.addColorStop(0.5, grad2);
            coinGradient.addColorStop(1, grad3);
            ctx.fillStyle = coinGradient;
            ctx.beginPath();
            ctx.ellipse(0, -thickness / 2, radiusX, radiusY, 0, 0, Math.PI * 2);
            ctx.fill();

            // Shine / Detail (simplified)
            if (type !== 'gem' && Math.sin(tilt) > 0.3) { // Only add detail if face is visible
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.lineWidth = Math.max(1, size * 0.05);
                ctx.beginPath();
                ctx.arc(0, -thickness / 2, radiusX * 0.7, Math.PI * 1.6, Math.PI * 1.9);
                ctx.stroke();
            } else if (type === 'gem') { // Sparkle for gems
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(radiusX * 0.3, -thickness / 2 - radiusY * 0.3, size * 0.08, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        };

        // --- Background ---
        // Starry Night Sky
        const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.7);
        skyGradient.addColorStop(0, config.skyColor1);
        skyGradient.addColorStop(1, config.skyColor2);
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Stars (subtle twinkle)
        ctx.save();
        for (let i = 0; i < config.starCount; i++) {
            // Pre-calculate star positions and sizes using a seed for consistency
            const seed = i / config.starCount;
            const x = seed * canvas.width + Math.sin(elapsedTime / 5000 + i) * 5; // Slow drift
            const y = Math.pow(seed, 1.5) * canvas.height * 0.6; // More stars near horizon
            const radius = (1 - seed) * 1.5 + 0.5;
            const alpha = 0.3 + Math.pow(1 - seed, 2) * 0.7; // Brighter near top
            drawStar(x, y, radius, alpha * (0.8 + Math.sin(elapsedTime / 700 + i * 10) * 0.2)); // Twinkle
        }
        ctx.restore();


        // Sandy Dunes
        const duneGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
        duneGradient.addColorStop(0, config.sandColor1);
        duneGradient.addColorStop(1, config.sandColor2);
        ctx.fillStyle = duneGradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(0, canvas.height * 0.65);
        // Simple rolling dunes shape
        ctx.bezierCurveTo(canvas.width * 0.2, canvas.height * 0.55, canvas.width * 0.3, canvas.height * 0.75, canvas.width * 0.5, canvas.height * 0.7);
        ctx.bezierCurveTo(canvas.width * 0.7, canvas.height * 0.65, canvas.width * 0.8, canvas.height * 0.8, canvas.width, canvas.height * 0.75);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();

        // --- Animation Phases ---
        const phase1End = 0.35; // Pyramid Rise
        const phase2End = 0.55; // Explosion
        const phase3End = 0.9;  // Coin Rain Start & Sphinx Reveal
        const phase4End = 1.0;  // Text Fade In / Hold

        // --- Phase 1: Rising Pyramid (0% - 35%) ---
        if (progress < phase2End) { // Keep drawing pyramid until explosion is over
            const riseProgress = easeInOutQuad(Math.min(1, progress / phase1End));
            const isExploding = progress >= phase1End;
            const explosionProgress = isExploding ? (progress - phase1End) / (phase2End - phase1End) : 0;

            const pyramidBase = config.pyramidBaseWidth;
            const pyramidHeight = pyramidBase * config.pyramidHeightRatio;
            const currentHeight = pyramidHeight * riseProgress;
            const currentWidth = pyramidBase * riseProgress;
            const pyramidY = canvas.height * 0.75; // Set base position on dunes
            const pyramidTopY = pyramidY - currentHeight;

            // Draw pyramid only if not fully exploded
            if (!isExploding || explosionProgress < 1) {
                ctx.save();
                // Slight shake before explosion
                if (isExploding && explosionProgress < 0.3) {
                    const shakeAmount = 10 * Math.sin(elapsedTime / 20);
                    ctx.translate(shakeAmount, shakeAmount / 2);
                }

                // Fade out pyramid during explosion
                ctx.globalAlpha = 1.0 - Math.max(0, explosionProgress - 0.1) * 1.1;


                // Pyramid Gradient (Simulating light from one side)
                const pyramidGradient = ctx.createLinearGradient(
                    centerX - currentWidth * 0.3, pyramidTopY,
                    centerX + currentWidth * 0.3, pyramidY
                );
                pyramidGradient.addColorStop(0, config.pyramidColor1); // Highlight side
                pyramidGradient.addColorStop(0.6, config.pyramidColor2); // Shadow side
                pyramidGradient.addColorStop(1, config.pyramidColor2);

                ctx.fillStyle = pyramidGradient;
                ctx.strokeStyle = config.pyramidOutline;
                ctx.lineWidth = Math.max(1, 4 * riseProgress); // Scale line width

                // Draw Pyramid Shape
                ctx.beginPath();
                ctx.moveTo(centerX, pyramidTopY); // Top point
                ctx.lineTo(centerX - currentWidth / 2, pyramidY); // Bottom left
                ctx.lineTo(centerX + currentWidth / 2, pyramidY); // Bottom right
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Add subtle block lines
                ctx.lineWidth = Math.max(0.5, 1.5 * riseProgress);
                ctx.strokeStyle = `rgba(77, 58, 31, ${0.4 * riseProgress})`; // Faint outline color
                const levels = 10;
                for (let i = 1; i < levels; i++) {
                    const levelY = pyramidY - (currentHeight / levels) * i;
                    const levelWidth = (currentWidth / levels) * (levels - i);
                    ctx.beginPath();
                    ctx.moveTo(centerX - levelWidth / 2, levelY);
                    ctx.lineTo(centerX + levelWidth / 2, levelY);
                    ctx.stroke();
                }

                // Hieroglyphs (appearing smoothly)
                if (riseProgress > 0.6) {
                    const hieroglyphOpacity = Math.min(1, (riseProgress - 0.6) / 0.4);
                    const hieroSize = currentWidth * 0.05;
                    for (let i = 0; i < 10; i++) {
                        // Distribute more realistically on the face
                        const side = (i % 2 === 0) ? -1 : 1;
                        const level = Math.floor(i / 2);
                        const levelProgress = (level + 1) / 6; // 5 levels
                        const x = centerX + side * (currentWidth * 0.15 * levelProgress + Math.random() * 10 - 5);
                        const y = pyramidY - currentHeight * levelProgress * 0.8 + (Math.random() * 10 - 5);
                        const seed = i / 10 + elapsedTime / 10000; // Use time for subtle change
                        drawHieroglyph(x, y, hieroSize, hieroglyphOpacity, seed);
                    }
                }
                ctx.restore(); // Restore alpha and transform
            }
        }


        // --- Phase 2: Pyramid Explosion (35% - 55%) ---
        if (progress >= phase1End && progress < phase2End) {
            const explosionProgress = easeInOutQuad((progress - phase1End) / (phase2End - phase1End));

            // Central Flash & Glow
            const flashIntensity = Math.sin(explosionProgress * Math.PI); // Peaks in the middle
            const glowRadius = canvas.width * 0.6 * explosionProgress;
            const flashGradient = ctx.createRadialGradient(
                centerX, canvas.height * 0.7 - config.pyramidBaseWidth * config.pyramidHeightRatio * 0.3, 0, // Center near pyramid top
                centerX, canvas.height * 0.7 - config.pyramidBaseWidth * config.pyramidHeightRatio * 0.3, glowRadius
            );
            flashGradient.addColorStop(0, `rgba(255, 235, 180, ${0.9 * flashIntensity})`); // Intense white-gold center
            flashGradient.addColorStop(0.3, `rgba(255, 215, 0, ${0.7 * flashIntensity})`);
            flashGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            ctx.fillStyle = flashGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            // Fragments
            ctx.save();
            const pyramidTopY = canvas.height * 0.75 - config.pyramidBaseWidth * config.pyramidHeightRatio;
            const explosionCenterY = pyramidTopY + config.pyramidBaseWidth * config.pyramidHeightRatio * 0.5; // Explode from mid-pyramid

            for (let i = 0; i < config.fragmentCount; i++) {
                // Consistent random values per fragment
                const seed = i / config.fragmentCount;
                const angle = seed * Math.PI * 2 + (seed * 10); // Add swirl
                const maxDist = canvas.width * 0.8;
                const speedFactor = 0.5 + seed * 0.8; // Outer fragments move faster
                const distance = maxDist * explosionProgress * speedFactor;
                const fragX = centerX + Math.cos(angle) * distance;
                const fragY = explosionCenterY + Math.sin(angle) * distance - (50 * explosionProgress * (1 - explosionProgress)); // Add slight upward arc then fall

                const startSize = 15 + seed * 30;
                const currentSize = startSize * (1 - explosionProgress * 0.7); // Shrink over time
                const rotation = angle * 3 + elapsedTime / (150 + seed * 100); // Vary rotation speed

                if (currentSize < 1) continue;

                ctx.save();
                ctx.translate(fragX, fragY);
                ctx.rotate(rotation);

                // Fragment gradient (mix of stone and gold)
                const fragGradient = ctx.createLinearGradient(-currentSize / 2, -currentSize / 2, currentSize / 2, currentSize / 2);
                if (i % 3 === 0) { // More gold fragments
                    fragGradient.addColorStop(0, config.gold1);
                    fragGradient.addColorStop(1, config.gold3);
                } else { // Stone fragments
                    fragGradient.addColorStop(0, config.pyramidColor1);
                    fragGradient.addColorStop(1, config.pyramidColor2);
                }

                ctx.fillStyle = fragGradient;
                ctx.shadowColor = config.shadowColor;
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;

                // Irregular fragment shape
                ctx.beginPath();
                ctx.moveTo(-currentSize / 2, -currentSize / 4);
                ctx.lineTo(currentSize / 3, -currentSize / 2);
                ctx.lineTo(currentSize / 2, currentSize / 3);
                ctx.lineTo(-currentSize / 4, currentSize / 2);
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            }
            ctx.restore(); // Restore shadow settings etc.
        }


        // --- Phase 3: Golden Rain & Sphinx (55% - 90%) ---
        if (progress >= phase2End && progress < phase4End) {
            const rainStartProgress = (progress - phase2End) / (phase3End - phase2End);
            const rainProgress = easeInOutQuad(Math.min(1.0, rainStartProgress)); // Smooth start

            // Draw falling coins/gems
            for (let i = 0; i < config.coinCount; i++) {
                const seed = i / config.coinCount;
                const stagger = seed * 0.4; // Stagger start times based on seed
                const individualProgress = Math.max(0, Math.min(1.0, (rainProgress - stagger) / (1 - stagger)));

                if (individualProgress > 0) {
                    // Use consistent random start X for each coin
                    const startX = seed * canvas.width * 1.2 - canvas.width * 0.1; // Spread wider than canvas
                    const startY = -50 - Math.pow(seed, 2) * 200; // Start higher up based on seed
                    const fallSpeed = (0.8 + seed * 0.4) * (canvas.height + 100); // Vary speed
                    const currentY = startY + fallSpeed * individualProgress;

                    // Skip if off-screen
                    if (currentY > canvas.height + 50) continue;

                    // Add horizontal drift/wobble
                    const wobble = Math.sin(elapsedTime / (300 + seed * 200) + i) * (20 + seed * 30);
                    const currentX = startX + wobble;

                    // Rotation and Tilt
                    const rotation = (elapsedTime / (200 + seed * 300) + seed * 10) % (Math.PI * 2);
                    const tilt = Math.PI / 2 + Math.sin(elapsedTime / (400 + seed * 200) + seed * 5) * (Math.PI * 0.45); // Tilt back and forth

                    const baseSize = 25;
                    const size = baseSize + seed * 25; // Vary size

                    // Alternate between gold, silver, and gems
                    let type = 'gold';
                    if (i % 7 === 0) type = 'gem';
                    else if (i % 3 === 0) type = 'silver';

                    drawCoin(currentX, currentY, size, rotation, tilt, type);
                }
            }

            // Sphinx Reveal (Starts slightly later within Phase 3)
            const sphinxStart = 0.1; // Starts at 10% of phase 3 progress


        }


        // --- Phase 4: Text Display (Starts ~30%, fades fully in by ~60%, stays) ---
        const textAppearStart = 0.3;
        const textAppearEnd = 0.6;
        if (progress > textAppearStart) {
            const textProgress = easeInOutQuad(Math.min(1, (progress - textAppearStart) / (textAppearEnd - textAppearStart)));

            ctx.save();
            ctx.globalAlpha = textProgress; // Fade text in
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; // Center vertically too

            const mainText = "JACKPOT!";
            const subText = "PHARAOH'S TREASURE";

            // --- Main Text: JACKPOT! ---
            const maxMainFontSize = canvas.width / 8; // Adjust as needed
            const mainFontSize = maxMainFontSize * textProgress; // Scale up effect
            ctx.font = `bold ${mainFontSize}px "Impact", "Arial Black", sans-serif`; // Use impactful font

            // Calculate position (slightly above center)
            const mainTextY = centerY - maxMainFontSize * 0.3;

            // 3D / Bevel Effect
            const offset = mainFontSize * 0.05;
            // Shadow first
            ctx.fillStyle = config.shadowColor;
            ctx.fillText(mainText, centerX + offset * 1.5, mainTextY + offset * 1.5);
            // Darker edge
            ctx.fillStyle = config.gold3;
            ctx.fillText(mainText, centerX + offset, mainTextY + offset);
            // Main Fill Gradient
            const mainTextGradient = ctx.createLinearGradient(0, mainTextY - mainFontSize / 2, 0, mainTextY + mainFontSize / 2);
            mainTextGradient.addColorStop(0, config.gold1);
            mainTextGradient.addColorStop(0.5, config.gold2);
            mainTextGradient.addColorStop(1, config.gold3);
            ctx.fillStyle = mainTextGradient;
            ctx.fillText(mainText, centerX, mainTextY);
            // Outline
            ctx.strokeStyle = config.textOutline;
            ctx.lineWidth = mainFontSize * 0.02;
            ctx.strokeText(mainText, centerX, mainTextY);

            // --- Sub Text: PHARAOH'S TREASURE ---
            if (textProgress > 0.5) { // Start subtext slightly later
                const subTextProgress = Math.min(1, (textProgress - 0.5) * 2);
                ctx.globalAlpha = textProgress * subTextProgress; // Fade in subtext as well

                const maxSubFontSize = maxMainFontSize * 0.4;
                const subFontSize = maxSubFontSize; // Keep fixed size after appearing
                ctx.font = `bold ${subFontSize}px "Papyrus", fantasy, serif`; // Keep Papyrus for theme

                // Calculate position (below main text)
                const subTextY = mainTextY + mainFontSize * 0.5 + subFontSize * 0.7;

                // Shadow
                ctx.fillStyle = config.shadowColor;
                ctx.fillText(subText, centerX + 2, subTextY + 2);
                // Main Fill (Simpler gold)
                ctx.fillStyle = config.textColor;
                ctx.fillText(subText, centerX, subTextY);
                // Outline
                ctx.strokeStyle = config.textOutline;
                ctx.lineWidth = 1;
                ctx.strokeText(subText, centerX, subTextY);
            }

            ctx.restore();
        }
    }
}