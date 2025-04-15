// filepath: c:\projects\copilot-agent\slot-game\themes\space-adventure.js
import { EffectPresets } from './effects.js';

export const SpaceAdventureTheme = {
    name: "SpaceAdventure",
    // Layout and appearance settings
    layout: {
        reelSpacing: 25, // Wider spacing to represent the vast emptiness of space
        reelsContainer: {
            backgroundColor: "#000a1a", // Deep space dark blue background
            opacity: 0.75 // 75% opacity
        },
        themeColor: "#00ccff" // Cosmic blue theme color
    },
    visualEffects: {
        ...EffectPresets.electric,
        intensity: 0.9,
        neonGlow: {
            ...EffectPresets.electric.neonGlow,
            color: '#00ccff',
            size: 15
        },
        winEffects: {
            enabled: true,           // Special effects for wins
            explosions: true,        // Explosive particle effects on wins
            shockwave: false,         // Shockwave effect
            flashingSymbols: false,   // Make winning symbols flash
            spinEffect3d: {
                enabled: false,       // 3D rotation effect on win
                rotations: 1,        // Number of full rotations
                duration: 1000,      // Duration in ms
                easing: 'easeOutBack'// Easing function
            }
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
                count: 100,
                color: '#00aaff',
                size: { min: 1, max: 6 }
            },
            pulse: {
                enabled: true,
                color: '#001a3a',
                speed: 2000,
                intensity: 0.6
            }
        },
        themeSpecific: {
            spaceWarp: {
                enabled: true,
                speed: 1.5,
                starCount: 200,
                colorShift: true
            },
            planetGlow: {
                enabled: true,
                colors: ['#ff5500', '#00aaff', '#44ff44']
            },
            epicWinAnimation: {
                enabled: true,
                name: "Cosmic Jackpot",
                duration: 6200, // 6.2 seconds
                ufoAbduction: true,
                supernovaExplosion: true,
                alienDance: true
            }
        }
    },
    symbols: [
        // Theme: Sci-Fi, Aliens, Planets. Balanced multipliers.
        { name: "Rocket Ship", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231a237e'/%3E%3Cpath d='M60 20 L 75 50 L 75 90 L 45 90 L 45 50 Z' fill='%23e0e0e0'/%3E%3Cpolygon points='60 10, 50 25, 70 25' fill='%23f44336'/%3E%3Cpolygon points='45 90, 35 105, 55 90' fill='%23bdbdbd'/%3E%3Cpolygon points='75 90, 85 105, 65 90' fill='%23bdbdbd'/%3E%3Cellipse cx='60' cy='60' rx='10' ry='15' fill='%2300bcd4'/%3E%3C/svg%3E", multiplier: 10, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Green Alien", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23424242'/%3E%3Cellipse cx='60' cy='55' rx='30' ry='25' fill='%234caf50'/%3E%3Ccircle cx='50' cy='50' r='8' fill='black'/%3E%3Ccircle cx='70' cy='50' r='8' fill='black'/%3E%3Crect x='55' y='80' width='10' height='20' fill='%237cb342'/%3E%3Cpath d='M40 90 H 80' stroke='%237cb342' stroke-width='5'/%3E%3C/svg%3E", multiplier: 6, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Ringed Planet", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%230d47a1'/%3E%3Ccircle cx='60' cy='60' r='30' fill='%23ff9800'/%3E%3Cellipse cx='60' cy='60' rx='50' ry='15' stroke='%23fff3e0' stroke-width='5' fill='none' transform='rotate(-20 60 60)'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Ray Gun", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23607d8b'/%3E%3Cpath d='M30 70 L 70 70 L 90 50 L 80 40 L 50 70' fill='%23ff5722'/%3E%3Crect x='30' y='70' width='30' height='20' rx='5' fill='%23bdbdbd'/%3E%3Ccircle cx='85' cy='45' r='5' fill='yellow'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Asteroid", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23263238'/%3E%3Cpath d='M40 40 L 65 30 L 80 50 L 90 70 L 70 90 L 45 85 L 30 60 Z' fill='%23795548' stroke='%234e342e' stroke-width='3'/%3E%3Ccircle cx='55' cy='55' r='5' fill='%23a1887f'/%3E%3Ccircle cx='70' cy='75' r='8' fill='%23a1887f'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ],
    // Renderer for Space Adventure theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Space-themed background effects
        if (specific?.spaceWarp?.enabled) {
            const warpSettings = specific.spaceWarp;
            const intensity = warpSettings?.intensity || 0.7;
            const starCount = warpSettings?.starCount || 100;
            const baseSpeed = warpSettings?.baseSpeed || 200;
            const warpColor = warpSettings?.color || '#ffffff';

            // Initialize warp stars if they don't exist
            if (!ctx.warpStars || ctx.warpStars.length === 0) {
                ctx.warpStars = [];
                for (let i = 0; i < starCount; i++) {
                    // Create stars with random positions, more concentrated toward center
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 0.5 + 0.5; // 0.5 to 1.0 (more toward edges)

                    // Calculate x,y as distance from center
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;
                    const maxRadius = Math.min(centerX, centerY);

                    ctx.warpStars.push({
                        x: centerX + Math.cos(angle) * distance * maxRadius,
                        y: centerY + Math.sin(angle) * distance * maxRadius,
                        size: Math.random() * 2 + 1,
                        speed: Math.random() * baseSpeed + 50,
                        angle: angle,
                        distance: distance * maxRadius,
                        color: Math.random() > 0.8 ?
                            `hsl(${Math.floor(Math.random() * 60) + 200}, 100%, 70%)` : // Blue/purple stars
                            warpColor // White stars
                    });
                }
            }

            // Get the current pulsing effect for warp intensity
            const pulseSpeed = warpSettings?.pulseSpeed || 5000;
            const warpIntensity = (Math.sin(timestamp / pulseSpeed) * 0.3 + 0.7) * intensity; // 0.4 to 1.0 * intensity

            // Update and draw all stars
            ctx.warpStars.forEach(star => {
                // Increase the distance from center based on speed and intensity
                star.distance += star.speed * warpIntensity * 0.01;

                // Reset stars that go off screen
                const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2;
                if (star.distance > maxDistance) {
                    // Reset the star position near center
                    star.distance = Math.random() * 20 + 5;
                    star.angle = Math.random() * Math.PI * 2;
                    star.size = Math.random() * 2 + 1;
                }

                // Calculate new position based on angle and distance
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const x = centerX + Math.cos(star.angle) * star.distance;
                const y = centerY + Math.sin(star.angle) * star.distance;

                // Calculate the streak length based on distance and speed
                const streakLength = Math.min(20, star.distance * 0.1 * warpIntensity);

                // Draw the star with streak
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x - Math.cos(star.angle) * streakLength,
                    y - Math.sin(star.angle) * streakLength
                );

                // Make stars fade in near center
                const opacity = Math.min(1, star.distance / 50);
                ctx.strokeStyle = star.color.includes('hsl') ?
                    star.color.replace(')', `, ${opacity})`) :
                    star.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
                ctx.lineWidth = star.size;
                ctx.stroke();
            });
        }

        // Add Nebula glow behind the reels
        if (specific?.nebula?.enabled) {
            const nebulaSettings = specific.nebula;
            const intensity = nebulaSettings?.intensity || 0.5;

            // Calculate the reel area dimensions
            const SYMBOL_SIZE = 100;
            const REEL_COUNT = 5;
            const VISIBLE_ROWS = 3;

            const reelWidth = SYMBOL_SIZE;
            const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
            const startX = reelSpacing;
            const startY = 100;
            const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;

            // Create colored nebula gradient behind reels
            ctx.save();

            // Pulse the nebula color based on timestamp
            const pulseSpeed = nebulaSettings?.pulseSpeed || 8000;
            const pulseValue = Math.sin(timestamp / pulseSpeed);

            // Create a gradient with shifting colors
            const gradient = ctx.createRadialGradient(
                canvas.width / 2, startY + reelViewportHeight / 2, 10,
                canvas.width / 2, startY + reelViewportHeight / 2, reelViewportHeight
            );

            // Dynamic colors based on time
            const hue1 = (pulseValue * 30 + 240) % 360; // Blue/purple range
            const hue2 = (pulseValue * 30 + 280) % 360; // Purple/pink range

            gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, ${intensity * 0.3})`);
            gradient.addColorStop(0.4, `hsla(${hue2}, 100%, 40%, ${intensity * 0.2})`);
            gradient.addColorStop(1, 'rgba(0, 0, 20, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.restore();
        }
    },

    // Epic Win Animation for Space Adventure theme
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime) => {
        const duration = 6200; // 6.2 seconds
        const progress = Math.min(elapsedTime / duration, 1.0);

        // Clear screen with a dark background that fades in
        const backgroundAlpha = Math.min(0.8, progress * 1.5);
        ctx.fillStyle = `rgba(0, 10, 30, ${backgroundAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // 1. UFO Abduction Effect (0% - 70% of animation)
        if (progress < 0.7) {
            const ufoProgress = Math.min(1, progress / 0.6);

            // Draw tractor beam
            const beamWidth = canvas.width * 0.3;
            const beamStartY = centerY - 100 + 150 * ufoProgress;
            const beamEndY = canvas.height;

            const beamGradient = ctx.createLinearGradient(
                centerX, beamStartY,
                centerX, beamEndY
            );

            beamGradient.addColorStop(0, `rgba(0, 230, 255, ${0.8 * ufoProgress})`);
            beamGradient.addColorStop(1, 'rgba(0, 150, 255, 0)');

            ctx.beginPath();
            ctx.moveTo(centerX - beamWidth / 2, beamStartY);
            ctx.lineTo(centerX + beamWidth / 2, beamStartY);
            ctx.lineTo(centerX + beamWidth, beamEndY);
            ctx.lineTo(centerX - beamWidth, beamEndY);
            ctx.closePath();
            ctx.fillStyle = beamGradient;
            ctx.fill();

            // Draw UFO
            const ufoY = centerY - 100 - 100 * (1 - ufoProgress);

            // UFO body
            ctx.fillStyle = '#606060';
            ctx.beginPath();
            ctx.ellipse(centerX, ufoY, 80, 20, 0, 0, Math.PI * 2);
            ctx.fill();

            // UFO dome
            ctx.fillStyle = '#88ccff';
            ctx.beginPath();
            ctx.ellipse(centerX, ufoY - 15, 40, 25, 0, Math.PI, 0);
            ctx.fill();

            // UFO lights
            for (let i = 0; i < 6; i++) {
                const lightX = centerX - 60 + i * 20;
                const lightColor = i % 2 === 0 ? '#ff3300' : '#ffff00';
                const blinkRate = (Math.sin(elapsedTime / (100 + i * 50)) + 1) / 2;

                ctx.fillStyle = lightColor;
                ctx.globalAlpha = 0.3 + 0.7 * blinkRate;
                ctx.beginPath();
                ctx.arc(lightX, ufoY, 5, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }

            // Draw symbols being abducted
            const symbolSize = 60;
            const symbolSpacing = 100;
            const symbolStartX = centerX - symbolSpacing;
            const symbolBaseY = centerY + 100;

            // Draw 3 symbols moving up in the beam
            for (let i = 0; i < 3; i++) {
                const symbolX = symbolStartX + i * symbolSpacing;
                const symbolProgress = Math.max(0, Math.min(1, (ufoProgress - 0.3 - i * 0.1) * 2));
                const symbolY = symbolBaseY - 300 * symbolProgress;
                const rotation = symbolProgress * Math.PI * 4;

                ctx.save();
                ctx.translate(symbolX, symbolY);
                ctx.rotate(rotation);
                ctx.fillStyle = i === 0 ? '#ff5722' : (i === 1 ? '#4caf50' : '#ffeb3b');
                ctx.fillRect(-symbolSize / 2, -symbolSize / 2, symbolSize, symbolSize);
                ctx.restore();
            }
        }

        // 2. Supernova Explosion (60% - 100% of animation)
        if (progress > 0.6) {
            const explosionProgress = Math.min(1, (progress - 0.6) / 0.4);
            const radius = canvas.width * 0.8 * explosionProgress;

            // Create shockwave effect
            const shockwaveWidth = 20 * (1 - explosionProgress);

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.lineWidth = shockwaveWidth;
            ctx.strokeStyle = `rgba(255, 220, 180, ${1 - explosionProgress})`;
            ctx.stroke();

            // Inner explosion
            const gradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius
            );

            gradient.addColorStop(0, 'rgba(255, 255, 230, 0.9)');
            gradient.addColorStop(0.3, 'rgba(255, 150, 50, 0.8)');
            gradient.addColorStop(0.6, 'rgba(150, 50, 255, 0.6)');
            gradient.addColorStop(1, 'rgba(0, 0, 100, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add colorful energy waves
            for (let i = 0; i < 5; i++) {
                const waveRadius = radius * (0.5 + i * 0.1) * (1 + Math.sin(elapsedTime / 200 + i) * 0.1);
                const hue = (i * 50 + elapsedTime / 50) % 360;

                ctx.beginPath();
                ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
                ctx.lineWidth = 5;
                ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${0.5 * (1 - explosionProgress)})`;
                ctx.stroke();
            }
        }

        // 3. Draw alien characters dancing (80% - 100% of animation)
        if (progress > 0.8) {
            const alienProgress = Math.min(1, (progress - 0.8) / 0.2);
            const alienCount = 3;

            for (let i = 0; i < alienCount; i++) {
                const alienX = centerX + (i - 1) * 100;
                const alienY = centerY + 50;
                const bounceHeight = 20 * Math.sin(elapsedTime / 200 + i * Math.PI * 2 / alienCount);

                // Draw alien body
                ctx.fillStyle = i === 0 ? '#66bb6a' : (i === 1 ? '#42a5f5' : '#ffca28');

                // Alien head
                ctx.beginPath();
                ctx.ellipse(alienX, alienY - 30 + bounceHeight, 20, 25, 0, 0, Math.PI * 2);
                ctx.fill();

                // Alien eyes
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.ellipse(alienX - 8, alienY - 30 + bounceHeight, 5, 8, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(alienX + 8, alienY - 30 + bounceHeight, 5, 8, 0, 0, Math.PI * 2);
                ctx.fill();

                // Alien body
                ctx.fillStyle = i === 0 ? '#4caf50' : (i === 1 ? '#2196f3' : '#ffc107');
                ctx.fillRect(alienX - 15, alienY + bounceHeight, 30, 40);

                // Alien arms
                const armAngle = Math.sin(elapsedTime / 150 + i) * 0.5;

                ctx.save();
                ctx.translate(alienX - 15, alienY + 10 + bounceHeight);
                ctx.rotate(-Math.PI / 4 + armAngle);
                ctx.fillRect(0, 0, 5, 30);
                ctx.restore();

                ctx.save();
                ctx.translate(alienX + 15, alienY + 10 + bounceHeight);
                ctx.rotate(Math.PI / 4 - armAngle);
                ctx.fillRect(-5, 0, 5, 30);
                ctx.restore();
            }
        }        // Draw "COSMIC JACKPOT" text
        if (progress > 0.4) {
            const textProgress = Math.min(1, (progress - 0.4) / 0.3);
            const fontSize = 60 * textProgress;
            const textY = centerY - 150;

            ctx.save();
            ctx.globalAlpha = textProgress;
            ctx.font = `bold ${fontSize}px Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text glow
            const glowSize = 15 * textProgress;
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = glowSize;

            // Text with color gradient
            const textGradient = ctx.createLinearGradient(
                centerX - 200, textY,
                centerX + 200, textY
            );
            textGradient.addColorStop(0, '#00ffff');
            textGradient.addColorStop(0.5, '#ffffff');
            textGradient.addColorStop(1, '#7700ff');

            ctx.fillStyle = textGradient;
            ctx.fillText('COSMIC JACKPOT', centerX, textY);
            ctx.restore();
        }

        // Draw Win Amount with glowing and pulsing effect
        if (progress > 0.6) {
            // Get the win amount from the game state (assuming it's passed via a variable)
            // For demo purposes, using a placeholder value - in real implementation,
            // this would be passed as a parameter to the function
            const winAmount = window.lastWinAmount || 1000000;
            const formattedWinAmount = winAmount.toLocaleString();

            const winTextProgress = Math.min(1, (progress - 0.6) / 0.2);
            const winTextY = centerY + 150; // Position below the aliens

            // Calculate pulsing effect
            const pulseRate = 500; // ms
            const pulseScale = 1 + 0.1 * Math.sin(elapsedTime / pulseRate);
            const fontSize = 50 * winTextProgress * pulseScale;

            // Draw glowing background for win amount
            ctx.save();

            // Outer glow
            const glowRadius = 80 * winTextProgress * pulseScale;
            const glowGradient = ctx.createRadialGradient(
                centerX, winTextY, 0,
                centerX, winTextY, glowRadius
            );

            // Pulsing glow color
            const glowHue = (elapsedTime / 30) % 360; // Cycle through colors
            const glowSaturation = 100;
            const glowLightness = 50 + 10 * Math.sin(elapsedTime / 300);

            glowGradient.addColorStop(0, `hsla(${glowHue}, ${glowSaturation}%, ${glowLightness}%, 0.8)`);
            glowGradient.addColorStop(1, 'rgba(0, 0, 100, 0)');

            ctx.fillStyle = glowGradient;
            ctx.fillRect(centerX - glowRadius, winTextY - glowRadius / 2, glowRadius * 2, glowRadius);

            // Draw win amount text
            ctx.globalAlpha = winTextProgress;
            ctx.font = `bold ${fontSize}px 'Arial Black', sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Strong text glow
            ctx.shadowColor = '#00ffff';
            ctx.shadowBlur = 20 * winTextProgress;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Metallic text gradient
            const winTextGradient = ctx.createLinearGradient(
                centerX - 150, winTextY,
                centerX + 150, winTextY
            );

            winTextGradient.addColorStop(0, '#ffcc00');  // Gold
            winTextGradient.addColorStop(0.3, '#ffffff'); // White
            winTextGradient.addColorStop(0.5, '#ffcc00'); // Gold
            winTextGradient.addColorStop(0.7, '#ffffff'); // White
            winTextGradient.addColorStop(1, '#ffcc00');  // Gold

            ctx.fillStyle = winTextGradient;

            // Draw the currency symbol and win amount
            ctx.fillText(`$${formattedWinAmount}`, centerX, winTextY);

            // Draw shimmering particles around the win amount
            const particleCount = 30;
            for (let i = 0; i < particleCount; i++) {
                const angle = (i / particleCount) * Math.PI * 2 + (elapsedTime / 1000);
                const distance = 100 + 20 * Math.sin(elapsedTime / 500 + i);
                const x = centerX + Math.cos(angle) * distance;
                const y = winTextY + Math.sin(angle) * distance / 2; // Elliptical orbit

                const particleSize = 3 + 2 * Math.sin(elapsedTime / 200 + i * 5);
                const particleHue = (glowHue + i * 10) % 360;

                ctx.fillStyle = `hsla(${particleHue}, 100%, 70%, ${0.7 * winTextProgress})`;
                ctx.beginPath();
                ctx.arc(x, y, particleSize, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }
};
