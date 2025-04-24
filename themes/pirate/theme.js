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
        reelSpacing: 9,
        reelsContainer: {
            backgroundColor: "#0D47A1", // Deep sea blue
            opacity: 0.9
        },
        themeColor: "#FF5722" // Pirate orange-red
    },
    visualEffects: {
        ...EffectPresets.ocean,
        intensity: 0.9,
        reelEffects: {
            enabled: true,
            blurAmount: 5,
            lightTrails: true,
            spinningGlow: true,
            spinColor: '#FFD54F' // Gold coins
        },
        winEffects: {
            enabled: true,
            explosions: true,
            shockwave: true,
            flashingSymbols: true,
            spinEffect3d: {
                enabled: true
            },
            pulsingSymbols: true,
            winFrame: {
                enabled: true,
                color: "#FFD700", // Gold
                thickness: 4,
                glowing: true
            }
        }
    },
    // Audio configuration
    audio: {
        background: './themes/pirate/sounds/background.mp3',
        spin: './themes/pirate/sounds/spin.mp3',
        win: './themes/pirate/sounds/win.mp3',
        jackpot: './themes/pirate/sounds/jackpot.mp3',
        volume: {
            master: 0.8,
            background: 0.6,
            effects: 0.9
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
                imagePath: './themes/pirate/images/treasure.png',
                backgroundColor: "#FFD700", // Gold for Treasure Chest
            },
            {
                id: 1,
                name: 'Ship',
                imagePath: './themes/pirate/images/ship.png',
                backgroundColor: "#FF0000", // Red for Ship
            },
            {
                id: 2,
                name: 'Skull',
                imagePath: './themes/pirate/images/skull.png',
                backgroundColor: "#FFA500", // Orange for Skull
            },
            {
                id: 3,
                name: 'Map',
                imagePath: './themes/pirate/images/map.png',
                backgroundColor: "#FF69B4", // Pink for Map
            },
            {
                id: 4,
                name: 'Parrot',
                imagePath: './themes/pirate/images/parrot.png',
                backgroundColor: "#FFFF00", // Yellow for Parrot
            }
        ]
    },
    background: './themes/pirate/images/background.jpg',
    renderThemeEffects,
    renderEpicWinAnimation
};

export default PirateTheme;
