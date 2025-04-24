// theme.js for Pirate theme
import { EffectPresets, EffectsHelper } from '../../shared/effects.js';
import symbolMap from './symbolMap.js';
import * as themeConfig from './config.js'; // Import theme configuration
import { renderThemeEffects, renderEpicWinAnimation } from './effects.js';

export const PirateTheme = {
    name: "Pirate",
    // Include the theme configuration
    config: themeConfig,
    // Layout and appearance settings
    layout: {
        reelSpacing: 0,
        reelsContainer: {
            backgroundColor: "#333", // Deep sea blue
            opacity: 0.5
        },
        themeColor: "#FF5722" // Pirate orange-red
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
                color: '#431d08', // Gold for pirate treasure
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
                colors: ['#431d08'], // Gold, Orange-red, Deep blue, Emerald, Gold
                speed: 6000,
                mode: 'gradient'
            }
        },

    },
    // Audio configuration
    audio: {
        background: './themes/pirate/sounds/background.mp3',
        spin: './themes/pirate/sounds/spin.mp3',
        win: './themes/pirate/sounds/win.mp3',
        jackpot: './themes/pirate/sounds/jackpot.mp3',
        volume: {
            master: 0.1,
            background: 0.1,
            effects: 0.1
        }
    },
    // Symbols and visuals
    symbols: {
        // Sprite sheet configuration
        useSprite: true, // Set to true to use sprite map, false to use individual images
        path: './themes/pirate/images/symbols.svg',
        spriteMap: symbolMap, // Import from symbolMap.js
        attributes: [
            {
                id: 0,
                name: 'Treasure Chest',
                imagePath: './themes/pirate/images/chest.png',
                backgroundColor: null, // Gold for Treasure Chest
            },
            {
                id: 1,
                name: 'Ship',
                imagePath: './themes/pirate/images/ship.png',
                backgroundColor: null, // Red for Ship
            },
            {
                id: 2,
                name: 'Skull',
                imagePath: './themes/pirate/images/skull.png',
                backgroundColor: null, // Orange for Skull
            },
            {
                id: 3,
                name: 'Map',
                imagePath: './themes/pirate/images/map.png',
                backgroundColor: null, // Pink for Map
            },
            {
                id: 4,
                name: 'Pirate',
                imagePath: './themes/pirate/images/pirate.png',
                backgroundColor: null, // Yellow for Parrot
            }
        ]
    },
    background: './themes/pirate/images/background.jpg',
    renderThemeEffects,
    renderEpicWinAnimation
};

export default PirateTheme;
