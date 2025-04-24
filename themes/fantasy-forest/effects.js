// filepath: c:\projects\copilot-agent\theme-slots\themes\fantasy-forest\effects.js
// Fantasy Forest theme specific effects
import { EffectPresets as BaseEffectPresets, EffectsHelper } from '../../shared/effects.js';
import { FantasyForestTheme } from './theme.js';

// You can extend the base effect presets with Fantasy Forest-specific effects
export const EffectPresets = {
    ...BaseEffectPresets,
    enchanted: {
        ...BaseEffectPresets.nature,
        glowIntensity: 0.85,
        colorShift: 0.5,
        blinkRate: 1.4,
        // Additional Fantasy Forest-specific effect parameters
        magicSparkles: {
            enabled: true,
            intensity: 0.7,
            color: '#8BC34A',
            size: 3
        },
        floatingLeaves: {
            enabled: true,
            count: 20,
            speed: 1.5
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
        this.applyForestEffect(ctx, element, intensity, theme);
    },

    // Fantasy Forest-specific methods
    applyForestEffect(ctx, element, intensity = 1, theme) {
        // Apply appropriate effects based on the theme parameter
        if (theme?.visualEffects?.magicSparkles?.enabled) {
            this.applySparkles(
                ctx,
                theme.visualEffects.magicSparkles.intensity,
                theme.visualEffects.magicSparkles.color,
                theme.visualEffects.magicSparkles.size
            );
        }

        if (theme?.visualEffects?.floatingLeaves?.enabled) {
            this.applyFloatingLeaves(
                ctx,
                theme.visualEffects.floatingLeaves.count,
                theme.visualEffects.floatingLeaves.speed
            );
        }
    },

    applySparkles(ctx, intensity = 0.7, color = '#8BC34A', size = 3) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        // Draw sparkles using canvas
        ctx.save();
        ctx.fillStyle = color;
        ctx.globalAlpha = intensity;

        // Generate sparkles based on time
        const sparkleCount = Math.floor(50 * intensity);
        for (let i = 0; i < sparkleCount; i++) {
            const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
            const y = (Math.cos(time + i * 0.7) * 0.5 + 0.5) * height;
            const sparkleSize = size * (0.5 + Math.sin(time * 3 + i) * 0.5);

            ctx.beginPath();
            ctx.arc(x, y, sparkleSize, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    },

    applyFloatingLeaves(ctx, count = 20, speed = 1.5) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        ctx.save();

        // Simple leaf shapes and colors
        const leafColors = ['#8BC34A', '#689F38', '#33691E', '#558B2F'];

        for (let i = 0; i < count; i++) {
            // Position based on time and leaf index
            const x = (Math.sin(time * speed * 0.2 + i) * 0.5 + 0.5) * width;
            const y = ((time * speed * 0.1 + i) % 1) * height;
            const rotation = Math.sin(time + i * 2) * Math.PI;
            const leafSize = 5 + Math.sin(i) * 5;

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);

            // Draw a simple leaf shape
            ctx.fillStyle = leafColors[i % leafColors.length];
            ctx.beginPath();
            ctx.ellipse(0, 0, leafSize, leafSize * 2, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        ctx.restore();
    }
};

export function renderThemeEffects(ctx, canvas, timestamp, specific) {
    // Use the specific parameter which contains theme-specific effect settings

    // Magical forest ambient effects
    if (specific?.forestGlow?.enabled) {
        // Forest-specific ambient glow implementation
    }

    // Other fantasy forest specific effects
}

export function renderEpicWinAnimation(ctx, canvas, elapsedTime, deltaTime, winAmount) {
    const config = FantasyForestTheme.visualEffects.themeSpecific.epicWinAnimation;
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
