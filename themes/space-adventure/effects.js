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
    // Use the specific parameter which contains theme-specific effect settings

    // Space-specific ambient effects
    if (specific?.cosmicBackground?.enabled) {
        // Apply starfield as background
        ThemeEffectsHelper.applyStarfield(
            ctx,
            specific.cosmicBackground.starCount || 200,
            specific.cosmicBackground.warpSpeed || 0.8
        );

        // Apply nebula effect
        if (specific.cosmicBackground.nebula?.enabled) {
            ThemeEffectsHelper.applyNebulaEffect(
                ctx,
                specific.cosmicBackground.nebula.colors,
                specific.cosmicBackground.nebula.intensity
            );
        }
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
