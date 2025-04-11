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
            }
        }
    },
    symbols: [
        // Theme: Pyramids, Pharaohs, Hieroglyphs. Slightly higher top multiplier.
        { name: "Pharaoh Mask", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23DAA520'/%3E%3Crect x='35' y='30' width='50' height='60' rx='10' ry='10' fill='%23005792'/%3E%3Crect x='45' y='35' width='30' height='40' fill='%23FDBE34'/%3E%3Crect x='40' y='85' width='40' height='10' fill='%23005792'/%3E%3Ccircle cx='50' cy='60' r='5' fill='white'/%3E%3Ccircle cx='70' cy='60' r='5' fill='white'/%3E%3C/svg%3E", multiplier: 12, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Scarab Beetle", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%2300838f'/%3E%3Cellipset cx='60' cy='60' rx='35' ry='25' fill='%2300bcd4'/%3E%3Cpath d='M60 35 V 85 M40 45 L 80 75 M 80 45 L 40 75' stroke='%23263238' stroke-width='4'/%3E%3C/svg%3E", multiplier: 6, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Eye of Horus", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%238d6e63'/%3E%3Cpath d='M30 60 Q 60 40 90 60 Q 60 80 30 60 Z' fill='white' stroke='black' stroke-width='3'/%3E%3Ccircle cx='60' cy='60' r='10' fill='%231e88e5'/%3E%3Cpath d='M60 70 L 50 90 M60 70 L 75 85 Q 90 95 90 80' stroke='black' stroke-width='4' fill='none'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Ankh", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffab00'/%3E%3Cpath d='M60 55 V 100 M 40 75 H 80' stroke='%233e2723' stroke-width='8'/%3E%3Cellipse cx='60' cy='40' rx='15' ry='20' stroke='%233e2723' stroke-width='8' fill='none'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Papyrus Scroll", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23c8e6c9'/%3E%3Crect x='30' y='30' width='60' height='60' rx='5' ry='5' fill='%23f5f5dc' stroke='%238d6e63' stroke-width='3'/%3E%3Cpath d='M35 40 h 50 M 35 50 h 40 M 35 60 h 50 M 35 70 h 30 M 35 80 h 45' stroke='%235d4037' stroke-width='2'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ],
    // Renderer for Ancient Egypt theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
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
    }
};
