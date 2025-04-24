// theme.js for Space Adventure theme
import { EffectPresets, EffectsHelper } from '../../shared/effects.js';
import symbolMap from './symbolMap.js';
import * as themeConfig from './config.js'; // Import theme configuration
import { renderThemeEffects, renderEpicWinAnimation } from './effects.js';

export const SpaceAdventureTheme = {
    name: "Space Adventure",
    // Include the theme configuration
    config: themeConfig,
    // Layout and appearance settings
    layout: {
        reelSpacing: 8,
        reelsContainer: {
            backgroundColor: "#0B0B2B", // Deep space blue
            opacity: 0.95
        },
        themeColor: "#651FFF" // Vibrant purple
    },
    visualEffects: {
        ...EffectPresets.scifi,
        intensity: 1.0,
        reelEffects: {
            enabled: true,
            blurAmount: 7,
            lightTrails: true,
            spinningGlow: true,
            spinColor: '#00B0FF' // Bright blue
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
                color: "#18FFFF", // Bright cyan
                thickness: 3,
                glowing: true
            }
        }
    },
    // Audio configuration
    audio: {
        background: './themes/space-adventure/sounds/background.mp3',
        spin: './themes/space-adventure/sounds/spin.mp3',
        win: './themes/space-adventure/sounds/win.mp3',
        jackpot: './themes/space-adventure/sounds/jackpot.mp3',
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
        path: './themes/space-adventure/images/symbols.svg',
        spriteMap: symbolMap, // Import from symbolMap.js
        attributes: [
            {
                id: 0,
                name: 'Spaceship',
                imagePath: './themes/space-adventure/images/spaceship.jpg',
                backgroundColor: "#FFD700", // Gold for Spaceship
            },
            {
                id: 1,
                name: 'Alien',
                imagePath: './themes/space-adventure/images/alien.jpg',
                backgroundColor: "#FF0000", // Red for Alien
            },
            {
                id: 2,
                name: 'Planet',
                imagePath: './themes/space-adventure/images/planet.jpg',
                backgroundColor: "#FFA500", // Orange for Planet
            },
            {
                id: 3,
                name: 'Meteor',
                imagePath: './themes/space-adventure/images/meteor.jpg',
                backgroundColor: "#FF69B4", // Pink for Meteor
            },
            {
                id: 4,
                name: 'Astronaut',
                imagePath: './themes/space-adventure/images/astronaut.jpg',
                backgroundColor: "#FFFF00", // Yellow for Astronaut
            }
        ]
    },
    background: './themes/space-adventure/images/background.jpg',
    renderThemeEffects,
    renderEpicWinAnimation
};

export default SpaceAdventureTheme;
