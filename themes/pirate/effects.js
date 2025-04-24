// filepath: c:\projects\copilot-agent\theme-slots\themes\pirate\effects.js
// Pirate theme specific effects
import { EffectPresets as BaseEffectPresets, EffectsHelper } from '../../shared/effects.js';
import { PirateTheme } from './theme.js';

// You can extend the base effect presets with Pirate-specific effects
export const EffectPresets = {
    ...BaseEffectPresets,
    seafaring: {
        ...BaseEffectPresets.windy,
        glowIntensity: 0.7,
        colorShift: 0.4,
        blinkRate: 0.8,
        themeSpecific: {
            // Additional Pirate-specific effect parameters
            waterReflections: {
                enabled: true,
                intensity: 0.5,
                speed: 0.7
            },
            cannonSmoke: {
                enabled: true,
                intensity: 0.6,
                duration: 2000
            }
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
        this.applyPirateEffect(ctx, element, intensity, theme);
    },

    // Pirate-specific methods
    applyPirateEffect(ctx, element, intensity = 1, theme) {
        // Apply appropriate effects based on the theme parameter
        if (theme?.visualEffects?.waterReflections?.enabled) {
            this.applyWaterReflections(
                ctx,
                theme.visualEffects.waterReflections.intensity,
                theme.visualEffects.waterReflections.speed
            );
        }

        if (theme?.visualEffects?.cannonSmoke?.enabled) {
            this.applyCannonSmoke(
                ctx,
                theme.visualEffects.cannonSmoke.intensity,
                theme.visualEffects.cannonSmoke.duration
            );
        }
    },

    applyWaterReflections(ctx, intensity = 0.5, speed = 0.7) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        // Create water reflections effect
        ctx.save();

        // Vary opacity based on time for water movement
        const opacity = intensity * (0.7 + Math.sin(time * speed) * 0.3);
        ctx.globalAlpha = opacity;

        // Draw water reflection pattern
        ctx.fillStyle = '#0077be';

        // Draw several wave lines
        for (let i = 0; i < 5; i++) {
            const yPos = height * 0.8 + i * 10 + Math.sin(time * speed + i) * 5;

            ctx.beginPath();
            ctx.moveTo(0, yPos);

            // Create a wavy line
            for (let x = 0; x < width; x += 20) {
                const waveHeight = Math.sin(x / 50 + time * speed) * 5;
                ctx.lineTo(x, yPos + waveHeight);
            }

            ctx.lineTo(width, yPos);
            ctx.lineTo(width, yPos + 3);
            ctx.lineTo(0, yPos + 3);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    },

    applyCannonSmoke(ctx, intensity = 0.6, duration = 2000) {
        const { width, height } = ctx.canvas;
        const time = Date.now();

        // Only show smoke effect for specified duration after trigger
        if (!this._lastCannonTime || time - this._lastCannonTime > duration) {
            return;
        }

        // Calculate progress of smoke effect (0 to 1)
        const progress = Math.min(1, (time - this._lastCannonTime) / duration);
        const remainingIntensity = intensity * (1 - progress);

        ctx.save();
        ctx.globalAlpha = remainingIntensity;

        // Draw smoke particles
        const particleCount = 20;
        const smokeColor = `rgba(200, 200, 200, ${remainingIntensity})`;

        ctx.fillStyle = smokeColor;
        for (let i = 0; i < particleCount; i++) {
            const size = 10 + progress * 20 + i % 10;
            const xOffset = (i % 5 - 2) * 15 * progress;
            const yOffset = -i * 5 * progress;

            ctx.beginPath();
            ctx.arc(width * 0.8 + xOffset, height * 0.6 + yOffset, size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    },

    // Method to trigger cannon smoke effect
    triggerCannonSmoke() {
        this._lastCannonTime = Date.now();
    }
};

export function renderThemeEffects(ctx, canvas, timestamp, specific) {
    // Use the specific parameter which contains theme-specific effect settings

    // Pirate ship rocking effect
    if (specific?.shipRocking?.enabled) {
        // Apply subtle rocking motion to elements
        const amplitude = specific.shipRocking.amplitude || 2;
        const period = specific.shipRocking.period || 5000;

        // Calculate rocking angle based on time
        const angle = Math.sin(timestamp / period * Math.PI * 2) * amplitude * (Math.PI / 180);

        // Add rocking motion to drawing context
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        // Note: Would need to restore context after drawing affected elements
        ctx.restore();
    }
}

export function renderEpicWinAnimation(ctx, canvas, elapsedTime, deltaTime, winAmount) {
    const config = PirateTheme.visualEffects?.themeSpecific?.epicWinAnimation || {};
    const duration = config.duration || 5000;
    const progress = Math.min(1.0, elapsedTime / duration);

    // Epic win animation implementation
    // Trigger cannon smoke effect
    if (progress < 0.1 && ThemeEffectsHelper.triggerCannonSmoke) {
        ThemeEffectsHelper.triggerCannonSmoke();
    }

    return progress < 1.0; // Return true while animation is ongoing
}

export default {
    ThemeEffectsHelper,
    renderThemeEffects,
    renderEpicWinAnimation
};
