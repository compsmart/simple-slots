import { EffectPresets, EffectsHelper } from './effects.js';

export const AztecTheme = {
    name: "Aztec",
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
        },
        backgroundEffects: {
            enabled: true,
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
                name: "Temple Awakening",
                duration: 8000, // 5.5 seconds
                templeRise: true,
                tribalDance: true,
                goldIdolReveal: true
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
    ],
    // Renderer for Aztec theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
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
    /**
 * Renders an Epic Aztec Win Animation with enhanced graphics and effects.
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @param {number} elapsedTime - Total time elapsed since animation start (ms).
 * @param {number} deltaTime - Time elapsed since last frame (ms).
 */
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime) => {
        const duration = 6500; // Increased duration for more spectacle (7.5 seconds)
        const progress = Math.min(elapsedTime / duration, 1.0);

        // --- Easing Functions ---
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const easeOutQuad = t => 1 - (1 - t) * (1 - t);
        const easeInQuad = t => t * t;

        // --- Configuration ---
        const config = {
            jungleColor1: '#0a4d1a', // Deeper green
            jungleColor2: '#1b5e20',
            jungleColor3: '#2e7d32', // Lighter green for highlights/mist
            mistColor: 'rgba(46, 125, 50, 0.15)', // Subtle green mist
            stoneColor1: '#8d6e63', // Main stone
            stoneColor2: '#a1887f', // Lighter stone
            stoneDetailColor: '#5d4037', // Darker detail/shadow
            mossColor: 'rgba(56, 87, 35, 0.6)', // Mossy green overlay
            gold1: '#ffd700', // Bright Gold
            gold2: '#f0c000', // Medium Gold
            gold3: '#b8860b', // Dark Gold / Bronze
            gemColorJade: '#00a86b',
            gemColorRuby: '#e0115f',
            gemColorObsidian: '#3b3140',
            textColor: '#ffe070', // Golden yellow text
            textOutline: '#4d3a1f', // Dark brown text outline
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            templeSteps: 6,
            templeBaseWidthFactor: 0.7, // Relative to canvas width
            templeHeightFactor: 0.5, // Relative to canvas height
            sunstoneDetailColor: '#4d3a1f',
            torchFlameColor1: 'rgba(255, 230, 100, 0.9)',
            torchFlameColor2: 'rgba(255, 165, 0, 0.8)',
            torchFlameColor3: 'rgba(255, 69, 0, 0)',
            treasureItemCount: 40,
            quetzalcoatlSegments: 25,
            quetzalcoatlColor1: '#00a86b', // Jade green
            quetzalcoatlColor2: '#34d399', // Lighter jade
            quetzalcoatlFeatherColor: '#ff5733', // Orange/Red feathers
        };

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // --- Helper Functions ---
        const drawVine = (x, y, length, thickness, segments, alpha) => {
            ctx.beginPath();
            ctx.moveTo(x, y);
            let currentX = x;
            let currentY = y;
            ctx.strokeStyle = `rgba(27, 94, 32, ${alpha})`; // Dark vine color
            ctx.lineWidth = thickness;
            ctx.globalAlpha = alpha;

            for (let i = 0; i < segments; i++) {
                const angle = (Math.random() - 0.5) * 0.8;
                const segLength = length / segments;
                const nextX = currentX + Math.sin(angle) * segLength;
                const nextY = currentY + Math.cos(angle) * segLength;
                ctx.quadraticCurveTo(currentX + (Math.random() - 0.5) * 20, currentY + segLength / 2, nextX, nextY);

                // Simple leaves
                if (i % 3 === 0 && thickness > 1) {
                    ctx.save();
                    ctx.translate(nextX, nextY);
                    ctx.rotate(angle + (Math.random() - 0.5) * 0.5);
                    ctx.fillStyle = `rgba(46, 125, 50, ${alpha * 0.8})`; // Leaf color
                    ctx.beginPath();
                    ctx.ellipse(thickness * 1.5, 0, thickness * 1.5, thickness * 0.8, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
                currentX = nextX;
                currentY = nextY;
            }
            ctx.stroke();
            ctx.globalAlpha = 1.0;
        };

        const drawStoneStep = (y, width, height, baseColor, detailColor, mossColor, mossAmount) => {
            // Base color
            ctx.fillStyle = baseColor;
            ctx.fillRect(centerX - width / 2, y, width, height);

            // Subtle gradient for depth
            const grad = ctx.createLinearGradient(centerX - width / 2, y, centerX + width / 2, y);
            grad.addColorStop(0, 'rgba(0,0,0,0.1)');
            grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
            grad.addColorStop(1, 'rgba(0,0,0,0.1)');
            ctx.fillStyle = grad;
            ctx.fillRect(centerX - width / 2, y, width, height);


            // Stone block lines (less regular)
            ctx.strokeStyle = detailColor;
            ctx.lineWidth = 1.5;
            ctx.globalAlpha = 0.7;
            let currentX = centerX - width / 2;
            while (currentX < centerX + width / 2) {
                const stoneW = (40 + Math.random() * 40);
                if (currentX + stoneW < centerX + width / 2) {
                    ctx.beginPath();
                    ctx.moveTo(currentX + stoneW, y + height * (Math.random() * 0.1)); // Jagged top
                    ctx.lineTo(currentX + stoneW, y + height * (0.9 + Math.random() * 0.1)); // Jagged bottom
                    ctx.stroke();
                }
                currentX += stoneW;
            }
            // Horizontal line
            ctx.beginPath();
            ctx.moveTo(centerX - width / 2, y + height * (0.95 + Math.random() * 0.1)); // Slightly uneven bottom edge
            ctx.lineTo(centerX + width / 2, y + height * (0.95 + Math.random() * 0.1));
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            // Moss overlay
            if (mossAmount > 0) {
                ctx.fillStyle = mossColor;
                ctx.globalAlpha = mossAmount * 0.6; // Control moss intensity
                // Random patches of moss, concentrated near edges/top
                for (let k = 0; k < 10; k++) {
                    const mossX = centerX - width / 2 + Math.random() * width;
                    const mossY = y + Math.random() * height * 0.6; // More moss near top
                    const mossWidth = Math.random() * width * 0.15;
                    const mossHeight = Math.random() * height * 0.2;
                    ctx.fillRect(mossX, mossY, mossWidth, mossHeight);
                }
                ctx.globalAlpha = 1.0;
            }
        };

        const drawTreasureItem = (x, y, size, rotation, typeSeed, elapsedTime) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.shadowColor = config.shadowColor;
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;

            const type = Math.floor(typeSeed * 5); // 0: Coin, 1: Jade, 2: Ruby, 3: Mask, 4: Obsidian Knife

            switch (type) {
                case 0: // Gold Coin (3D)
                    const tilt = Math.PI / 2 + Math.sin(elapsedTime / 300 + typeSeed * 10) * (Math.PI * 0.45);
                    const thickness = Math.max(1, size * 0.15 * Math.abs(Math.cos(tilt)));
                    const radiusX = size / 2;
                    const radiusY = size / 2 * Math.abs(Math.sin(tilt));
                    // Edge
                    ctx.fillStyle = config.gold3;
                    ctx.beginPath(); ctx.ellipse(0, thickness / 2, radiusX, radiusY, 0, 0, Math.PI * 2); ctx.fill();
                    // Face
                    const coinGrad = ctx.createLinearGradient(-radiusX, -radiusY, radiusX, radiusY);
                    coinGrad.addColorStop(0, config.gold1); coinGrad.addColorStop(0.5, config.gold2); coinGrad.addColorStop(1, config.gold3);
                    ctx.fillStyle = coinGrad;
                    ctx.beginPath(); ctx.ellipse(0, -thickness / 2, radiusX, radiusY, 0, 0, Math.PI * 2); ctx.fill();
                    // Shine
                    if (Math.sin(tilt) > 0.3) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'; ctx.lineWidth = Math.max(1, size * 0.05);
                        ctx.beginPath(); ctx.arc(0, -thickness / 2, radiusX * 0.7, Math.PI * 1.6, Math.PI * 1.9); ctx.stroke();
                    }
                    break;
                case 1: // Jade Gem (faceted)
                    ctx.fillStyle = config.gemColorJade;
                    ctx.beginPath();
                    ctx.moveTo(0, -size * 0.6); ctx.lineTo(size * 0.5, -size * 0.2); ctx.lineTo(size * 0.3, size * 0.5);
                    ctx.lineTo(-size * 0.3, size * 0.5); ctx.lineTo(-size * 0.5, -size * 0.2); ctx.closePath(); ctx.fill();
                    // Facet lines
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(0, -size * 0.6); ctx.lineTo(0, size * 0.1); ctx.lineTo(size * 0.3, size * 0.5);
                    ctx.moveTo(0, size * 0.1); ctx.lineTo(-size * 0.3, size * 0.5); ctx.stroke();
                    // Sparkle
                    ctx.fillStyle = 'rgba(200, 255, 220, 0.9)'; ctx.beginPath(); ctx.arc(size * 0.2, -size * 0.3, size * 0.08, 0, Math.PI * 2); ctx.fill();
                    break;
                case 2: // Ruby Gem (faceted)
                    ctx.fillStyle = config.gemColorRuby;
                    ctx.beginPath();
                    ctx.moveTo(0, -size * 0.5); ctx.lineTo(size * 0.5, 0); ctx.lineTo(0, size * 0.5); ctx.lineTo(-size * 0.5, 0); ctx.closePath(); ctx.fill();
                    // Facet lines
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; ctx.lineWidth = 1;
                    ctx.beginPath(); ctx.moveTo(size * 0.5, 0); ctx.lineTo(-size * 0.5, 0); ctx.moveTo(0, -size * 0.5); ctx.lineTo(0, size * 0.5); ctx.stroke();
                    // Sparkle
                    ctx.fillStyle = 'rgba(255, 200, 200, 0.9)'; ctx.beginPath(); ctx.arc(-size * 0.15, -size * 0.15, size * 0.07, 0, Math.PI * 2); ctx.fill();
                    break;
                case 3: // Gold Mask
                    ctx.fillStyle = config.gold2;
                    ctx.beginPath(); ctx.ellipse(0, 0, size * 0.5, size * 0.6, 0, 0, Math.PI * 2); ctx.fill();
                    // Darker inlay/features
                    ctx.fillStyle = config.gold3;
                    ctx.beginPath(); ctx.ellipse(0, size * 0.1, size * 0.3, size * 0.15, 0, 0, Math.PI); ctx.fill(); // Mouth area
                    ctx.fillRect(-size * 0.25, -size * 0.2, size * 0.15, size * 0.2); // Left eye socket
                    ctx.fillRect(size * 0.1, -size * 0.2, size * 0.15, size * 0.2); // Right eye socket
                    // Jade inlays
                    ctx.fillStyle = config.gemColorJade;
                    ctx.beginPath(); ctx.arc(-size * 0.18, -size * 0.1, size * 0.05, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(size * 0.17, -size * 0.1, size * 0.05, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(0, size * 0.35, size * 0.06, 0, Math.PI * 2); ctx.fill(); // Chin jewel
                    break;
                case 4: // Obsidian Knife
                    ctx.fillStyle = config.gemColorObsidian; // Obsidian blade
                    ctx.beginPath();
                    ctx.moveTo(-size * 0.1, size * 0.5); // Handle base left
                    ctx.lineTo(-size * 0.1, 0); // Handle top left
                    ctx.quadraticCurveTo(0, -size * 0.6, size * 0.1, 0); // Blade tip
                    ctx.lineTo(size * 0.1, size * 0.5); // Handle base right
                    ctx.closePath(); ctx.fill();
                    // Gold Handle wrap
                    ctx.fillStyle = config.gold3;
                    ctx.fillRect(-size * 0.15, size * 0.3, size * 0.3, size * 0.2);
                    // Shine on blade
                    ctx.fillStyle = 'rgba(200, 200, 220, 0.5)';
                    ctx.beginPath(); ctx.moveTo(-size * 0.05, 0); ctx.lineTo(0, -size * 0.4); ctx.lineTo(size * 0.05, 0); ctx.closePath(); ctx.fill();
                    break;
            }

            ctx.restore();
        };

        // --- Background ---
        // Deep Jungle Gradient
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, config.jungleColor1);
        bgGradient.addColorStop(0.6, config.jungleColor2);
        bgGradient.addColorStop(1, config.jungleColor1);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Background Vines (subtle parallax)
        const parallaxOffset = Math.sin(elapsedTime / 8000) * 15;
        for (let i = 0; i < 5; i++) {
            const vineX = (i / 5) * canvas.width + parallaxOffset + (i * 30);
            drawVine(vineX, -20, canvas.height * 0.8, 3 + i, 10, 0.4);
        }

        // Ground Mist
        const mistHeight = canvas.height * 0.3;
        const mistGradient = ctx.createLinearGradient(0, canvas.height - mistHeight, 0, canvas.height);
        mistGradient.addColorStop(0, 'rgba(46, 125, 50, 0)');
        mistGradient.addColorStop(0.5, config.mistColor);
        mistGradient.addColorStop(1, config.mistColor);
        ctx.fillStyle = mistGradient;
        ctx.fillRect(0, canvas.height - mistHeight, canvas.width, mistHeight);

        // Foreground Vines
        for (let i = 0; i < 3; i++) {
            const vineX = (i / 3) * canvas.width - parallaxOffset * 1.5 + (i * 50) + 100;
            drawVine(vineX, -50, canvas.height * 1.1, 8 - i * 2, 15, 0.7);
        }


        // --- Animation Phases ---
        const phase1End = 0.40; // Temple Rise & Detail
        const phase2End = 0.60; // Sunstone Activation & Treasure Burst
        const phase3End = 0.90; // Quetzalcoatl Appearance & Fire
        const phase4End = 1.0;  // Text Fade In / Hold

        // --- Phase 1: Temple Emergence (0% - 40%) ---
        const templeBaseWidth = canvas.width * config.templeBaseWidthFactor;
        const templeBaseHeight = canvas.height * config.templeHeightFactor;
        const baseTempleY = canvas.height * 0.95; // Anchor point slightly below canvas bottom edge

        if (progress < phase2End) { // Keep drawing temple until burst is over
            const riseProgress = easeInOutQuad(Math.min(1, progress / phase1End));
            const isBursting = progress >= phase1End;
            const burstProgress = isBursting ? easeInOutQuad((progress - phase1End) / (phase2End - phase1End)) : 0;

            const currentTempleHeight = templeBaseHeight * riseProgress;
            const bottomY = baseTempleY - currentTempleHeight; // Top of the base rises

            // Draw temple body with steps
            const steps = config.templeSteps;
            const totalStepStructureHeight = currentTempleHeight * 0.7; // Steps take 70% of height
            const topPlatformHeight = currentTempleHeight * 0.3;
            const topPlatformY = bottomY;
            const stepStartY = topPlatformY + topPlatformHeight;

            ctx.save();
            // Fade out during burst peak? Optional.
            // ctx.globalAlpha = 1.0 - Math.sin(burstProgress * Math.PI) * 0.5;

            // Draw top platform
            const topWidth = templeBaseWidth * (1 - (steps / (steps + 1.5))); // Width matches the top step
            drawStoneStep(topPlatformY, topWidth * riseProgress, topPlatformHeight, config.stoneColor1, config.stoneDetailColor, config.mossColor, riseProgress * 0.6);

            // Draw Steps
            for (let i = 0; i < steps; i++) {
                const stepProgress = (steps - i) / steps; // 1 for bottom step, ~0 for top
                const stepWidth = templeBaseWidth * stepProgress * riseProgress;
                const stepHeight = totalStepStructureHeight / steps;
                const stepY = stepStartY + i * stepHeight;

                // Only draw step if its top edge is above the base Y
                if (stepY < baseTempleY) {
                    const effectiveHeight = Math.min(stepHeight, baseTempleY - stepY);
                    const color = i % 2 === 0 ? config.stoneColor1 : config.stoneColor2;
                    const mossAmount = riseProgress * (i / steps) * 0.8; // More moss on lower steps
                    drawStoneStep(stepY, stepWidth, effectiveHeight, color, config.stoneDetailColor, config.mossColor, mossAmount);
                }
            }

            // Temple Top Structure (Door, Sunstone, Torches) - Appear after steps are mostly formed
            if (riseProgress > 0.7) {
                const topStructureProgress = easeOutQuad((riseProgress - 0.7) / 0.3);
                const structureY = topPlatformY; // On top of the main platform
                const structureWidth = topWidth * 0.6 * topStructureProgress;
                const structureHeight = topPlatformHeight * 0.8 * topStructureProgress; // Smaller building on top

                // Doorway (glowing slightly)
                const doorWidth = structureWidth * 0.3;
                const doorHeight = structureHeight * 0.7;
                const doorX = centerX - doorWidth / 2;
                const doorY = structureY + structureHeight - doorHeight;

                ctx.fillStyle = '#211a16'; // Very dark doorway
                ctx.fillRect(doorX, doorY, doorWidth, doorHeight);
                // Inner glow (subtle before burst)
                if (!isBursting) {
                    const doorGlow = ctx.createRadialGradient(centerX, doorY + doorHeight / 2, 0, centerX, doorY + doorHeight / 2, doorWidth * 2);
                    doorGlow.addColorStop(0, `rgba(255, 200, 50, ${topStructureProgress * 0.1})`);
                    doorGlow.addColorStop(1, 'rgba(255, 200, 50, 0)');
                    ctx.fillStyle = doorGlow;
                    ctx.fillRect(doorX - doorWidth, doorY - doorHeight * 0.5, doorWidth * 3, doorHeight * 2);
                }


                // Sunstone Calendar (more detailed)
                const sunstoneSize = structureWidth * 0.5 * topStructureProgress;
                const sunstoneY = doorY - sunstoneSize * 0.6; // Position above door

                if (sunstoneSize > 5) {
                    ctx.save();
                    ctx.translate(centerX, sunstoneY);
                    const rotationSpeed = isBursting ? 5 : 1; // Spin faster during burst
                    ctx.rotate(elapsedTime / (1000 / rotationSpeed) + riseProgress * 2);
                    ctx.lineWidth = Math.max(1, sunstoneSize * 0.05);

                    // Base Disc (Gold Gradient)
                    const sunGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sunstoneSize / 2);
                    sunGrad.addColorStop(0, config.gold1); sunGrad.addColorStop(0.7, config.gold2); sunGrad.addColorStop(1, config.gold3);
                    ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(0, 0, sunstoneSize / 2, 0, Math.PI * 2); ctx.fill();

                    // Outer Ring (Darker)
                    ctx.strokeStyle = config.sunstoneDetailColor; ctx.stroke();
                    // Inner Ring
                    ctx.beginPath(); ctx.arc(0, 0, sunstoneSize * 0.4, 0, Math.PI * 2); ctx.stroke();
                    // Center Ring
                    ctx.beginPath(); ctx.arc(0, 0, sunstoneSize * 0.15, 0, Math.PI * 2); ctx.stroke();


                    // Glyphs/Rays (Simplified)
                    ctx.strokeStyle = config.sunstoneDetailColor;
                    for (let i = 0; i < 8; i++) { // Outer rays/markers
                        const angle = (Math.PI * 2 / 8) * i;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(angle) * sunstoneSize * 0.4, Math.sin(angle) * sunstoneSize * 0.4);
                        ctx.lineTo(Math.cos(angle) * sunstoneSize * 0.5, Math.sin(angle) * sunstoneSize * 0.5);
                        ctx.stroke();
                    }
                    for (let i = 0; i < 12; i++) { // Inner markers
                        const angle = (Math.PI * 2 / 12) * i;
                        ctx.beginPath();
                        ctx.moveTo(Math.cos(angle) * sunstoneSize * 0.15, Math.sin(angle) * sunstoneSize * 0.15);
                        ctx.lineTo(Math.cos(angle) * sunstoneSize * 0.25, Math.sin(angle) * sunstoneSize * 0.25);
                        ctx.stroke();
                    }

                    // Central Face (Simple)
                    ctx.fillStyle = config.sunstoneDetailColor;
                    ctx.beginPath(); ctx.arc(-sunstoneSize * 0.04, -sunstoneSize * 0.03, sunstoneSize * 0.03, 0, Math.PI * 2); ctx.fill(); // Eye L
                    ctx.beginPath(); ctx.arc(sunstoneSize * 0.04, -sunstoneSize * 0.03, sunstoneSize * 0.03, 0, Math.PI * 2); ctx.fill(); // Eye R
                    ctx.beginPath(); ctx.arc(0, sunstoneSize * 0.05, sunstoneSize * 0.05, 0, Math.PI, false); ctx.fill(); // Mouth


                    // Glowing effect (intensifies during burst)
                    const glowIntensity = isBursting ? Math.sin(burstProgress * Math.PI) * 0.8 : topStructureProgress * 0.2;
                    if (glowIntensity > 0.01) {
                        ctx.shadowColor = config.gold1;
                        ctx.shadowBlur = sunstoneSize * 0.5 * glowIntensity;
                        // Redraw base disc with shadow to create glow
                        ctx.fillStyle = sunGrad; ctx.beginPath(); ctx.arc(0, 0, sunstoneSize / 2, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowColor = 'transparent'; // Reset shadow
                    }

                    ctx.restore();
                }


                // Torches (with dynamic flames and light casting)
                const torchProgress = topStructureProgress;
                if (torchProgress > 0.3) {
                    const torchGlow = (Math.sin(elapsedTime / 150 + riseProgress) * 0.4 + 0.6) * torchProgress; // Flicker + Fade in
                    for (const xPos of [-1, 1]) {
                        const torchBaseX = centerX + xPos * (structureWidth * 0.4);
                        const torchBaseY = structureY + structureHeight * 0.6;
                        const torchHeight = structureHeight * 0.4;

                        // Torch Holder (Stone)
                        ctx.fillStyle = config.stoneDetailColor;
                        ctx.beginPath();
                        ctx.moveTo(torchBaseX - 10 * torchProgress, torchBaseY);
                        ctx.lineTo(torchBaseX - 5 * torchProgress, torchBaseY - torchHeight);
                        ctx.lineTo(torchBaseX + 5 * torchProgress, torchBaseY - torchHeight);
                        ctx.lineTo(torchBaseX + 10 * torchProgress, torchBaseY);
                        ctx.closePath();
                        ctx.fill();

                        // Flame
                        const flameX = torchBaseX;
                        const flameY = torchBaseY - torchHeight;
                        const flameSize = 35 * torchProgress * (0.8 + Math.random() * 0.4); // Vary size

                        // Draw multiple layers for a more complex flame
                        for (let f = 0; f < 3; f++) {
                            const layerSize = flameSize * (1 - f * 0.3);
                            const layerY = flameY - f * 5;
                            const flameGrad = ctx.createRadialGradient(flameX, layerY, 0, flameX, layerY, layerSize * 0.8);
                            flameGrad.addColorStop(0, `rgba(255, 255, 180, ${torchGlow * (1 - f * 0.2)})`);
                            flameGrad.addColorStop(0.4, `rgba(255, 180, 50, ${torchGlow * (1 - f * 0.2)})`);
                            flameGrad.addColorStop(1, `rgba(255, 80, 0, 0)`);

                            ctx.fillStyle = flameGrad;
                            ctx.beginPath();
                            ctx.moveTo(flameX, layerY + layerSize * 0.3); // Base
                            // Wobbly top using curves
                            ctx.quadraticCurveTo(flameX - layerSize * 0.4, layerY - layerSize * 0.3, flameX + (Math.random() - 0.5) * layerSize * 0.2, layerY - layerSize * (0.8 + Math.random() * 0.2));
                            ctx.quadraticCurveTo(flameX + layerSize * 0.4, layerY - layerSize * 0.3, flameX, layerY + layerSize * 0.3);
                            ctx.fill();
                        }

                        // Cast light onto temple
                        const lightRadius = 80 * torchProgress * torchGlow;
                        const lightGrad = ctx.createRadialGradient(flameX, flameY, lightRadius * 0.1, flameX, flameY, lightRadius);
                        lightGrad.addColorStop(0, `rgba(255, 180, 50, 0.15)`);
                        lightGrad.addColorStop(1, `rgba(255, 180, 50, 0)`);
                        ctx.fillStyle = lightGrad;
                        ctx.globalCompositeOperation = 'lighter'; // Additive blending for light
                        ctx.fillRect(flameX - lightRadius, flameY - lightRadius, lightRadius * 2, lightRadius * 2);
                        ctx.globalCompositeOperation = 'source-over'; // Reset blend mode
                    }
                }
            }

            ctx.restore(); // Restore alpha potentially set earlier
        }

        // --- Phase 2: Sunstone Activation & Treasure Burst (40% - 60%) ---
        if (progress >= phase1End && progress < phase2End) {
            const burstProgress = easeInOutQuad((progress - phase1End) / (phase2End - phase1End));
            const pulse = Math.sin(burstProgress * Math.PI); // 0 -> 1 -> 0

            // Find Door Position (Recalculate based on final temple size)
            const finalTempleHeight = templeBaseHeight;
            const finalTopPlatformHeight = finalTempleHeight * 0.3;
            const finalTopPlatformY = baseTempleY - finalTempleHeight;
            const finalStructureHeight = finalTopPlatformHeight * 0.8;
            const finalDoorHeight = finalStructureHeight * 0.7;
            const doorCenterY = finalTopPlatformY + finalStructureHeight - finalDoorHeight / 2;

            // Intense Light Burst from Doorway
            const lightRadius = canvas.width * 0.8 * pulse;
            const lightGradient = ctx.createRadialGradient(centerX, doorCenterY, 0, centerX, doorCenterY, lightRadius);
            lightGradient.addColorStop(0, `rgba(255, 235, 180, ${pulse * 0.95})`); // White hot center
            lightGradient.addColorStop(0.15, `rgba(255, 215, 0, ${pulse * 0.8})`);
            lightGradient.addColorStop(0.5, `rgba(255, 165, 0, ${pulse * 0.5})`);
            lightGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
            ctx.fillStyle = lightGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Treasure Items Bursting Outwards
            for (let i = 0; i < config.treasureItemCount; i++) {
                const seed = i / config.treasureItemCount;
                const angle = seed * Math.PI * 4 + burstProgress * 2; // Spiral outwards slightly
                const maxDist = canvas.width * 0.6;
                const speedFactor = 0.6 + seed * 0.7;
                const distance = maxDist * burstProgress * speedFactor * (1 - burstProgress * 0.3); // Slow down towards end
                const itemX = centerX + Math.cos(angle) * distance;
                const itemY = doorCenterY + Math.sin(angle) * distance * 0.8 - (100 * pulse); // Add upward thrust

                const startSize = 15 + seed * 40;
                const currentSize = startSize * (1 - burstProgress * 0.5); // Shrink slightly
                const rotation = angle * 2 + elapsedTime / (200 + seed * 200);

                if (currentSize < 1) continue;

                drawTreasureItem(itemX, itemY, currentSize, rotation, seed, elapsedTime);
            }

            // Add Particles (Gold Dust/Sparks)
            for (let i = 0; i < 50; i++) {
                const seed = Math.random();
                const angle = Math.random() * Math.PI * 2;
                const maxDist = canvas.width * 0.7 * pulse;
                const distance = Math.random() * maxDist;
                const particleX = centerX + Math.cos(angle) * distance;
                const particleY = doorCenterY + Math.sin(angle) * distance * 0.8 - (150 * pulse);
                const size = 1 + Math.random() * 3 * (1 - burstProgress); // Fade out size
                const alpha = pulse * (1 - distance / maxDist) * (1 - burstProgress) * 0.8; // Fade out alpha

                if (alpha > 0.05 && size > 0.5) {
                    ctx.fillStyle = `rgba(255, 215, 100, ${alpha})`;
                    ctx.beginPath(); ctx.arc(particleX, particleY, size, 0, Math.PI * 2); ctx.fill();
                }
            }
        }

        // --- Phase 3: Quetzalcoatl & Celebration Fire (60% - 90%) ---
        if (progress >= phase2End && progress < phase4End) { // Continue drawing through text phase
            const celebrationProgress = easeInOutQuad(Math.min(1.0, (progress - phase2End) / (phase3End - phase2End)));

            // Quetzalcoatl Appearance
            const qProgress = Math.min(1, celebrationProgress / 0.8); // Takes 80% of this phase to fully appear
            const qSegments = config.quetzalcoatlSegments;
            const qBaseRadius = canvas.width * 0.4 * qProgress;
            const qVerticalOffset = canvas.height * 0.3 * (1 - qProgress); // Start lower, rise up
            const qWobble = elapsedTime / 800;
            const qTurn = Math.PI * 2.5 * qProgress; // How much it wraps around

            ctx.save();
            ctx.translate(centerX, centerY + qVerticalOffset);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 5;


            let lastX = 0, lastY = 0, lastAngle = 0;
            for (let i = qSegments - 1; i >= 0; i--) { // Draw from tail to head
                const segProgress = i / qSegments;
                const angle = qWobble + segProgress * qTurn;
                const radius = qBaseRadius * (1 - segProgress * 0.5); // Taper towards tail
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius * 0.7 + (i * 5) * (1 - qProgress); // Add vertical offset that reduces as it rises & slight Y wave

                const size = (15 + (qSegments - i) * 1.5) * qProgress; // Thicker towards head

                if (size < 1) continue;

                const segmentAngle = Math.atan2(y - lastY, x - lastX);

                // Segment Body Gradient
                const bodyGrad = ctx.createLinearGradient(-size / 2, -size / 2, size / 2, size / 2);
                bodyGrad.addColorStop(0, config.quetzalcoatlColor1);
                bodyGrad.addColorStop(1, config.quetzalcoatlColor2);

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(segmentAngle + Math.PI / 2); // Align segment to path

                ctx.fillStyle = bodyGrad;
                ctx.beginPath();
                ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
                ctx.fill();

                // Feather Ruff (near head)
                if (i < 5 && qProgress > 0.5) { // Only draw on head segments when mostly visible
                    const featherProgress = (qProgress - 0.5) * 2;
                    ctx.fillStyle = config.quetzalcoatlFeatherColor;
                    const featherCount = 5;
                    for (let f = 0; f < featherCount; f++) {
                        const fAngle = (f / featherCount - 0.5) * Math.PI * 0.8 + Math.sin(elapsedTime / 200 + i * 0.5) * 0.2; // Fan out + wave
                        const fLength = size * 1.5 * featherProgress;
                        const fWidth = size * 0.3 * featherProgress;
                        ctx.save();
                        ctx.rotate(fAngle);
                        ctx.beginPath();
                        ctx.ellipse(0, -fLength * 0.6, fWidth / 2, fLength / 2, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }

                // Eyes (on head segment i=0)
                if (i === 0 && size > 10) {
                    const eyeSize = size * 0.15;
                    ctx.fillStyle = '#FFFF00'; // Yellow glowing eyes
                    ctx.beginPath(); ctx.arc(-size * 0.15, -size * 0.1, eyeSize, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(size * 0.15, -size * 0.1, eyeSize, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#000000'; // Pupil
                    ctx.beginPath(); ctx.arc(-size * 0.15, -size * 0.1, eyeSize * 0.5, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.arc(size * 0.15, -size * 0.1, eyeSize * 0.5, 0, Math.PI * 2); ctx.fill();
                }


                ctx.restore();

                lastX = x; lastY = y; lastAngle = segmentAngle;
            }
            ctx.restore();


            // Sacred Fire Bowl (Appears later)
            const fireStartProgress = 0.4;
            if (celebrationProgress > fireStartProgress) {
                const fireProgress = easeOutQuad((celebrationProgress - fireStartProgress) / (1.0 - fireStartProgress));
                const fireX = centerX;
                const fireBaseY = canvas.height * 0.9; // Position it lower
                const bowlHeight = 60 * fireProgress;
                const bowlWidth = 150 * fireProgress;
                const fireY = fireBaseY - bowlHeight * 0.3; // Top edge of bowl

                // Stone Bowl
                ctx.fillStyle = config.stoneDetailColor;
                ctx.beginPath(); ctx.ellipse(fireX, fireY, bowlWidth / 2, bowlHeight / 2, 0, 0, Math.PI * 2); ctx.fill();
                // Bowl Rim Highlight
                ctx.fillStyle = config.stoneColor2;
                ctx.beginPath(); ctx.ellipse(fireX, fireY, bowlWidth / 2, bowlHeight * 0.15, 0, 0, Math.PI * 2); ctx.fill();


                // Animated Flames (More dynamic)
                const flameBaseHeight = 120 * fireProgress;
                for (let i = 0; i < 30; i++) { // More particles for denser fire
                    const particleSeed = i / 30 + elapsedTime / 5000; // Use time for movement seed
                    const pX = fireX + (Math.sin(particleSeed * 15 + i) * 0.5) * bowlWidth * 0.6; // Horizontal sway
                    const pMaxHeight = flameBaseHeight * (0.5 + Math.abs(Math.sin(particleSeed * 5 + i))); // Pulsing height
                    const pCurrentY = fireY - Math.pow(Math.random(), 1.5) * pMaxHeight; // Current Y pos, concentrate near base
                    const pLife = Math.abs(Math.sin(particleSeed * 7 + i)); // 0 -> 1 -> 0 cycle for alpha/size
                    const pSize = (2 + Math.random() * 6) * fireProgress * pLife;
                    const alpha = pLife * (1 - (fireY - pCurrentY) / pMaxHeight) * 0.9; // Fade with height and life

                    if (alpha < 0.05 || pSize < 1) continue;

                    // Flame Color Gradient based on height/life
                    let color1, color2;
                    const heat = (fireY - pCurrentY) / pMaxHeight; // 0 near base, 1 at top
                    if (heat < 0.3) { // Base - Yellow/White hot
                        color1 = `rgba(255, 255, 200, ${alpha})`; color2 = `rgba(255, 215, 0, ${alpha * 0.8})`;
                    } else if (heat < 0.7) { // Middle - Orange
                        color1 = `rgba(255, 180, 0, ${alpha})`; color2 = `rgba(255, 100, 0, ${alpha * 0.7})`;
                    } else { // Top - Red/Fading
                        color1 = `rgba(255, 80, 0, ${alpha})`; color2 = `rgba(200, 0, 0, ${alpha * 0.5})`;
                    }

                    const pGrad = ctx.createRadialGradient(pX, pCurrentY, 0, pX, pCurrentY, pSize);
                    pGrad.addColorStop(0, color1); pGrad.addColorStop(1, color2);
                    ctx.fillStyle = pGrad;
                    ctx.beginPath(); ctx.arc(pX, pCurrentY, pSize, 0, Math.PI * 2); ctx.fill();
                }
            }
        }


        // --- Phase 4: Text Display (Starts ~50%, fades fully in by ~75%, stays) ---
        const textAppearStart = 0.5;
        const textAppearEnd = 0.75;
        if (progress > textAppearStart) {
            const textProgress = easeInOutQuad(Math.min(1, (progress - textAppearStart) / (textAppearEnd - textAppearStart)));

            ctx.save();
            ctx.globalAlpha = textProgress;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const mainText = "AZTEC GOLD";
            const maxFontSize = canvas.width / 9; // Adjust as needed
            const currentFontSize = maxFontSize * textProgress; // Scale up effect
            const textY = maxFontSize + 100; // Repositioned lower, below jackpot text

            // Use a more thematic, potentially bolder font
            ctx.font = `bold ${currentFontSize}px "Trajan Pro", "Palatino Linotype", serif`; // Example thematic font


            // 4. Gold Inlay / Highlight
            const goldGrad = ctx.createLinearGradient(0, textY - currentFontSize / 2, 0, textY + currentFontSize / 2);
            goldGrad.addColorStop(0, config.gold1);
            goldGrad.addColorStop(0.5, config.gold2);
            goldGrad.addColorStop(1, config.gold3);
            ctx.fillStyle = goldGrad;
            // Create a clipping path for the text to apply the gold only inside
            ctx.save();
            ctx.beginPath();
            // Note: fillText doesn't directly support clipping paths like this easily.
            // A workaround is to draw the text path and clip, or use stroke with thick line.
            // Simpler alternative: Draw gold text slightly smaller on top.
            const goldFontSize = currentFontSize * 0.9;
            ctx.font = `bold ${goldFontSize}px "Trajan Pro", "Palatino Linotype", serif`;
            ctx.fillText(mainText, centerX - currentFontSize * 0.01, textY - currentFontSize * 0.01);
            ctx.restore(); // Restore original font size for outline



            // Optional: Add "JACKPOT!" text above or below
            const subText = "JACKPOT!";
            const subFontSize = maxFontSize * 0.5;
            ctx.font = `bold ${subFontSize}px "Impact", sans-serif`;
            const subTextY = 50; // Place above main text

            // Simple gold style for subtext
            ctx.fillStyle = config.shadowColor;
            ctx.fillText(subText, centerX + 2, subTextY + 2);
            ctx.fillStyle = config.gold2;
            ctx.fillText(subText, centerX, subTextY);
            ctx.strokeStyle = config.textOutline;
            ctx.lineWidth = 1;
            ctx.strokeText(subText, centerX, subTextY);


            ctx.restore(); // Restore globalAlpha
        }
    }
};