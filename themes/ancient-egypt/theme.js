// theme.js for Ancient Egypt theme
import { EffectPresets, EffectsHelper } from '../../shared/effects.js';
import symbolMap from './symbolMap.js';
import { renderThemeEffects, renderEpicWinAnimation } from './effects.js';
import * as themeConfig from './config.js'; // Import theme configuration

export const AncientEgyptTheme = {
    name: "Ancient Egypt",
    config: themeConfig,
    // Layout and appearance settings
    layout: {
        reelSpacing: 8,
        reelsContainer: {
            backgroundColor: "#431d08", // Sandstone brown
            opacity: 0.5
        },
        themeColor: "#FFD700" // Gold color for Egyptian theme
    },
    visualEffects: {
        ...EffectPresets.ocean,
        intensity: 0.9,
        reelEffects: {
            enabled: true,
            blurAmount: 5,
            lightTrails: false,
            spinningGlow: true,
            spinColor: '#FFD54F' // Gold coins
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
                enabled: false,
                roations: 3, // Number of rotations
                direction: 'clockwise', // Rotate clockwise for pirate theme
                duration: 1000, // 1 second
                easing: 'easeInOutCubic', // Smooth easing
            },
            pulsingSymbols: true,
        },
        reelMask: {
            enabled: true,
            borderWidth: 3,
            separatorWidth: 3,
            glowEffect: {
                enabled: false,
                color: '#FFD700', // Gold for pirate treasure
                intensity: 0.8,
                size: 12
            },
            pulseEffect: {
                enabled: false,
                speed: 2000,
                minOpacity: 0.6,
                maxOpacity: 1.0
            },
            colorTransition: {
                enabled: true,
                colors: ['#FFD700'], // Gold, Orange-red, Deep blue, Emerald, Gold
                speed: 6000,
                mode: 'gradient'
            }
        },
        themeSpecific: {
            sandStorm: {
                enabled: false,
                intensity: 1,
                color: '#d4b683'
            },
            hieroglyphGlow: {
                enabled: true,
                color: '#ffcc00'
            },
        }
    },
    // Audio configuration
    audio: {
        background: './themes/ancient-egypt/sounds/background.mp3',
        spin: './themes/ancient-egypt/sounds/spin.mp3',
        win: './themes/ancient-egypt/sounds/win.mp3',
        jackpot: './themes/ancient-egypt/sounds/jackpot.mp3',
        volume: {
            master: 0.8,
            background: 0.5,
            effects: 0.9
        }
    },
    // Symbols and visuals
    symbols: {
        // Sprite sheet configuration
        useSprite: false, // Set to true to use sprite map, false to use individual images
        path: './themes/ancient-egypt/images/symbols.svg',
        spriteMap: symbolMap, // Import from symbolMap.js
        attributes: [
            {
                id: 0,
                name: 'pharaoh',
                imagePath: './themes/ancient-egypt/images/pharaoh.png',
                backgroundColor: null, // Gold for Sun God
            },
            {
                id: 1,
                name: 'ankh',
                imagePath: './themes/ancient-egypt/images/ankh.png',
                backgroundColor: null, // Red for Mask
            },
            {
                id: 2,
                name: 'scarab',
                imagePath: './themes/ancient-egypt/images/scarab.png',
                backgroundColor: null, // Orange for Temple
            },
            {
                id: 3,
                name: 'eye',
                imagePath: './themes/ancient-egypt/images/eye.png',
                backgroundColor: null, // Pink for Jaguar
            },
            {
                id: 4,
                name: 'pyramid',
                imagePath: './themes/ancient-egypt/images/pyramid.png',
                backgroundColor: null, // Yellow for Calendar
            }
        ]
    },
    background: './themes/ancient-egypt/images/background2.jpg',

    // Add rendering functions imported from effects.js
    renderThemeEffects,
    renderEpicWinAnimation
};

export default AncientEgyptTheme;
