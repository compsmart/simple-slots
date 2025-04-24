// filepath: c:\projects\copilot-agent\theme-slots\themes\space-adventure\effects.js
// Space Adventure theme specific effects
import { EffectPresets as BaseEffectPresets, EffectsHelper } from '../../shared/effects.js';
import { SpaceAdventureTheme } from './theme.js';

// You can extend the base effect presets with Space Adventure-specific effects
export const EffectPresets = {
    ...BaseEffectPresets,
    cosmic: {
        ...BaseEffectPresets.futuristic,
        glowIntensity: 0.9,
        colorShift: 0.7,
        blinkRate: 1.8,
        // Additional Space Adventure-specific effect parameters
        starfield: {
            enabled: true,
            starCount: 200,
            warpSpeed: 0.8
        },
        nebulaEffect: {
            enabled: true,
            colors: ['#7b68ee', '#4b0082', '#9932cc', '#8a2be2'],
            intensity: 0.6
        }
    }
};

// Create ThemeEffectsHelper using a standardized name across all themes
export const ThemeEffectsHelper = {
    // Include all methods from the base EffectsHelper
    ...EffectsHelper,

    // Add theme-specific effect methods with standardized naming pattern
    applyThemeEffect(ctx, element, intensity = 1, theme) {
        // Standard entry point for theme-specific effects
        this.applySpaceEffect(ctx, element, intensity, theme);
    },

    // Space Adventure-specific methods
    applySpaceEffect(ctx, element, intensity = 1, theme) {
        // Apply appropriate effects based on the theme parameter
        if (theme?.visualEffects?.starfield?.enabled) {
            this.applyStarfield(
                ctx,
                theme.visualEffects.starfield.starCount,
                theme.visualEffects.starfield.warpSpeed
            );
        }

        if (theme?.visualEffects?.nebulaEffect?.enabled) {
            this.applyNebulaEffect(
                ctx,
                theme.visualEffects.nebulaEffect.colors,
                theme.visualEffects.nebulaEffect.intensity
            );
        }
    },

    // Initialize stars for starfield effect
    _initStars(count = 200) {
        this._stars = [];
        for (let i = 0; i < count; i++) {
            this._stars.push({
                x: Math.random() * 2 - 1, // -1 to 1
                y: Math.random() * 2 - 1, // -1 to 1
                z: Math.random(),         // 0 to 1 (depth)
                size: Math.random() * 2 + 1,
                color: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`
            });
        }
    },

    applyStarfield(ctx, starCount = 200, warpSpeed = 0.8) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        // Initialize stars if not already done
        if (!this._stars || this._stars.length !== starCount) {
            this._initStars(starCount);
        }

        ctx.save();

        // Update and draw stars
        this._stars.forEach(star => {
            // Move star toward viewer (decrease z)
            star.z -= warpSpeed * 0.01;

            // If star passes viewer, reset it far away
            if (star.z <= 0) {
                star.z = 1;
                star.x = Math.random() * 2 - 1;
                star.y = Math.random() * 2 - 1;
            }

            // Calculate screen position based on 3D coordinates
            const screenX = (star.x / star.z) * width + width / 2;
            const screenY = (star.y / star.z) * height + height / 2;

            // Calculate size based on depth (closer = bigger)
            const screenSize = star.size / star.z;

            // Draw star
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(screenX, screenY, screenSize, 0, Math.PI * 2);
            ctx.fill();

            // Draw warp streak for closer stars
            if (star.z < 0.3) {
                const streakLength = (0.3 - star.z) * 100 * warpSpeed;

                ctx.beginPath();
                ctx.moveTo(screenX, screenY);
                ctx.lineTo(
                    screenX + (screenX - width / 2) * streakLength / width,
                    screenY + (screenY - height / 2) * streakLength / height
                );
                ctx.strokeStyle = star.color;
                ctx.lineWidth = screenSize * 0.5;
                ctx.stroke();
            }
        });

        ctx.restore();
    },

    applyNebulaEffect(ctx, colors = ['#7b68ee', '#4b0082', '#9932cc', '#8a2be2'], intensity = 0.6) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        ctx.save();
        ctx.globalAlpha = intensity * 0.3; // Keep it subtle

        // Create nebula clouds using gradients
        for (let i = 0; i < 3; i++) {
            const x = width * (0.2 + i * 0.3);
            const y = height * (0.3 + Math.sin(time * 0.2 + i) * 0.1);
            const size = Math.min(width, height) * (0.3 + i * 0.1);

            const gradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, size
            );

            const color1 = colors[i % colors.length];
            const color2 = colors[(i + 1) % colors.length];

            gradient.addColorStop(0, color1);
            gradient.addColorStop(0.6, color2);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.ellipse(
                x, y,
                size, size * 0.6,
                Math.sin(time * 0.1 + i) * Math.PI / 4,
                0, Math.PI * 2
            );
            ctx.fill();
        }

        ctx.restore();
    }
};

export function renderThemeEffects(ctx, canvas, timestamp, specific) {
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

export function renderEpicWinAnimation(ctx, canvas, elapsedTime, deltaTime, winAmount) {
    const config = SpaceAdventureTheme.visualEffects?.themeSpecific?.epicWinAnimation || {};
    const duration = config.duration || 5000;
    const progress = Math.min(1.0, elapsedTime / duration);

    // Epic win animation implementation - space warp effect
    ctx.save();

    // Increase warp speed for epic win
    if (ThemeEffectsHelper.applyStarfield) {
        ThemeEffectsHelper.applyStarfield(
            ctx,
            300, // More stars
            2.0  // Faster warp speed
        );
    }

    // Title text
    const titleText = "COSMIC JACKPOT";
    ctx.font = `bold ${60 + Math.sin(elapsedTime / 200) * 10}px 'Arial', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Rainbow color text
    const gradient = ctx.createLinearGradient(
        canvas.width * 0.3, canvas.height * 0.4,
        canvas.width * 0.7, canvas.height * 0.4
    );
    gradient.addColorStop(0, 'magenta');
    gradient.addColorStop(0.33, 'blue');
    gradient.addColorStop(0.66, 'cyan');
    gradient.addColorStop(1, 'purple');

    ctx.fillStyle = gradient;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 20;
    ctx.fillText(titleText, canvas.width / 2, canvas.height * 0.4);

    // Win amount
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(winAmount.toFixed(2), canvas.width / 2, canvas.height * 0.6);

    ctx.restore();

    return progress < 1.0; // Return true while animation is ongoing
}

export default {
    ThemeEffectsHelper,
    renderThemeEffects,
    renderEpicWinAnimation
};
