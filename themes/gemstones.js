// filepath: c:\projects\copilot-agent\slot-game\themes\gemstones.js
import { EffectPresets, EffectsHelper } from './effects.js';

export const GemstonesTheme = {
    name: "Gemstones",
    visualEffects: {
        ...EffectPresets.neon,
        intensity: 0.85,
        neonGlow: {
            enabled: true,
            color: '#ff00ff', // Vibrant magenta
            size: 12,
            pulseSpeed: 600,
            intensity: 0.9
        },
        electricEdges: {
            enabled: false,
            color: '#ffffff',
            arcs: 6,
            speed: 800,
            intensity: 0.8
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
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
            gemSparkle: {
                enabled: true,
                intensity: 0.9,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
            },
            prismEffect: {
                enabled: true,
                rainbowIntensity: 0.7
            }
        }
    },
    symbols: [
        // Theme: Jewels, Wealth. Higher overall multipliers, potentially fewer low wins.
        { name: "Diamond", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231565c0'/%3E%3Cpolygon points='60 25, 30 55, 45 60, 75 60, 90 55' fill='%23e3f2fd'/%3E%3Cpolygon points='30 55, 60 95, 45 60' fill='%2390caf9'/%3E%3Cpolygon points='90 55, 60 95, 75 60' fill='%23bbdefb'/%3E%3Cpolygon points='45 60, 60 95, 75 60' fill='%2364b5f6'/%3E%3Cpath d='M30 55 L 45 60 L 75 60 L 90 55 M 45 60 L 60 95 L 75 60' stroke='%230d47a1' stroke-width='2' fill='none'/%3E%3C/svg%3E", multiplier: 12, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Ruby", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23c62828'/%3E%3Crect x='35' y='35' width='50' height='50' rx='10' ry='10' fill='%23ef9a9a' stroke='%23b71c1c' stroke-width='3'/%3E%3Cpath d='M35 60 L 85 60 M 60 35 L 60 85' stroke='%23ffcdd2' stroke-width='5' opacity='0.7'/%3E%3C/svg%3E", multiplier: 8, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Emerald", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%232e7d32'/%3E%3Crect x='40' y='30' width='40' height='60' fill='%23a5d6a7' stroke='%231b5e20' stroke-width='3'/%3E%3Cpath d='M40 40 L 80 40 M 40 50 L 80 50 M 40 60 L 80 60 M 40 70 L 80 70 M 40 80 L 80 80' stroke='%23e8f5e9' stroke-width='3' opacity='0.6'/%3E%3C/svg%3E", multiplier: 6, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Sapphire", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%230277bd'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='25' fill='%2390caf9' stroke='%2301579b' stroke-width='3'/%3E%3Cellipse cx='60' cy='60' rx='20' ry='12' fill='%23e3f2fd' opacity='0.8'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Amethyst", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%236a1b9a'/%3E%3Cpolygon points='60 30, 80 50, 70 80, 50 80, 40 50' fill='%23e1bee7' stroke='%234a148c' stroke-width='3'/%3E%3Cpolygon points='60 30, 70 80, 50 80' fill='%23ce93d8'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ],
    // Renderer for Gemstones theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Gem Sparkle effect
        if (specific?.gemSparkle?.enabled) {
            const sparkleSettings = specific.gemSparkle;
            const intensity = sparkleSettings?.intensity || 0.9;
            const colors = sparkleSettings?.colors || ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'];

            // Initialize sparkles if they don't exist
            if (!ctx.gemSparkles) {
                ctx.gemSparkles = [];
                const sparkleCount = Math.floor(30 * intensity);

                // Create sparkles across the screen, focusing on reel areas
                for (let i = 0; i < sparkleCount; i++) {
                    ctx.gemSparkles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 4 + 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        angle: Math.random() * Math.PI * 2,
                        timeOffset: Math.random() * 2000,
                        duration: Math.random() * 1000 + 500,
                        active: true
                    });
                }
            }

            // Update and draw sparkles
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            ctx.gemSparkles.forEach(sparkle => {
                // Calculate sparkle visibility based on time
                const cycleTime = (timestamp + sparkle.timeOffset) % (sparkle.duration * 2);
                const visible = cycleTime < sparkle.duration;

                if (visible) {
                    // Calculate sparkle opacity based on its cycle
                    const progress = cycleTime / sparkle.duration;
                    const opacity = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

                    // Draw the sparkle
                    ctx.save();
                    ctx.translate(sparkle.x, sparkle.y);
                    ctx.rotate(sparkle.angle + timestamp / 1000);

                    // Create a star shape for the sparkle
                    ctx.fillStyle = sparkle.color;
                    ctx.globalAlpha = opacity * intensity;

                    // Draw a four-point star
                    ctx.beginPath();
                    for (let i = 0; i < 4; i++) {
                        const angle = (i / 4) * Math.PI * 2;
                        const innerRadius = sparkle.size * 0.4;
                        const outerRadius = sparkle.size;

                        // Outer point
                        ctx.lineTo(
                            Math.cos(angle) * outerRadius,
                            Math.sin(angle) * outerRadius
                        );

                        // Inner point
                        const innerAngle = angle + Math.PI / 4;
                        ctx.lineTo(
                            Math.cos(innerAngle) * innerRadius,
                            Math.sin(innerAngle) * innerRadius
                        );
                    }
                    ctx.closePath();
                    ctx.fill();

                    // Add a white center for extra shine
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(0, 0, sparkle.size * 0.2, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }

                // Occasionally move the sparkle to a new position for visual freshness
                if (Math.random() < 0.002) {
                    sparkle.x = Math.random() * canvas.width;
                    sparkle.y = Math.random() * canvas.height;
                }
            });

            ctx.restore();
        }

        // Prism Effect (Rainbow light refraction)
        if (specific?.prismEffect?.enabled) {
            const prismSettings = specific.prismEffect;
            const rainbowIntensity = prismSettings?.rainbowIntensity || 0.7;

            // Calculate the reel area dimensions
            const SYMBOL_SIZE = 100;
            const REEL_COUNT = 5;
            const VISIBLE_ROWS = 3;

            const reelWidth = SYMBOL_SIZE;
            const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
            const startX = reelSpacing;
            const startY = 100;
            const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;

            // Create light beams that move across the screen like refracted light
            ctx.save();

            // Set blending mode for the light effect
            ctx.globalCompositeOperation = 'screen';

            // Create 3 moving rainbow beams
            const beamCount = 3;
            for (let i = 0; i < beamCount; i++) {
                // Calculate beam angle (changes slowly over time, different for each beam)
                const angleSpeed = 0.0001;
                const angleOffset = (Math.PI * 2 / beamCount) * i;
                const angle = ((timestamp * angleSpeed) % (Math.PI * 2)) + angleOffset;

                // Calculate beam position (moves diagonally across the screen)
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const radius = Math.max(canvas.width, canvas.height);

                const beamX = centerX + Math.cos(angle) * radius * 0.5;
                const beamY = centerY + Math.sin(angle) * radius * 0.5;

                // Create beam width and direction
                const beamLength = radius * 2;
                const beamWidth = 100 + Math.sin(timestamp / 3000 + i) * 50;

                // Draw rainbow beam with gradient
                const beam = ctx.createLinearGradient(
                    beamX - Math.cos(angle) * beamLength / 2,
                    beamY - Math.sin(angle) * beamLength / 2,
                    beamX + Math.cos(angle) * beamLength / 2,
                    beamY + Math.sin(angle) * beamLength / 2
                );

                // Create rainbow colors
                beam.addColorStop(0, `rgba(255, 0, 0, ${0.2 * rainbowIntensity})`);
                beam.addColorStop(0.2, `rgba(255, 165, 0, ${0.2 * rainbowIntensity})`);
                beam.addColorStop(0.4, `rgba(255, 255, 0, ${0.2 * rainbowIntensity})`);
                beam.addColorStop(0.6, `rgba(0, 255, 0, ${0.2 * rainbowIntensity})`);
                beam.addColorStop(0.8, `rgba(0, 0, 255, ${0.2 * rainbowIntensity})`);
                beam.addColorStop(1, `rgba(128, 0, 128, ${0.2 * rainbowIntensity})`);

                // Create beam path
                ctx.fillStyle = beam;
                ctx.beginPath();

                // Calculate the four corners of the beam (rotated rectangle)
                const halfWidth = beamWidth / 2;
                const perpAngle = angle + Math.PI / 2;
                const perpX = Math.cos(perpAngle);
                const perpY = Math.sin(perpAngle);
                const alongX = Math.cos(angle);
                const alongY = Math.sin(angle);

                // Define the four corners
                const x1 = beamX + perpX * halfWidth - alongX * beamLength / 2;
                const y1 = beamY + perpY * halfWidth - alongY * beamLength / 2;

                const x2 = beamX - perpX * halfWidth - alongX * beamLength / 2;
                const y2 = beamY - perpY * halfWidth - alongY * beamLength / 2;

                const x3 = beamX - perpX * halfWidth + alongX * beamLength / 2;
                const y3 = beamY - perpY * halfWidth + alongY * beamLength / 2;

                const x4 = beamX + perpX * halfWidth + alongX * beamLength / 2;
                const y4 = beamY + perpY * halfWidth + alongY * beamLength / 2;

                // Draw the beam rectangle
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);
                ctx.lineTo(x4, y4);
                ctx.closePath();
                ctx.fill();
            }

            // Add a central diamond light source effect
            const centerX = startX + (SYMBOL_SIZE * REEL_COUNT + reelSpacing * (REEL_COUNT - 1)) / 2;
            const centerY = startY + reelViewportHeight / 2;

            // Create pulsating glow with rainbow colors
            const pulseSize = (Math.sin(timestamp / 1000) * 0.3 + 0.7) * 150;
            const burstOffset = timestamp / 100;

            // Create radial rainbow gradient
            const radial = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, pulseSize
            );

            radial.addColorStop(0, `rgba(255, 255, 255, ${0.4 * rainbowIntensity})`);
            radial.addColorStop(0.2, `rgba(255, 0, 0, ${0.3 * rainbowIntensity})`);
            radial.addColorStop(0.4, `rgba(255, 255, 0, ${0.25 * rainbowIntensity})`);
            radial.addColorStop(0.6, `rgba(0, 255, 0, ${0.2 * rainbowIntensity})`);
            radial.addColorStop(0.8, `rgba(0, 0, 255, ${0.15 * rainbowIntensity})`);
            radial.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = radial;
            ctx.beginPath();
            ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
            ctx.fill();

            // Add small diamond-like sparkles
            const sparkleCount = 12;
            const sparkleSize = 15;

            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

            for (let i = 0; i < sparkleCount; i++) {
                const angle = (i / sparkleCount) * Math.PI * 2 + burstOffset;
                const distance = pulseSize * 0.6 * (0.8 + Math.sin(timestamp / 500 + i) * 0.2);
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;

                // Draw diamond shape
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(angle + Math.PI / 4);

                ctx.beginPath();
                ctx.moveTo(0, -sparkleSize / 2);
                ctx.lineTo(sparkleSize / 2, 0);
                ctx.lineTo(0, sparkleSize / 2);
                ctx.lineTo(-sparkleSize / 2, 0);
                ctx.closePath();

                ctx.globalAlpha = Math.sin(timestamp / 200 + i * 0.5) * 0.4 + 0.6;
                ctx.fill();

                ctx.restore();
            }

            ctx.restore();
        }
    }
};
