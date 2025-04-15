// filepath: c:\projects\copilot-agent\slot-game\themes\pirate.js
import { EffectPresets, EffectsHelper } from './effects.js';

export const PirateTheme = {
    name: "Pirate",
    // Layout and appearance settings
    layout: {
        reelSpacing: 19, // Wider spacing to represent the ocean between islands
        reelsContainer: {
            backgroundColor: "#0a3b5c", // Deep sea blue background
            opacity: 0.8 // 80% opacity
        },
        themeColor: "#ff9800" // Treasure gold theme color
    },
    visualEffects: {
        ...EffectPresets.adventurous,
        intensity: 0.9,
        reelEffects: {
            enabled: true,
            blurAmount: 5,
            lightTrails: true,
            spinningGlow: true,
            spinColor: '#0077be' // Ocean blue color
        },
        backgroundEffects: {
            enabled: true,
            pulse: {
                enabled: true,
                color: '#000080', // Deep ocean blue
                speed: 4000,
                intensity: 0.3
            }
        }, themeSpecific: {
            epicWinAnimation: {
                enabled: true,
                name: "Pirate's Treasure",
                duration: 8000, // 8 seconds
                treasureExplosion: true,
                shipRocking: true,
                waterSplash: true
            },
            oceanWaves: {
                enabled: true,
                waveColor: '#1e90ff',
                waveHeight: 10,
                waveSpeed: 2000,
                intensity: 0.5
            },
            shipRocking: {
                enabled: true,
                rockingAngle: 5, // Degrees
                rockingSpeed: 3000
            },
            treasureGlow: {
                enabled: true,
                glowColor: '#ffd700',
                intensity: 0.7,
                pulseSpeed: 2500
            }
        }
    },
    symbols: [
        {
            name: "Treasure Chest",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23a0522d'/%3E%3Crect x='20' y='40' width='80' height='50' fill='%23daa520'/%3E%3Crect x='20' y='40' width='80' height='10' fill='%23654321'/%3E%3Crect x='30' y='50' width='60' height='5' fill='%23ffd700'/%3E%3Ccircle cx='60' cy='65' r='15' fill='%23ffd700'/%3E%3Ccircle cx='40' cy='75' r='8' fill='%23ffd700'/%3E%3Ccircle cx='80' cy='75' r='8' fill='%23ffd700'/%3E%3C/svg%3E",
            backgroundColor: "#8B4513",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 }
        },
        {
            name: "Pirate Skull",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23000000'/%3E%3Cpath d='M60,30 C35,30 35,70 60,90 C85,70 85,30 60,30 Z' fill='%23ffffff'/%3E%3Ccircle cx='48' cy='60' r='10' fill='%23000000'/%3E%3Ccircle cx='72' cy='60' r='10' fill='%23000000'/%3E%3Cpath d='M45,80 L75,80' stroke='%23000000' stroke-width='3'/%3E%3Cpath d='M50,90 L70,90 L70,95 L65,90 L55,90 L50,95 Z' fill='%23000000'/%3E%3C/svg%3E",
            backgroundColor: "#000000",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 }
        },
        {
            name: "Ship Wheel",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23000080'/%3E%3Ccircle cx='60' cy='60' r='35' fill='%23a0522d'/%3E%3Ccircle cx='60' cy='60' r='15' fill='%23654321'/%3E%3Cpath d='M60,25 L60,10 M60,95 L60,110 M95,60 L110,60 M25,60 L10,60 M84,36 L94,26 M84,84 L94,94 M36,36 L26,26 M36,84 L26,94' stroke='%23a0522d' stroke-width='10'/%3E%3C/svg%3E",
            backgroundColor: "#000080",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 }
        },
        {
            name: "Anchor",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%230077be'/%3E%3Cpath d='M60,30 L60,90 M40,85 C40,70 60,70 60,70 C60,70 80,70 80,85 M45,40 C45,33 53,26 60,30 C67,26 75,33 75,40 C75,47 67,50 60,45 C53,50 45,47 45,40 Z' stroke='%23c0c0c0' stroke-width='8' fill='none'/%3E%3C/svg%3E",
            backgroundColor: "#0077be",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 }
        },
        {
            name: "Rum Bottle",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23228B22'/%3E%3Cpath d='M50,30 L70,30 L70,45 C85,55 85,85 70,95 L50,95 C35,85 35,55 50,45 Z' fill='%23a0522d'/%3E%3Cpath d='M55,30 L65,30 L65,20 L55,20 Z' fill='%23a0522d'/%3E%3Cpath d='M52,50 L68,50 C75,60 75,80 68,90 L52,90 C45,80 45,60 52,50 Z' fill='%23ffff00'/%3E%3C/svg%3E",
            backgroundColor: "#228B22",
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 }
        }
    ],
    // Renderer for Pirate theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Ocean Waves Effect
        if (specific?.oceanWaves?.enabled) {
            const waveSettings = specific.oceanWaves;
            const waveHeight = waveSettings.waveHeight || 10;
            const waveSpeed = waveSettings.waveSpeed || 2000;
            const waveColor = waveSettings.waveColor || '#1e90ff';

            ctx.save();
            ctx.fillStyle = waveColor;

            const waveCount = Math.ceil(canvas.width / 50);
            const timeOffset = (timestamp % waveSpeed) / waveSpeed;

            for (let i = 0; i < waveCount; i++) {
                const x = i * 50 - (timeOffset * 50);
                const y = canvas.height - waveHeight * Math.sin((i + timeOffset) * Math.PI);

                ctx.beginPath();
                ctx.arc(x, y, waveHeight, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        // Ship Rocking Effect
        if (specific?.shipRocking?.enabled) {
            const rockingSettings = specific.shipRocking;
            const rockingAngle = rockingSettings.rockingAngle || 5;
            const rockingSpeed = rockingSettings.rockingSpeed || 3000;

            const angle = Math.sin(timestamp / rockingSpeed) * rockingAngle;

            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((angle * Math.PI) / 180);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);

            // Draw ship (placeholder rectangle for now)
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 20, 100, 40);

            ctx.restore();
        }

        // Treasure Glow Effect
        if (specific?.treasureGlow?.enabled) {
            const glowSettings = specific.treasureGlow;
            const glowColor = glowSettings.glowColor || '#ffd700';
            const pulseSpeed = glowSettings.pulseSpeed || 2500;
            const intensity = glowSettings.intensity || 0.7;

            const pulse = Math.sin(timestamp / pulseSpeed) * 0.5 + 0.5;

            ctx.save();
            ctx.fillStyle = glowColor;
            ctx.globalAlpha = intensity * pulse;

            // Draw glowing treasure chest (placeholder circle for now)
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2 + 100, 50, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        // Epic Win Animation
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            const epicWin = specific.epicWinAnimation;
            const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

            ctx.save();

            // Treasure explosion effect
            if (epicWin.treasureExplosion) {
                const treasureCount = 25;
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                for (let i = 0; i < treasureCount; i++) {
                    const angle = (i / treasureCount) * Math.PI * 2;
                    const distance = progress * canvas.width * 0.5;
                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;
                    const size = 20 + Math.sin(timestamp / 200 + i) * 8;

                    // Draw different treasure items based on index
                    const treasureType = i % 5;

                    // Coin
                    if (treasureType === 0) {
                        ctx.fillStyle = '#ffd700'; // Gold
                        ctx.beginPath();
                        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = '#daa520'; // Darker gold
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                    // Gem
                    else if (treasureType === 1) {
                        ctx.fillStyle = '#ff0000'; // Ruby
                        ctx.beginPath();
                        ctx.moveTo(x, y - size / 2);
                        ctx.lineTo(x + size / 2, y + size / 2);
                        ctx.lineTo(x - size / 2, y + size / 2);
                        ctx.closePath();
                        ctx.fill();
                    }
                    // Pearl
                    else if (treasureType === 2) {
                        ctx.fillStyle = '#f8f8ff'; // White
                        ctx.beginPath();
                        ctx.arc(x, y, size / 3, 0, Math.PI * 2);
                        ctx.fill();

                        // Pearl shine
                        const gradient = ctx.createRadialGradient(
                            x - size / 6, y - size / 6, 0,
                            x, y, size / 3
                        );
                        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                        gradient.addColorStop(1, 'rgba(220, 220, 220, 0.3)');
                        ctx.fillStyle = gradient;
                        ctx.beginPath();
                        ctx.arc(x, y, size / 3, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    // Gold bar
                    else if (treasureType === 3) {
                        ctx.fillStyle = '#daa520'; // Gold
                        ctx.fillRect(x - size / 2, y - size / 4, size, size / 2);

                        // Gold bar shine
                        ctx.fillStyle = '#ffd700';
                        ctx.fillRect(x - size / 3, y - size / 6, size / 2, size / 6);
                    }
                    // Diamond
                    else {
                        ctx.fillStyle = '#b9f2ff'; // Diamond blue
                        ctx.beginPath();
                        ctx.moveTo(x, y - size / 2);
                        ctx.lineTo(x + size / 3, y);
                        ctx.lineTo(x, y + size / 2);
                        ctx.lineTo(x - size / 3, y);
                        ctx.closePath();
                        ctx.fill();

                        // Diamond shine
                        ctx.strokeStyle = '#ffffff';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Ship rocking effect
            if (epicWin.shipRocking) {
                const shipWidth = canvas.width * 0.4;
                const shipHeight = shipWidth * 0.6;
                const shipX = canvas.width / 2 - shipWidth / 2;
                const shipY = canvas.height * 0.4;

                // Ship rocking motion
                const rocking = Math.sin(timestamp / 500) * 10;

                ctx.save();
                ctx.translate(canvas.width / 2, shipY + shipHeight / 2);
                ctx.rotate(rocking * Math.PI / 180);
                ctx.translate(-canvas.width / 2, -(shipY + shipHeight / 2));

                // Ship hull
                ctx.fillStyle = '#8B4513';
                ctx.beginPath();
                ctx.moveTo(shipX, shipY + shipHeight / 2);
                ctx.lineTo(shipX + shipWidth, shipY + shipHeight / 2);
                ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight);
                ctx.lineTo(shipX + shipWidth * 0.2, shipY + shipHeight);
                ctx.closePath();
                ctx.fill();

                // Ship cabin
                ctx.fillStyle = '#A0522D';
                ctx.fillRect(shipX + shipWidth * 0.3, shipY + shipHeight / 3, shipWidth * 0.4, shipHeight / 3);

                // Ship mast
                ctx.fillStyle = '#8B4513';
                ctx.fillRect(shipX + shipWidth / 2 - 5, shipY - shipHeight / 2, 10, shipHeight);

                // Ship sail
                ctx.fillStyle = '#F5F5F5';
                ctx.beginPath();
                ctx.moveTo(shipX + shipWidth / 2, shipY - shipHeight / 2);
                ctx.lineTo(shipX + shipWidth / 2 + shipWidth / 4, shipY);
                ctx.lineTo(shipX + shipWidth / 2, shipY);
                ctx.closePath();
                ctx.fill();

                // Pirate flag
                ctx.fillStyle = '#000000';
                ctx.fillRect(shipX + shipWidth / 2 - 3, shipY - shipHeight / 2 - 30, 30, 20);

                // Skull and crossbones on flag
                ctx.fillStyle = '#FFFFFF';
                ctx.beginPath();
                ctx.arc(shipX + shipWidth / 2 + 12, shipY - shipHeight / 2 - 20, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(shipX + shipWidth / 2 + 5, shipY - shipHeight / 2 - 15);
                ctx.lineTo(shipX + shipWidth / 2 + 19, shipY - shipHeight / 2 - 15);
                ctx.stroke();

                ctx.restore();
            }

            // Water splash effect
            if (epicWin.waterSplash) {
                const waveCount = 7;
                const waveHeight = canvas.height * 0.1;

                // Draw waves at bottom of screen
                ctx.fillStyle = '#0077be';

                for (let i = 0; i < waveCount; i++) {
                    const waveProgress = (timestamp / 1000 + i / waveCount) % 1;
                    const waveWidth = canvas.width / waveCount;

                    ctx.beginPath();
                    ctx.moveTo(i * waveWidth, canvas.height);

                    for (let x = 0; x <= waveWidth; x += 10) {
                        const y = canvas.height - waveHeight * Math.sin(((x / waveWidth) + waveProgress) * Math.PI * 2) * 0.5
                            - (1 - progress) * waveHeight;
                        ctx.lineTo(i * waveWidth + x, y);
                    }

                    ctx.lineTo((i + 1) * waveWidth, canvas.height);
                    ctx.closePath();
                    ctx.fill();
                }

                // Draw splash particles
                ctx.fillStyle = '#ffffff';
                for (let i = 0; i < 30; i++) {
                    const splashProgress = (i / 30 + timestamp / 2000) % 1;
                    const x = i * (canvas.width / 30) + Math.sin(i) * 20;
                    const y = canvas.height - waveHeight - splashProgress * 100;
                    const size = (1 - splashProgress) * 8;

                    if (size > 0) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${1 - splashProgress})`;
                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Big text announcement
            const textProgress = Math.min(1, progress * 2);
            const textSize = 60 + Math.sin(timestamp / 200) * 10;
            ctx.font = `bold ${textSize}px 'Pirata One', fantasy`;
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
            ctx.lineWidth = 3;

            const scale = 0.5 + textProgress * 0.5;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 3);
            ctx.scale(scale, scale);
            ctx.rotate(Math.sin(timestamp / 500) * 0.1);
            ctx.fillText("TREASURE FOUND!", 0, 0);
            ctx.strokeText("TREASURE FOUND!", 0, 0);
            ctx.restore();

            // Win amount
            ctx.font = 'bold 40px "Pirata One", fantasy';
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
     * Renders a pirate-themed epic win animation for the slot game.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {number} elapsedTime - Total time elapsed since the animation started (in ms).
     * @param {number} deltaTime - Time since the last frame (in ms).
     * @param {number} winAmount - The amount won in the jackpot.
     */
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime, winAmount) => {
        const totalDuration = 8000; // 8 seconds for the full animation
        const progress = Math.min(elapsedTime / totalDuration, 1.0);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // --- Easing Functions ---
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easeOutCubic = t => (--t) * t * t + 1;
        const easeOutBounce = t => {
            const n1 = 7.5625;
            const d1 = 2.75;
            if (t < 1 / d1) { return n1 * t * t; }
            else if (t < 2 / d1) { return n1 * (t -= 1.5 / d1) * t + 0.75; }
            else if (t < 2.5 / d1) { return n1 * (t -= 2.25 / d1) * t + 0.9375; }
            else { return n1 * (t -= 2.625 / d1) * t + 0.984375; }
        };

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw ocean background
        const oceanGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        oceanGradient.addColorStop(0, '#001433'); // Dark blue at top
        oceanGradient.addColorStop(1, '#0077be'); // Lighter blue at bottom
        ctx.fillStyle = oceanGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw sunset in the background
        if (progress < 0.7) {
            const sunsetProgress = Math.min(progress * 1.5, 1.0);
            const sunY = canvas.height * 0.3 - (sunsetProgress * canvas.height * 0.3);

            // Draw sun
            const sunGradient = ctx.createRadialGradient(
                centerX, sunY, 0,
                centerX, sunY, canvas.width * 0.15
            );
            sunGradient.addColorStop(0, 'rgba(255, 200, 0, 1)');
            sunGradient.addColorStop(0.8, 'rgba(255, 120, 0, 0.8)');
            sunGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

            ctx.fillStyle = sunGradient;
            ctx.beginPath();
            ctx.arc(centerX, sunY, canvas.width * 0.15, 0, Math.PI * 2);
            ctx.fill();

            // Draw sunset clouds
            const cloudCount = 5;
            for (let i = 0; i < cloudCount; i++) {
                const cloudX = canvas.width * (i / cloudCount) + (elapsedTime / 20000 * canvas.width) % canvas.width;
                const cloudY = canvas.height * 0.2 + i * 10;
                const cloudWidth = canvas.width * 0.2;
                const cloudHeight = canvas.height * 0.03;

                const cloudGradient = ctx.createLinearGradient(cloudX, cloudY, cloudX, cloudY + cloudHeight);
                cloudGradient.addColorStop(0, 'rgba(255, 180, 100, 0.7)');
                cloudGradient.addColorStop(1, 'rgba(255, 100, 100, 0.3)');

                ctx.fillStyle = cloudGradient;
                ctx.beginPath();
                ctx.ellipse(cloudX, cloudY, cloudWidth, cloudHeight, 0, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Stage 1: Treasure chest appears from the sea (0-30% of animation)
        if (progress < 0.3) {
            const chestProgress = easeOutBounce(progress / 0.3);
            const chestSize = canvas.width * 0.3;
            const chestX = centerX - chestSize / 2;
            const chestY = centerY - chestSize / 2 + (1 - chestProgress) * canvas.height * 0.5;

            // Draw the treasure chest
            // Chest base
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(chestX, chestY, chestSize, chestSize * 0.7);

            // Chest lid
            ctx.beginPath();
            ctx.moveTo(chestX, chestY);
            ctx.lineTo(chestX + chestSize, chestY);
            ctx.lineTo(chestX + chestSize, chestY - chestSize * 0.3 * chestProgress);
            ctx.lineTo(chestX, chestY - chestSize * 0.3 * chestProgress);
            ctx.closePath();
            ctx.fillStyle = '#A0522D';
            ctx.fill();

            // Chest decorations
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(chestX + chestSize * 0.1, chestY + chestSize * 0.1, chestSize * 0.8, chestSize * 0.5);

            // Lock
            ctx.fillStyle = '#C0C0C0';
            ctx.fillRect(chestX + chestSize * 0.45, chestY - chestSize * 0.15 * chestProgress, chestSize * 0.1, chestSize * 0.2);
        }

        // Stage 2: Chest opens and treasure explodes out (30-60% of animation)
        else if (progress < 0.6) {
            const openProgress = (progress - 0.3) / 0.3;
            const chestSize = canvas.width * 0.3;
            const chestX = centerX - chestSize / 2;
            const chestY = centerY - chestSize / 2;

            // Draw the treasure chest base
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(chestX, chestY, chestSize, chestSize * 0.7);

            // Draw treasures inside
            if (openProgress > 0.3) {
                const treasureCount = 30;
                for (let i = 0; i < treasureCount; i++) {
                    const treasureProgress = Math.min(1, (openProgress - 0.3) * 3);
                    const angle = (i / treasureCount) * Math.PI * 2;
                    const distance = treasureProgress * canvas.width * 0.4 * Math.random();

                    const tx = centerX + Math.cos(angle) * distance;
                    const ty = centerY + Math.sin(angle) * distance - openProgress * 100;
                    const size = chestSize * 0.07;

                    // Different treasure types
                    const treasureType = i % 5;
                    const hue = (treasureType * 50 + i * 10) % 360;

                    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
                    ctx.beginPath();
                    if (treasureType === 0) { // Gold coin
                        ctx.arc(tx, ty, size, 0, Math.PI * 2);
                    } else if (treasureType === 1) { // Gem
                        ctx.rect(tx - size / 2, ty - size / 2, size, size);
                    } else if (treasureType === 2) { // Pearl
                        ctx.arc(tx, ty, size * 0.8, 0, Math.PI * 2);
                    } else if (treasureType === 3) { // Diamond
                        ctx.moveTo(tx, ty - size);
                        ctx.lineTo(tx + size, ty);
                        ctx.lineTo(tx, ty + size);
                        ctx.lineTo(tx - size, ty);
                    } else { // Gold bar
                        ctx.rect(tx - size, ty - size / 3, size * 2, size * 0.6);
                    }
                    ctx.fill();
                    ctx.strokeStyle = '#000';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            // Chest lid opening
            const lidAngle = Math.min(Math.PI * 0.7, openProgress * Math.PI);
            ctx.save();
            ctx.translate(chestX, chestY);
            ctx.rotate(-lidAngle);

            ctx.fillStyle = '#A0522D';
            ctx.fillRect(0, -chestSize * 0.3, chestSize, chestSize * 0.3);

            // Lid decorations
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(chestSize * 0.1, -chestSize * 0.25, chestSize * 0.8, chestSize * 0.15);

            ctx.restore();
        }

        // Stage 3: Display win amount with pirate elements (60-100% of animation)
        else {
            const finalProgress = (progress - 0.6) / 0.4;

            // Draw a pirate ship in the background
            const shipWidth = canvas.width * 0.6;
            const shipHeight = canvas.height * 0.4;
            const shipX = canvas.width * 0.2 + Math.sin(elapsedTime / 2000) * canvas.width * 0.05;
            const shipY = canvas.height * 0.4 + Math.sin(elapsedTime / 1500) * canvas.height * 0.03;

            ctx.save();
            ctx.translate(shipX + shipWidth / 2, shipY + shipHeight / 2);
            ctx.rotate(Math.sin(elapsedTime / 3000) * 0.05);
            ctx.translate(-(shipX + shipWidth / 2), -(shipY + shipHeight / 2));

            // Ship hull
            ctx.fillStyle = '#8B4513';
            ctx.beginPath();
            ctx.moveTo(shipX, shipY + shipHeight * 0.6);
            ctx.lineTo(shipX + shipWidth, shipY + shipHeight * 0.6);
            ctx.lineTo(shipX + shipWidth * 0.8, shipY + shipHeight);
            ctx.lineTo(shipX + shipWidth * 0.2, shipY + shipHeight);
            ctx.closePath();
            ctx.fill();

            // Ship details
            ctx.fillStyle = '#A0522D';
            ctx.fillRect(shipX + shipWidth * 0.3, shipY + shipHeight * 0.3, shipWidth * 0.4, shipHeight * 0.3);

            // Masts
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(shipX + shipWidth * 0.3, shipY - shipHeight * 0.3, shipWidth * 0.05, shipHeight * 0.9);
            ctx.fillRect(shipX + shipWidth * 0.6, shipY - shipHeight * 0.2, shipWidth * 0.05, shipHeight * 0.8);

            // Sails
            ctx.fillStyle = '#F5F5F5';
            // First sail
            ctx.beginPath();
            ctx.moveTo(shipX + shipWidth * 0.3, shipY - shipHeight * 0.3);
            ctx.lineTo(shipX + shipWidth * 0.3 + shipWidth * 0.25, shipY);
            ctx.lineTo(shipX + shipWidth * 0.3, shipY);
            ctx.closePath();
            ctx.fill();

            // Second sail
            ctx.beginPath();
            ctx.moveTo(shipX + shipWidth * 0.6, shipY - shipHeight * 0.2);
            ctx.lineTo(shipX + shipWidth * 0.6 + shipWidth * 0.2, shipY + shipHeight * 0.2);
            ctx.lineTo(shipX + shipWidth * 0.6, shipY + shipHeight * 0.2);
            ctx.closePath();
            ctx.fill();

            // Pirate flag
            ctx.fillStyle = '#000000';
            ctx.fillRect(shipX + shipWidth * 0.3 - shipWidth * 0.1, shipY - shipHeight * 0.35, shipWidth * 0.15, shipHeight * 0.1);

            // Skull and crossbones
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(shipX + shipWidth * 0.3 - shipWidth * 0.025, shipY - shipHeight * 0.3, shipWidth * 0.02, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(shipX + shipWidth * 0.3 - shipWidth * 0.07, shipY - shipHeight * 0.28);
            ctx.lineTo(shipX + shipWidth * 0.3 + shipWidth * 0.02, shipY - shipHeight * 0.28);
            ctx.stroke();

            ctx.restore();

            // Animate the win amount
            const winScale = Math.sin(elapsedTime / 200) * 0.05 + 1;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(winScale, winScale);

            // Text shadow for depth
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;

            // "TREASURE FOUND!" text
            ctx.font = 'bold 50px "Pirata One", fantasy, serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const textGradient = ctx.createLinearGradient(-150, 0, 150, 0);
            textGradient.addColorStop(0, '#FFD700');
            textGradient.addColorStop(0.5, '#FFFFFF');
            textGradient.addColorStop(1, '#FFD700');

            ctx.fillStyle = textGradient;
            ctx.fillText("TREASURE FOUND!", 0, -70);

            // Display win amount with golden coins animation
            ctx.font = 'bold 70px "Pirata One", fantasy, serif';
            ctx.fillStyle = '#FFD700';
            ctx.fillText(`${winAmount.toFixed(2)}`, 0, 0);

            // Draw gold coins around the text
            const coinCount = 20;
            for (let i = 0; i < coinCount; i++) {
                const coinAngle = (i / coinCount) * Math.PI * 2 + elapsedTime / 1000;
                const coinDistance = 100 + Math.sin(elapsedTime / 500 + i) * 20;
                const coinX = Math.cos(coinAngle) * coinDistance;
                const coinY = Math.sin(coinAngle) * coinDistance;
                const coinSize = 15 + Math.sin(elapsedTime / 300 + i * 2) * 5;

                // Gold coin
                ctx.fillStyle = '#FFD700';
                ctx.beginPath();
                ctx.arc(coinX, coinY, coinSize, 0, Math.PI * 2);
                ctx.fill();

                // Coin detail
                ctx.strokeStyle = '#DAA520';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Coin shine
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(coinX - coinSize * 0.3, coinY - coinSize * 0.3, coinSize * 0.2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();

            // Footer message appears at the end
            if (finalProgress > 0.7) {
                const footerAlpha = (finalProgress - 0.7) / 0.3;
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillStyle = `rgba(255, 255, 255, ${footerAlpha})`;
                ctx.fillText("Spin again to continue your adventure!", centerX, canvas.height - 50);
            }
        }
    }
};
