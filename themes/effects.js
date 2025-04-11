// filepath: c:\projects\copilot-agent\slot-game\themes\effects.js
/**
 * Advanced visual effects definitions for the slot machine
 * These effects can be enabled or disabled per theme
 */

// Base effect configuration with defaults that can be overridden
export const EffectDefaults = {
    enabled: false,       // Master switch for all effects
    intensity: 0.7,       // Overall intensity multiplier (0.0-1.0)
    framerate: 60,        // Target framerate for animations

    // Individual effects
    neonGlow: {
        enabled: true,    // Enable neon glow around symbols
        color: '#00ffff', // Default color for glow
        size: 10,         // Glow size in pixels
        pulseSpeed: 1000, // Pulse cycle in milliseconds
        intensity: 0.8    // Specific effect intensity
    },

    electricEdges: {
        enabled: true,    // Enable electric effect on symbol edges
        color: '#ffffff', // Color of the electric effect
        arcs: 5,          // Number of electric arcs
        speed: 800,       // Speed of movement in ms
        intensity: 0.7    // Specific effect intensity
    },

    backgroundEffects: {
        enabled: true,               // Master switch for background
        particles: {
            enabled: true,           // Floating particles
            count: 50,               // Number of particles
            color: '#ffffff',        // Particle color
            size: { min: 2, max: 6 } // Size range
        },
        pulse: {
            enabled: true,           // Pulsing background
            color: '#0a0a2a',        // Base color
            speed: 2000,             // Pulse cycle in ms
            intensity: 0.3           // How strong the pulse is
        }
    }, winEffects: {
        enabled: true,           // Special effects for wins
        explosions: true,        // Explosive particle effects on wins
        shockwave: true,         // Shockwave effect
        flashingSymbols: true,   // Make winning symbols flash
        spinEffect3d: {
            enabled: true,       // 3D rotation effect on win
            rotations: 1,        // Number of full rotations
            duration: 1000,      // Duration in ms
            easing: 'easeOutBack'// Easing function
        }
    },

    reelEffects: {
        enabled: true,           // Effects during reel spin
        blurAmount: 5,           // Motion blur intensity
        lightTrails: true,       // Light trails behind symbols
        spinningGlow: true,      // Glow during spinning
        spinColor: '#3498db'     // Color during spin
    },

    soundReactivity: {
        enabled: false,          // React to sound/music
        sensitivity: 0.5,        // Sensitivity to sound
        bassEffect: true,        // Extra effects on bass
        multiColor: false,       // Change colors with sound
        colorPalette: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
    },

    themeSpecific: {            // Theme-specific effect configurations
        // Can be extended by each theme
    }
};

// Helper functions for the effects system
export const EffectsHelper = {
    // Calculate pulse value based on time
    getPulseValue: (time, speed, min = 0, max = 1) => {
        const value = (Math.sin(time / speed * Math.PI) + 1) / 2;
        return min + value * (max - min);
    },

    // Generate random number in range
    random: (min, max) => Math.random() * (max - min) + min,

    // Create a color with opacity
    rgba: (color, alpha) => {
        // Handle hex colors
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        // Handle rgb colors
        if (color.startsWith('rgb(')) {
            const rgb = color.match(/\d+/g);
            return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
        }
        // Handle named colors or other formats - just add opacity
        return color;
    },

    // Create a neon shadow CSS string
    createNeonShadow: (color, size, intensity) => {
        const adjustedSize = size * intensity;
        return `0 0 ${adjustedSize * 0.5}px ${color}, 
                0 0 ${adjustedSize}px ${color}, 
                0 0 ${adjustedSize * 2}px ${color}`;
    },

    // Draw electric arc between two points
    drawElectricArc: (ctx, x1, y1, x2, y2, segments = 12, jitter = 15, color = '#00ffff', width = 2) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.beginPath();
        ctx.moveTo(x1, y1);

        // Create a jagged line with random offsets
        const dx = (x2 - x1) / segments;
        const dy = (y2 - y1) / segments;

        for (let i = 1; i < segments; i++) {
            const x = x1 + dx * i + (Math.random() - 0.5) * jitter;
            const y = y1 + dy * i + (Math.random() - 0.5) * jitter;
            ctx.lineTo(x, y);
        }

        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
};

// Reusable effect configurations that themes can import
export const EffectPresets = {
    // Modern neon look with bright colors
    neon: {
        enabled: true,
        intensity: 0.8,
        neonGlow: {
            enabled: true,
            color: '#00ffff',
            size: 12,
            pulseSpeed: 800,
            intensity: 0.9
        },
        electricEdges: {
            enabled: true,
            color: '#ffffff',
            arcs: 3,
            speed: 600,
            intensity: 0.7
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: true,
                count: 70,
                color: '#80ffff',
                size: { min: 1, max: 5 }
            },
            pulse: {
                enabled: true,
                color: '#001a3a',
                speed: 1500,
                intensity: 0.4
            }
        },
        reelEffects: {
            enabled: true,
            blurAmount: 6,
            lightTrails: true,
            spinningGlow: true,
            spinColor: '#00ccff'
        }
    },

    // Retro arcade style
    retro: {
        enabled: true,
        intensity: 0.7,
        neonGlow: {
            enabled: true,
            color: '#ff00ff',
            size: 8,
            pulseSpeed: 1200,
            intensity: 0.7
        },
        electricEdges: {
            enabled: false
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: true,
                count: 30,
                color: '#ff44ff',
                size: { min: 2, max: 4 }
            },
            pulse: {
                enabled: true,
                color: '#1a0038',
                speed: 2000,
                intensity: 0.3
            }
        },
        reelEffects: {
            enabled: true,
            blurAmount: 4,
            lightTrails: true,
            spinningGlow: false,
            spinColor: '#ff00ff'
        }
    },

    // Electric energetic style
    electric: {
        enabled: true,
        intensity: 0.85,
        neonGlow: {
            enabled: true,
            color: '#ffff00',
            size: 10,
            pulseSpeed: 500,
            intensity: 0.8
        },
        electricEdges: {
            enabled: false,
            color: '#ffffff',
            arcs: 8,
            speed: 400,
            intensity: 0.9
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: true,
                count: 60,
                color: '#ffff80',
                size: { min: 1, max: 6 }
            },
            pulse: {
                enabled: true,
                color: '#1a1a00',
                speed: 1000,
                intensity: 0.5
            }
        },
        reelEffects: {
            enabled: true,
            blurAmount: 7,
            lightTrails: true,
            spinningGlow: true,
            spinColor: '#ffdd00'
        }
    },

    // Subtle professional style
    subtle: {
        enabled: true,
        intensity: 0.4,
        neonGlow: {
            enabled: true,
            color: '#4488ff',
            size: 6,
            pulseSpeed: 1500,
            intensity: 0.5
        },
        electricEdges: {
            enabled: false
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: true,
                count: 25,
                color: '#ffffff',
                size: { min: 1, max: 3 }
            },
            pulse: {
                enabled: true,
                color: '#101020',
                speed: 3000,
                intensity: 0.2
            }
        },
        reelEffects: {
            enabled: true,
            blurAmount: 3,
            lightTrails: false,
            spinningGlow: true,
            spinColor: '#4488ff'
        }
    },

    // No effects - classic clean look
    none: {
        enabled: false
    }
};
