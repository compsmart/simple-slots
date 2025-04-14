// filepath: c:\projects\copilot-agent\slot-game\themes\fantasy-forest.js
import { EffectPresets } from './effects.js';

// Simple cache for loaded images to avoid reloading
const imageCache = {};

async function loadImage(src) {
    if (imageCache[src]) {
        if (imageCache[src] instanceof Promise) {
            // If loading is in progress, wait for it
            return imageCache[src];
        }
        // If already loaded (or failed), return the result
        return imageCache[src];
    }

    // Start loading
    const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            imageCache[src] = img; // Cache the loaded image object
            resolve(img);
        };
        img.onerror = (err) => {
            console.error(`Failed to load image: ${src}`, err);
            imageCache[src] = null; // Cache the failure
            resolve(null); // Resolve with null on error
        };
        img.src = src;
    });

    imageCache[src] = promise; // Cache the promise while loading
    return promise;
}


export const FantasyForestTheme = {
    name: "FantasyForest",
    visualEffects: {
        // ... (other visual effects properties remain the same) ...
        ...EffectPresets.magical,
        intensity: 0.85,
        neonGlow: {
            enabled: false,
            color: '#4caf50',
            size: 12,
            pulseSpeed: 1500,
            intensity: 0.75
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
                count: 70,
                color: '#8bc34a',
                size: { min: 1, max: 4 }
            },
            pulse: {
                enabled: false,
                color: '#1b5e20',
                speed: 3000,
                intensity: 0.5
            }
        },
        winEffects: {
            enabled: true,           // Special effects for wins
            explosions: false,        // Explosive particle effects on wins
            shockwave: false,         // Shockwave effect
            flashingSymbols: true,   // Make winning symbols flash
            spinEffect3d: {
                enabled: false,       // 3D rotation effect on win
                rotations: 1,        // Number of full rotations
                duration: 1000,      // Duration in ms
                easing: 'easeOutBack'// Easing function
            }
        },
        themeSpecific: {
            floatingLeaves: {
                enabled: true,
                count: 15,
                rotationSpeed: 2,
                fallSpeed: { min: 1, max: 3 },
                colors: ['#8bc34a', '#4caf50', '#cddc39']
            },
            fireflies: {
                enabled: true,
                count: 20,
                color: '#ffeb3b',
                blinkRate: { min: 500, max: 2000 },
                speed: { min: 0.2, max: 1 }
            },
            epicWinAnimation: {
                enabled: true,
                name: "Forest Fortune!",
                duration: 5800, // 5.8 seconds
                goldParticles: true,
                // Internal state managed by the renderer
                _backgroundImage: null,
                _particles: [],
                _particlesInitialized: false,
                _bgLoadInitiated: false,
            }
        }
    },
    symbols: [
        // ... (symbols array remains the same) ...
        {
            name: "Dragon Head",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23004d40'/%3E%3Cpath d='M80 30 C 100 40, 100 70, 80 90 L 40 90 C 20 70, 30 40, 40 35 Q 60 25 80 30 Z' fill='%23d32f2f'/%3E%3Cpolygon points='80 30, 85 20, 90 30' fill='%23ffc107'/%3E%3Cpolygon points='75 35, 80 25, 85 35' fill='%23ffc107'/%3E%3Cpath d='M50 70 Q 60 75 70 70' stroke='white' stroke-width='3' fill='none'/%3E%3Ccircle cx='75' cy='50' r='5' fill='yellow'/%3E%3C/svg%3E",
            backgroundColor: "#004d40",
            multiplier: 15,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 95 }
        },
        {
            name: "Magic Potion",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23311b92'/%3E%3Cpath d='M50 30 h 20 v 20 L 80 50 C 80 70, 75 85, 60 95 C 45 85, 40 70, 40 50 L 50 50 Z' fill='%23ede7f6' stroke='%23b39ddb' stroke-width='3'/%3E%3Cpath d='M45 55 Q 60 65 75 55 V 90 Q 60 92 45 90 Z' fill='%237e57c2' opacity='0.8'/%3E%3Ccircle cx='55' cy='70' r='3' fill='white' opacity='0.7'/><circle cx='65' cy='80' r='2' fill='white' opacity='0.7'/><circle cx='60' cy='60' r='4' fill='white' opacity='0.7'/><rect x='48' y='25' width='24' height='5' fill='%23795548'/><path d='M50 30 Q 60 20 70 30' stroke='%23795548' stroke-width='3' fill='none'/></svg%3E",
            backgroundColor: "#311b92",
            multiplier: 7,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 }
        },
        {
            name: "Elf Bow",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231b5e20'/%3E%3Cpath d='M40 20 Q 80 60 40 100' stroke='%23795548' stroke-width='8' fill='none'/%3E%3Cpath d='M40 20 L 40 100' stroke='%23bdbdbd' stroke-width='3'/%3E%3Cpath d='M40 60 L 60 60 L 85 55 L 80 60 L 85 65 Z' fill='%23ffeb3b' stroke='%23795548' stroke-width='2'/%3E%3C/svg%3E",
            backgroundColor: "#1b5e20",
            multiplier: 5,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 }
        },
        {
            name: "Glowing Mushroom",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%233e2723'/%3E%3Cpath d='M40 70 Q 60 40 80 70 Z' fill='%2300e676'/%3E%3Crect x='55' y='70' width='10' height='30' fill='%23e0e0e0'/%3E%3Ccircle cx='50' cy='60' r='5' fill='white' opacity='0.8'/><circle cx='70' cy='60' r='5' fill='white' opacity='0.8'/><circle cx='60' cy='50' r='5' fill='white' opacity='0.8'/></svg%3E",
            backgroundColor: "#3e2723",
            multiplier: 3,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 }
        },
        {
            name: "Ancient Rune",
            path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23455a64'/%3E%3Crect x='35' y='35' width='50' height='50' rx='5' ry='5' fill='%2390a4ae'/%3E%3Cpath d='M50 50 L 70 50 L 60 70 L 70 90 M 60 70 L 50 90' stroke='%23263238' stroke-width='6' fill='none'/%3E%3C/svg%3E",
            backgroundColor: "#455a64",
            multiplier: 1,
            winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 }
        }
    ],
    // Renderer for Fantasy Forest theme-specific effects (including triggering epic win)
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Call the epic win animation renderer if it's supposed to be playing
        // Note: The logic to *start* the epic win animation (setting isPlayingEpicWinAnimation = true,
        // epicWinStartTime = timestamp, and providing the winAmount) should happen elsewhere,
        // likely in the main game loop when a large win is detected.
        // This function *only renders* if the state indicates it should.
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            // Assume window.epicWinStartTime and window.currentWinAmount are set externally
            const elapsedTime = timestamp - (window.epicWinStartTime || timestamp);
            const deltaTime = timestamp - (window.lastFrameTime || timestamp); // Requires lastFrameTime to be tracked globally
            const winAmount = window.currentWinAmount || 0; // Get win amount from global state

            // Call the dedicated epic win renderer
            const stillPlaying = FantasyForestTheme.renderEpicWinAnimation(
                ctx,
                canvas,
                elapsedTime,
                deltaTime || 16.67, // Provide a fallback delta
                winAmount
            );

            if (!stillPlaying) {
                window.isPlayingEpicWinAnimation = false; // Stop the animation
                // Optional: Reset internal state if needed for next time
                const epicWin = specific.epicWinAnimation;
                epicWin._particlesInitialized = false;
                epicWin._particles = [];
                // Keep background loaded status if you want to reuse it quickly
            }
            // Prevent other theme effects from drawing over the epic win
            return;
        }

        // --- Normal Theme Effects (Floating Leaves, Fireflies, etc.) ---
        // These will run when the epic win animation is *not* playing.

        // Floating Leaves effect (copied from your original code)
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

        // Add a magical forest glow effect (copied from your original code)
        const sunbeamEffect = timestamp => { /* ... sunbeam logic ... */
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < 3; i++) {
                const x = (canvas.width / 4) * (i + 1);
                const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
                const intensity = Math.sin(timestamp / 5000 + i * Math.PI / 3) * 0.3 + 0.7;
                const alpha = 0.15 * intensity;
                gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`);
                gradient.addColorStop(0.7, `rgba(255, 255, 150, ${alpha / 2})`);
                gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');
                ctx.fillStyle = gradient;
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 100 * intensity, canvas.height); ctx.lineTo(x + 100 * intensity, canvas.height); ctx.closePath(); ctx.fill();
            }
            ctx.restore();
        };
        sunbeamEffect(timestamp);
    },

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
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime, winAmount) => {
        const config = FantasyForestTheme.visualEffects.themeSpecific.epicWinAnimation;
        const duration = config.duration;
        const progress = Math.min(1.0, elapsedTime / duration); // Ensure progress doesn't exceed 1

        // --- Background ---
        const bgPath = `images/${FantasyForestTheme.name.toLowerCase()}/epic_bg.jpg`;

        // Initiate loading if not already started
        if (!config._bgLoadInitiated) {
            config._bgLoadInitiated = true;
            // Use async loading but don't block rendering
            loadImage(bgPath).then(img => {
                config._backgroundImage = img; // Store loaded image (or null if failed)
            }).catch(() => { // Catch potential promise rejection just in case
                config._backgroundImage = null;
            });
        }

        ctx.save();

        // Draw background image if loaded, otherwise draw fallback
        if (config._backgroundImage) {
            ctx.drawImage(config._backgroundImage, 0, 0, canvas.width, canvas.height);
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
        }

        // --- Gold Particles (Optional) ---
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
        }


        // --- Title Text ---
        const titleText = config.name || "EPIC WIN";
        const titleBaseSize = Math.min(canvas.width / 10, 70); // Responsive base size
        const titlePulse = Math.sin(elapsedTime / 300) * (titleBaseSize * 0.08); // Pulsing size
        const titleSize = titleBaseSize + titlePulse;
        const titleY = canvas.height * 0.35;

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `bold ${titleSize}px 'Papyrus', fantasy, cursive`; // Fantasy font

        // Glowing effect
        ctx.shadowColor = '#ffcc00'; // Bright yellow-gold glow
        ctx.shadowBlur = 20 + Math.sin(elapsedTime / 250) * 10; // Pulsating glow intensity

        // Text gradient fill
        const titleGradient = ctx.createLinearGradient(
            canvas.width / 2 - 200, titleY,
            canvas.width / 2 + 200, titleY
        );
        titleGradient.addColorStop(0, '#ffffcc'); // Pale yellow
        titleGradient.addColorStop(0.5, '#ffd700'); // Gold
        titleGradient.addColorStop(1, '#ffec8b'); // Light goldenrod
        ctx.fillStyle = titleGradient;

        // Optional: Gentle rocking motion
        const titleRock = Math.sin(elapsedTime / 500) * 0.02; // Radians for rotation
        ctx.save();
        ctx.translate(canvas.width / 2, titleY);
        ctx.rotate(titleRock);
        ctx.fillText(titleText, 0, 0);
        // Optional outline for better contrast
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.strokeText(titleText, 0, 0);
        ctx.restore(); // Restore rotation/translation


        // --- Win Amount Text ---
        const amountY = canvas.height * 0.6;
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
        }

        // Format amount (e.g., with commas and 2 decimal places)
        const formattedAmount = displayAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        // Size pulse when amount reaches final value
        let amountSize = amountBaseSize;
        let amountShakeX = 0;
        let amountShakeY = 0;
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
        // ctx.fillText(currencySymbol + formattedAmount, canvas.width / 2 + amountShakeX, amountY + amountShakeY);


        ctx.restore(); // Restore context state from the beginning

        // Return true if animation is ongoing, false if finished
        return progress < 1.0;
    }
};