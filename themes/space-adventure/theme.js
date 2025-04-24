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
            opacity: 0.8
        },
        themeColor: "#651FFF" // Vibrant purple
    },
    visualEffects: {
        ...EffectPresets.scifi,
        intensity: 1.0,
        reelEffects: {
            enabled: true,
            blurAmount: 7,
            lightTrails: false,
            spinningGlow: true,
            spinColor: '#00B0FF' // Bright blue
        },
        winEffects: {
            enabled: false,
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
                enabled: true,
                color: '#fff', // Gold for pirate treasure
                intensity: 0.2,
                size: 1
            },
            pulseEffect: {
                enabled: false,
                speed: 2000,
                minOpacity: 0.6,
                maxOpacity: 1.0
            },
            colorTransition: {
                enabled: true,
                colors: ['#333'], // Gold, Orange-red, Deep blue, Emerald, Gold
                speed: 6000,
                mode: 'gradient'
            }
        },
        themeSpecific: {
            spaceWarp: {
                enabled: true,
                speed: 1.5,
                starCount: 200,
                colorShift: true
            },
            planetGlow: {
                enabled: true,
                colors: ['#ff5500', '#00aaff', '#44ff44']
            },
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
                imagePath: './themes/space-adventure/images/spaceship.png',
                backgroundColor: null, // Gold for Spaceship
            },
            {
                id: 1,
                name: 'Alien',
                imagePath: './themes/space-adventure/images/alien.png',
                backgroundColor: null, // Red for Alien
            },
            {
                id: 2,
                name: 'Planet',
                imagePath: './themes/space-adventure/images/planet.png',
                backgroundColor: null, // Orange for Planet
            },
            {
                id: 3,
                name: 'Meteor',
                imagePath: './themes/space-adventure/images/meteor.png',
                backgroundColor: null, // Pink for Meteor
            },
            {
                id: 4,
                name: 'Astronaut',
                imagePath: './themes/space-adventure/images/astronaut.png',
                backgroundColor: null, // Yellow for Astronaut
            }
        ]
    },
    background: './themes/space-adventure/images/background.jpg',
    renderThemeEffects,
    renderEpicWinAnimation
};

export default SpaceAdventureTheme;
