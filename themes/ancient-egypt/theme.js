// theme.js for Ancient Egypt theme
import { EffectPresets, EffectsHelper } from '../../shared/effects.js';
import symbolMap from './symbolMap.js';
import { renderThemeEffects, renderEpicWinAnimation } from './effects.js';

export const AncientEgyptTheme = {
    name: "Ancient Egypt",
    // Layout and appearance settings
    layout: {
        reelSpacing: 8,
        reelsContainer: {
            backgroundColor: "#8B4513", // Sandstone brown
            opacity: 0.95
        },
        themeColor: "#FFD700" // Gold color for Egyptian theme
    },
    visualEffects: {
        ...EffectPresets.desert,
        intensity: 0.9,
        reelEffects: {
            enabled: true,
            blurAmount: 5,
            lightTrails: true,
            spinningGlow: true,
            spinColor: '#FFDF00' // Gold color for spin glow
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
                color: "#FFD700", // Gold frames around winning symbols
                thickness: 4,
                glowing: true
            }
        },
        themeSpecific: {
            sandStorm: {
                enabled: true,
                intensity: 2,
                color: '#d4b683'
            },
            hieroglyphGlow: {
                enabled: true,
                color: '#ffcc00'
            },
            epicWinAnimation: {
                enabled: true,
                name: "Pharaoh's Treasure",
                duration: 8000, // 8 seconds
                goldParticles: true
            }
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
        useSprite: true, // Set to true to use sprite map, false to use individual images
        path: './themes/ancient-egypt/images/symbols.svg',
        spriteMap: symbolMap, // Import from symbolMap.js
        attributes: [
            {
                id: 0,
                name: 'Sun God',
                imagePath: './themes/aztec/images/sungod.png',
                backgroundColor: "#FFD700", // Gold for Sun God
            },
            {
                id: 1,
                name: 'Mask',
                imagePath: './themes/aztec/images/mask.png',
                backgroundColor: "#FF0000", // Red for Mask
            },
            {
                id: 2,
                name: 'Temple',
                imagePath: './themes/aztec/images/temple.png',
                backgroundColor: "#FFA500", // Orange for Temple
            },
            {
                id: 3,
                name: 'Jaguar',
                imagePath: './themes/aztec/images/jaguar.png',
                backgroundColor: "#FF69B4", // Pink for Jaguar
            },
            {
                id: 4,
                name: 'Calendar',
                imagePath: './themes/aztec/images/calendar.png',
                backgroundColor: "#FFFF00", // Yellow for Calendar
            }
        ]
    },
    background: './themes/ancient-egypt/images/background.jpg',

    // Add rendering functions imported from effects.js
    renderThemeEffects,
    renderEpicWinAnimation
};

export default AncientEgyptTheme;
