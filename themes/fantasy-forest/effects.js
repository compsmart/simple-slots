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
    if (specific?.floatingLeaves?.enabled) {
        const leafSettings = specific.floatingLeaves;
        const count = leafSettings?.count || 15;
        // ... (rest of leaf logic - kept identical to your provided code) ...
        if (!ctx.forestLeaves) {
            ctx.forestLeaves = [];
            for (let i = 0; i < count; i++) {
                ctx.forestLeaves.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 15 + 10,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() * 0.5 + 0.5) * (leafSettings?.rotationSpeed || 2) * 0.01,
                    fallSpeed: Math.random() * ((leafSettings?.fallSpeed?.max || 3) - (leafSettings?.fallSpeed?.min || 1)) + (leafSettings?.fallSpeed?.min || 1),
                    swayFactor: Math.random() * 2 + 1,
                    swayOffset: Math.random() * Math.PI * 2,
                    color: (leafSettings?.colors || ['#8bc34a', '#4caf50', '#cddc39'])[Math.floor(Math.random() * (leafSettings?.colors?.length || 3))],
                    type: Math.floor(Math.random() * 3) // Different leaf shapes
                });
            }
        }
        ctx.save();
        ctx.forestLeaves.forEach(leaf => {
            leaf.y += leaf.fallSpeed;
            leaf.x += Math.sin((timestamp / 2000) + leaf.swayOffset) * leaf.swayFactor * 0.3;
            leaf.rotation += leaf.rotationSpeed;
            if (leaf.y > canvas.height + leaf.size) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * canvas.width;
                leaf.rotation = Math.random() * Math.PI * 2;
            }
            if (leaf.x > canvas.width + leaf.size) leaf.x = -leaf.size;
            if (leaf.x < -leaf.size) leaf.x = canvas.width + leaf.size;
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.rotation);
            switch (leaf.type) { /* ... leaf drawing cases ... */
                case 0: // Simple oval leaf
                    ctx.fillStyle = leaf.color;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, leaf.size / 2, leaf.size, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = `${leaf.color}99`;
                    ctx.beginPath(); ctx.moveTo(0, -leaf.size); ctx.lineTo(0, leaf.size); ctx.lineWidth = 1; ctx.stroke();
                    break;
                case 1: // Maple-like leaf
                    ctx.fillStyle = leaf.color;
                    ctx.beginPath(); ctx.moveTo(0, -leaf.size); ctx.bezierCurveTo(leaf.size / 2, -leaf.size / 2, leaf.size / 2, leaf.size / 2, 0, leaf.size); ctx.bezierCurveTo(-leaf.size / 2, leaf.size / 2, -leaf.size / 2, -leaf.size / 2, 0, -leaf.size); ctx.fill();
                    break;
                case 2: default: // Round leaf with stem
                    ctx.strokeStyle = '#795548'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, leaf.size / 2); ctx.lineTo(0, leaf.size); ctx.stroke();
                    ctx.fillStyle = leaf.color; ctx.beginPath(); ctx.arc(0, 0, leaf.size / 2, 0, Math.PI * 2); ctx.fill();
                    ctx.strokeStyle = `${leaf.color}99`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -leaf.size / 2); ctx.lineTo(0, leaf.size / 2); ctx.moveTo(-leaf.size / 2, 0); ctx.lineTo(leaf.size / 2, 0); ctx.stroke();
                    break;
            }
            ctx.restore();
        });
        ctx.restore();
    }

    // Fireflies effect (copied from your original code)
    if (specific?.fireflies?.enabled) {
        const fireflySettings = specific.fireflies;
        const count = fireflySettings?.count || 20;
        // ... (rest of firefly logic - kept identical to your provided code) ...
        if (!ctx.forestFireflies) {
            ctx.forestFireflies = [];
            for (let i = 0; i < count; i++) { /* ... firefly initialization ... */
                let x, y;
                if (Math.random() < 0.7) {
                    if (Math.random() < 0.5) {
                        x = Math.random() < 0.5 ? Math.random() * canvas.width * 0.3 : canvas.width - (Math.random() * canvas.width * 0.3);
                        y = Math.random() * canvas.height;
                    } else {
                        x = Math.random() * canvas.width;
                        y = Math.random() < 0.5 ? Math.random() * canvas.height * 0.3 : canvas.height - (Math.random() * canvas.height * 0.3);
                    }
                } else { x = Math.random() * canvas.width; y = Math.random() * canvas.height; }
                ctx.forestFireflies.push({
                    x: x, y: y, size: Math.random() * 3 + 2,
                    speedX: (Math.random() - 0.5) * ((fireflySettings?.speed?.max || 1) - (fireflySettings?.speed?.min || 0.2)) + (fireflySettings?.speed?.min || 0.2),
                    speedY: (Math.random() - 0.5) * ((fireflySettings?.speed?.max || 1) - (fireflySettings?.speed?.min || 0.2)) + (fireflySettings?.speed?.min || 0.2),
                    blinkRate: Math.random() * ((fireflySettings?.blinkRate?.max || 2000) - (fireflySettings?.blinkRate?.min || 500)) + (fireflySettings?.blinkRate?.min || 500),
                    phase: Math.random() * Math.PI * 2,
                    baseColor: fireflySettings?.color || '#ffeb3b',
                    wanderAngle: Math.random() * Math.PI * 2, wanderSpeed: Math.random() * 0.02 + 0.005
                });
            }
        }
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        ctx.forestFireflies.forEach(firefly => { /* ... firefly update and drawing ... */
            firefly.wanderAngle += (Math.random() - 0.5) * 0.2;
            firefly.x += Math.cos(firefly.wanderAngle) * firefly.speedX;
            firefly.y += Math.sin(firefly.wanderAngle) * firefly.speedY;
            if (firefly.x > canvas.width) firefly.x = 0; if (firefly.x < 0) firefly.x = canvas.width;
            if (firefly.y > canvas.height) firefly.y = 0; if (firefly.y < 0) firefly.y = canvas.height;
            const blinkIntensity = (Math.sin((timestamp / firefly.blinkRate) + firefly.phase) * 0.5 + 0.5);
            if (blinkIntensity > 0.1) {
                const gradient = ctx.createRadialGradient(firefly.x, firefly.y, 0, firefly.x, firefly.y, firefly.size * 2);
                gradient.addColorStop(0, `${firefly.baseColor}${Math.floor(blinkIntensity * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${firefly.baseColor}00`);
                ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(firefly.x, firefly.y, firefly.size * 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = 'rgba(255, 255, 255, ' + blinkIntensity * 0.7 + ')'; ctx.beginPath(); ctx.arc(firefly.x, firefly.y, firefly.size * 0.5, 0, Math.PI * 2); ctx.fill();
            }
        });
        ctx.restore();
    }
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
