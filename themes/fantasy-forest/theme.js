// theme.js for Fantasy Forest theme
import { EffectPresets, EffectsHelper } from '../../shared/effects.js';
import symbolMap from './symbolMap.js';
import * as themeConfig from './config.js'; // Import theme configuration
import { renderThemeEffects, renderEpicWinAnimation } from './effects.js';

export const FantasyForestTheme = {
    name: "Fantasy Forest",
    // Include the theme configuration
    config: themeConfig,
    // Layout and appearance settings
    layout: {
        reelSpacing: 8,
        reelsContainer: {
            backgroundColor: "#1B5E20", // Deep forest green
            opacity: 0.85
        },
        themeColor: "#8BC34A" // Light green
    },
    visualEffects: {
        intensity: 0.95,
        reelEffects: {
            enabled: true,
            blurAmount: 4,
            lightTrails: false,
            spinningGlow: true,
            spinColor: '#76FF03' // Bright magical green
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
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
                count: 30,
                color: '#FFD54F',
                size: { min: 2, max: 4 }
            },
            pulse: {
                enabled: true,
                color: '#1a0038',
                speed: 2000,
                intensity: 0.3
            }
        },
        themeSpecific: {
            floatingLeaves: {
                enabled: false,
                count: 15,
                rotationSpeed: 2,
                fallSpeed: { min: 1, max: 3 },
                colors: ['#8bc34a', '#4caf50', '#cddc39']
            },
            fireflies: {
                enabled: true,
                count: 25,
                color: '#ffeb3b',
                blinkRate: { min: 500, max: 2000 },
                speed: { min: 0.2, max: 1 }
            }
        }
    },
    // Audio configuration
    audio: {
        background: './themes/fantasy-forest/sounds/background.mp3',
        spin: './themes/fantasy-forest/sounds/spin.mp3',
        win: './themes/fantasy-forest/sounds/win.mp3',
        jackpot: './themes/fantasy-forest/sounds/jackpot.mp3',
        volume: {
            master: 0.75,
            background: 0.5,
            effects: 0.9
        }
    },
    // Symbols and visuals
    symbols: {
        // Sprite sheet configuration
        useSprite: true, // Set to true to use sprite map, false to use individual images
        path: './themes/fantasy-forest/images/symbols.svg',
        spriteMap: symbolMap, // Import from symbolMap.js
        attributes: [
            {
                id: 0,
                name: 'Dragon',
                imagePath: './themes/fantasy-forest/images/dragon.jpg',
                backgroundColor: "#FFD700", // Gold for Dragon
            },
            {
                id: 1,
                name: 'Fairy',
                imagePath: './themes/fantasy-forest/images/fairy.jpg',
                backgroundColor: "#FF0000", // Red for Fairy
            },
            {
                id: 2,
                name: 'Unicorn',
                imagePath: './themes/fantasy-forest/images/unicorn.jpg',
                backgroundColor: "#FFA500", // Orange for Unicorn
            },
            {
                id: 3,
                name: 'Magic Tree',
                imagePath: './themes/fantasy-forest/images/magictree.jpg',
                backgroundColor: "#FF69B4", // Pink for Magic Tree
            },
            {
                id: 4,
                name: 'Crystal',
                imagePath: './themes/fantasy-forest/images/crystal.jpg',
                backgroundColor: "#FFFF00", // Yellow for Crystal
            }
        ]
    },
    background: './themes/fantasy-forest/images/background.jpg',
    // Add rendering functions imported from effects.js
    renderThemeEffects,
    renderEpicWinAnimation
};

export default FantasyForestTheme;
