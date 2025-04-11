// filepath: c:\projects\copilot-agent\slot-game\themes\fantasy-forest.js
import { EffectPresets } from './effects.js';

export const FantasyForestTheme = {
    name: "FantasyForest",
    visualEffects: {
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
            }
        }
    },
    symbols: [
        // Theme: Magic, Creatures, Nature. Higher top multiplier for a more volatile feel.
        { name: "Dragon Head", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23004d40'/%3E%3Cpath d='M80 30 C 100 40, 100 70, 80 90 L 40 90 C 20 70, 30 40, 40 35 Q 60 25 80 30 Z' fill='%23d32f2f'/%3E%3Cpolygon points='80 30, 85 20, 90 30' fill='%23ffc107'/%3E%3Cpolygon points='75 35, 80 25, 85 35' fill='%23ffc107'/%3E%3Cpath d='M50 70 Q 60 75 70 70' stroke='white' stroke-width='3' fill='none'/%3E%3Ccircle cx='75' cy='50' r='5' fill='yellow'/%3E%3C/svg%3E", multiplier: 15, winAnimation: { frames: 8, currentFrame: 0, frameRate: 95 } },
        { name: "Magic Potion", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23311b92'/%3E%3Cpath d='M50 30 h 20 v 20 L 80 50 C 80 70, 75 85, 60 95 C 45 85, 40 70, 40 50 L 50 50 Z' fill='%23ede7f6' stroke='%23b39ddb' stroke-width='3'/%3E%3Cpath d='M45 55 Q 60 65 75 55 V 90 Q 60 92 45 90 Z' fill='%237e57c2' opacity='0.8'/%3E%3Ccircle cx='55' cy='70' r='3' fill='white' opacity='0.7'/><circle cx='65' cy='80' r='2' fill='white' opacity='0.7'/><circle cx='60' cy='60' r='4' fill='white' opacity='0.7'/><rect x='48' y='25' width='24' height='5' fill='%23795548'/><path d='M50 30 Q 60 20 70 30' stroke='%23795548' stroke-width='3' fill='none'/></svg%3E", multiplier: 7, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Elf Bow", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231b5e20'/%3E%3Cpath d='M40 20 Q 80 60 40 100' stroke='%23795548' stroke-width='8' fill='none'/%3E%3Cpath d='M40 20 L 40 100' stroke='%23bdbdbd' stroke-width='3'/%3E%3Cpath d='M40 60 L 60 60 L 85 55 L 80 60 L 85 65 Z' fill='%23ffeb3b' stroke='%23795548' stroke-width='2'/%3E%3C/svg%3E", multiplier: 5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Glowing Mushroom", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%233e2723'/%3E%3Cpath d='M40 70 Q 60 40 80 70 Z' fill='%2300e676'/%3E%3Crect x='55' y='70' width='10' height='30' fill='%23e0e0e0'/%3E%3Ccircle cx='50' cy='60' r='5' fill='white' opacity='0.8'/><circle cx='70' cy='60' r='5' fill='white' opacity='0.8'/><circle cx='60' cy='50' r='5' fill='white' opacity='0.8'/></svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Ancient Rune", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23455a64'/%3E%3Crect x='35' y='35' width='50' height='50' rx='5' ry='5' fill='%2390a4ae'/%3E%3Cpath d='M50 50 L 70 50 L 60 70 L 70 90 M 60 70 L 50 90' stroke='%23263238' stroke-width='6' fill='none'/%3E%3C/svg%3E", multiplier: 1, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ],
    // Renderer for Fantasy Forest theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Floating Leaves effect
        if (specific?.floatingLeaves?.enabled) {
            const leafSettings = specific.floatingLeaves;
            const count = leafSettings?.count || 15;
            const rotationSpeed = leafSettings?.rotationSpeed || 2;
            const fallSpeed = leafSettings?.fallSpeed || { min: 1, max: 3 };
            const colors = leafSettings?.colors || ['#8bc34a', '#4caf50', '#cddc39'];

            // Initialize leaves if they don't exist
            if (!ctx.forestLeaves) {
                ctx.forestLeaves = [];
                for (let i = 0; i < count; i++) {
                    ctx.forestLeaves.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        size: Math.random() * 15 + 10,
                        rotation: Math.random() * Math.PI * 2,
                        rotationSpeed: (Math.random() * 0.5 + 0.5) * rotationSpeed * 0.01,
                        fallSpeed: Math.random() * (fallSpeed.max - fallSpeed.min) + fallSpeed.min,
                        swayFactor: Math.random() * 2 + 1,
                        swayOffset: Math.random() * Math.PI * 2,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        type: Math.floor(Math.random() * 3) // Different leaf shapes
                    });
                }
            }

            // Update and draw each leaf
            ctx.save();
            ctx.forestLeaves.forEach(leaf => {
                // Update position - falling with gentle sway
                leaf.y += leaf.fallSpeed;
                leaf.x += Math.sin((timestamp / 2000) + leaf.swayOffset) * leaf.swayFactor * 0.3;
                leaf.rotation += leaf.rotationSpeed;

                // Reset if off screen
                if (leaf.y > canvas.height + leaf.size) {
                    leaf.y = -leaf.size;
                    leaf.x = Math.random() * canvas.width;
                    leaf.rotation = Math.random() * Math.PI * 2;
                }

                // Keep leaves within horizontal bounds
                if (leaf.x > canvas.width + leaf.size) leaf.x = -leaf.size;
                if (leaf.x < -leaf.size) leaf.x = canvas.width + leaf.size;

                // Draw leaf
                ctx.save();
                ctx.translate(leaf.x, leaf.y);
                ctx.rotate(leaf.rotation);

                // Draw different leaf types based on the leaf.type value
                switch (leaf.type) {
                    case 0: // Simple oval leaf
                        ctx.fillStyle = leaf.color;
                        ctx.beginPath();
                        ctx.ellipse(0, 0, leaf.size / 2, leaf.size, 0, 0, Math.PI * 2);
                        ctx.fill();

                        // Add vein
                        ctx.strokeStyle = `${leaf.color}99`; // Semi-transparent version of color
                        ctx.beginPath();
                        ctx.moveTo(0, -leaf.size);
                        ctx.lineTo(0, leaf.size);
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;

                    case 1: // Maple-like leaf
                        ctx.fillStyle = leaf.color;
                        ctx.beginPath();
                        ctx.moveTo(0, -leaf.size);
                        ctx.bezierCurveTo(leaf.size / 2, -leaf.size / 2, leaf.size / 2, leaf.size / 2, 0, leaf.size);
                        ctx.bezierCurveTo(-leaf.size / 2, leaf.size / 2, -leaf.size / 2, -leaf.size / 2, 0, -leaf.size);
                        ctx.fill();
                        break;

                    case 2: // Round leaf with stem
                    default:
                        // Draw stem
                        ctx.strokeStyle = '#795548';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(0, leaf.size / 2);
                        ctx.lineTo(0, leaf.size);
                        ctx.stroke();

                        // Draw leaf
                        ctx.fillStyle = leaf.color;
                        ctx.beginPath();
                        ctx.arc(0, 0, leaf.size / 2, 0, Math.PI * 2);
                        ctx.fill();

                        // Draw veins
                        ctx.strokeStyle = `${leaf.color}99`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(0, -leaf.size / 2);
                        ctx.lineTo(0, leaf.size / 2);
                        ctx.moveTo(-leaf.size / 2, 0);
                        ctx.lineTo(leaf.size / 2, 0);
                        ctx.stroke();
                        break;
                }

                ctx.restore();
            });
            ctx.restore();
        }

        // Fireflies effect
        if (specific?.fireflies?.enabled) {
            const fireflySettings = specific.fireflies;
            const count = fireflySettings?.count || 20;
            const baseColor = fireflySettings?.color || '#ffeb3b';
            const blinkRate = fireflySettings?.blinkRate || { min: 500, max: 2000 };
            const speed = fireflySettings?.speed || { min: 0.2, max: 1 };

            // Initialize fireflies if they don't exist
            if (!ctx.forestFireflies) {
                ctx.forestFireflies = [];
                for (let i = 0; i < count; i++) {
                    // Create random starting positions, avoiding the center reel area
                    let x, y;

                    // Distribute fireflies more around edges and less in center
                    if (Math.random() < 0.7) {
                        // Place near edges
                        if (Math.random() < 0.5) {
                            // Left or right edge
                            x = Math.random() < 0.5 ?
                                Math.random() * canvas.width * 0.3 : // Left 30%
                                canvas.width - (Math.random() * canvas.width * 0.3); // Right 30%
                            y = Math.random() * canvas.height;
                        } else {
                            // Top or bottom edge
                            x = Math.random() * canvas.width;
                            y = Math.random() < 0.5 ?
                                Math.random() * canvas.height * 0.3 : // Top 30%
                                canvas.height - (Math.random() * canvas.height * 0.3); // Bottom 30%
                        }
                    } else {
                        // Place anywhere else
                        x = Math.random() * canvas.width;
                        y = Math.random() * canvas.height;
                    }

                    // Create the firefly
                    ctx.forestFireflies.push({
                        x: x,
                        y: y,
                        size: Math.random() * 3 + 2,
                        speedX: (Math.random() - 0.5) * (speed.max - speed.min) + speed.min,
                        speedY: (Math.random() - 0.5) * (speed.max - speed.min) + speed.min,
                        blinkRate: Math.random() * (blinkRate.max - blinkRate.min) + blinkRate.min,
                        phase: Math.random() * Math.PI * 2, // Random starting phase
                        baseColor: baseColor,
                        wanderAngle: Math.random() * Math.PI * 2,
                        wanderSpeed: Math.random() * 0.02 + 0.005
                    });
                }
            }

            // Update and draw each firefly
            ctx.save();
            ctx.globalCompositeOperation = 'lighter'; // For a nice glow effect

            ctx.forestFireflies.forEach(firefly => {
                // Update firefly movement with random wandering
                firefly.wanderAngle += (Math.random() - 0.5) * 0.2;

                // Calculate movement vector
                firefly.x += Math.cos(firefly.wanderAngle) * firefly.speedX;
                firefly.y += Math.sin(firefly.wanderAngle) * firefly.speedY;

                // Wrap around edges
                if (firefly.x > canvas.width) firefly.x = 0;
                if (firefly.x < 0) firefly.x = canvas.width;
                if (firefly.y > canvas.height) firefly.y = 0;
                if (firefly.y < 0) firefly.y = canvas.height;

                // Calculate blink intensity based on time and individual blink rate
                const blinkIntensity = (Math.sin((timestamp / firefly.blinkRate) + firefly.phase) * 0.5 + 0.5);

                // Only draw if visible
                if (blinkIntensity > 0.1) {
                    // Create gradient for glow effect
                    const gradient = ctx.createRadialGradient(
                        firefly.x, firefly.y, 0,
                        firefly.x, firefly.y, firefly.size * 2
                    );

                    // Inner color (bright)
                    gradient.addColorStop(0, `${firefly.baseColor}${Math.floor(blinkIntensity * 255).toString(16).padStart(2, '0')}`);
                    // Outer glow (transparent)
                    gradient.addColorStop(1, `${firefly.baseColor}00`);

                    // Draw the firefly glow
                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(firefly.x, firefly.y, firefly.size * 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw the bright center
                    ctx.fillStyle = 'rgba(255, 255, 255, ' + blinkIntensity * 0.7 + ')';
                    ctx.beginPath();
                    ctx.arc(firefly.x, firefly.y, firefly.size * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            ctx.restore();
        }

        // Add a magical forest glow effect
        const sunbeamEffect = timestamp => {
            // Create dappled sunlight effect through trees
            ctx.save();

            // Set up composite operation for light effect
            ctx.globalCompositeOperation = 'lighter';

            // Create several light beams
            for (let i = 0; i < 3; i++) {
                // Position light beams at different horizontal positions
                const x = (canvas.width / 4) * (i + 1);

                // Create gradient from top (light source) to bottom (fade out)
                const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);

                // Pulsing intensity based on time, different phase for each beam
                const intensity = Math.sin(timestamp / 5000 + i * Math.PI / 3) * 0.3 + 0.7; // 0.4 to 1.0

                // Make light beams semi-transparent
                const alpha = 0.15 * intensity;

                gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`);
                gradient.addColorStop(0.7, `rgba(255, 255, 150, ${alpha / 2})`);
                gradient.addColorStop(1, 'rgba(255, 255, 100, 0)');

                // Draw a light beam cone
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.moveTo(x, 0); // Top center point
                ctx.lineTo(x - 100 * intensity, canvas.height); // Bottom left
                ctx.lineTo(x + 100 * intensity, canvas.height); // Bottom right
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        };

        // Apply the sunbeam effect
        sunbeamEffect(timestamp);
    }
};
