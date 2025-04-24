// filepath: c:\projects\copilot-agent\theme-slots\themes\gemstones\effects.js
// Gemstones theme specific effects
import { EffectPresets as BaseEffectPresets, EffectsHelper } from '../../shared/effects.js';
import { GemstonesTheme } from './theme.js';

// You can extend the base effect presets with Gemstones-specific effects
export const EffectPresets = {
    ...BaseEffectPresets,
    jeweled: {
        ...BaseEffectPresets.sparkle,
        glowIntensity: 0.9,
        colorShift: 0.6,
        blinkRate: 1.2,
        // Additional Gemstones-specific effect parameters
        reflections: {
            enabled: true,
            intensity: 0.8,
            speed: 0.3
        },
        prismEffect: {
            enabled: true,
            intensity: 0.7,
            colors: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
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
        this.applyGemEffect(ctx, element, intensity, theme);
    },

    // Gemstones-specific methods
    applyGemEffect(ctx, element, intensity = 1, theme) {
        // Apply appropriate effects based on the theme parameter
        if (theme?.visualEffects?.reflections?.enabled) {
            this.applyReflections(
                ctx,
                theme.visualEffects.reflections.intensity,
                theme.visualEffects.reflections.speed
            );
        }

        if (theme?.visualEffects?.prismEffect?.enabled) {
            this.applyPrismEffect(
                ctx,
                theme.visualEffects.prismEffect.intensity,
                theme.visualEffects.prismEffect.colors
            );
        }
    },

    applyReflections(ctx, intensity = 0.8, speed = 0.3) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        // Create gem reflections
        ctx.save();

        // Vary opacity based on time for shimmering effect
        const opacity = intensity * (0.5 + Math.sin(time * speed) * 0.5);
        ctx.globalAlpha = opacity;

        // Draw a few reflection highlights
        ctx.fillStyle = '#ffffff';

        // First reflection
        const x1 = width * 0.3 + Math.sin(time * speed) * width * 0.05;
        const y1 = height * 0.4 + Math.cos(time * speed * 1.3) * height * 0.05;
        const size1 = width * 0.03;

        ctx.beginPath();
        ctx.arc(x1, y1, size1, 0, Math.PI * 2);
        ctx.fill();

        // Second reflection
        const x2 = width * 0.7 + Math.cos(time * speed * 0.8) * width * 0.03;
        const y2 = height * 0.6 + Math.sin(time * speed * 1.1) * height * 0.04;
        const size2 = width * 0.02;

        ctx.beginPath();
        ctx.arc(x2, y2, size2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    },

    applyPrismEffect(ctx, intensity = 0.7, colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        ctx.save();
        ctx.globalAlpha = intensity * 0.3; // Keep it subtle

        // Draw prism rainbow effect
        const gradientHeight = height * 0.1;
        const yOffset = (Math.sin(time * 0.2) * height * 0.05);

        // Create rainbow gradient
        const gradient = ctx.createLinearGradient(0, yOffset, width, yOffset + gradientHeight);

        colors.forEach((color, index) => {
            gradient.addColorStop(index / (colors.length - 1), color);
        });

        ctx.fillStyle = gradient;
        ctx.fillRect(0, yOffset, width, gradientHeight);

        ctx.restore();
    }
};

export function renderThemeEffects(ctx, canvas, timestamp, specific) {
    // Use the specific parameter which contains theme-specific effect settings

    // Gemstone-specific ambient effects
    if (specific?.gemGlow?.enabled) {
        // Gemstone-specific ambient glow implementation
    }
}

export function renderEpicWinAnimation(ctx, canvas, elapsedTime, deltaTime, winAmount) {
    const config = GemstonesTheme.visualEffects.themeSpecific.epicWinAnimation;
    const duration = config.duration || 5000;
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
