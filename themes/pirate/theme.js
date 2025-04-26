// theme.js for Pirate theme
import symbolMap from './symbolMap.js';
import * as themeConfig from './config.js'; // Import theme configuration
import { EffectPresets, ThemeEffectsHelper, renderEpicWinAnimation } from './effects.js';

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
        ...EffectPresets,
    },
    // Audio configuration
    audio: {
        background: './themes/pirate/sounds/background.mp3',
        spin: './themes/pirate/sounds/spin.mp3',
        win: './themes/pirate/sounds/win.mp3',
        jackpot: './themes/pirate/sounds/jackpot.mp3',
        volume: {
            master: 0.5,
            background: 0.5,
            effects: 0.7
        }
    },
    // Symbols and visuals
    symbols: {
        // Sprite sheet configuration
        useSprite: false, // Set to true to use sprite map, false to use individual images
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
                name: 'CrossBones',
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
            },
            {
                id: 5,
                name: 'Anchor',
                imagePath: './themes/pirate/images/anchor.png',
                backgroundColor: null,
            },
            {
                id: 6,
                name: 'Compass',
                imagePath: './themes/pirate/images/compass.png',
                backgroundColor: null,
            }, {
                id: 7,
                name: 'Skull',
                imagePath: './themes/pirate/images/skull2.png',
                backgroundColor: null,
            }
        ]
    },
    background: './themes/pirate/images/background.jpg',
    ThemeEffectsHelper,
    renderEpicWinAnimation
};

export default PirateTheme;
