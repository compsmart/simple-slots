import { EffectPresets, EffectDefaults, EffectsHelper } from './effects.js';

export const AztecTheme = {
    name: "Aztec",
    // Layout and appearance settings
    layout: {
        reelSpacing: 18, // Medium spacing for carved stone effect
        reelsContainer: {
            backgroundColor: "#5d4037", // Dark brown background for reels area
            opacity: 0.85 // 85% opacity
        },
        themeColor: "#e6a11f" // Golden yellow theme color to match Aztec gold
    },
    visualEffects: {
        ...EffectPresets.vibrant,
        intensity: 0.8,
        neonGlow: {
            enabled: false,
            color: '#e6a11f', // Golden yellow color
            size: 8,
            pulseSpeed: 2000,
            intensity: 0.7
        },
        electricEdges: {
            enabled: false,
            color: '#ff9900',
            arcs: 3,
            speed: 1200,
            intensity: 0.5
        }, backgroundEffects: {
            enabled: true,
            backgroundImage: {
                enabled: false,
                path: 'images/aztec/background.jpg',
                opacity: 1.0
            },
            particles: {
                enabled: true,
                count: 35,
                color: '#e6a11f',
                size: { min: 1, max: 3 },
                sparkle: false
            },
            pulse: {
                enabled: true,
                color: '#412612', // Deep brown
                speed: 4000,
                intensity: 0.3
            }
        },
        winEffects: {
            enabled: true,
            explosions: true,
            shockwave: false,
            flashingSymbols: false,
            spinEffect3d: {
                enabled: true,
                rotations: 1,
                duration: 1000,
                easing: 'easeOutBack'
            }
        },
        themeSpecific: {
            jungleVines: {
                enabled: true,
                intensity: 0.4,
                color: '#2e7d32',
                count: 8
            },
            templeGlow: {
                enabled: true,
                color: '#ffcc00',
                intensity: 0.6,
                pulseSpeed: 3000
            },
            epicWinAnimation: {
                enabled: true,
                name: "Temple Treasure",
                duration: 8000, // 8 seconds
                goldParticles: true,
            }
        }
    },
    symbols: [
        // Theme: Aztec gods, artifacts, and cultural symbols
        { name: "Sun God", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23d4342a'/%3E%3Ccircle cx='60' cy='60' r='30' fill='%23fec611'/%3E%3Ccircle cx='60' cy='60' r='20' fill='%23d4342a'/%3E%3Ccircle cx='60' cy='60' r='10' fill='%23fec611'/%3E%3Cpath d='M60 10 V 30 M 60 90 V 110 M 10 60 H 30 M 90 60 H 110 M 24 24 L 39 39 M 81 39 L 96 24 M 24 96 L 39 81 M 81 81 L 96 96' stroke='%23fec611' stroke-width='5'/%3E%3C/svg%3E", multiplier: 12, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Golden Mask", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23006064'/%3E%3Cpath d='M40 40 L 60 20 L 80 40 L 80 85 Q 60 100 40 85 Z' fill='%23fec611' stroke='%23006064' stroke-width='2'/%3E%3Ccircle cx='50' cy='55' r='6' fill='%23006064'/%3E%3Ccircle cx='70' cy='55' r='6' fill='%23006064'/%3E%3Cpath d='M50 75 Q 60 85 70 75' stroke='%23006064' stroke-width='3' fill='none'/%3E%3Cpath d='M30 45 L 40 40 M 80 40 L 90 45' stroke='%23fec611' stroke-width='3'/%3E%3C/svg%3E", multiplier: 8, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Jade Stone", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23795548'/%3E%3Cpolygon points='60,30 85,50 85,80 60,100 35,80 35,50' fill='%2326a69a' stroke='%23004d40' stroke-width='3'/%3E%3Cpath d='M55 50 L 65 50 L 70 60 L 65 70 L 55 70 L 50 60 Z' fill='%23004d40'/%3E%3Cpath d='M45 50 L 50 45 M 75 50 L 70 45 M 75 70 L 70 75 M 45 70 L 50 75' stroke='%23b2dfdb' stroke-width='2'/%3E%3C/svg%3E", multiplier: 5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Snake", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23388e3c'/%3E%3Cpath d='M30 90 Q 45 75 60 90 Q 75 105 90 90 Q 105 75 90 60 Q 75 45 60 60 Q 45 75 30 60 Q 15 45 30 30' fill='none' stroke='%23ffeb3b' stroke-width='8' stroke-linecap='round'/%3E%3Ccircle cx='30' cy='30' r='5' fill='%23f44336'/%3E%3Ccircle cx='25' cy='28' r='2' fill='%23000000'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Jaguar", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffcc80'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='30' fill='%23ef6c00'/%3E%3Ccircle cx='45' cy='50' r='5' fill='%23000000'/%3E%3Ccircle cx='75' cy='50' r='5' fill='%23000000'/%3E%3Cpath d='M50 70 Q 60 75 70 70' stroke='%23000000' stroke-width='3' fill='none'/%3E%3Cpath d='M30 40 L 40 30 M 80 30 L 90 40' stroke='%23000000' stroke-width='3'/%3E%3Cpath d='M40 65 Q 60 90 80 65' fill='%23ffcc80' stroke='none'/%3E%3Cpath d='M45 55 Q 50 60 55 55 M 65 55 Q 70 60 75 55' fill='none' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='45' cy='50' r='2' fill='%23ffffff'/%3E%3Ccircle cx='75' cy='50' r='2' fill='%23ffffff'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ],    // Renderer for Aztec theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        return;
        // Draw background image if configured
        const bgEffects = AztecTheme.visualEffects.backgroundEffects;
        if (bgEffects?.enabled && bgEffects?.backgroundImage?.enabled) {
            // Check if we need to load the background image
            if (!AztecTheme.bgImage) {
                AztecTheme.bgImage = new Image();
                AztecTheme.bgImage.src = bgEffects.backgroundImage.path;
                AztecTheme.bgImageLoaded = false;
                AztecTheme.bgImage.onload = () => {
                    AztecTheme.bgImageLoaded = true;
                };
            }

            // Draw the background image if it's loaded
            if (AztecTheme.bgImageLoaded) {
                const opacity = bgEffects.backgroundImage.opacity || 1.0;

                // Ensure the image covers the entire canvas while maintaining aspect ratio
                const imgWidth = AztecTheme.bgImage.width;
                const imgHeight = AztecTheme.bgImage.height;
                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = imgWidth / imgHeight;

                let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

                // Calculate dimensions to cover the entire canvas
                if (canvasRatio > imgRatio) {
                    // Canvas is wider than image aspect ratio
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgRatio;
                    offsetY = (canvas.height - drawHeight) / 2;
                } else {
                    // Canvas is taller than image aspect ratio
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgRatio;
                    offsetX = (canvas.width - drawWidth) / 2;
                }

                if (opacity < 1.0) {
                    // If opacity is less than 1, need to use globalAlpha
                    ctx.save();
                    ctx.globalAlpha = opacity;
                    ctx.drawImage(AztecTheme.bgImage, offsetX, offsetY, drawWidth, drawHeight);
                    ctx.restore();
                } else {
                    // Full opacity, just draw directly
                    ctx.drawImage(AztecTheme.bgImage, offsetX, offsetY, drawWidth, drawHeight);
                }
            } else {
                // Fallback if image isn't loaded yet
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#5d4037'); // Dark brown
                gradient.addColorStop(0.5, '#795548'); // Medium brown
                gradient.addColorStop(1, '#8d6e63'); // Lighter brown
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }

        // Epic Win Animation for Aztec theme
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            const epicWin = specific.epicWinAnimation;
            const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

            ctx.save();

            // Temple Rise animation
            if (epicWin.templeRise) {
                const centerX = canvas.width / 2;
                const baseY = canvas.height - 50;

                // Calculate temple position with rising animation
                const templeHeight = 180;
                const templeWidth = 240;
                const riseAmount = (1 - Math.cos(progress * Math.PI)) * 140;

                // Draw temple base
                ctx.fillStyle = '#795548';
                ctx.beginPath();
                ctx.moveTo(centerX - templeWidth / 2, baseY);
                ctx.lineTo(centerX + templeWidth / 2, baseY);
                ctx.lineTo(centerX + templeWidth / 2 - 20, baseY - 40 - riseAmount);
                ctx.lineTo(centerX - templeWidth / 2 + 20, baseY - 40 - riseAmount);
                ctx.closePath();
                ctx.fill();

                // Draw temple steps
                ctx.strokeStyle = '#4e342e';
                ctx.lineWidth = 3;
                const steps = 5;
                for (let i = 0; i < steps; i++) {
                    const stepHeight = (templeHeight * (i / steps));
                    const stepWidth = templeWidth - (templeWidth * 0.5 * (i / steps));
                    const y = baseY - stepHeight - riseAmount;

                    ctx.beginPath();
                    ctx.moveTo(centerX - stepWidth / 2, y);
                    ctx.lineTo(centerX + stepWidth / 2, y);
                    ctx.stroke();
                }

                // Draw temple top
                ctx.fillStyle = '#8d6e63';
                ctx.beginPath();
                ctx.moveTo(centerX - templeWidth / 4, baseY - templeHeight * 0.6 - riseAmount);
                ctx.lineTo(centerX + templeWidth / 4, baseY - templeHeight * 0.6 - riseAmount);
                ctx.lineTo(centerX + templeWidth / 8, baseY - templeHeight - riseAmount);
                ctx.lineTo(centerX - templeWidth / 8, baseY - templeHeight - riseAmount);
                ctx.closePath();
                ctx.fill();

                // Add Aztec symbols
                const symbols = ["△", "☉", "☽", "◯", "☰"];
                ctx.font = '24px Arial';
                ctx.fillStyle = '#fec611';
                for (let i = 0; i < 3; i++) {
                    ctx.fillText(symbols[i % symbols.length],
                        centerX - 50 + i * 50,
                        baseY - templeHeight * 0.4 - riseAmount);
                }

                // Add dust/ground effect at the base during rising
                if (progress < 0.7) {
                    const dustCount = 30;
                    for (let i = 0; i < dustCount; i++) {
                        const dustX = centerX - templeWidth / 2 + Math.random() * templeWidth;
                        const dustY = baseY + Math.random() * 20;
                        const dustSize = Math.random() * 8 + 2;
                        ctx.fillStyle = `rgba(173, 121, 85, ${(0.7 - progress) * Math.random()})`;
                        ctx.beginPath();
                        ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Tribal Dance animation
            if (epicWin.tribalDance && progress > 0.2) {
                const danceProgress = Math.min(1, (progress - 0.2) * 1.5);
                const dancers = 7;

                for (let i = 0; i < dancers; i++) {
                    const posX = canvas.width * 0.2 + (canvas.width * 0.6) * (i / (dancers - 1));
                    const baseY = canvas.height * 0.5;
                    const bounceY = Math.sin(timestamp / 200 + i) * 15;

                    // Draw dancer body
                    ctx.fillStyle = '#5d4037';
                    ctx.beginPath();
                    ctx.arc(posX, baseY - 30 + bounceY, 15, 0, Math.PI * 2); // Head
                    ctx.fill();

                    // Draw body
                    ctx.beginPath();
                    ctx.moveTo(posX, baseY - 15 + bounceY);
                    ctx.lineTo(posX, baseY + 30 + bounceY);
                    ctx.lineWidth = 8;
                    ctx.stroke();

                    // Draw arms with dancing motion
                    const armAngle = Math.sin(timestamp / 200 + i * 2) * Math.PI / 4;
                    ctx.lineWidth = 5;

                    // Left arm
                    ctx.beginPath();
                    ctx.moveTo(posX, baseY + bounceY);
                    ctx.lineTo(posX - 25 * Math.cos(armAngle), baseY + 5 + 25 * Math.sin(armAngle) + bounceY);
                    ctx.stroke();

                    // Right arm
                    ctx.beginPath();
                    ctx.moveTo(posX, baseY + bounceY);
                    ctx.lineTo(posX + 25 * Math.cos(armAngle), baseY + 5 + 25 * Math.sin(armAngle) + bounceY);
                    ctx.stroke();

                    // Draw legs
                    const legAngle = Math.sin(timestamp / 150 + i) * Math.PI / 6;

                    // Left leg
                    ctx.beginPath();
                    ctx.moveTo(posX, baseY + 30 + bounceY);
                    ctx.lineTo(posX - 15 * Math.sin(legAngle), baseY + 60 + bounceY);
                    ctx.stroke();

                    // Right leg
                    ctx.beginPath();
                    ctx.moveTo(posX, baseY + 30 + bounceY);
                    ctx.lineTo(posX + 15 * Math.sin(legAngle), baseY + 60 + bounceY);
                    ctx.stroke();

                    // Headdress
                    ctx.fillStyle = '#fec611';
                    ctx.beginPath();
                    ctx.moveTo(posX, baseY - 45 + bounceY);
                    ctx.lineTo(posX - 20, baseY - 30 + bounceY);
                    ctx.lineTo(posX + 20, baseY - 30 + bounceY);
                    ctx.closePath();
                    ctx.fill();
                }
            }

            // Gold Idol Reveal
            if (epicWin.goldIdolReveal && progress > 0.5) {
                const revealProgress = Math.min(1, (progress - 0.5) * 2);
                const centerX = canvas.width / 2;
                const centerY = canvas.height * 0.3;
                const glowSize = 40 + Math.sin(timestamp / 200) * 10;

                // Draw glowing aura
                const gradient = ctx.createRadialGradient(
                    centerX, centerY, 10,
                    centerX, centerY, 80 + glowSize
                );
                gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
                gradient.addColorStop(0.6, 'rgba(255, 215, 0, 0.4)');
                gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 80 + glowSize, 0, Math.PI * 2);
                ctx.fill();

                // Draw golden idol
                const idolScale = 0.5 + revealProgress * 0.5;
                const rotation = Math.sin(timestamp / 1000) * 0.1;

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(rotation);
                ctx.scale(idolScale, idolScale);

                // Draw idol body (stylized face)
                ctx.fillStyle = '#ffd700';
                ctx.beginPath();
                ctx.arc(0, 0, 50, 0, Math.PI * 2);
                ctx.fill();

                // Draw idol details
                ctx.strokeStyle = '#b7950b';
                ctx.lineWidth = 3;

                // Eyes
                ctx.beginPath();
                ctx.arc(-15, -10, 8, 0, Math.PI * 2);
                ctx.arc(15, -10, 8, 0, Math.PI * 2);
                ctx.stroke();

                // Mouth
                ctx.beginPath();
                ctx.arc(0, 15, 20, 0.1 * Math.PI, 0.9 * Math.PI);
                ctx.stroke();

                // Decorative elements
                ctx.beginPath();
                ctx.moveTo(-40, -40);
                ctx.lineTo(40, -40);
                ctx.lineTo(0, -70);
                ctx.closePath();
                ctx.stroke();

                ctx.restore();
            }

            // Big text announcement
            const textProgress = Math.min(1, progress * 1.5);
            const textSize = 60 + Math.sin(timestamp / 200) * 10;
            ctx.font = `bold ${textSize}px "Copperplate", fantasy`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text with gold gradient
            const textGradient = ctx.createLinearGradient(
                canvas.width / 2 - 200,
                canvas.height / 6,
                canvas.width / 2 + 200,
                canvas.height / 6
            );
            textGradient.addColorStop(0, '#ffd700');
            textGradient.addColorStop(0.5, '#ffffff');
            textGradient.addColorStop(1, '#ffd700');

            ctx.fillStyle = textGradient;
            ctx.strokeStyle = '#8d6e63';
            ctx.lineWidth = 3;

            const scale = 0.5 + textProgress * 0.5;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 6);
            ctx.scale(scale, scale);
            ctx.rotate(Math.sin(timestamp / 500) * 0.1);
            ctx.fillText("GOLDEN TEMPLE!", 0, 0);
            ctx.strokeText("GOLDEN TEMPLE!", 0, 0);
            ctx.restore();

            // Win amount
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = '#ffd700';
            ctx.strokeStyle = '#5d4037';
            ctx.lineWidth = 3;
            ctx.fillText(`${(window.betAmount * 100).toFixed(2)}`, canvas.width / 2, canvas.height * 0.75);
            ctx.strokeText(`${(window.betAmount * 100).toFixed(2)}`, canvas.width / 2, canvas.height * 0.75);

            ctx.restore();

            // End animation if complete
            if (progress >= 1) {
                window.isPlayingEpicWinAnimation = false;
            }
        }
        // Jungle Vines effect
        if (specific?.jungleVines?.enabled) {
            const vineSettings = specific.jungleVines;
            const intensity = vineSettings.intensity || 0.4;
            const vineColor = vineSettings.color || '#2e7d32';
            const vineCount = vineSettings.count || 8;

            // Draw jungle vines growing from sides of screen
            ctx.save();
            ctx.strokeStyle = vineColor;
            ctx.lineWidth = 3;

            // Create vines that grow from each side of the screen
            for (let i = 0; i < vineCount; i++) {
                // Calculate vine position based on canvas dimensions
                const side = i % 4; // 0: top, 1: right, 2: bottom, 3: left
                const position = (canvas.width / (vineCount / 4)) * Math.floor(i / 4) + 50;

                // Create wavy vine effect
                ctx.beginPath();

                const waveAmplitude = 20 * intensity;
                const segments = 8;
                const maxLength = 120 * intensity;

                // Animation based on timestamp
                const growth = Math.sin(timestamp / 3000) * 0.2 + 0.8; // 0.6 to 1.0 growth factor

                switch (side) {
                    case 0: // Top vines
                        ctx.moveTo(position, 0);
                        for (let s = 1; s <= segments; s++) {
                            const segmentY = (s / segments) * maxLength * growth;
                            const offsetX = Math.sin(s + timestamp / 2000) * waveAmplitude;
                            ctx.lineTo(position + offsetX, segmentY);
                        }
                        break;
                    case 1: // Right vines
                        ctx.moveTo(canvas.width, position);
                        for (let s = 1; s <= segments; s++) {
                            const segmentX = canvas.width - (s / segments) * maxLength * growth;
                            const offsetY = Math.sin(s + timestamp / 2000) * waveAmplitude;
                            ctx.lineTo(segmentX, position + offsetY);
                        }
                        break;
                    case 2: // Bottom vines
                        ctx.moveTo(position, canvas.height);
                        for (let s = 1; s <= segments; s++) {
                            const segmentY = canvas.height - (s / segments) * maxLength * growth;
                            const offsetX = Math.sin(s + timestamp / 2000) * waveAmplitude;
                            ctx.lineTo(position + offsetX, segmentY);
                        }
                        break;
                    case 3: // Left vines
                        ctx.moveTo(0, position);
                        for (let s = 1; s <= segments; s++) {
                            const segmentX = (s / segments) * maxLength * growth;
                            const offsetY = Math.sin(s + timestamp / 2000) * waveAmplitude;
                            ctx.lineTo(segmentX, position + offsetY);
                        }
                        break;
                }

                // Draw the vine
                ctx.stroke();

                // Add leaf at the end of each vine
                if (side === 0) {
                    const endX = position + Math.sin(segments + timestamp / 2000) * waveAmplitude;
                    const endY = maxLength * growth;
                    EffectsHelper.drawLeaf(ctx, endX, endY, vineColor, timestamp);
                } else if (side === 1) {
                    const endX = canvas.width - maxLength * growth;
                    const endY = position + Math.sin(segments + timestamp / 2000) * waveAmplitude;
                    EffectsHelper.drawLeaf(ctx, endX, endY, vineColor, timestamp);
                } else if (side === 2) {
                    const endX = position + Math.sin(segments + timestamp / 2000) * waveAmplitude;
                    const endY = canvas.height - maxLength * growth;
                    EffectsHelper.drawLeaf(ctx, endX, endY, vineColor, timestamp);
                } else {
                    const endX = maxLength * growth;
                    const endY = position + Math.sin(segments + timestamp / 2000) * waveAmplitude;
                    EffectsHelper.drawLeaf(ctx, endX, endY, vineColor, timestamp);
                }
            }

            ctx.restore();
        }

        // Temple Glow effect
        if (specific?.templeGlow?.enabled) {
            const glowSettings = specific.templeGlow;
            const intensity = glowSettings.intensity || 0.6;
            const glowColor = glowSettings.color || '#ffcc00';
            const pulseSpeed = glowSettings.pulseSpeed || 3000;

            // Get the size constants for the slot reels
            const SYMBOL_SIZE = 100; // Fixed symbol size
            const REEL_COUNT = 5;    // Number of reels

            // Calculate the reel area dimensions
            const reelWidth = SYMBOL_SIZE;
            const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
            const startX = reelSpacing;
            const startY = 100;
            const VISIBLE_ROWS = 3; // Always 3 visible rows
            const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;
            const totalWidth = REEL_COUNT * reelWidth + (REEL_COUNT - 1) * reelSpacing;

            // Pulsing effect based on timestamp
            const pulseIntensity = Math.sin(timestamp / pulseSpeed) * 0.3 + 0.7; // 0.4 to 1.0
            const finalIntensity = intensity * pulseIntensity;

            // Draw glow around reel area
            ctx.save();

            // Create radial gradient for the temple glow
            const centerX = startX + totalWidth / 2;
            const centerY = startY + reelViewportHeight / 2;
            const gradientRadius = Math.max(totalWidth, reelViewportHeight) * 0.8;

            // Create golden temple glow
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, gradientRadius
            );

            const colorWithAlpha = `${glowColor}${Math.floor(finalIntensity * 30).toString(16).padStart(2, '0')}`;
            gradient.addColorStop(0, colorWithAlpha);
            gradient.addColorStop(0.7, `${glowColor}00`); // Transparent at the edges

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add decorative Aztec symbols around the edges that glow
            const symbolCount = 8;
            const symbolSize = 20;

            ctx.strokeStyle = glowColor;
            ctx.lineWidth = 2 * finalIntensity;

            // Draw Aztec symbols around the reel area
            for (let i = 0; i < symbolCount; i++) {
                // Calculate position around the reels
                const angle = (i / symbolCount) * Math.PI * 2;
                const distance = gradientRadius * 0.6;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;

                // Draw Aztec symbol
                ctx.beginPath();

                // Simple triangle/pyramid symbol
                ctx.translate(x, y);
                ctx.rotate(angle);

                // Draw a simple Aztec-like symbol
                ctx.beginPath();
                ctx.moveTo(-symbolSize / 2, -symbolSize / 2);
                ctx.lineTo(symbolSize / 2, -symbolSize / 2);
                ctx.lineTo(0, symbolSize / 2);
                ctx.closePath();
                ctx.stroke();

                // Reset transformations
                ctx.rotate(-angle);
                ctx.translate(-x, -y);
            }

            ctx.restore();
        }
    },

    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime, winAmount) => {
        const config = AztecTheme.visualEffects.themeSpecific.epicWinAnimation;
        const duration = config.duration;
        const progress = Math.min(1.0, elapsedTime / duration); // Ensure progress doesn't exceed 1

        // --- Background ---
        const bgPath = `images/${AztecTheme.name.toLowerCase()}/epic_bg.jpg`;

        // Initiate loading if not already started
        if (!config._bgLoadInitiated) {
            config._bgLoadInitiated = true;
            // Initialize gold particles storage
            config._particles = [];
            config._particlesInitialized = false;
            // Use async loading but don't block rendering
            EffectsHelper.loadImage(bgPath).then(img => {
                config._backgroundImage = img; // Store loaded image (or null if failed)
            }).catch(() => { // Catch potential promise rejection just in case
                config._backgroundImage = null;
            });
        }

        ctx.save();        // Draw background image if loaded, otherwise draw fallback
        if (config._backgroundImage) {
            // Ensure the image covers the entire canvas while maintaining aspect ratio
            const imgWidth = config._backgroundImage.width;
            const imgHeight = config._backgroundImage.height;
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = imgWidth / imgHeight;

            let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

            // Calculate dimensions to cover the entire canvas
            if (canvasRatio > imgRatio) {
                // Canvas is wider than image aspect ratio
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                // Canvas is taller than image aspect ratio
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            // Draw the image to cover the entire canvas
            ctx.drawImage(config._backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Fallback gradient background
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#1a472a'); // Dark deep green
            gradient.addColorStop(0.5, '#2e7d32'); // Forest green
            gradient.addColorStop(1, '#1b5e20'); // Darker base green
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Optionally draw text indicating loading state if desired
            // ctx.fillStyle = "white"; ctx.fillText("Loading background...", canvas.width/2, canvas.height/2);
        }        // We'll move the gold particles rendering to the end to ensure they're on top of everything// --- Title Text ---
        const titleText = config.name || "EPIC WIN";
        const titleBaseSize = Math.min(canvas.width / 15, 100); // Increased base size (was /10, 70)
        const titlePulse = Math.sin(elapsedTime / 300) * (titleBaseSize * 0.1); // Increased pulse effect
        const titleSize = titleBaseSize + titlePulse;
        const titleY = titleSize + 50;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `900 ${titleSize}px fantasy, cursive`; // Bolder font weight (900 instead of bold)

        // Enhanced glowing effect
        ctx.shadowColor = '#FFFFFF'; // Brighter yellow-gold glow
        ctx.shadowBlur = 30 + Math.sin(elapsedTime / 250) * 15; // Increased glow intensity & variation        // Bright yellow text gradient fill
        const titleGradient = ctx.createLinearGradient(
            canvas.width / 2 - 200, titleY,
            canvas.width / 2 + 200, titleY
        );
        titleGradient.addColorStop(0, '#ffff66'); // Bright yellow
        titleGradient.addColorStop(0.3, '#2e7d32'); // Slightly lighter yellow
        titleGradient.addColorStop(0.7, '#2e7d32'); // Bright yellow again
        titleGradient.addColorStop(1, '#ffff66'); // Light yellow with a slight hint of gold
        ctx.fillStyle = titleGradient;

        // Optional: Gentle rocking motion
        const titleRock = Math.sin(elapsedTime / 500) * 0.02; // Radians for rotation
        ctx.save();
        ctx.translate(canvas.width / 2, titleY);
        ctx.rotate(titleRock);
        ctx.fillText(titleText, 0, 0);
        // Optional outline for better contrast
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 2;
        ctx.strokeText(titleText, 0, 0);
        ctx.restore(); // Restore rotation/translation


        // --- Win Amount Text ---        const amountY = canvas.height * 0.6;
        const amountBaseSize = Math.min(canvas.width / 12, 60);
        const countUpDuration = duration * 0.6; // Spend 60% of time counting up

        let displayAmount = 0;
        if (elapsedTime < countUpDuration) {
            // Fast, non-linear count-up (ease-out)
            const countProgress = elapsedTime / countUpDuration;
            const easedProgress = 1 - Math.pow(1 - countProgress, 3); // Cubic ease-out
            displayAmount = winAmount * easedProgress;
        } else {
            displayAmount = winAmount; // Hold final amount
        }        // Ensure we're using the passed win amount parameter, not a constant
        // Format amount (e.g., with commas and 2 decimal places)
        const formattedAmount = displayAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });        // Size pulse when amount reaches final value
        let amountSize = amountBaseSize;
        let amountShakeX = 0;
        let amountShakeY = 0;
        let amountY = canvas.height / 2; // Position text vertically centered
        const shakeIntensity = 3;

        if (elapsedTime >= countUpDuration) {
            amountSize = amountBaseSize * (1 + Math.sin((elapsedTime - countUpDuration) / 150) * 0.1); // Pulse size
        } else {
            // Shake effect while counting
            amountShakeX = (Math.random() - 0.5) * shakeIntensity;
            amountShakeY = (Math.random() - 0.5) * shakeIntensity;
        }


        ctx.font = `bold ${amountSize}px 'Arial', sans-serif`;
        ctx.fillStyle = '#ffffff'; // White for contrast
        ctx.shadowColor = '#000000'; // Black shadow for readability
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.fillText(formattedAmount, canvas.width / 2 + amountShakeX, amountY + amountShakeY);
        // Optional: Add currency symbol (e.g., '$')
        // const currencySymbol = "$";
        // ctx.fillText(currencySymbol + formattedAmount, canvas.width / 2 + amountShakeX, amountY + amountShakeY);        // --- Gold Particles rendering at the very end (on top of everything) ---
        if (config.goldParticles) {

            const particleCount = 150; // More particles for an epic feel
            const gravity = 150; // Pixels per second squared (adjust as needed)
            const terminalVelocity = canvas.height * 0.8; // Max speed (pixels per second)

            // Initialize particles once
            if (!config._particlesInitialized) {
                config._particles = [];
                for (let i = 0; i < particleCount; i++) {
                    const initialY = Math.random() * -canvas.height * 1.5; // Start further above
                    const initialX = Math.random() * canvas.width;
                    config._particles.push({
                        x: initialX,
                        y: initialY,
                        initialX: initialX, // Store baseline X for sway
                        initialY: initialY, // Store for reset
                        size: Math.random() * 10 + 5, // Coin diameter range
                        speedY: Math.random() * 50 + 20, // Initial downward speed (pixels/sec)
                        // --- Coin Rotation ---
                        zRotation: Math.random() * Math.PI * 2, // Flat spin angle
                        zRotationSpeed: (Math.random() - 0.5) * 4, // Flat spin speed (radians/sec)
                        tiltAngle: Math.random() * Math.PI * 2, // Tumble angle (around X-axis)
                        tiltSpeed: (Math.random() - 0.5) * 5, // Tumble speed (radians/sec)
                        // --- Sway ---
                        swayPhase: Math.random() * Math.PI * 2, // Start sway at random point
                        swaySpeed: Math.random() * 1.5 + 0.8, // Sway frequency (cycles/sec)
                        swayAmplitude: Math.random() * 20 + 8, // Sway distance
                        // --- Optional: Physics ---
                        // accelerationY: gravity,
                        // terminalVelocityY: terminalVelocity * (Math.random() * 0.3 + 0.85), // Add slight variation
                    });
                }
                config._particlesInitialized = true;
            }

            // --- Update and Draw Particles ---
            ctx.save(); // Save context state for clean drawing

            const dtSec = deltaTime / 1000.0; // Delta time in seconds

            config._particles.forEach(p => {
                // --- Update Physics (Optional) ---
                // p.speedY = Math.min(p.speedY + p.accelerationY * dtSec, p.terminalVelocityY);

                // --- Update Position & Rotation ---
                p.y += p.speedY * dtSec;
                p.zRotation += p.zRotationSpeed * dtSec;
                p.tiltAngle += p.tiltSpeed * dtSec;

                // Add horizontal sway based on its own phase and speed
                p.x = p.initialX + Math.sin(p.swayPhase + elapsedTime / 1000 * p.swaySpeed) * p.swayAmplitude;

                // --- Reset particle if it falls off the bottom ---
                if (p.y > canvas.height + p.size * 2) { // Check slightly below screen
                    p.y = p.initialY - Math.random() * 50; // Reset above the screen with variation
                    p.initialX = Math.random() * canvas.width; // New random horizontal start
                    p.x = p.initialX;
                    p.speedY = Math.random() * 50 + 20; // Reset initial speed
                    p.swayPhase = Math.random() * Math.PI * 2; // Reset sway phase
                }

                // --- Draw Coin ---
                ctx.save();
                ctx.translate(p.x, p.y);          // Move to particle position
                ctx.rotate(p.zRotation);        // Apply flat spin

                // Calculate horizontal radius based on tilt angle (cosine makes it thin when edge-on)
                // Clamp to a minimum width (e.g., 1 pixel) so it doesn't disappear
                const radiusX = Math.max(1, (p.size / 2) * Math.abs(Math.cos(p.tiltAngle)));
                const radiusY = p.size / 2;

                // 1. Draw Dark Edge (for thickness illusion) - slightly larger vertically
                const edgeThickness = 1; // Pixel thickness for the edge
                ctx.fillStyle = '#a07000'; // Darker gold/brownish
                ctx.beginPath();
                ctx.ellipse(0, 0, radiusX, radiusY + edgeThickness * 0.5, 0, 0, Math.PI * 2);
                ctx.fill();

                // 2. Draw Main Coin Body (using gradient)
                const grad = ctx.createRadialGradient(
                    radiusX * -0.1, radiusY * -0.1, 0, // Offset gradient slightly for light source illusion
                    0, 0, radiusY * 1.2 // Make gradient cover the ellipse
                );
                grad.addColorStop(0, '#fff8dc');    // Lighter center (Cornsilk)
                grad.addColorStop(0.6, '#ffd700');  // Main Gold
                grad.addColorStop(0.9, '#daa520');  // Goldenrod edge
                grad.addColorStop(1, '#b8860b');    // Darker edge (DarkGoldenrod)
                ctx.fillStyle = grad;

                ctx.beginPath();
                ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2); // Draw the main ellipse
                ctx.fill();

                // 3. Draw Highlight (small bright ellipse)
                const highlightRadiusX = radiusX * 0.4;
                const highlightRadiusY = radiusY * 0.3;
                // Position highlight near the 'top' edge relative to the flat spin
                const highlightOffsetY = -radiusY * 0.4;
                ctx.fillStyle = 'rgba(255, 255, 220, 0.7)'; // Light yellow, semi-transparent
                ctx.beginPath();
                // Draw highlight ellipse - rotation is handled by the main context rotation
                ctx.ellipse(0, highlightOffsetY, highlightRadiusX, highlightRadiusY, 0, 0, Math.PI * 2);
                ctx.fill();


                ctx.restore(); // Restore context state for the next particle
            });

            ctx.restore(); // Restore original context state
        }

        ctx.restore(); // Restore context state from the beginning

        // Return true if animation is ongoing, false if finished
        return progress < 1.0;
    }
};