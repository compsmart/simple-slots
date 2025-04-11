// filepath: c:\projects\copilot-agent\slot-game\themes\space-adventure.js
import { EffectPresets } from './effects.js';

export const SpaceAdventureTheme = {
    name: "SpaceAdventure",
    visualEffects: {
        ...EffectPresets.electric,
        intensity: 0.9,
        neonGlow: {
            ...EffectPresets.electric.neonGlow,
            color: '#00ccff',
            size: 15
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
                count: 100,
                color: '#00aaff',
                size: { min: 1, max: 6 }
            },
            pulse: {
                enabled: true,
                color: '#001a3a',
                speed: 2000,
                intensity: 0.6
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
            }
        }
    },
    symbols: [
        // Theme: Sci-Fi, Aliens, Planets. Balanced multipliers.
        { name: "Rocket Ship", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231a237e'/%3E%3Cpath d='M60 20 L 75 50 L 75 90 L 45 90 L 45 50 Z' fill='%23e0e0e0'/%3E%3Cpolygon points='60 10, 50 25, 70 25' fill='%23f44336'/%3E%3Cpolygon points='45 90, 35 105, 55 90' fill='%23bdbdbd'/%3E%3Cpolygon points='75 90, 85 105, 65 90' fill='%23bdbdbd'/%3E%3Cellipse cx='60' cy='60' rx='10' ry='15' fill='%2300bcd4'/%3E%3C/svg%3E", multiplier: 10, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Green Alien", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23424242'/%3E%3Cellipse cx='60' cy='55' rx='30' ry='25' fill='%234caf50'/%3E%3Ccircle cx='50' cy='50' r='8' fill='black'/%3E%3Ccircle cx='70' cy='50' r='8' fill='black'/%3E%3Crect x='55' y='80' width='10' height='20' fill='%237cb342'/%3E%3Cpath d='M40 90 H 80' stroke='%237cb342' stroke-width='5'/%3E%3C/svg%3E", multiplier: 6, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Ringed Planet", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%230d47a1'/%3E%3Ccircle cx='60' cy='60' r='30' fill='%23ff9800'/%3E%3Cellipse cx='60' cy='60' rx='50' ry='15' stroke='%23fff3e0' stroke-width='5' fill='none' transform='rotate(-20 60 60)'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Ray Gun", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23607d8b'/%3E%3Cpath d='M30 70 L 70 70 L 90 50 L 80 40 L 50 70' fill='%23ff5722'/%3E%3Crect x='30' y='70' width='30' height='20' rx='5' fill='%23bdbdbd'/%3E%3Ccircle cx='85' cy='45' r='5' fill='yellow'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Asteroid", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23263238'/%3E%3Cpath d='M40 40 L 65 30 L 80 50 L 90 70 L 70 90 L 45 85 L 30 60 Z' fill='%23795548' stroke='%234e342e' stroke-width='3'/%3E%3Ccircle cx='55' cy='55' r='5' fill='%23a1887f'/%3E%3Ccircle cx='70' cy='75' r='8' fill='%23a1887f'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ]
};
