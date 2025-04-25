// theme.js for Gemstones theme
import symbolMap from './symbolMap.js';
import * as themeConfig from './config.js'; // Import theme configuration
import { EffectPresets, ThemeEffectsHelper, renderEpicWinAnimation } from './effects.js';

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
        ...EffectPresets,
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
    ThemeEffectsHelper,
    renderEpicWinAnimation
};

export default GemstonesTheme;
