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
        }, themeSpecific: {
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
                name: "Enchanted Victory",
                duration: 8000, // 5.8 seconds
                fairyDust: true,
                magicTreeGrowth: true,
                flyingCreatures: true
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
    ],    // Renderer for Fantasy Forest theme-specific effects
    renderThemeEffects: (ctx, canvas, timestamp, specific) => {
        // Epic Win Animation for Fantasy Forest theme
        if (specific?.epicWinAnimation?.enabled && window.isPlayingEpicWinAnimation) {
            const epicWin = specific.epicWinAnimation;
            const progress = Math.min(1, (timestamp - window.epicWinStartTime) / epicWin.duration);

            ctx.save();

            // Magical Tree Growth animation
            if (epicWin.magicTreeGrowth) {
                const centerX = canvas.width / 2;
                const baseY = canvas.height + 30;
                const maxHeight = canvas.height * 0.8;
                const treeHeight = maxHeight * Math.min(1, progress * 1.5);
                const trunkWidth = 40;

                // Draw trunk
                ctx.fillStyle = '#5D4037';
                ctx.beginPath();
                ctx.moveTo(centerX - trunkWidth / 2, baseY);
                ctx.lineTo(centerX - trunkWidth / 2, baseY - treeHeight);
                ctx.lineTo(centerX + trunkWidth / 2, baseY - treeHeight);
                ctx.lineTo(centerX + trunkWidth / 2, baseY);
                ctx.closePath();
                ctx.fill();

                // Draw branches and leaves as tree grows
                if (treeHeight > maxHeight * 0.2) {
                    const branchLevels = 4;
                    for (let i = 0; i < branchLevels; i++) {
                        const branchY = baseY - treeHeight * (0.3 + i * 0.2);
                        const branchLength = 70 + i * 10;
                        const branchWidth = 10 - i * 2;
                        const branchAngle = Math.sin(timestamp / 2000) * 0.05;

                        // Left branch
                        ctx.save();
                        ctx.translate(centerX, branchY);
                        ctx.rotate(-Math.PI / 4 + branchAngle);
                        ctx.fillRect(0, -branchWidth / 2, branchLength, branchWidth);

                        // Left leaves cloud
                        if (treeHeight > maxHeight * 0.4) {
                            ctx.fillStyle = '#4CAF50';
                            ctx.beginPath();
                            ctx.arc(branchLength * 0.7, 0, 30 + i * 5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        ctx.restore();

                        // Right branch
                        ctx.save();
                        ctx.translate(centerX, branchY);
                        ctx.rotate(Math.PI / 4 - branchAngle);
                        ctx.fillStyle = '#5D4037';
                        ctx.fillRect(0, -branchWidth / 2, branchLength, branchWidth);

                        // Right leaves cloud
                        if (treeHeight > maxHeight * 0.4) {
                            ctx.fillStyle = '#4CAF50';
                            ctx.beginPath();
                            ctx.arc(branchLength * 0.7, 0, 30 + i * 5, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        ctx.restore();
                    }

                    // Draw top leaves as tree reaches full height
                    if (treeHeight > maxHeight * 0.7) {
                        const topProgress = (treeHeight - maxHeight * 0.7) / (maxHeight * 0.3);
                        ctx.fillStyle = '#4CAF50';
                        ctx.beginPath();
                        ctx.arc(centerX, baseY - treeHeight + 20, 50 * topProgress, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }

            // Fairy dust sprinkle effect
            if (epicWin.fairyDust) {
                const dustCount = 150;

                for (let i = 0; i < dustCount; i++) {
                    const t = (timestamp / 1000 + i * 0.1) % 5;
                    const dustLife = t / 5; // 0 to 1

                    // Skip if not yet visible in animation
                    if (dustLife > progress) continue;

                    const x = (Math.sin(t * 3 + i) * 0.5 + 0.5) * canvas.width;
                    const y = (Math.cos(t * 2 + i * 0.7) * 0.5 + 0.3) * canvas.height;
                    const size = Math.random() * 4 + 2;

                    // Rainbow colors for fairy dust
                    const hue = (t * 360 + i * 30) % 360;
                    const opacity = Math.sin(dustLife * Math.PI);
                    ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${opacity})`;

                    // Draw dust particle
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Add glow
                    ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${opacity * 0.6})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size * 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Connect nearby dust particles with magical trails
                    if (i % 5 === 0 && i > 0) {
                        const prevX = (Math.sin((t - 0.1) * 3 + (i - 1)) * 0.5 + 0.5) * canvas.width;
                        const prevY = (Math.cos((t - 0.1) * 2 + (i - 1) * 0.7) * 0.5 + 0.3) * canvas.height;

                        ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${opacity * 0.3})`;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(prevX, prevY);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    }
                }
            }

            // Flying magical creatures animation
            if (epicWin.flyingCreatures && progress > 0.3) {
                const creatureCount = 5;

                for (let i = 0; i < creatureCount; i++) {
                    const t = (timestamp / 3000 + i * 0.5) % 1;
                    const creatureType = i % 3; // 0: fairy, 1: butterfly, 2: small dragon

                    // Calculate position on curved path
                    const angle = Math.PI * 2 * t + i * (Math.PI / 3);
                    const x = Math.sin(angle) * canvas.width * 0.4 + canvas.width / 2;
                    const y = Math.sin(angle * 2) * canvas.height * 0.2 + canvas.height * 0.4;

                    const wingBeat = Math.sin(timestamp / 100 + i) * Math.PI / 6;
                    const size = creatureType === 2 ? 30 : 20;

                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(Math.atan2(Math.cos(angle * 2) * canvas.height * 0.2, Math.cos(angle) * canvas.width * 0.4));

                    if (creatureType === 0) { // Fairy
                        // Body
                        ctx.fillStyle = '#E1BEE7';
                        ctx.beginPath();
                        ctx.ellipse(0, 0, size / 2, size / 3, 0, 0, Math.PI * 2);
                        ctx.fill();

                        // Head
                        ctx.fillStyle = '#FFCCBC';
                        ctx.beginPath();
                        ctx.arc(size / 2 - 5, 0, size / 4, 0, Math.PI * 2);
                        ctx.fill();

                        // Wings
                        ctx.fillStyle = 'rgba(200, 230, 255, 0.7)';

                        // Wing 1
                        ctx.save();
                        ctx.rotate(wingBeat);
                        ctx.beginPath();
                        ctx.ellipse(0, -size / 3, size / 2, size, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();

                        // Wing 2
                        ctx.save();
                        ctx.rotate(-wingBeat);
                        ctx.beginPath();
                        ctx.ellipse(0, size / 3, size / 2, size, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();

                        // Sparkle trail
                        for (let j = 0; j < 5; j++) {
                            ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - j * 0.15})`;
                            ctx.beginPath();
                            ctx.arc(-j * 10, 0, 3 - j * 0.5, 0, Math.PI * 2);
                            ctx.fill();
                        }

                    } else if (creatureType === 1) { // Butterfly
                        // Body
                        ctx.fillStyle = '#795548';
                        ctx.beginPath();
                        ctx.ellipse(0, 0, size / 3, size / 2, 0, 0, Math.PI * 2);
                        ctx.fill();

                        // Wings
                        ctx.fillStyle = ['#FFEB3B', '#8BC34A', '#26A69A'][i % 3];

                        // Top wings
                        ctx.save();
                        ctx.rotate(wingBeat);
                        ctx.beginPath();
                        ctx.ellipse(-size / 6, -size / 2, size / 2, size, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();

                        // Bottom wings
                        ctx.save();
                        ctx.rotate(-wingBeat);
                        ctx.beginPath();
                        ctx.ellipse(-size / 6, size / 2, size / 3, size / 2, 0, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();

                    } else { // Small dragon
                        // Body
                        ctx.fillStyle = '#4CAF50';
                        ctx.beginPath();
                        ctx.ellipse(0, 0, size / 1.5, size / 3, 0, 0, Math.PI * 2);
                        ctx.fill();

                        // Head
                        ctx.fillStyle = '#2E7D32';
                        ctx.beginPath();
                        ctx.arc(size / 2, 0, size / 4, 0, Math.PI * 2);
                        ctx.fill();

                        // Wings
                        ctx.fillStyle = 'rgba(76, 175, 80, 0.7)';

                        // Wing 1
                        ctx.save();
                        ctx.rotate(wingBeat * 0.7);
                        ctx.beginPath();
                        ctx.moveTo(0, -size / 4);
                        ctx.lineTo(-size, -size);
                        ctx.lineTo(-size / 2, 0);
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();

                        // Wing 2
                        ctx.save();
                        ctx.rotate(-wingBeat * 0.7);
                        ctx.beginPath();
                        ctx.moveTo(0, size / 4);
                        ctx.lineTo(-size, size);
                        ctx.lineTo(-size / 2, 0);
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();

                        // Fire breath
                        if (Math.random() > 0.7) {
                            const fireLength = Math.random() * 30 + 20;
                            const gradient = ctx.createLinearGradient(size / 2, 0, size / 2 + fireLength, 0);
                            gradient.addColorStop(0, '#FF9800');
                            gradient.addColorStop(1, 'rgba(255, 152, 0, 0)');

                            ctx.fillStyle = gradient;
                            ctx.beginPath();
                            ctx.moveTo(size / 2, 0);
                            ctx.lineTo(size / 2 + fireLength, -10);
                            ctx.lineTo(size / 2 + fireLength, 10);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }

                    ctx.restore();
                }
            }

            // Big text announcement            const textProgress = Math.min(1, progress * 2);
            const textSize = 48 + Math.sin(timestamp / 200) * 6; // Reduced size and variation
            ctx.font = `bold ${textSize}px Arial, sans-serif`; // Using standard font that fits better
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text with magical gradient
            const textGradient = ctx.createLinearGradient(
                canvas.width / 2 - 200,
                canvas.height / 6,
                canvas.width / 2 + 200,
                canvas.height / 6
            );
            textGradient.addColorStop(0, '#4CAF50');
            textGradient.addColorStop(0.5, '#8BC34A');
            textGradient.addColorStop(1, '#CDDC39');

            ctx.fillStyle = textGradient;
            ctx.strokeStyle = '#1B5E20';
            ctx.lineWidth = 3;

            const scale = 0.5 + textProgress * 0.5;
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 6);
            ctx.scale(scale, scale);
            ctx.rotate(Math.sin(timestamp / 500) * 0.1);
            ctx.fillText("ENCHANTED FORTUNE!", 0, 0);
            ctx.strokeText("ENCHANTED FORTUNE!", 0, 0);
            ctx.restore();

            // Win amount
            ctx.font = 'bold 40px Arial';
            ctx.fillStyle = '#CDDC39';
            ctx.strokeStyle = '#1B5E20';
            ctx.lineWidth = 3;
            ctx.fillText(`${(window.betAmount * 150).toFixed(2)}`, canvas.width / 2, canvas.height * 0.8);
            ctx.strokeText(`${(window.betAmount * 150).toFixed(2)}`, canvas.width / 2, canvas.height * 0.8);

            ctx.restore();

            // End animation if complete
            if (progress >= 1) {
                window.isPlayingEpicWinAnimation = false;
            }
        }
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
    },
    /**
  * Renders the NEW, Graphically Enhanced Epic Fantasy Forest Win Animation.
  * Call this function from your main game loop when an epic win occurs.
  *
  * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
  * @param {HTMLCanvasElement} canvas - The canvas element.
  * @param {number} elapsedTime - Total time elapsed since animation start (ms).
  * @param {number} deltaTime - Time elapsed since last frame (ms).
  * @param {number} winAmount - The amount won for display.
  * @returns {boolean} - true if animation is still playing, false if complete.
  */
    renderEpicWinAnimation: (ctx, canvas, elapsedTime, deltaTime, winAmount) => {
        const duration = 9000; // Extended duration for richer effects (9 seconds)
        const progress = Math.min(elapsedTime / duration, 1.0);

        // --- Easing Functions ---
        const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
        const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        const easeOutBounce = t => {
            const n1 = 7.5625; const d1 = 2.75;
            if (t < 1 / d1) { return n1 * t * t; }
            else if (t < 2 / d1) { return n1 * (t -= 1.5 / d1) * t + 0.75; }
            else if (t < 2.5 / d1) { return n1 * (t -= 2.25 / d1) * t + 0.9375; }
            else { return n1 * (t -= 2.625 / d1) * t + 0.984375; }
        };

        // --- Configuration (Tune these values!) ---
        const config = {
            bgColor1: '#0a1f10', // Very dark deep green
            bgColor2: '#183820', // Mid forest green
            bgColor3: '#2a5a38', // Lighter distance green/blue tint
            treeColorBark: '#5d4037', // Base bark
            treeColorBarkHighlight: '#8d6e63', // Lighter bark for gradient
            treeColorLeaves: '#388e3c', // Base leaves
            treeColorLeavesHighlight: '#66bb6a', // Lighter leaves
            glowColorMushroom: 'rgba(180, 100, 255, 0.7)', // Purple glow
            glowColorWisp: 'rgba(150, 220, 255, 0.8)', // Light blue glow
            glowColorFlower: 'rgba(255, 120, 180, 0.8)', // Pink glow (can be used in burst)
            glowColorCrystal: 'rgba(100, 255, 200, 0.9)', // Cyan/Green Crystal glow
            gold1: '#ffd700', gold2: '#f0c000', gold3: '#b8860b', // Gold gradient
            gemColorEmerald: '#50c878', gemColorSapphire: '#0f52ba', gemColorAmethyst: '#9966cc', // Gem colors
            particleColorMagic: ['rgba(255, 220, 150, 0.8)', 'rgba(180, 255, 200, 0.8)', 'rgba(200, 180, 255, 0.8)'], // Particle palette
            textColor: '#f0e68c', // Khaki / Light Gold for main text
            textOutline: '#3a2d0f', // Dark Brown text outline
            winAmountColor: '#FFEB3B', // Bright Yellow for win amount
            winAmountOutline: '#5D4037', // Bark brown outline
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            treeBaseWidthFactor: 0.45, // Make central tree substantial
            mushroomCount: 18,
            wispCount: 20,
            treasureItemCount: 60, // More items in burst
            particleBurstCount: 120, // Particles during burst
            particleAmbientCount: 70, // Ambient particles later
        };

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // --- Helper Functions ---
        const drawGlowingMushroom = (x, y, baseSize, progress, pulseTime) => {
            const currentSize = baseSize * easeOutBounce(progress);
            if (currentSize < 1) return;

            const pulse = 0.8 + Math.sin(pulseTime / 300 + x * 0.1) * 0.2 * progress; // Pulsing effect

            // Stem
            ctx.fillStyle = '#e0d8c0'; // Off-white stem
            ctx.beginPath();
            ctx.rect(x - currentSize * 0.15, y - currentSize * 0.4, currentSize * 0.3, currentSize * 0.4);
            ctx.fill();

            // Cap
            const capColor = '#d16f5a'; // Reddish-brown cap
            const capGradient = ctx.createRadialGradient(x, y - currentSize * 0.5, 0, x, y - currentSize * 0.4, currentSize * 0.6);
            capGradient.addColorStop(0, '#e58f7a'); // Lighter top
            capGradient.addColorStop(1, capColor);
            ctx.fillStyle = capGradient;
            ctx.beginPath();
            ctx.ellipse(x, y - currentSize * 0.4, currentSize * 0.5, currentSize * 0.35, 0, Math.PI, Math.PI * 2);
            ctx.fill();

            // Glow effect
            const glowRadius = currentSize * 0.9 * pulse;
            const glowGradient = ctx.createRadialGradient(x, y - currentSize * 0.3, 0, x, y - currentSize * 0.3, glowRadius);
            glowGradient.addColorStop(0, config.glowColorMushroom.replace(/[\d\.]+\)$/g, `${0.8 * pulse * progress})`));
            glowGradient.addColorStop(0.6, config.glowColorMushroom.replace(/[\d\.]+\)$/g, `${0.4 * pulse * progress})`));
            glowGradient.addColorStop(1, config.glowColorMushroom.replace(/[\d\.]+\)$/g, '0)'));

            ctx.fillStyle = glowGradient;
            ctx.globalCompositeOperation = 'lighter';
            ctx.beginPath();
            ctx.arc(x, y - currentSize * 0.3, glowRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';

            // Spots
            ctx.fillStyle = 'rgba(255, 255, 240, 0.8)'; // Ivory spots
            for (let i = 0; i < 4; i++) {
                const spotAngle = i * Math.PI * 0.5 + pulseTime / 400;
                const spotDist = currentSize * 0.3 * (0.6 + Math.sin(i * 2 + pulseTime / 500) * 0.4);
                const spotX = x + Math.cos(spotAngle) * spotDist;
                const spotY = y - currentSize * 0.4 + Math.sin(spotAngle) * spotDist * 0.4; // Elliptical cap projection
                const spotSize = currentSize * 0.07 * pulse * (0.8 + Math.random() * 0.4);
                ctx.beginPath();
                ctx.arc(spotX, spotY, spotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const drawWisp = (x, y, size, alpha, trailLength, elapsedTime, seed) => {
            const pulse = 0.7 + Math.sin(elapsedTime / 400 + seed * 10) * 0.3;
            const currentSize = size * pulse * alpha;
            if (currentSize < 0.5) return;

            const trailAngle = Math.sin(elapsedTime / 1500 + seed * 5) * 0.5; // Angle of the trail curve
            const trailEndX = x + Math.cos(trailAngle) * trailLength * alpha;
            const trailEndY = y + Math.sin(trailAngle) * trailLength * alpha;
            const controlX = x + Math.cos(trailAngle + Math.PI / 2) * trailLength * 0.3 * alpha; // Curve control point
            const controlY = y + Math.sin(trailAngle + Math.PI / 2) * trailLength * 0.3 * alpha;

            // Trail
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(controlX, controlY, trailEndX, trailEndY);
            const trailGrad = ctx.createLinearGradient(x, y, trailEndX, trailEndY);
            trailGrad.addColorStop(0, config.glowColorWisp.replace(/[\d\.]+\)$/g, `${0.7 * alpha * pulse})`));
            trailGrad.addColorStop(1, config.glowColorWisp.replace(/[\d\.]+\)$/g, '0)'));
            ctx.strokeStyle = trailGrad;
            ctx.lineWidth = currentSize * 0.8;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Core Glow
            ctx.globalCompositeOperation = 'lighter';
            const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, currentSize * 1.5); // Larger gradient for softer glow
            coreGrad.addColorStop(0, `rgba(240, 255, 255, ${alpha * pulse * 1.0})`); // Bright center
            coreGrad.addColorStop(0.4, config.glowColorWisp.replace(/[\d\.]+\)$/g, `${0.9 * alpha * pulse})`));
            coreGrad.addColorStop(1, config.glowColorWisp.replace(/[\d\.]+\)$/g, '0)'));
            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(x, y, currentSize * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        };

        const drawTreasureFantasy = (x, y, size, rotation, typeSeed, elapsedTime) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotation);
            ctx.shadowColor = config.shadowColor;
            ctx.shadowBlur = 8; ctx.shadowOffsetX = 3; ctx.shadowOffsetY = 3;

            const type = Math.floor(typeSeed * 4); // 0: Coin, 1: Gem, 2: Crystal, 3: RuneStone

            switch (type) {
                case 0: // Gold Coin (3D)
                    const tilt = Math.PI / 2 + Math.sin(elapsedTime / 300 + typeSeed * 10) * (Math.PI * 0.48); // Almost edge-on possible
                    const thickness = Math.max(1, size * 0.18 * Math.abs(Math.cos(tilt)));
                    const radiusX = size / 2; const radiusY = size / 2 * Math.abs(Math.sin(tilt));

                    // Edge
                    ctx.fillStyle = config.gold3;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, radiusX, radiusY, 0, Math.PI, Math.PI * 2); // Bottom half of edge
                    const edgeTopY = -thickness;
                    ctx.lineTo(radiusX, edgeTopY); // Connect to top edge right
                    ctx.ellipse(0, edgeTopY, radiusX, radiusY, 0, 0, Math.PI); // Top half of edge
                    ctx.lineTo(-radiusX, 0); // Connect to bottom edge left
                    ctx.closePath();
                    ctx.fill();

                    // Top Face
                    const coinGrad = ctx.createLinearGradient(-radiusX, -radiusY - edgeTopY, radiusX, radiusY - edgeTopY);
                    coinGrad.addColorStop(0.1, config.gold1); // Shine highlight
                    coinGrad.addColorStop(0.5, config.gold2);
                    coinGrad.addColorStop(0.9, config.gold3);
                    ctx.fillStyle = coinGrad;
                    ctx.beginPath();
                    ctx.ellipse(0, edgeTopY, radiusX, radiusY, 0, 0, Math.PI * 2);
                    ctx.fill();

                    // Motif (Simple Tree or Leaf)
                    if (Math.abs(Math.sin(tilt)) > 0.3) { // Only draw if face is somewhat visible
                        ctx.strokeStyle = config.gold3;
                        ctx.lineWidth = Math.max(1, size * 0.08);
                        ctx.beginPath();
                        // Tree-like shape
                        ctx.moveTo(0, radiusY * 0.4 - edgeTopY); // Base
                        ctx.lineTo(0, -radiusY * 0.3 - edgeTopY); // Trunk
                        ctx.lineTo(-radiusX * 0.3, 0 - edgeTopY); // Branch left
                        ctx.moveTo(0, -radiusY * 0.3 - edgeTopY); // Back to trunk
                        ctx.lineTo(radiusX * 0.3, 0 - edgeTopY); // Branch right
                        ctx.stroke();
                    }
                    break;
                case 1: // Gem (Emerald, Sapphire, Amethyst)
                    const gemType = Math.floor(typeSeed * 30) % 3;
                    let gemColorBase, gemColorLight, gemColorDark;
                    if (gemType === 0) { gemColorBase = config.gemColorEmerald; gemColorLight = '#80e0a8'; gemColorDark = '#308050'; }
                    else if (gemType === 1) { gemColorBase = config.gemColorSapphire; gemColorLight = '#6090e0'; gemColorDark = '#082060'; }
                    else { gemColorBase = config.gemColorAmethyst; gemColorLight = '#c090e0'; gemColorDark = '#503070'; }

                    // Faceted shape - draw facets with gradients
                    ctx.save();
                    const facetAngle = Math.PI * 2 / 6; // Hexagonal base idea
                    for (let i = 0; i < 6; i++) {
                        const angle1 = i * facetAngle - Math.PI / 2;
                        const angle2 = (i + 1) * facetAngle - Math.PI / 2;
                        const midAngle = (angle1 + angle2) / 2;

                        const grad = ctx.createLinearGradient(0, 0, Math.cos(midAngle) * size, Math.sin(midAngle) * size);
                        grad.addColorStop(0, gemColorLight);
                        grad.addColorStop(0.5 + Math.sin(i * 2 + elapsedTime / 200) * 0.3, gemColorBase); // Dynamic shine
                        grad.addColorStop(1, gemColorDark);
                        ctx.fillStyle = grad;

                        ctx.beginPath();
                        ctx.moveTo(0, 0); // Center point
                        ctx.lineTo(Math.cos(angle1) * size * 0.5, Math.sin(angle1) * size * 0.3); // Outer mid point 1
                        ctx.lineTo(Math.cos(midAngle) * size * 0.6, Math.sin(midAngle) * size * 0.6); // Outer point
                        ctx.lineTo(Math.cos(angle2) * size * 0.5, Math.sin(angle2) * size * 0.3); // Outer mid point 2
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.restore();
                    ctx.lineWidth = 0.5; ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.stroke(); // Subtle facet lines

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; ctx.beginPath(); ctx.arc(size * 0.2, -size * 0.2, size * 0.08, 0, Math.PI * 2); ctx.fill(); // Sparkle
                    break;
                case 2: // Glowing Crystal Cluster
                    const crystalColor = config.glowColorCrystal;
                    ctx.globalCompositeOperation = 'lighter'; // Glow effect for whole cluster
                    for (let i = 0; i < 4; i++) { // Draw 3-4 shards
                        ctx.save();
                        const angle = (i - 1.5) * 0.6 + (Math.sin(typeSeed * 10 + i) - 0.5) * 0.4;
                        const length = size * (0.7 + Math.sin(typeSeed * 15 + i * 2) * 0.3);
                        const shardSize = size * (0.2 + Math.sin(typeSeed * 20 + i * 3) * 0.1);
                        ctx.rotate(angle);
                        ctx.translate(0, -length * 0.1 * i); // Offset slightly outwards

                        const crystalGrad = ctx.createLinearGradient(0, -length / 2, 0, length / 2);
                        crystalGrad.addColorStop(0, crystalColor.replace(/[\d\.]+\)$/g, '1)')); // Bright tip
                        crystalGrad.addColorStop(0.7, crystalColor.replace(/[\d\.]+\)$/g, '0.7)'));
                        crystalGrad.addColorStop(1, crystalColor.replace(/[\d\.]+\)$/g, '0.3)')); // Darker base
                        ctx.fillStyle = crystalGrad;

                        ctx.beginPath();
                        ctx.moveTo(0, -length / 2); // Tip
                        ctx.lineTo(shardSize / 2, length / 2); // Base right
                        ctx.lineTo(-shardSize / 2, length / 2); // Base left
                        ctx.closePath();
                        ctx.fill();
                        ctx.restore();
                    }
                    ctx.globalCompositeOperation = 'source-over';
                    break;
                case 3: // Rune Stone
                    const stoneColor = `hsl(30, 15%, ${45 + Math.sin(typeSeed * 30) * 10}%)`; // Earthy Brown/Grey stone
                    const stoneGrad = ctx.createRadialGradient(0, size * 0.1, size * 0.1, 0, 0, size * 0.7);
                    stoneGrad.addColorStop(0, `hsl(30, 15%, ${55 + Math.sin(typeSeed * 30) * 10}%)`); // Lighter center
                    stoneGrad.addColorStop(1, stoneColor);
                    ctx.fillStyle = stoneGrad;
                    ctx.beginPath(); // Rounded pebble shape
                    ctx.ellipse(0, 0, size * 0.55, size * 0.45, Math.sin(typeSeed * 40) * 0.1, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 1; ctx.stroke(); // Subtle outline

                    // Glowing Rune
                    const runeColor = config.particleColorMagic[Math.floor(typeSeed * 30) % 3].replace('0.8', '1.0'); // Bright rune
                    ctx.strokeStyle = runeColor;
                    ctx.lineWidth = Math.max(2, size * 0.12);
                    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
                    ctx.shadowColor = runeColor; ctx.shadowBlur = 12; // Rune glow

                    ctx.beginPath();
                    // Draw more intricate pseudo-runes
                    const runeType = Math.floor(typeSeed * 50) % 5;
                    const s = size * 0.25; // Scale factor for rune coords
                    if (runeType === 0) { // Branching
                        ctx.moveTo(0, -s * 0.8); ctx.lineTo(0, s * 0.8);
                        ctx.moveTo(-s * 0.6, -s * 0.2); ctx.lineTo(0, -s * 0.2);
                        ctx.moveTo(s * 0.6, s * 0.2); ctx.lineTo(0, s * 0.2);
                    } else if (runeType === 1) { // Angular Spiral
                        ctx.moveTo(-s * 0.7, -s * 0.7); ctx.lineTo(s * 0.7, -s * 0.7); ctx.lineTo(s * 0.7, s * 0.7);
                        ctx.lineTo(-s * 0.3, s * 0.7); ctx.lineTo(-s * 0.3, 0);
                    } else if (runeType === 2) { // Diamond
                        ctx.moveTo(0, -s); ctx.lineTo(s * 0.8, 0); ctx.lineTo(0, s); ctx.lineTo(-s * 0.8, 0); ctx.closePath();
                    } else if (runeType === 3) { // Trident-like
                        ctx.moveTo(0, s * 0.8); ctx.lineTo(0, -s * 0.2);
                        ctx.moveTo(0, -s * 0.8); ctx.lineTo(-s * 0.7, -s * 0.2); ctx.moveTo(0, -s * 0.8); ctx.lineTo(s * 0.7, -s * 0.2);
                    } else { // Interlocking
                        ctx.moveTo(-s * 0.8, 0); ctx.lineTo(s * 0.8, 0);
                        ctx.moveTo(0, -s * 0.8); ctx.lineTo(-s * 0.5, s * 0.8); ctx.moveTo(0, -s * 0.8); ctx.lineTo(s * 0.5, s * 0.8);
                    }
                    ctx.stroke();
                    ctx.shadowColor = 'transparent'; // Reset shadow for next item
                    break;
            }
            ctx.restore();
        };

        const drawMagicParticle = (x, y, size, alpha, color) => {
            // Add subtle core variation
            const coreAlpha = Math.min(1, alpha * 1.5);
            const coreColor = color.includes('rgba') ? color.replace(/, [\d\.]+\)/, `, ${coreAlpha})`) : `rgba(255,255,240,${coreAlpha})`; // Use white core if not rgba

            const grad = ctx.createRadialGradient(x, y, 0, x, y, size * 1.5);
            grad.addColorStop(0, coreColor);
            grad.addColorStop(0.6, color.replace(/[\d\.]+\)$/g, `${alpha * 0.8})`));
            grad.addColorStop(1, color.replace(/[\d\.]+\)$/g, '0)'));

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, size * 1.5, 0, Math.PI * 2);
            ctx.fill();
        };

        // --- Background ---
        // Deep Forest Gradient
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, config.bgColor1);
        bgGradient.addColorStop(0.6, config.bgColor2);
        bgGradient.addColorStop(1, config.bgColor3);
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Background Trees (Layered for parallax/depth - more detailed)
        ctx.save();
        const layerCount = 5; // More layers
        for (let i = layerCount - 1; i >= 0; i--) {
            const layerProgress = i / (layerCount - 1); // 0 for back, 1 for front
            const parallaxFactor = 0.1 + layerProgress * 0.6; // Less parallax for far layers
            const treeCount = 3 + i * 2;
            const treeBaseSize = canvas.width * 0.1 * (1 + layerProgress * 1.5); // Foreground trees larger
            const treeBaseY = canvas.height * (0.85 + layerProgress * 0.15); // Vary base height more
            const offsetX = Math.sin(elapsedTime / (15000 / parallaxFactor + i * 1000)) * 40 * layerProgress; // Slower, varied drift
            const layerBlur = (1 - layerProgress) * 3; // Blur distant layers

            ctx.filter = `blur(${layerBlur}px)`;
            const layerAlpha = 0.4 + layerProgress * 0.6; // Fade distant layers
            ctx.globalAlpha = layerAlpha;

            for (let j = 0; j < treeCount; j++) {
                const treeX = (canvas.width / (treeCount)) * (j + 0.5 + (Math.sin(j * 3 + i) * 0.3)) + offsetX; // More random placement
                const treeHeight = canvas.height * (0.4 + layerProgress * 0.5) * (0.7 + Math.sin(j * 5 + i * 2) * 0.3); // Vary height
                const trunkWidth = treeBaseSize * (0.08 + layerProgress * 0.08);

                // Determine color based on layer (darker in back)
                const barkLum = 30 + layerProgress * 20;
                const leafLum = 45 + layerProgress * 20;
                const barkColor = `hsl(30, 20%, ${barkLum}%)`;
                const leafColor = `hsl(130, 35%, ${leafLum}%)`;
                const leafHighlight = `hsl(130, 40%, ${leafLum + 10}%)`;

                // Trunk with simple gradient
                const trunkGradBg = ctx.createLinearGradient(treeX - trunkWidth, treeBaseY - treeHeight, treeX + trunkWidth, treeBaseY - treeHeight);
                trunkGradBg.addColorStop(0.3, `hsl(30, 20%, ${barkLum - 5}%)`);
                trunkGradBg.addColorStop(0.5, barkColor);
                trunkGradBg.addColorStop(0.7, `hsl(30, 20%, ${barkLum + 5}%)`);
                ctx.fillStyle = trunkGradBg;
                ctx.beginPath();
                ctx.rect(treeX - trunkWidth / 2, treeBaseY - treeHeight, trunkWidth, treeHeight);
                ctx.fill();

                // Canopy (More natural shape)
                const canopyWidth = treeBaseSize * (0.6 + Math.random() * 0.4);
                const canopyHeight = treeHeight * (0.6 + Math.random() * 0.3);
                const canopyGradBg = ctx.createRadialGradient(treeX, treeBaseY - treeHeight, 0, treeX, treeBaseY - treeHeight, canopyWidth);
                canopyGradBg.addColorStop(0, leafHighlight);
                canopyGradBg.addColorStop(0.7, leafColor);
                canopyGradBg.addColorStop(1, `hsl(130, 35%, ${leafLum - 10}%)`); // Darker underside
                ctx.fillStyle = canopyGradBg;
                ctx.beginPath();
                ctx.ellipse(treeX, treeBaseY - treeHeight + canopyHeight * 0.2, canopyWidth / 1.8, canopyHeight / 1.8, 0, 0, Math.PI * 2); // Main shape
                // Add some random bumps
                for (let k = 0; k < 3; k++) {
                    const bumpAngle = Math.random() * Math.PI * 2;
                    const bumpDist = canopyWidth * 0.4;
                    const bumpSize = canopyWidth * 0.3;
                    ctx.ellipse(treeX + Math.cos(bumpAngle) * bumpDist, treeBaseY - treeHeight + canopyHeight * 0.2 + Math.sin(bumpAngle) * bumpDist * 0.5, bumpSize / 2, bumpSize / 2, 0, 0, Math.PI * 2);
                }
                ctx.fill();
            }
        }
        ctx.filter = 'none'; // Reset filter
        ctx.globalAlpha = 1.0; // Reset alpha
        ctx.restore();

        // --- Animation Phases ---
        const phase1End = 0.30; // Grove Awakening (Tree roots, mushrooms) - Faster start
        const phase2End = 0.55; // Magical Release (Burst from Tree/Crystal) - Intense burst
        const phase3End = 0.85; // Celebration (Wisps, ambient magic, treasure settles)
        const phase4End = 1.0;  // Text Fade In / Hold

        // --- Phase 1: Grove Awakening (0% - 30%) ---
        const treeWidth = canvas.width * config.treeBaseWidthFactor;
        const treeHeight = canvas.height * 0.95; // Taller tree
        const treeX = centerX;
        const treeY = canvas.height + 50; // Base slightly offscreen for roots effect

        // Keep drawing tree structure through phase 3
        if (progress < phase3End) {
            const structureProgress = easeOutCubic(Math.min(1, progress / phase1End)); // Progress for base structure appearance

            ctx.save(); // Save before drawing main tree elements

            // Draw Main Ancient Tree Trunk (More Organic)
            const trunkGrad = ctx.createLinearGradient(treeX - treeWidth * 0.1, treeY - treeHeight, treeX + treeWidth * 0.1, treeY - treeHeight);
            trunkGrad.addColorStop(0, config.treeColorBark);
            trunkGrad.addColorStop(0.5, config.treeColorBarkHighlight);
            trunkGrad.addColorStop(1, config.treeColorBark);
            ctx.fillStyle = trunkGrad;
            ctx.shadowColor = config.shadowColor; ctx.shadowBlur = 15; ctx.shadowOffsetY = 5; // Tree shadow

            ctx.beginPath();
            ctx.moveTo(treeX - treeWidth * 0.1 * structureProgress, treeY); // Bottom left base
            // Curved sides using Bezier for more organic feel
            ctx.bezierCurveTo(
                treeX - treeWidth * 0.25 * structureProgress, treeY - treeHeight * 0.6, // Control 1 Left
                treeX - treeWidth * 0.05 * structureProgress, treeY - treeHeight * 0.9, // Control 2 Left
                treeX - treeWidth * 0.08 * structureProgress, treeY - treeHeight // Top Left Point
            );
            ctx.lineTo(treeX + treeWidth * 0.08 * structureProgress, treeY - treeHeight); // Top Right Point
            ctx.bezierCurveTo(
                treeX + treeWidth * 0.05 * structureProgress, treeY - treeHeight * 0.9, // Control 2 Right
                treeX + treeWidth * 0.25 * structureProgress, treeY - treeHeight * 0.6, // Control 1 Right
                treeX + treeWidth * 0.1 * structureProgress, treeY // Bottom Right Base
            );
            ctx.closePath();
            ctx.fill();
            ctx.shadowColor = 'transparent'; // Reset shadow


            // Draw Roots spreading outwards
            const rootCount = 7; // More roots
            for (let i = 0; i < rootCount; i++) {
                const angle = (i / rootCount + (i % 2) * 0.1 - 0.25 + Math.sin(i * 3) * 0.05) * Math.PI; // More varied angles
                const length = treeWidth * 0.5 * structureProgress * (0.7 + Math.sin(i * 2 + elapsedTime / 1000) * 0.3); // Length varies slightly over time
                const thickness = treeWidth * 0.06 * (1 - Math.abs(i - rootCount / 2) / (rootCount / 2)) * (0.8 + Math.sin(i * 5) * 0.2); // Vary thickness

                ctx.beginPath();
                const startX = treeX + (i - rootCount / 2) * 5; // Stagger start points slightly
                const startY = treeY - thickness * 1.5;
                const endX = startX + Math.cos(angle) * length;
                const endY = startY + Math.sin(angle) * length * 0.4 + thickness * 1.5; // More grounded endpoints
                const cp1X = startX + Math.cos(angle + 0.3) * length * 0.4; // Control points for curve
                const cp1Y = startY + Math.sin(angle + 0.3) * length * 0.1;
                const cp2X = startX + Math.cos(angle - 0.3) * length * 0.8;
                const cp2Y = startY + Math.sin(angle - 0.3) * length * 0.3;

                ctx.moveTo(startX, startY);
                ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY);

                ctx.strokeStyle = config.treeColorBark;
                ctx.lineWidth = thickness * structureProgress;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Root pulse glow (More subtle)
                if (structureProgress > 0.6) {
                    const rootPulseProgress = (structureProgress - 0.6) * 2.5;
                    const pulseIntensity = Math.sin(elapsedTime / 250 + i * 5) * 0.5 + 0.5;
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.strokeStyle = `rgba(180, 255, 200, ${rootPulseProgress * pulseIntensity * 0.3})`; // Less intense glow color
                    ctx.lineWidth = thickness * structureProgress * 0.6;
                    ctx.stroke();
                    ctx.globalCompositeOperation = 'source-over';
                }
            }

            // Draw Canopy (appears with progress, more detailed)
            if (structureProgress > 0.3) {
                const canopyProgress = easeOutCubic((structureProgress - 0.3) / 0.7);
                const canopyBaseY = treeY - treeHeight * 0.95; // Start canopy higher
                const maxCanopyWidth = treeWidth * 1.8;
                const maxCanopyHeight = treeHeight * 0.6;

                // Draw multiple layers of leafy clumps
                const clumpCount = 6;
                for (let i = 0; i < clumpCount; i++) {
                    const clumpProgress = Math.min(1, Math.max(0, (canopyProgress - i * 0.1) / 0.6)); // Stagger clump appearance
                    if (clumpProgress === 0) continue;

                    const angle = (i / clumpCount) * Math.PI * 2 + Math.sin(i * 3) * 0.3;
                    const dist = maxCanopyWidth * 0.2 * (i / clumpCount); // Further out for outer clumps
                    const clumpX = treeX + Math.cos(angle) * dist;
                    const clumpY = canopyBaseY + Math.sin(angle) * dist * 0.3 + i * 5; // Slightly higher outer clumps
                    const clumpWidth = (maxCanopyWidth / 3) * (0.8 + Math.sin(i * 5) * 0.2) * clumpProgress;
                    const clumpHeight = (maxCanopyHeight / 3) * (0.8 + Math.sin(i * 4) * 0.2) * clumpProgress;

                    const canopyGrad = ctx.createRadialGradient(clumpX, clumpY - clumpHeight * 0.1, 0, clumpX, clumpY, clumpWidth * 0.7);
                    canopyGrad.addColorStop(0, config.treeColorLeavesHighlight);
                    canopyGrad.addColorStop(0.6, config.treeColorLeaves);
                    canopyGrad.addColorStop(1, config.treeColorLeaves.replace('388e3c', '2e7d32'));
                    ctx.fillStyle = canopyGrad;

                    ctx.beginPath();
                    ctx.ellipse(clumpX, clumpY, clumpWidth / 2, clumpHeight / 2, Math.sin(i * 2) * 0.1, 0, Math.PI * 2); // Slightly rotated ellipses
                    ctx.fill();
                }
            }
            ctx.restore(); // Restore after drawing main tree elements


            // Draw Glowing Mushrooms near base
            for (let i = 0; i < config.mushroomCount; i++) {
                const seed = i / config.mushroomCount;
                const angle = (seed - 0.5) * Math.PI * 1.4 + Math.sin(seed * 10) * 0.2; // More spread
                const dist = treeWidth * 0.18 + seed * treeWidth * 0.25;
                const mX = treeX + Math.cos(angle) * dist;
                const mY = treeY - 15 + Math.sin(angle) * dist * 0.3; // Ground level
                const mBaseSize = 25 + seed * 35;
                const mushroomProgress = Math.min(1, Math.max(0, (structureProgress - seed * 0.5) / 0.5)); // Stagger appearance

                drawGlowingMushroom(mX, mY, mBaseSize, mushroomProgress, elapsedTime);
            }

            // Central Crystal/Heartwood Glow (Builds up, pulses more intensely)
            const crystalProgress = easeInOutQuad(Math.min(1, progress / phase2End)); // Glow builds longer
            const crystalY = treeY - treeHeight * 0.55; // Position higher in trunk
            const maxCrystalSize = treeWidth * 0.18; // Larger crystal
            const currentCrystalSize = maxCrystalSize * crystalProgress;
            // Pulse intensifies as it approaches burst time
            const pulseIntensityFactor = Math.max(0, (progress - phase1End * 0.5) / (phase2End - phase1End * 0.5)); // Starts pulsing earlier, ramps up
            const crystalPulse = 1.0 + Math.sin(elapsedTime / (400 - pulseIntensityFactor * 300)) * (0.1 + pulseIntensityFactor * 0.4) * crystalProgress; // Faster, stronger pulse

            if (currentCrystalSize > 1) {
                const crystalGlowRadius = currentCrystalSize * (3 + pulseIntensityFactor * 3) * crystalPulse; // Wider glow before burst
                const crystalGlowGrad = ctx.createRadialGradient(treeX, crystalY, 0, treeX, crystalY, crystalGlowRadius);
                const coreColor = config.glowColorCrystal.replace(/[\d\.]+\)$/g, '1)');
                const outerColor = config.glowColorCrystal.replace(/[\d\.]+\)$/g, '0)');
                crystalGlowGrad.addColorStop(0, coreColor);
                crystalGlowGrad.addColorStop(0.2, config.glowColorCrystal); // Main color band wider
                crystalGlowGrad.addColorStop(1, outerColor);

                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = crystalGlowGrad;
                ctx.beginPath(); ctx.arc(treeX, crystalY, crystalGlowRadius, 0, Math.PI * 2); ctx.fill();
                ctx.globalCompositeOperation = 'source-over';

                // Draw the crystal shape itself (more defined)
                ctx.fillStyle = coreColor;
                ctx.shadowColor = coreColor; ctx.shadowBlur = 10 * crystalProgress;
                const pointCount = 6; // Hexagonal crystal base
                ctx.beginPath();
                for (let i = 0; i < pointCount; i++) {
                    const angle = i * Math.PI * 2 / pointCount + elapsedTime / 1000; // Slow rotation
                    const radius = currentCrystalSize * crystalPulse * (0.7 + Math.sin(i * 3) * 0.1); // Slightly irregular shape
                    const xP = treeX + Math.cos(angle) * radius * 0.6;
                    const yP = crystalY + Math.sin(angle) * radius; // Elongated vertically
                    if (i === 0) ctx.moveTo(xP, yP); else ctx.lineTo(xP, yP);
                }
                ctx.closePath();
                ctx.fill();
                ctx.shadowColor = 'transparent';
            }
        }

        // --- Phase 2: Magical Release (30% - 55%) ---
        if (progress >= phase1End && progress < phase2End) {
            const burstProgress = (progress - phase1End) / (phase2End - phase1End);
            // Use a curve that starts fast and ends slower for the burst intensity
            const pulse = Math.sin(burstProgress * Math.PI * 0.5) * 1.2; // Strong initial pulse, fades slower than sine

            const crystalY = treeY - treeHeight * 0.55; // Center of burst

            // Intense Light Burst from Crystal/Heartwood (Screen Flash)
            const lightRadius = canvas.width * 1.5 * pulse; // Cover screen
            const lightGradient = ctx.createRadialGradient(treeX, crystalY, 0, treeX, crystalY, lightRadius);
            lightGradient.addColorStop(0, `rgba(240, 255, 250, ${pulse * 0.95})`); // Very bright center
            lightGradient.addColorStop(0.1, config.glowColorCrystal.replace(/[\d\.]+\)$/g, `${pulse * 0.8})`));
            lightGradient.addColorStop(0.4, config.glowColorFlower.replace(/[\d\.]+\)$/g, `${pulse * 0.5})`)); // Mix in pink
            lightGradient.addColorStop(0.7, config.glowColorMushroom.replace(/[\d\.]+\)$/g, `${pulse * 0.3})`)); // Mix in purple
            lightGradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = lightGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Treasure Items Bursting Outwards & Upwards
            for (let i = 0; i < config.treasureItemCount; i++) {
                const seed = i / config.treasureItemCount;
                const angle = seed * Math.PI * 2.5 + burstProgress * Math.PI * (1.0 - seed); // Spiraling outwards
                const maxDist = canvas.width * 0.8;
                // Use easeOutExpo for fast initial speed, slowing significantly
                const easedBurstProgress = easeOutExpo(burstProgress);
                const distance = maxDist * easedBurstProgress * (0.5 + seed * 0.7); // Further items travel further

                const itemX = treeX + Math.cos(angle) * distance;
                // More pronounced upward motion, less affected by easing later
                const itemY = crystalY + Math.sin(angle) * distance * 0.7 - (canvas.height * 0.5 * Math.sin(burstProgress * Math.PI));

                const startSize = 15 + seed * 40;
                const currentSize = startSize * (1 - easedBurstProgress * 0.5); // Shrink as they fly
                const rotation = angle * 2 + elapsedTime / (150 + seed * 200); // Faster spin

                if (currentSize < 1 || distance > canvas.width) continue; // Stop drawing if too small or off-screen

                // Draw item and light trail
                ctx.save();
                // Trail fades faster than item shrinks
                const trailIntensity = pulse * (1 - burstProgress * 0.8);
                const trailLength = currentSize * 3 * trailIntensity;
                if (trailLength > 1) {
                    const trailX = itemX - Math.cos(angle) * trailLength;
                    const trailY = itemY - (Math.sin(angle) * trailLength * 0.7 - (canvas.height * 0.5 * Math.sin(burstProgress * Math.PI) * 0.5)); // Trail follows path less extremely
                    const trailGrad = ctx.createLinearGradient(itemX, itemY, trailX, trailY);
                    const trailColor = config.particleColorMagic[i % 3];
                    trailGrad.addColorStop(0, trailColor.replace(/[\d\.]+\)$/g, `${trailIntensity * 0.6})`));
                    trailGrad.addColorStop(1, trailColor.replace(/[\d\.]+\)$/g, '0)'));
                    ctx.strokeStyle = trailGrad;
                    ctx.lineWidth = Math.max(1, currentSize * 0.4);
                    ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(itemX, itemY); ctx.lineTo(trailX, trailY); ctx.stroke();
                }
                ctx.restore();

                drawTreasureFantasy(itemX, itemY, currentSize, rotation, seed, elapsedTime);
            }

            // Add Burst Particles (More vibrant)
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < config.particleBurstCount; i++) {
                const seed = Math.random();
                const angle = Math.random() * Math.PI * 2;
                const maxDist = canvas.width * 1.2 * pulse; // Can go slightly offscreen
                const distance = Math.pow(Math.random(), 2) * maxDist; // More concentrated near center initially
                const pX = treeX + Math.cos(angle) * distance;
                const pY = crystalY + Math.sin(angle) * distance * 0.7 - (canvas.height * 0.4 * pulse); // Upward motion
                const size = (1 + Math.random() * 5) * (1 - burstProgress * 0.7); // Fade out size
                const alpha = pulse * (1 - distance / maxDist) * (1 - burstProgress) * 1.2; // Fade out alpha

                if (alpha > 0.05 && size > 0.5) {
                    drawMagicParticle(pX, pY, size, alpha, config.particleColorMagic[i % 3]);
                }
            }
            ctx.globalCompositeOperation = 'source-over';
        }


        // --- Phase 3: Celebration & Wisps (55% - 85%) ---
        // Draw settling treasure and ambient effects
        if (progress >= phase2End && progress < phase4End) {
            const celebrationProgress = Math.min(1.0, (progress - phase2End) / (phase3End - phase2End));
            const easedCelebration = easeInOutQuad(celebrationProgress);

            // Draw Treasure Items Settling (Continue from Phase 2 positions)
            // NOTE: For true settling, item positions need to be stored outside this function.
            // This is a simplified visual approximation: redraw them slower/fading.
            const settleFactor = 1.0 - easedCelebration; // 1 at start of phase 3, 0 at end
            for (let i = 0; i < config.treasureItemCount; i++) {
                const seed = i / config.treasureItemCount;
                const angle = seed * Math.PI * 2.5 + Math.PI; // Approx final angles from burst end
                const maxDist = canvas.width * 0.8;
                const finalDist = maxDist * (0.5 + seed * 0.7); // Approx final distance
                // Move slightly based on celebration progress (e.g., slow drift down/in)
                const distance = finalDist * (0.8 + settleFactor * 0.2);
                const driftAngle = Math.sin(elapsedTime / 1000 + seed * 5) * 0.1;

                const itemX = treeX + Math.cos(angle + driftAngle) * distance;
                const itemY = (treeY - treeHeight * 0.2) + Math.sin(angle + driftAngle) * distance * 0.3 + (canvas.height * 0.2 * (1 - easedCelebration)); // Drift down

                const startSize = 15 + seed * 40;
                const finalSizeFactor = 0.5; // Size they were at end of burst
                const currentSize = startSize * finalSizeFactor * (0.6 + settleFactor * 0.4); // Fade size slowly
                const rotation = angle * 2 + elapsedTime / (300 + seed * 300); // Slower spin

                if (currentSize < 1) continue;

                ctx.globalAlpha = 0.2 + settleFactor * 0.8; // Fade out items slowly
                drawTreasureFantasy(itemX, itemY, currentSize, rotation, seed, elapsedTime);
                ctx.globalAlpha = 1.0;
            }


            // Ambient Magical Particles / Fireflies
            ctx.globalCompositeOperation = 'lighter';
            for (let i = 0; i < config.particleAmbientCount; i++) {
                // Use a simple particle state store if available, otherwise calculate position
                const seed = i / config.particleAmbientCount + elapsedTime / 30000; // Very slow global drift
                const timeOffset = elapsedTime / 1500 + i * 5;
                // More complex path - looping/swirling + vertical drift
                const pX = centerX + Math.sin(seed * Math.PI * 2) * canvas.width * 0.4 + Math.cos(timeOffset) * 30;
                const pY = canvas.height * (1 - ((seed * 1.5 + Math.sin(timeOffset / 2) * 0.1) % 1)); // Loop vertically
                const pSize = (1 + Math.sin(timeOffset * 1.5) * 0.6) * (0.5 + easedCelebration * 0.5); // Pulse and fade in size
                const alpha = easedCelebration * (0.4 + Math.sin(timeOffset * 2) * 0.3); // Twinkling alpha

                if (alpha > 0.05 && pSize > 0.5) {
                    drawMagicParticle(pX, pY, pSize, alpha, config.particleColorMagic[i % 3]);
                }
            }
            ctx.globalCompositeOperation = 'source-over';


            // Wisps gather and dance around the tree
            for (let i = 0; i < config.wispCount; i++) {
                const seed = i / config.wispCount;
                const wispProgress = Math.min(1, Math.max(0, (easedCelebration - seed * 0.3) / 0.7)); // Staggered appearance

                // Complex path: orbit the tree + vertical sine wave + random wander
                const orbitAngle = elapsedTime / (4000 + seed * 3000) + seed * Math.PI * 2; // Slower orbit
                const orbitRadius = treeWidth * (0.2 + seed * 0.6) * (0.8 + Math.sin(orbitAngle * 2) * 0.2); // Varying radius
                const verticalWave = Math.sin(elapsedTime / 1000 + seed * 8) * treeHeight * 0.15; // Vertical movement
                const wanderX = Math.sin(elapsedTime / 700 + seed * 10) * 30; // Horizontal wander
                const targetX = treeX + Math.cos(orbitAngle) * orbitRadius + wanderX;
                const targetY = (treeY - treeHeight * 0.6) + verticalWave + Math.sin(orbitAngle * 1.5) * orbitRadius * 0.4; // Vertical position based on orbit + wave

                // Lerp position for smoothness (requires storing previous pos - simplified here)
                const wispX = targetX;
                const wispY = targetY;

                const wispSize = (4 + seed * 6) * wispProgress; // Slightly larger wisps
                const wispAlpha = wispProgress * (0.7 + Math.sin(elapsedTime / 250 + i * 2) * 0.3); // Flicker more intensely
                const trailLength = wispSize * 6 * wispProgress;

                if (wispAlpha > 0.1 && wispSize > 1) {
                    drawWisp(wispX, wispY, wispSize, wispAlpha, trailLength, elapsedTime, seed);
                }
            }
        }


        // --- Phase 4: Text Display (Starts ~60%, fades fully in by ~85%, stays) ---
        const textAppearStart = 0.60; // Start fade earlier
        const textAppearEnd = 0.85; // Fully visible
        if (progress > textAppearStart) {
            const textProgress = easeOutCubic(Math.min(1, (progress - textAppearStart) / (textAppearEnd - textAppearStart)));

            ctx.save();
            ctx.globalAlpha = textProgress;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const mainText = "FOREST FORTUNE";
            const maxFontSize = Math.min(canvas.width / 15, 130); // Slightly larger max size
            const currentFontSize = maxFontSize * textProgress;
            const textY = canvas.height * 0.25; // Position text a bit lower

            // Use a more distinct fantasy font if available, otherwise fallback
            ctx.font = `bold ${currentFontSize}px "Luminari", "Papyrus", fantasy, serif`;

            // Text Style: Enhanced Glowing Runes / Magic Weave
            const wobbleX = Math.sin(elapsedTime / 200 + 1) * currentFontSize * 0.015 * (1 - textProgress); // Reduce wobble as it appears
            const wobbleY = Math.cos(elapsedTime / 250) * currentFontSize * 0.015 * (1 - textProgress);

            // 1. Deep Shadow
            ctx.fillStyle = 'rgba(10, 20, 15, 0.7)';
            ctx.fillText(mainText, centerX + wobbleX + 4, textY + wobbleY + 4);

            // 2. Glowing background/outline (using stroke with large lineWidth + shadow)
            const glowColor = config.glowColorCrystal.replace(/[\d\.]+\)$/g, `${textProgress * 0.9})`);
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = currentFontSize * 0.1; // Wide line for glow base
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 25 * textProgress;
            ctx.lineJoin = 'round'; // Rounded corners for glow
            ctx.strokeText(mainText, centerX + wobbleX, textY + wobbleY);
            ctx.shadowColor = 'transparent'; // Reset shadow for next layers


            // 3. Main Fill (Light gold/parchment color with slight gradient)
            const fillGrad = ctx.createLinearGradient(centerX - maxFontSize * 2, textY, centerX + maxFontSize * 2, textY);
            fillGrad.addColorStop(0, '#fffacd'); // LemonChiffon
            fillGrad.addColorStop(0.5, config.textColor);
            fillGrad.addColorStop(1, '#fffacd');
            ctx.fillStyle = fillGrad;
            ctx.fillText(mainText, centerX + wobbleX, textY + wobbleY);

            // 4. Darker stroke for definition inside the glow
            ctx.strokeStyle = config.textOutline;
            ctx.lineWidth = Math.max(1.5, currentFontSize * 0.015); // Slightly thicker outline
            ctx.strokeText(mainText, centerX + wobbleX, textY + wobbleY);

            // Draw Win Amount (Thematically placed, e.g., on a root or stone near bottom)
            if (textProgress > 0.5 && winAmount > 0) { // Fade in amount slightly later
                const amountAlpha = Math.min(1, (textProgress - 0.5) * 2);
                ctx.globalAlpha = amountAlpha; // Apply separate alpha fade

                const amountFontSize = Math.min(canvas.width / 15, 60);
                const amountY = canvas.height * 0.88; // Position near bottom
                const amountText = winAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

                ctx.font = `bold ${amountFontSize}px "Arial Black", Gadget, sans-serif`;

                // Background element for amount (e.g., flat stone)
                const stoneWidth = ctx.measureText(amountText).width + amountFontSize * 1.5;
                const stoneHeight = amountFontSize * 1.4;
                const stoneY = amountY - stoneHeight * 0.45;
                const stoneColor = `hsl(30, 15%, 40%)`; // Darker stone
                const stoneGrad = ctx.createLinearGradient(centerX - stoneWidth / 2, stoneY, centerX + stoneWidth / 2, stoneY + stoneHeight);
                stoneGrad.addColorStop(0, `hsl(30, 15%, 50%)`);
                stoneGrad.addColorStop(1, stoneColor);
                ctx.fillStyle = stoneGrad;
                ctx.shadowColor = config.shadowColor; ctx.shadowBlur = 8; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 4;
                ctx.beginPath(); // Rounded rect stone
                const stoneRadius = stoneHeight * 0.3;
                ctx.moveTo(centerX - stoneWidth / 2 + stoneRadius, stoneY);
                ctx.lineTo(centerX + stoneWidth / 2 - stoneRadius, stoneY);
                ctx.quadraticCurveTo(centerX + stoneWidth / 2, stoneY, centerX + stoneWidth / 2, stoneY + stoneRadius);
                ctx.lineTo(centerX + stoneWidth / 2, stoneY + stoneHeight - stoneRadius);
                ctx.quadraticCurveTo(centerX + stoneWidth / 2, stoneY + stoneHeight, centerX + stoneWidth / 2 - stoneRadius, stoneY + stoneHeight);
                ctx.lineTo(centerX - stoneWidth / 2 + stoneRadius, stoneY + stoneHeight);
                ctx.quadraticCurveTo(centerX - stoneWidth / 2, stoneY + stoneHeight, centerX - stoneWidth / 2, stoneY + stoneHeight - stoneRadius);
                ctx.lineTo(centerX - stoneWidth / 2, stoneY + stoneRadius);
                ctx.quadraticCurveTo(centerX - stoneWidth / 2, stoneY, centerX - stoneWidth / 2 + stoneRadius, stoneY);
                ctx.closePath();
                ctx.fill();
                ctx.shadowColor = 'transparent';

                // Amount text
                ctx.fillStyle = config.winAmountColor;
                ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 3; ctx.shadowOffsetX = 2; ctx.shadowOffsetY = 2;
                ctx.fillText(amountText, centerX, amountY);
                ctx.strokeStyle = config.winAmountOutline;
                ctx.lineWidth = 2;
                ctx.strokeText(amountText, centerX, amountY);
                ctx.shadowColor = 'transparent';
            }


            ctx.restore(); // Restore globalAlpha
        }

        // --- Return Status ---
        return progress < 1.0;
    }
};
