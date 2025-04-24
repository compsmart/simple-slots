// theme.js for Gemstones theme
import { EffectPresets, EffectsHelper } from '../../shared/effects.js';
import symbolMap from './symbolMap.js';
import * as themeConfig from './config.js'; // Import theme configuration
import { renderThemeEffects, renderEpicWinAnimation } from './effects.js';

export const GemstonesTheme = {
    name: "Gemstones",
    // Include the theme configuration
    config: themeConfig,
    // Layout and appearance settings
    layout: {
        reelSpacing: 7,
        reelsContainer: {
            backgroundColor: "#1A237E", // Deep blue
            opacity: 0.9
        },
        themeColor: "#E91E63" // Pink/magenta
    },
    visualEffects: {
        ...EffectPresets.sparkle,
        intensity: 1.0,
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
            gemSparkle: {
                enabled: true,
                intensity: 0.9,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
            },
            prismEffect: {
                enabled: true,
                rainbowIntensity: 0.7
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
    },
    // Audio configuration
    audio: {
        background: './themes/gemstones/sounds/background.mp3',
        spin: './themes/gemstones/sounds/spin.mp3',
        win: './themes/gemstones/sounds/win.mp3',
        jackpot: './themes/gemstones/sounds/jackpot.mp3',
        volume: {
            master: 0.8,
            background: 0.5,
            effects: 0.9
        }
    },
    // Symbols and visuals
    symbols: {
        // Sprite sheet configuration
        useSprite: true, // Set to true to use sprite map, false to use individual images
        path: './themes/gemstones/images/symbols.svg',
        spriteMap: symbolMap, // Import from symbolMap.js
        attributes: [
            {
                id: 0,
                name: 'Diamond',
                imagePath: './themes/gemstones/images/diamond.png',
                backgroundColor: "#FFD700", // Gold for Diamond
            },
            {
                id: 1,
                name: 'Ruby',
                imagePath: './themes/gemstones/images/ruby.png',
                backgroundColor: "#FF0000", // Red for Ruby
            },
            {
                id: 2,
                name: 'Emerald',
                imagePath: './themes/gemstones/images/emerald.png',
                backgroundColor: "#FFA500", // Orange for Emerald
            },
            {
                id: 3,
                name: 'Sapphire',
                imagePath: './themes/gemstones/images/sapphire.png',
                backgroundColor: "#FF69B4", // Pink for Sapphire
            },
            {
                id: 4,
                name: 'Amethyst',
                imagePath: './themes/gemstones/images/amethyst.png',
                backgroundColor: "#FFFF00", // Yellow for Amethyst
            }
        ]
    },
    background: null,
    // Add rendering functions imported from effects.js
    renderThemeEffects,
    renderEpicWinAnimation
};

export default GemstonesTheme;
