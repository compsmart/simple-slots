// filepath: c:\projects\copilot-agent\slot-game\themes\space-adventure.js
import { EffectPresets } from './effects.js';

export const SpaceAdventureTheme = {
    name: "SpaceAdventure",
    visualEffects: {
        ...EffectPresets.electric,
        intensity: 0.9,
        neonGlow: {
            ...EffectPresets.electric.neonGlow,
            color: '#00ccff',
            size: 15
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
        // Space Warp effect
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
    }
};
