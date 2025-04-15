// filepath: c:\projects\copilot-agent\slot-game\themes\gemstones.js
import { EffectPresets, EffectsHelper } from './effects.js';

export const GemstonesTheme = {
    name: "Gemstones",
    // Layout and appearance settings
    layout: {
        reelSpacing: 16, // Medium spacing to showcase the gem symbols
        reelsContainer: {
            backgroundColor: "#2c003a", // Deep purple background for gem contrast
            opacity: 0.85 // 85% opacity
        },
        themeColor: "#9c27b0" // Rich purple theme color to match gemstones
    },
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
        winEffects: {
            enabled: true,
            explosions: false,
            shockwave: false,
            flashingSymbols: false,
            spinEffect3d: {
                enabled: true,
                rotations: 1,
                duration: 1000,
                easing: 'easeOutBack'
            }
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
        }, themeSpecific: {
            gemSparkle: {
                enabled: true,
                intensity: 0.9,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
            },
            prismEffect: {
                enabled: true,
                rainbowIntensity: 0.7
            },
            epicWinAnimation: {
                enabled: true,
                name: "Gem Explosion",
                duration: 8000, // 5.5 seconds
                diamondShower: true,
                prismaticRays: true,
                jewelTransformation: true
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
        // Epic Win Animation for Gemstones theme
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            const epicWin = specific.epicWinAnimation;
            const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

            ctx.save();

            // Diamond Shower effect
            if (epicWin.diamondShower) {
                const gemCount = 80;

                for (let i = 0; i < gemCount; i++) {
                    // Calculate gem position and appearance based on progress
                    const delay = (i % 10) * 0.1;
                    const gemProgress = Math.max(0, Math.min(1, (progress - delay) * 1.5));

                    if (gemProgress <= 0) continue;

                    const x = canvas.width * (0.1 + 0.8 * (i / gemCount));
                    const y = gemProgress * canvas.height * 1.2 - 50;
                    const rotation = timestamp / 1000 + i;
                    const scale = 0.5 + Math.sin(i + timestamp / 500) * 0.2;
                    const gemType = i % 5; // Different gem types

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(rotation);
                    ctx.scale(scale, scale);

                    // Choose gem color based on type
                    const gemColors = [
                        '#E91E63', // Ruby (pink)
                        '#2196F3', // Sapphire (blue)
                        '#4CAF50', // Emerald (green)
                        '#9C27B0', // Amethyst (purple)
                        '#FFC107'  // Topaz (yellow)
                    ];

                    const gemColor = gemColors[gemType];
                    const gemOutline = gemColor.replace(/[^,]+\)/, '0.7)').replace(/rgb/, 'rgba');

                    // Draw different gem shapes
                    if (gemType === 0) { // Ruby/Diamond
                        ctx.fillStyle = gemColor;
                        ctx.beginPath();
                        ctx.moveTo(0, -20);
                        ctx.lineTo(-15, 0);
                        ctx.lineTo(0, 20);
                        ctx.lineTo(15, 0);
                        ctx.closePath();
                        ctx.fill();

                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        // Inner facets
                        ctx.beginPath();
                        ctx.moveTo(-8, 0);
                        ctx.lineTo(0, 10);
                        ctx.lineTo(8, 0);
                        ctx.lineTo(0, -10);
                        ctx.closePath();
                        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                        ctx.stroke();

                    } else if (gemType === 1) { // Sapphire/Oval
                        ctx.fillStyle = gemColor;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.stroke();

                        // Inner facets
                        ctx.beginPath();
                        ctx.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2);
                        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                        ctx.stroke();

                    } else if (gemType === 2) { // Emerald/Rectangle
                        ctx.fillStyle = gemColor;
                        ctx.fillRect(-15, -10, 30, 20);

                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(-15, -10, 30, 20);

                        // Inner facets
                        ctx.beginPath();
                        ctx.moveTo(-8, -5);
                        ctx.lineTo(8, -5);
                        ctx.moveTo(-8, 0);
                        ctx.lineTo(8, 0);
                        ctx.moveTo(-8, 5);
                        ctx.lineTo(8, 5);
                        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
                        ctx.stroke();

                    } else if (gemType === 3) { // Amethyst/Hexagon
                        ctx.fillStyle = gemColor;
                        ctx.beginPath();
                        for (let i = 0; i < 6; i++) {
                            const angle = i * Math.PI / 3;
                            const px = Math.cos(angle) * 15;
                            const py = Math.sin(angle) * 15;
                            if (i === 0) ctx.moveTo(px, py);
                            else ctx.lineTo(px, py);
                        }
                        ctx.closePath();
                        ctx.fill();

                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.stroke();

                    } else { // Topaz/Triangle
                        ctx.fillStyle = gemColor;
                        ctx.beginPath();
                        ctx.moveTo(0, -18);
                        ctx.lineTo(-15, 12);
                        ctx.lineTo(15, 12);
                        ctx.closePath();
                        ctx.fill();

                        ctx.strokeStyle = '#fff';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }

                    // Add sparkle
                    const sparkleOpacity = Math.sin(timestamp / 200 + i) * 0.5 + 0.5;
                    ctx.fillStyle = `rgba(255, 255, 255, ${sparkleOpacity})`;
                    ctx.beginPath();
                    ctx.arc(0, 0, 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
            }

            // Prismatic Rays effect
            if (epicWin.prismaticRays && progress > 0.2) {
                const rayCount = 12;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const maxRadius = canvas.width * 0.6;
                const currentRadius = maxRadius * Math.min(1, (progress - 0.2) * 1.5);

                for (let i = 0; i < rayCount; i++) {
                    const angle = (i / rayCount) * Math.PI * 2;
                    const rayWidth = 30;
                    const hue = (i / rayCount) * 360;

                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate(angle + timestamp / 5000);

                    const gradient = ctx.createLinearGradient(0, 0, currentRadius, 0);
                    gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`);
                    gradient.addColorStop(1, `hsla(${hue}, 100%, 70%, 0)`);

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(currentRadius, -rayWidth);
                    ctx.lineTo(currentRadius, rayWidth);
                    ctx.closePath();
                    ctx.fill();

                    ctx.restore();
                }
            }

            // Jewel Transformation effect
            if (epicWin.jewelTransformation && progress > 0.5) {
                const transformProgress = Math.min(1, (progress - 0.5) * 2);
                const centerX = canvas.width / 2;
                const centerY = canvas.height * 0.3;

                // Draw giant central gem growing and transforming
                const rotation = timestamp / 3000;
                const scale = 0.5 + transformProgress * 1.5;
                const pulseScale = scale * (1 + Math.sin(timestamp / 200) * 0.05);

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(rotation);
                ctx.scale(pulseScale, pulseScale);

                // Draw giant diamond
                ctx.fillStyle = '#E1F5FE';
                ctx.beginPath();
                ctx.moveTo(0, -40);
                ctx.lineTo(-50, 0);
                ctx.lineTo(0, 40);
                ctx.lineTo(50, 0);
                ctx.closePath();
                ctx.fill();

                // Draw facets in the diamond
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;

                // Cross lines
                ctx.beginPath();
                ctx.moveTo(-50, 0);
                ctx.lineTo(50, 0);
                ctx.moveTo(0, -40);
                ctx.lineTo(0, 40);
                ctx.stroke();

                // Diagonal facets
                ctx.beginPath();
                ctx.moveTo(-25, -20);
                ctx.lineTo(25, -20);
                ctx.lineTo(25, 20);
                ctx.lineTo(-25, 20);
                ctx.closePath();
                ctx.stroke();

                // Diamond outline
                ctx.strokeStyle = 'rgba(0, 170, 255, 0.8)';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(0, -40);
                ctx.lineTo(-50, 0);
                ctx.lineTo(0, 40);
                ctx.lineTo(50, 0);
                ctx.closePath();
                ctx.stroke();

                ctx.restore();

                // Add pulse wave from the diamond
                const pulseRadius = transformProgress * canvas.width;
                ctx.strokeStyle = `rgba(100, 200, 255, ${0.7 * (1 - transformProgress)})`;
                ctx.lineWidth = 10 * (1 - transformProgress);
                ctx.beginPath();
                ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Big text announcement
            const textProgress = Math.min(1, progress * 1.5);
            const textSize = 60 + Math.sin(timestamp / 200) * 10;
            ctx.font = `bold ${textSize}px "Arial", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text with jewel gradient
            const textGradient = ctx.createLinearGradient(
                canvas.width / 2 - 200,
                canvas.height / 6,
                canvas.width / 2 + 200,
                canvas.height / 6
            );
            textGradient.addColorStop(0, '#9C27B0');
            textGradient.addColorStop(0.3, '#E91E63');
            textGradient.addColorStop(0.5, '#2196F3');
            textGradient.addColorStop(0.7, '#4CAF50');
            textGradient.addColorStop(1, '#FFC107');

            ctx.fillStyle = textGradient;
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;

            const scale = 0.5 + textProgress * 0.5;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 6);
            ctx.scale(scale, scale);
            ctx.rotate(Math.sin(timestamp / 500) * 0.1);
            ctx.fillText("GEM FORTUNE!", 0, 0);
            ctx.strokeText("GEM FORTUNE!", 0, 0);
            ctx.restore();

            // Win amount
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = '#2196F3';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 3;
            ctx.fillText(`${(window.betAmount * 200).toFixed(2)}`, canvas.width / 2, canvas.height * 0.8);
            ctx.strokeText(`${(window.betAmount * 200).toFixed(2)}`, canvas.width / 2, canvas.height * 0.8);

            ctx.restore();

            // End animation if complete
            if (progress >= 1) {
                window.isPlayingEpicWinAnimation = false;
            }
        }
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
    },
    /**
  * Renders an enhanced "Epic Win" animation sequence.
  *
  * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
  * @param {HTMLCanvasElement} canvas - The canvas element.
  * @param {number} elapsedTime - Total time elapsed since the animation started (in ms).
  * @param {number} deltaTime - Time elapsed since the last frame (in ms). Might not be strictly needed if elapsedTime is primary driver.
  * @param {number} winAmount - The actual amount won for display.
  */
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime, winAmount) => {
        const duration = 7000; // Increased duration for more impact
        const progress = Math.min(elapsedTime / duration, 1.0);

        // --- Easing Functions ---
        // Makes movement feel more natural (e.g., starts fast, slows down)
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
        const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
        const pulse = (time, freq, amplitude) => Math.sin(time / freq) * amplitude;

        // --- Clear Canvas (Optional, depends on render loop) ---
        // ctx.clearRect(0, 0, canvas.width, canvas.height); // Uncomment if needed

        // --- 1. Enhanced Background ---
        ctx.save();
        const bgProgress = easeInOutSine(progress); // Use easing for smoother transition
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

        // Subtle radial gradient
        const bgGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, maxRadius * (0.8 + bgProgress * 0.2) // Expand slightly
        );
        // Deeper, more vibrant colors
        const bgColor1 = `hsl(250, 50%, ${10 + pulse(elapsedTime, 500, 3)}%)`; // Dark pulsing blue/purple
        const bgColor2 = `hsl(225, 60%, ${15 + pulse(elapsedTime, 600, 5)}%)`; // Dark pulsing deep blue
        bgGradient.addColorStop(0, bgColor1);
        bgGradient.addColorStop(1, bgColor2);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Background shimmering particles (Subtle)
        const shimmerCount = 50;
        for (let i = 0; i < shimmerCount; i++) {
            const angle = (i / shimmerCount) * Math.PI * 2 + elapsedTime / 5000; // Slow rotation
            const dist = (i / shimmerCount) * maxRadius * (0.5 + Math.random() * 0.5);
            const x = centerX + Math.cos(angle) * dist;
            const y = centerY + Math.sin(angle) * dist;
            const shimmerSize = 1 + Math.random() * 2;
            const shimmerAlpha = 0.1 + Math.random() * 0.3 * (Math.sin(elapsedTime / 300 + i) * 0.5 + 0.5); // Pulsing alpha

            ctx.fillStyle = `hsla(0, 0%, 100%, ${shimmerAlpha})`; // White shimmers
            ctx.beginPath();
            ctx.arc(x, y, shimmerSize, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();


        // --- Helper Function: Draw Faceted Gem ---
        const drawFacetedGem = (x, y, size, color, rotation = 0) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            // Base shape points (e.g., octagon)
            const points = [];
            const facets = 8;
            for (let i = 0; i < facets; i++) {
                const angle = (i / facets) * Math.PI * 2;
                const radius = size * (i % 2 === 0 ? 1 : 0.7); // Alternating radius for facets
                points.push({
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius
                });
            }

            // Gradient Fill for 3D effect
            const gemGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            gemGradient.addColorStop(0, `hsl(${color.h}, ${color.s}%, ${color.l + 15}%)`); // Brighter center
            gemGradient.addColorStop(0.7, `hsl(${color.h}, ${color.s}%, ${color.l}%)`);    // Main color
            gemGradient.addColorStop(1, `hsl(${color.h}, ${color.s}%, ${color.l - 15}%)`); // Darker edge
            ctx.fillStyle = gemGradient;

            // Draw shape
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.closePath();
            ctx.fill();

            // Subtle stroke for definition
            ctx.strokeStyle = `hsla(${color.h}, ${color.s}%, ${color.l - 20}%, 0.5)`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Center highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(0, -size * 0.2, size * 0.15, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        };


        // --- 2. Gemstone Explosion (Improved) ---
        ctx.save();
        const GEM_COUNT = 60; // More gems
        const explosionProgress = easeOutQuint(progress); // Use stronger easing for explosion

        for (let i = 0; i < GEM_COUNT; i++) {
            // Base circular explosion path
            const angle = (Math.PI * 4 * i) / GEM_COUNT + (i % 2) * 0.1; // Add more spiral/variation
            const maxDist = canvas.width * 0.6 + Math.random() * 100; // Randomize max distance
            const distance = explosionProgress * maxDist;

            // Add some outward drift variance & slight gravity pull downwards
            const driftX = Math.sin(elapsedTime / 1000 + i) * 20 * progress;
            const driftY = explosionProgress * explosionProgress * 50; // Simulate slight gravity

            const x = centerX + Math.cos(angle) * distance + driftX;
            const y = centerY + Math.sin(angle) * distance + driftY;

            // Base size + pulsation + shrinking over time
            const baseSize = 15 + Math.random() * 15;
            const sizePulse = pulse(elapsedTime, 300 + Math.random() * 200, 5);
            const shrinkFactor = (1 - progress * 0.5); // Gems shrink slightly as they fly
            const size = (baseSize + sizePulse) * shrinkFactor;

            // Rotation
            const rotation = elapsedTime / (500 + Math.random() * 500) + i * 0.5;

            // Color - Use HSL for better variety and control
            const gemColor = {
                h: (i * 360 / (GEM_COUNT / 3)) % 360, // Cycle through hues more smoothly
                s: 80 + Math.random() * 20,          // High saturation
                l: 55 + Math.random() * 10           // Bright lightness
            };

            // Opacity - Fade out gems towards the end
            const opacity = Math.max(0, 1 - explosionProgress * 1.2);
            if (size > 0 && opacity > 0) {
                ctx.globalAlpha = opacity;
                drawFacetedGem(x, y, size, gemColor, rotation);
            }
        }
        ctx.globalAlpha = 1.0; // Reset global alpha
        ctx.restore();


        // --- 3. Prismatic Light Rays (Enhanced) ---
        ctx.save();
        const RAY_COUNT = 15; // Fewer, but more impactful rays
        const rayProgress = easeInOutSine(progress); // Smoother progress

        ctx.globalCompositeOperation = 'lighter'; // Additive blending for bright rays

        for (let i = 0; i < RAY_COUNT; i++) {
            const angle = (Math.PI * 2 * i) / RAY_COUNT + elapsedTime / 8000; // Slow rotation
            const maxLength = canvas.width * 0.8; // Longer rays
            const length = maxLength * rayProgress * (0.8 + pulse(elapsedTime, 400 + i * 50, 0.2)); // Pulsing length
            const startWidth = 30 * (1 - rayProgress) + 5; // Start wider, get thinner
            const endWidth = 2;

            const x1 = centerX;
            const y1 = centerY;
            const x2 = x1 + Math.cos(angle) * length;
            const y2 = y1 + Math.sin(angle) * length;

            // Gradient along the ray
            const rayGradient = ctx.createLinearGradient(x1, y1, x2, y2);
            const rayHue = (i * 360 / RAY_COUNT + elapsedTime / 20) % 360;
            const rayAlpha = (0.4 + pulse(elapsedTime, 300 + i * 70, 0.3)) * (1 - progress); // Pulse and fade out

            rayGradient.addColorStop(0, `hsla(${rayHue}, 100%, 70%, ${rayAlpha * 0.8})`); // Brighter near center
            rayGradient.addColorStop(0.5, `hsla(${rayHue}, 100%, 60%, ${rayAlpha})`);
            rayGradient.addColorStop(1, `hsla(${rayHue}, 100%, 50%, 0)`); // Fade to transparent

            // Draw ray using varying width (approximated with multiple lines or a path)
            // Simple line approach for now:
            ctx.strokeStyle = rayGradient;
            ctx.lineWidth = startWidth * (1 - rayProgress) + endWidth; // Width decreases over length implicitly with gradient alpha
            ctx.lineWidth = Math.max(1, 1 + pulse(elapsedTime, 250 + i * 40, 8) * (1 - progress)); // Pulsing width + fade out

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
        ctx.restore(); // Resets globalCompositeOperation to 'source-over'


        // --- 4. Central Gem Transformation (Enhanced) ---
        ctx.save();
        const centerGemProgress = easeInOutSine(progress);
        const baseGemSize = 120;
        const gemSizePulse = pulse(elapsedTime, 400, 25);
        const gemSize = baseGemSize + gemSizePulse * centerGemProgress; // Grows and pulses
        const gemRotation = elapsedTime / 1500;
        const gemColor = { h: 180, s: 90, l: 60 }; // Vibrant Cyan base

        // Add a glow effect
        ctx.shadowColor = `hsla(${gemColor.h}, 100%, 70%, 0.7)`;
        ctx.shadowBlur = 30 + pulse(elapsedTime, 350, 15); // Pulsing glow

        drawFacetedGem(centerX, centerY, gemSize, gemColor, gemRotation);
        ctx.restore(); // Removes shadow effect


        // --- 5. Big Text Announcement (Enhanced) ---
        ctx.save();
        const textAppearDuration = duration * 0.5; // Text starts appearing earlier
        const textAppearElapsed = Math.min(elapsedTime, textAppearDuration);
        const textProgress = easeOutCubic(textAppearElapsed / textAppearDuration); // Easing for text appearance

        // Base size + pulse + initial scale-up
        const baseTextSize = Math.min(canvas.width / 10, 70); // Responsive base size
        const textSizePulse = pulse(elapsedTime, 450, baseTextSize * 0.08);
        const initialScale = 0.5 + textProgress * 0.5; // Scale in from 50% to 100%
        const textSize = (baseTextSize + textSizePulse) * initialScale;

        ctx.font = `bold ${textSize}px 'Impact', 'Arial Black', sans-serif`; // More impactful font
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Text Gradient (More vibrant)
        const textGradient = ctx.createLinearGradient(
            centerX - canvas.width * 0.4, centerY,
            centerX + canvas.width * 0.4, centerY
        );
        const gradHue1 = (elapsedTime / 15) % 360;
        const gradHue2 = (gradHue1 + 120) % 360;
        const gradHue3 = (gradHue1 + 240) % 360;
        textGradient.addColorStop(0, `hsl(${gradHue1}, 100%, 65%)`);
        textGradient.addColorStop(0.5, `hsl(${gradHue2}, 100%, 80%)`); // Brighter middle
        textGradient.addColorStop(1, `hsl(${gradHue3}, 100%, 65%)`);

        // Text Shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 3 * textProgress; // Shadow appears with text
        ctx.shadowOffsetY = 3 * textProgress;

        // Apply subtle rotation wobble
        const textRotation = Math.sin(elapsedTime / 600) * 0.05 * textProgress;

        // Position text higher up
        const textY = canvas.height * 0.35;

        ctx.translate(centerX, textY);
        ctx.scale(initialScale, initialScale); // Apply scaling here (affects shadow too)
        ctx.rotate(textRotation);

        ctx.fillStyle = textGradient;
        ctx.fillText("GEMSTONE JACKPOT!", 0, 0);

        // Optional: Add a subtle stroke (after shadow, before fill if needed)
        // ctx.strokeStyle = '#fff';
        // ctx.lineWidth = 1;
        // ctx.strokeText("GEMSTONE JACKPOT!", 0, 0);

        ctx.restore(); // Removes shadow, transform


        // --- 6. Win Amount Display (Enhanced with Count-Up) ---
        ctx.save();
        const amountAppearDelay = duration * 0.3; // Amount appears slightly later
        const amountDuration = duration * 0.6;    // Takes time to count up
        let amountDisplay = 0;
        let amountProgress = 0;

        if (elapsedTime > amountAppearDelay) {
            const amountElapsed = Math.min(elapsedTime - amountAppearDelay, amountDuration);
            amountProgress = easeOutCubic(amountElapsed / amountDuration); // Easing for count-up
            amountDisplay = winAmount * amountProgress; // Calculate displayed amount
        }

        const amountTextSize = Math.min(canvas.width / 15, 50); // Responsive size
        ctx.font = `bold ${amountTextSize}px 'Arial', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff'; // Bright white

        // Subtle glow for amount
        ctx.shadowColor = 'rgba(255, 255, 150, 0.7)'; // Yellowish glow
        ctx.shadowBlur = 15 + pulse(elapsedTime, 500, 5);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        const amountY = canvas.height * 0.7;
        const formattedAmount = amountDisplay.toFixed(2); // Format to 2 decimal places

        // Fade in the amount text
        ctx.globalAlpha = amountProgress;

        ctx.fillText(`WIN: ${formattedAmount}`, centerX, amountY);

        // Optional: Add a dark stroke for contrast AFTER shadow/fill
        // ctx.shadowColor = 'transparent'; // Turn off glow for stroke
        // ctx.strokeStyle = '#000000';
        // ctx.lineWidth = 2;
        // ctx.strokeText(`WIN: ${formattedAmount}`, centerX, amountY);

        ctx.restore(); // Removes shadow, alpha


        // --- End Animation Condition ---
        if (progress >= 1) {
            // Ensure the final win amount is displayed correctly at the very end
            // This is a failsafe if the animation loop stops exactly at progress = 1
            // You might want a separate "hold frame" state after the animation finishes.
            // For now, just return false to signal completion.
            return false; // Indicate animation should stop
        }

        return true; // Indicate animation is still playing
    },
}
