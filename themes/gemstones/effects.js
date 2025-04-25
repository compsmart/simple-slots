// Gemstones theme specific effects
import { EffectDefaults, EffectsHelper } from '../../shared/effects.js';
import { GemstonesTheme } from './theme.js';

// You can extend the base effect presets with Gemstones-specific effects
export const EffectPresets = {
    ...EffectDefaults,
    enabled: true,
    enabled: true,
    backgroundEffects: {
        enabled: false
    },
    reelEffects: {
        enabled: true,
        blurAmount: 3,
        lightTrails: false,
        spinningGlow: true,
        spinColor: '#00E5FF' // Bright cyan
    },
    winEffects: {
        enabled: true,
        explosions: true,
        shockwave: true,
        flashingSymbols: true,
        spinEffect3d: {
            enabled: false,
            duration: 1000, // 1 second
            rotations: 2, // Number of rotations
            easing: 'easeInOutCubic', // Smooth easing
        },
        rotateEffect: {
            enabled: true,
            roations: 3, // Number of rotations
            direction: 'clockwise', // Rotate clockwise for pirate theme
            duration: 1000, // 1 second
            easing: 'easeInOutCubic', // Smooth easing
        },
        pulsingSymbols: true,
    },
    neonGlow: {
        enabled: true,
        color: '#ff00ff', // Vibrant magenta
        size: 12,
        pulseSpeed: 600,
        intensity: 0.9
    },
    backgroundEffects: {
        enabled: true,
        particles: {
            enabled: false,
            count: 60,
            color: '#ffffff',
            size: { min: 2, max: 7 },
            sparkle: true
        },
        pulse: {
            enabled: true,
            color: '#220033',
            speed: 1200,
            intensity: 0.5
        }
    },
    reelMask: {
        enabled: true,
        borderWidth: 4,
        separatorWidth: 4,
        glowEffect: {
            enabled: true,
            color: '#00ffff',
            intensity: 0.9,
            size: 15
        },
        pulseEffect: {
            enabled: true,
            speed: 15000,
            minOpacity: 0.7,
            maxOpacity: 1.0
        },
        colorTransition: {
            enabled: true,
            colors: ['#FFD700', '#228B22', '#c31120', '#660069', '#285cff'],
            speed: 30000,
            mode: 'gradient'
        }
    },
    themeSpecific: {
        glowIntensity: 0.9,
        colorShift: 0.6,
        blinkRate: 1.2,
        // Additional Gemstones-specific effect parameters
        reflections: {
            enabled: false,
            intensity: 0.8,
            speed: 0.3
        },
        prismEffect: {
            enabled: true,
            intensity: 0.7,
            colors: ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
        },
        gemSparkle: {
            enabled: true,
            intensity: 0.9,
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
        },
        epicWinAnimation: {
            enabled: true,
            name: "Gem Explosion",
            duration: 8000, // 8 seconds
            diamondShower: true,
            prismaticRays: true,
            jewelTransformation: true
        }
    }
};

// Create ThemeEffectsHelper using a standardized name across all themes
export const ThemeEffectsHelper = {
    // Include all methods from the base EffectsHelper
    ...EffectsHelper,

    // Add theme-specific effect methods with standardized naming pattern
    applyThemeEffect(ctx, element, intensity = 1, theme, timestamp) {

        const specific = theme?.visualEffects?.themeSpecific || {};
        if (specific?.reflections?.enabled) {
            this.applyReflections(
                ctx,
                specific.reflections.intensity,
                specific.reflections.speed
            );
        } if (specific?.prismEffect?.enabled) {
            this.applyPrismEffect(
                ctx,
                element,
                specific.prismEffect.intensity,
                specific.prismEffect.colors,
                timestamp
            );
        } if (specific?.gemSparkle?.enabled) {
            this.applyGemSparkle(
                ctx,
                element,
                specific.gemSparkle.intensity,
                specific.gemSparkle.colors,
                timestamp
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
    }, applyPrismEffect(ctx, canvas, intensity = 0.7, colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'], timestamp) {
        const prismSettings = {
            rainbowIntensity: intensity
        };

        const rainbowIntensity = prismSettings?.rainbowIntensity || 0.7;

        // Calculate the reel area dimensions
        const SYMBOL_SIZE = 100;
        const REEL_COUNT = 5;
        const VISIBLE_ROWS = 3;

        const reelWidth = SYMBOL_SIZE;
        const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
        const startX = reelSpacing;
        const startY = 100;
        const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;

        // Create light beams that move across the screen like refracted light
        ctx.save();

        // Set blending mode for the light effect
        ctx.globalCompositeOperation = 'screen';

        // Create 3 moving rainbow beams
        const beamCount = 3;
        for (let i = 0; i < beamCount; i++) {
            // Calculate beam angle (changes slowly over time, different for each beam)
            const angleSpeed = 0.0001;
            const angleOffset = (Math.PI * 2 / beamCount) * i;
            const angle = ((timestamp * angleSpeed) % (Math.PI * 2)) + angleOffset;

            // Calculate beam position (moves diagonally across the screen)
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.max(canvas.width, canvas.height);

            const beamX = centerX + Math.cos(angle) * radius * 0.5;
            const beamY = centerY + Math.sin(angle) * radius * 0.5;

            // Create beam width and direction
            const beamLength = radius * 2;
            const beamWidth = 100 + Math.sin(timestamp / 3000 + i) * 50;

            // Draw rainbow beam with gradient
            const beam = ctx.createLinearGradient(
                beamX - Math.cos(angle) * beamLength / 2,
                beamY - Math.sin(angle) * beamLength / 2,
                beamX + Math.cos(angle) * beamLength / 2,
                beamY + Math.sin(angle) * beamLength / 2
            );

            // Create rainbow colors
            beam.addColorStop(0, `rgba(255, 0, 0, ${0.2 * rainbowIntensity})`);
            beam.addColorStop(0.2, `rgba(255, 165, 0, ${0.2 * rainbowIntensity})`);
            beam.addColorStop(0.4, `rgba(255, 255, 0, ${0.2 * rainbowIntensity})`);
            beam.addColorStop(0.6, `rgba(0, 255, 0, ${0.2 * rainbowIntensity})`);
            beam.addColorStop(0.8, `rgba(0, 0, 255, ${0.2 * rainbowIntensity})`);
            beam.addColorStop(1, `rgba(128, 0, 128, ${0.2 * rainbowIntensity})`);

            // Create beam path
            ctx.fillStyle = beam;
            ctx.beginPath();

            // Calculate the four corners of the beam (rotated rectangle)
            const halfWidth = beamWidth / 2;
            const perpAngle = angle + Math.PI / 2;
            const perpX = Math.cos(perpAngle);
            const perpY = Math.sin(perpAngle);
            const alongX = Math.cos(angle);
            const alongY = Math.sin(angle);

            // Define the four corners
            const x1 = beamX + perpX * halfWidth - alongX * beamLength / 2;
            const y1 = beamY + perpY * halfWidth - alongY * beamLength / 2;

            const x2 = beamX - perpX * halfWidth - alongX * beamLength / 2;
            const y2 = beamY - perpY * halfWidth - alongY * beamLength / 2;

            const x3 = beamX - perpX * halfWidth + alongX * beamLength / 2;
            const y3 = beamY - perpY * halfWidth + alongY * beamLength / 2;

            const x4 = beamX + perpX * halfWidth + alongX * beamLength / 2;
            const y4 = beamY + perpY * halfWidth + alongY * beamLength / 2;

            // Draw the beam rectangle
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x4, y4);
            ctx.closePath();
            ctx.fill();
        }

        // Add a central diamond light source effect
        const centerX = startX + (SYMBOL_SIZE * REEL_COUNT + reelSpacing * (REEL_COUNT - 1)) / 2;
        const centerY = startY + reelViewportHeight / 2;

        // Create pulsating glow with rainbow colors
        const pulseSize = (Math.sin(timestamp / 1000) * 0.3 + 0.7) * 150;
        const burstOffset = timestamp / 100;

        // Create radial rainbow gradient
        const radial = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, pulseSize
        );

        radial.addColorStop(0, `rgba(255, 255, 255, ${0.4 * rainbowIntensity})`);
        radial.addColorStop(0.2, `rgba(255, 0, 0, ${0.3 * rainbowIntensity})`);
        radial.addColorStop(0.4, `rgba(255, 255, 0, ${0.25 * rainbowIntensity})`);
        radial.addColorStop(0.6, `rgba(0, 255, 0, ${0.2 * rainbowIntensity})`);
        radial.addColorStop(0.8, `rgba(0, 0, 255, ${0.15 * rainbowIntensity})`);
        radial.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = radial;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Add small diamond-like sparkles
        const sparkleCount = 12;
        const sparkleSize = 15;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

        for (let i = 0; i < sparkleCount; i++) {
            const angle = (i / sparkleCount) * Math.PI * 2 + burstOffset;
            const distance = pulseSize * 0.6 * (0.8 + Math.sin(timestamp / 500 + i) * 0.2);
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            // Draw diamond shape
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle + Math.PI / 4);

            ctx.beginPath();
            ctx.moveTo(0, -sparkleSize / 2);
            ctx.lineTo(sparkleSize / 2, 0);
            ctx.lineTo(0, sparkleSize / 2);
            ctx.lineTo(-sparkleSize / 2, 0);
            ctx.closePath();

            ctx.globalAlpha = Math.sin(timestamp / 200 + i * 0.5) * 0.4 + 0.6;
            ctx.fill();

            ctx.restore();
        }

        ctx.restore();
    }, applyGemSparkle(ctx, canvas, intensity = 0.9, colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'], timestamp) {
        const sparkleSettings = {
            intensity: intensity,
            colors: colors
        };

        // Initialize sparkles if they don't exist
        if (!this._gemSparkles) {
            this._gemSparkles = [];
            const sparkleCount = Math.floor(30 * intensity);

            // Create sparkles across the screen, focusing on reel areas
            for (let i = 0; i < sparkleCount; i++) {
                this._gemSparkles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 4 + 2,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: Math.random() * Math.PI * 2,
                    timeOffset: Math.random() * 2000,
                    duration: Math.random() * 1000 + 500,
                    active: true
                });
            }
        }

        // Update and draw sparkles
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        this._gemSparkles.forEach(sparkle => {
            // Calculate sparkle visibility based on time
            const cycleTime = (timestamp + sparkle.timeOffset) % (sparkle.duration * 2);
            const visible = cycleTime < sparkle.duration;

            if (visible) {
                // Calculate sparkle opacity based on its cycle
                const progress = cycleTime / sparkle.duration;
                const opacity = progress < 0.5 ? progress * 2 : (1 - progress) * 2;

                // Draw the sparkle
                ctx.save();
                ctx.translate(sparkle.x, sparkle.y);
                ctx.rotate(sparkle.angle + timestamp / 1000);

                // Create a star shape for the sparkle
                ctx.fillStyle = sparkle.color;
                ctx.globalAlpha = opacity * intensity;

                // Draw a four-point star
                ctx.beginPath();
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    const innerRadius = sparkle.size * 0.4;
                    const outerRadius = sparkle.size;

                    // Outer point
                    ctx.lineTo(
                        Math.cos(angle) * outerRadius,
                        Math.sin(angle) * outerRadius
                    );

                    // Inner point
                    const innerAngle = angle + Math.PI / 4;
                    ctx.lineTo(
                        Math.cos(innerAngle) * innerRadius,
                        Math.sin(innerAngle) * innerRadius
                    );
                }
                ctx.closePath();
                ctx.fill();

                // Add a white center for extra shine
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(0, 0, sparkle.size * 0.2, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }

            // Occasionally move the sparkle to a new position for visual freshness
            if (Math.random() < 0.002) {
                sparkle.x = Math.random() * canvas.width;
                sparkle.y = Math.random() * canvas.height;
            }
        });

        ctx.restore();
    },


};

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
    renderEpicWinAnimation
};
