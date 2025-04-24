// filepath: c:\projects\copilot-agent\theme-slots\themes\aztec\effects.js
// Aztec theme specific effects
import { EffectPresets as BaseEffectPresets, EffectsHelper } from '../../shared/effects.js';
import { AztecTheme } from './theme.js';

// You can extend the base effect presets with Aztec-specific effects
export const EffectPresets = {
    ...BaseEffectPresets,
    ancient: {
        ...BaseEffectPresets.ancient,
        glowIntensity: 0.8,
        colorShift: 0.3,
        blinkRate: 1.3,
        // Additional Aztec-specific effect parameters
        stoneTexture: true,
        sunbeams: {
            enabled: true,
            intensity: 0.6,
            count: 8
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
        this.applyAztecEffect(ctx, element, intensity, theme);
    },

    // Add the missing createRadialGlow method
    createRadialGlow(ctx, canvas, options) {
        const { centerX, centerY, radius, color, intensity } = options;

        // Create a radial gradient
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );

        // Set gradient colors with transparency based on intensity
        gradient.addColorStop(0, `${color}${Math.floor(intensity * 80).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(0.7, `${color}${Math.floor(intensity * 40).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${color}00`);

        // Save current drawing state
        ctx.save();

        // Set global composite operation for better blending
        ctx.globalCompositeOperation = 'lighter';

        // Draw the glow
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Restore drawing state
        ctx.restore();
    },

    // Aztec-specific methods
    applyAztecEffect(ctx, element, intensity = 1, theme) {
        // Apply appropriate effects based on the theme parameter
        if (theme?.visualEffects?.sunbeams?.enabled) {
            this.applySunbeams(ctx,
                theme.visualEffects.sunbeams.intensity,
                theme.visualEffects.sunbeams.count);
        }
    },

    applySunbeams(ctx, intensity = 0.6, count = 8) {
        const { width, height } = ctx.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.max(width, height);

        ctx.save();
        ctx.globalCompositeOperation = 'overlay';

        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const gradient = ctx.createLinearGradient(
                centerX, centerY,
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );

            gradient.addColorStop(0, `rgba(255, 200, 50, ${intensity})`);
            gradient.addColorStop(1, 'rgba(255, 200, 50, 0)');

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle - 0.05) * radius,
                centerY + Math.sin(angle - 0.05) * radius
            );
            ctx.lineTo(
                centerX + Math.cos(angle + 0.05) * radius,
                centerY + Math.sin(angle + 0.05) * radius
            );
            ctx.closePath();

            ctx.fillStyle = gradient;
            ctx.fill();
        }

        ctx.restore();
    }
};

export function renderThemeEffects(ctx, canvas, timestamp, specific) {
    // Use the specific parameter which contains theme-specific effect settings
    // This function can use the standardized ThemeEffectsHelper methods if needed

    // Temple Glow effect
    if (specific?.templeGlow?.enabled) {
        const glowSettings = specific.templeGlow;
        const intensity = glowSettings?.intensity || 0.8;
        const glowColor = glowSettings?.glowColor || '#E6BB4C';
        const pulseSpeed = glowSettings?.pulseSpeed || 3000;

        // Calculate the reel area dimensions
        const SYMBOL_SIZE = 100;
        const REEL_COUNT = 5;
        const VISIBLE_ROWS = 3; // Always 3 visible rows

        const reelWidth = SYMBOL_SIZE;
        const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
        const startX = reelSpacing;
        const startY = 100;
        const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;
        const totalWidth = REEL_COUNT * reelWidth + (REEL_COUNT - 1) * reelSpacing;

        // Pulsing effect based on timestamp
        const pulseIntensity = Math.sin(timestamp / pulseSpeed) * 0.3 + 0.7; // 0.4 to 1.0
        const finalIntensity = intensity * pulseIntensity;

        // Create temple glow effect
        ThemeEffectsHelper.createRadialGlow(ctx, canvas, {
            centerX: startX + totalWidth / 2,
            centerY: startY + reelViewportHeight / 2,
            radius: Math.max(totalWidth, reelViewportHeight) * 0.8,
            color: glowColor,
            intensity: finalIntensity
        });
    }
}

export function renderEpicWinAnimation(ctx, canvas, elapsedTime, deltaTime, winAmount) {
    const config = AztecTheme.visualEffects.themeSpecific.epicWinAnimation;
    const duration = config.duration;
    const progress = Math.min(1.0, elapsedTime / duration);

    // Epic win animation implementation
    // This is theme-specific but uses the standardized pattern

    return progress < 1.0; // Return true while animation is ongoing
}

export default {
    ThemeEffectsHelper,
    renderThemeEffects,
    renderEpicWinAnimation
};