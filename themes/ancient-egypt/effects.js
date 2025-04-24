// Ancient Egypt theme specific effects
import { EffectPresets as BaseEffectPresets, EffectsHelper } from '../../shared/effects.js';
import { AncientEgyptTheme } from './theme.js';

// You can extend the base effect presets with Ancient Egypt-specific effects
export const EffectPresets = {
    ...BaseEffectPresets,
    desert: {
        ...BaseEffectPresets.ancient,
        sandStorm: true,
        glowIntensity: 0.85,
        colorShift: 0.4,
        blinkRate: 1.2,
        // Additional Ancient Egypt-specific effect parameters
        goldShimmer: {
            enabled: true,
            intensity: 0.7,
            frequency: 0.5
        }
    }
};

// Create a ThemeEffectsHelper object that includes EffectsHelper methods
// Using a standardized name that will be the same across all themes
export const ThemeEffectsHelper = {
    // Include all methods from the base EffectsHelper
    ...EffectsHelper,

    // Add theme-specific effect methods with standardized naming
    applyThemeEffect(ctx, element, intensity = 1, theme) {
        // Apply base ancient effect if it exists
        if (this.applyAncientEffect) {
            this.applyAncientEffect(ctx, element, intensity);
        }

        // Add theme-specific gold shimmer effect if enabled
        if (theme?.visualEffects?.goldShimmer?.enabled) {
            this.applyGoldShimmer(ctx,
                theme.visualEffects.goldShimmer.intensity,
                theme.visualEffects.goldShimmer.frequency);
        }
    },

    applyGoldShimmer(ctx, intensity = 0.7, frequency = 0.5) {
        const { width, height } = ctx.canvas;
        const time = Date.now() / 1000;

        ctx.fillStyle = `rgba(255, 215, 0, ${0.2 * intensity * Math.sin(time * frequency)})`;
        ctx.fillRect(0, 0, width, height);
    }
}

export function renderThemeEffects(ctx, canvas, timestamp, specific) {
    // Draw background image if configured
    const bgEffects = AncientEgyptTheme.visualEffects.backgroundEffects;
    if (bgEffects?.enabled && bgEffects?.backgroundImage?.enabled) {
        // Check if we need to load the background image
        if (!AncientEgyptTheme.bgImage) {
            AncientEgyptTheme.bgImage = new Image();
            AncientEgyptTheme.bgImage.src = bgEffects.backgroundImage.path;
            AncientEgyptTheme.bgImageLoaded = false;
            AncientEgyptTheme.bgImage.onload = () => {
                AncientEgyptTheme.bgImageLoaded = true;
            };
        }

        // Draw the background image if it's loaded
        if (AncientEgyptTheme.bgImageLoaded) {
            const opacity = bgEffects.backgroundImage.opacity || 1.0;

            // Ensure the image covers the entire canvas while maintaining aspect ratio
            const imgWidth = AncientEgyptTheme.bgImage.width;
            const imgHeight = AncientEgyptTheme.bgImage.height;
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = imgWidth / imgHeight;

            let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

            // Calculate dimensions to cover the entire canvas
            if (canvasRatio > imgRatio) {
                // Canvas is wider than image aspect ratio
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                // Canvas is taller than image aspect ratio
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            if (opacity < 1.0) {
                // If opacity is less than 1, need to use globalAlpha
                ctx.save();
                ctx.globalAlpha = opacity;
                ctx.drawImage(AncientEgyptTheme.bgImage, offsetX, offsetY, drawWidth, drawHeight);
                ctx.restore();
            } else {
                // Full opacity, just draw directly
                ctx.drawImage(AncientEgyptTheme.bgImage, offsetX, offsetY, drawWidth, drawHeight);
            }
        } else {
            // Fallback if image isn't loaded yet
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#1f1a13'); // Dark sand color
            gradient.addColorStop(0.5, '#544b34'); // Mid sand color
            gradient.addColorStop(1, '#997f4e'); // Lighter sand color
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Epic Win Animation for Ancient Egypt theme
    if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
        const epicWin = specific.epicWinAnimation;
        const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

        ctx.save();

        // Big text announcement
        const textProgress = Math.min(1, progress * 2);
        const textSize = 60 + Math.sin(timestamp / 200) * 10;
        ctx.font = `bold ${textSize}px "Papyrus", fantasy`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Text with gold gradient
        const gradient = ctx.createLinearGradient(
            canvas.width / 2 - 200,
            canvas.height / 2 - 100,
            canvas.width / 2 + 200,
            canvas.height / 2 - 100
        );
        gradient.addColorStop(0, '#ffd700');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#ffd700');

        ctx.fillStyle = gradient;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        const scale = 0.5 + textProgress * 0.5;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 3);
        ctx.scale(scale, scale);
        ctx.rotate(Math.sin(timestamp / 500) * 0.1);
        ctx.fillText("PHARAOH'S FORTUNE!", 0, 0);
        ctx.strokeText("PHARAOH'S FORTUNE!", 0, 0);
        ctx.restore();

        // Win amount
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = '#ffd700';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.fillText(`${(window.betAmount * 100).toFixed(2)}`, canvas.width / 2, canvas.height / 2 - 50);
        ctx.strokeText(`${(window.betAmount * 100).toFixed(2)}`, canvas.width / 2, canvas.height / 2 - 50); ctx.restore();

        // Golden rain effect - rendered last to appear on top of everything
        if (epicWin.goldenRain) {
            // Use the shared helper function for golden rain effect
            EffectsHelper.renderGoldenRain(ctx, canvas, timestamp, {
                count: 100,
                coinSize: 5,
                coinColor: '#ffd700',
                outlineColor: '#b7950b',
                speed: 3,
                swayAmount: 30,
                swaySpeed: 1000,
                detailsEnabled: true
            });
        }

        // End animation if complete
        if (progress >= 1) {
            window.isPlayingEpicWinAnimation = false;
        }
    }
    // Sand Storm effect
    if (specific?.sandStorm?.enabled) {
        const sandSettings = specific.sandStorm;
        const intensity = sandSettings?.intensity || 0.3;
        const sandColor = sandSettings?.color || '#d4b683';

        // Initialize sand particles if they don't exist
        if (!ctx.sandParticles) {
            ctx.sandParticles = [];
            const particleCount = Math.floor(100 * intensity);

            for (let i = 0; i < particleCount; i++) {
                ctx.sandParticles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.3) * 2, // Mostly moving right
                    speedY: (Math.random() - 0.5) * 1, // Slight vertical movement
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }

        // Get the current wind intensity based on time
        const windPulse = (Math.sin(timestamp / 5000) * 0.3 + 0.7); // 0.4 to 1.0

        // Update and draw sand particles
        ctx.save();
        ctx.sandParticles.forEach(particle => {
            // Update position with wind effect
            particle.x += particle.speedX * windPulse;
            particle.y += particle.speedY;

            // Wrap around screen edges
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;

            // Draw the sand particle
            ctx.fillStyle = sandColor;
            ctx.globalAlpha = particle.opacity * intensity;

            // Create elongated particle for sand/dust effect
            ctx.beginPath();
            ctx.ellipse(
                particle.x,
                particle.y,
                particle.size * 2, // Horizontal radius
                particle.size, // Vertical radius
                0, // Rotation
                0,
                Math.PI * 2
            );
            ctx.fill();
        });
        ctx.restore();

        // Add a subtle sand overlay across the screen
        const overlayIntensity = intensity * 0.15 * windPulse;
        ctx.fillStyle = `${sandColor}${Math.floor(overlayIntensity * 255).toString(16).padStart(2, '0')}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Hieroglyph Glow effect
    if (specific?.hieroglyphGlow?.enabled) {
        const glowSettings = specific.hieroglyphGlow;
        const intensity = glowSettings?.intensity || 0.6;
        const glowColor = glowSettings?.color || '#ffcc00';

        // Calculate the reel area dimensions
        const SYMBOL_SIZE = 100;
        const REEL_COUNT = 5;
        const VISIBLE_ROWS = 3;

        const reelWidth = SYMBOL_SIZE;
        const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
        const startX = reelSpacing;
        const startY = 100;
        const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;
        const totalWidth = REEL_COUNT * reelWidth + (REEL_COUNT - 1) * reelSpacing;

        // Define Egyptian hieroglyphs as small path commands
        const hieroglyphs = [
            // Ankh symbol
            (x, y, size) => {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x, y + size * 0.7);
                ctx.moveTo(x - size * 0.3, y + size * 0.3);
                ctx.lineTo(x + size * 0.3, y + size * 0.3);
                ctx.moveTo(x, y - size * 0.2);
                ctx.arc(x, y, size * 0.2, 0, Math.PI * 2);
                ctx.stroke();
            },
            // Eye of Horus simplified
            (x, y, size) => {
                ctx.beginPath();
                ctx.moveTo(x - size * 0.3, y);
                ctx.quadraticCurveTo(x, y - size * 0.2, x + size * 0.3, y);
                ctx.quadraticCurveTo(x, y + size * 0.2, x - size * 0.3, y);
                ctx.moveTo(x, y);
                ctx.lineTo(x + size * 0.2, y + size * 0.2);
                ctx.stroke();
            },
            // Pyramid symbol
            (x, y, size) => {
                ctx.beginPath();
                ctx.moveTo(x - size * 0.3, y + size * 0.2);
                ctx.lineTo(x, y - size * 0.3);
                ctx.lineTo(x + size * 0.3, y + size * 0.2);
                ctx.closePath();
                ctx.stroke();
            },
            // Sun disc
            (x, y, size) => {
                ctx.beginPath();
                ctx.arc(x, y, size * 0.15, 0, Math.PI * 2);
                ctx.moveTo(x - size * 0.3, y);
                ctx.lineTo(x + size * 0.3, y);
                ctx.moveTo(x, y - size * 0.3);
                ctx.lineTo(x, y + size * 0.3);
                ctx.stroke();
            },
            // Wave pattern (water)
            (x, y, size) => {
                ctx.beginPath();
                ctx.moveTo(x - size * 0.3, y);
                ctx.quadraticCurveTo(x - size * 0.15, y - size * 0.2, x, y);
                ctx.quadraticCurveTo(x + size * 0.15, y + size * 0.2, x + size * 0.3, y);
                ctx.stroke();
            }
        ];

        // Calculate the glow pulse
        const pulseSpeed = glowSettings?.pulseSpeed || 4000;
        const pulseFactor = (Math.sin(timestamp / pulseSpeed) * 0.3 + 0.7) * intensity;

        // Draw hieroglyphs around the reels
        ctx.save();

        // Set style for hieroglyphs
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = pulseFactor;

        // Add a subtle golden glow effect behind the reels
        const centerX = startX + totalWidth / 2;
        const centerY = startY + reelViewportHeight / 2;
        const gradient = ctx.createRadialGradient(
            centerX, centerY, 10,
            centerX, centerY, totalWidth / 1.5
        );
        gradient.addColorStop(0, `${glowColor}${Math.floor(pulseFactor * 30).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw hieroglyphs along the borders
        const hieroglyphSize = 20;
        const spacing = 50; // Distance between hieroglyphs

        // Draw hieroglyphs at the top
        for (let x = hieroglyphSize; x < canvas.width; x += spacing) {
            const index = Math.floor(x / spacing) % hieroglyphs.length;
            hieroglyphs[index](x, hieroglyphSize, hieroglyphSize);
        }

        // Draw hieroglyphs at the bottom
        for (let x = hieroglyphSize + spacing / 2; x < canvas.width; x += spacing) {
            const index = Math.floor(x / spacing) % hieroglyphs.length;
            hieroglyphs[index](x, canvas.height - hieroglyphSize, hieroglyphSize);
        }

        // Draw hieroglyphs on the left
        for (let y = hieroglyphSize * 2; y < canvas.height - hieroglyphSize; y += spacing) {
            const index = Math.floor(y / spacing) % hieroglyphs.length;
            hieroglyphs[index](hieroglyphSize, y, hieroglyphSize);
        }

        // Draw hieroglyphs on the right
        for (let y = hieroglyphSize * 2 + spacing / 2; y < canvas.height - hieroglyphSize; y += spacing) {
            const index = Math.floor(y / spacing) % hieroglyphs.length;
            hieroglyphs[index](canvas.width - hieroglyphSize, y, hieroglyphSize);
        }

        ctx.restore();
    }
}
/**
     * Renders the Fantasy Forest Epic Win Animation.
     * Assumes this is called repeatedly within an animation loop.
     * Manages internal state like particle positions and image loading.
     *
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     * @param {number} elapsedTime - Total time elapsed since animation start (ms).
     * @param {number} deltaTime - Time elapsed since last frame (ms).
     * @param {number} winAmount - The final amount won for display.
     * @returns {boolean} - true if animation is still playing, false if complete.
     */
export function renderEpicWinAnimation(ctx, canvas, elapsedTime, deltaTime, winAmount) {
    const config = AncientEgyptTheme.visualEffects.themeSpecific.epicWinAnimation;
    const duration = config.duration;
    const progress = Math.min(1.0, elapsedTime / duration); // Ensure progress doesn't exceed 1

    // --- Background ---
    const bgPath = `images/${AncientEgyptTheme.name.toLowerCase()}/epic_bg.jpg`;

    // Initiate loading if not already started
    if (!config._bgLoadInitiated) {
        config._bgLoadInitiated = true;
        // Initialize gold particles storage
        config._particles = [];
        config._particlesInitialized = false;
        // Use async loading but don't block rendering
        EffectsHelper.loadImage(bgPath).then(img => {
            config._backgroundImage = img; // Store loaded image (or null if failed)
        }).catch(() => { // Catch potential promise rejection just in case
            config._backgroundImage = null;
        });
    }

    ctx.save();        // Draw background image if loaded, otherwise draw fallback
    if (config._backgroundImage) {
        // Ensure the image covers the entire canvas while maintaining aspect ratio
        const imgWidth = config._backgroundImage.width;
        const imgHeight = config._backgroundImage.height;
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = imgWidth / imgHeight;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;

        // Calculate dimensions to cover the entire canvas
        if (canvasRatio > imgRatio) {
            // Canvas is wider than image aspect ratio
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            // Canvas is taller than image aspect ratio
            drawHeight = canvas.height;
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
        }

        // Draw the image to cover the entire canvas
        ctx.drawImage(config._backgroundImage, offsetX, offsetY, drawWidth, drawHeight);
    } else {
        // Fallback gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a472a'); // Dark deep green
        gradient.addColorStop(0.5, '#2e7d32'); // Forest green
        gradient.addColorStop(1, '#1b5e20'); // Darker base green
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Optionally draw text indicating loading state if desired
        // ctx.fillStyle = "white"; ctx.fillText("Loading background...", canvas.width/2, canvas.height/2);
    }        // We'll move the gold particles rendering to the end to ensure they're on top of everything// --- Title Text ---
    const titleText = config.name || "EPIC WIN";
    const titleBaseSize = Math.min(canvas.width / 15, 100); // Increased base size (was /10, 70)
    const titlePulse = Math.sin(elapsedTime / 300) * (titleBaseSize * 0.1); // Increased pulse effect
    const titleSize = titleBaseSize + titlePulse;
    const titleY = titleSize + 50;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `900 ${titleSize}px 'Papyrus', fantasy, cursive`; // Bolder font weight (900 instead of bold)

    // Enhanced glowing effect
    ctx.shadowColor = '#dddddd'; // Brighter yellow-gold glow
    ctx.shadowBlur = 30 + Math.sin(elapsedTime / 250) * 15; // Increased glow intensity & variation        // Bright yellow text gradient fill
    const titleGradient = ctx.createLinearGradient(
        canvas.width / 2 - 200, titleY,
        canvas.width / 2 + 200, titleY
    );
    titleGradient.addColorStop(0, '#ffffFF'); // Bright yellow
    titleGradient.addColorStop(0.3, '#ffffFF'); // Slightly lighter yellow
    titleGradient.addColorStop(0.7, '#ffffFF'); // Bright yellow again
    titleGradient.addColorStop(1, '#ffff66'); // Light yellow with a slight hint of gold
    ctx.fillStyle = titleGradient;

    // Optional: Gentle rocking motion
    const titleRock = Math.sin(elapsedTime / 500) * 0.02; // Radians for rotation
    ctx.save();
    ctx.translate(canvas.width / 2, titleY);
    ctx.rotate(titleRock);
    ctx.fillText(titleText, 0, 0);
    // Optional outline for better contrast
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeText(titleText, 0, 0);
    ctx.restore(); // Restore rotation/translation


    // --- Win Amount Text ---        const amountY = canvas.height * 0.6;
    const amountBaseSize = Math.min(canvas.width / 12, 60);
    const countUpDuration = duration * 0.6; // Spend 60% of time counting up

    let displayAmount = 0;
    if (elapsedTime < countUpDuration) {
        // Fast, non-linear count-up (ease-out)
        const countProgress = elapsedTime / countUpDuration;
        const easedProgress = 1 - Math.pow(1 - countProgress, 3); // Cubic ease-out
        displayAmount = winAmount * easedProgress;
    } else {
        displayAmount = winAmount; // Hold final amount
    }        // Ensure we're using the passed win amount parameter, not a constant
    // Format amount (e.g., with commas and 2 decimal places)
    const formattedAmount = displayAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });        // Size pulse when amount reaches final value
    let amountSize = amountBaseSize;
    let amountShakeX = 0;
    let amountShakeY = 0;
    let amountY = canvas.height / 2; // Position text vertically centered
    const shakeIntensity = 3;

    if (elapsedTime >= countUpDuration) {
        amountSize = amountBaseSize * (1 + Math.sin((elapsedTime - countUpDuration) / 150) * 0.1); // Pulse size
    } else {
        // Shake effect while counting
        amountShakeX = (Math.random() - 0.5) * shakeIntensity;
        amountShakeY = (Math.random() - 0.5) * shakeIntensity;
    }


    ctx.font = `bold ${amountSize}px 'Arial', sans-serif`;
    ctx.fillStyle = '#ffffff'; // White for contrast
    ctx.shadowColor = '#000000'; // Black shadow for readability
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillText(formattedAmount, canvas.width / 2 + amountShakeX, amountY + amountShakeY);
    // Optional: Add currency symbol (e.g., '$')
    // const currencySymbol = "$";
    // ctx.fillText(currencySymbol + formattedAmount, canvas.width / 2 + amountShakeX, amountY + amountShakeY);        // --- Gold Particles rendering at the very end (on top of everything) ---
    if (config.goldParticles) {

        const particleCount = 150; // More particles for an epic feel
        const particleBaseSpeed = canvas.height / 3000; // Speed relative to canvas height/time

        // Initialize particles once
        if (!config._particlesInitialized) {
            config._particles = [];
            for (let i = 0; i < particleCount; i++) {
                config._particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * -canvas.height, // Start above the screen
                    size: Math.random() * 8 + 4, // Coin size range
                    speedY: (Math.random() * 0.5 + 0.75) * particleBaseSpeed * 1000, // Base speed + variation (in pixels/sec)
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.1 * (Math.PI / 180) * 1000, // degrees/sec
                    swaySpeed: Math.random() * 1.0 + 0.5, // Sway frequency
                    swayAmplitude: Math.random() * 15 + 5, // Sway distance
                    initialX: Math.random() * canvas.width // Store initial X for reset
                });
            }
            config._particlesInitialized = true;
        }

        // Make sure we're drawing on top of everything
        ctx.save();
        // Update and draw particles
        ctx.fillStyle = '#ffd700'; // Gold color
        ctx.shadowColor = 'rgba(255, 215, 0, 0.6)'; // Gold glow
        ctx.shadowBlur = 10;

        config._particles.forEach(p => {
            // Update position based on deltaTime for smoother animation
            const dtSec = deltaTime / 1000.0;
            p.y += p.speedY * dtSec;
            p.rotation += p.rotationSpeed * dtSec;
            // Add horizontal sway based on elapsed time
            p.x = p.initialX + Math.sin(elapsedTime / 1000 * p.swaySpeed) * p.swayAmplitude;

            // Reset particle if it falls off the bottom
            if (p.y > canvas.height + p.size) {
                p.y = -p.size * 2; // Reset above the screen
                p.initialX = Math.random() * canvas.width; // New random horizontal start
                p.x = p.initialX;
            }

            // Draw coin (simple circle)
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);

            // Simple gradient for a bit of depth
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size / 2);
            grad.addColorStop(0, '#fff8dc'); // Lighter center (Cornsilk)
            grad.addColorStop(0.7, '#ffd700'); // Gold
            grad.addColorStop(1, '#b8860b'); // Darker edge (DarkGoldenrod)
            ctx.fillStyle = grad;

            ctx.fill();
            ctx.restore();
        });
        ctx.shadowColor = 'transparent'; // Reset shadow
        ctx.shadowBlur = 0;
        ctx.restore();
    }

    ctx.restore(); // Restore context state from the beginning

    // Return true if animation is ongoing, false if finished
    return progress < 1.0;
}

export default {
    renderThemeEffects,
    renderEpicWinAnimation
};
