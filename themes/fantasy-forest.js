// filepath: c:\projects\copilot-agent\slot-game\themes\fantasy-forest.js
import { EffectPresets } from './effects.js';

export const FantasyForestTheme = {
    name: "FantasyForest",
    visualEffects: {
        ...EffectPresets.magical,
        intensity: 0.85,
        neonGlow: {
            enabled: true,
            color: '#4caf50',
            size: 12,
            pulseSpeed: 1500,
            intensity: 0.75
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: true,
                count: 70,
                color: '#8bc34a',
                size: { min: 1, max: 4 }
            },
            pulse: {
                enabled: true,
                color: '#1b5e20',
                speed: 3000,
                intensity: 0.5
            }
        },
        themeSpecific: {
            floatingLeaves: {
                enabled: true,
                count: 15,
                rotationSpeed: 2,
                fallSpeed: { min: 1, max: 3 },
                colors: ['#8bc34a', '#4caf50', '#cddc39']
            },
            fireflies: {
                enabled: true,
                count: 20,
                color: '#ffeb3b',
                blinkRate: { min: 500, max: 2000 },
                speed: { min: 0.2, max: 1 }
            }
        }
    },
    symbols: [
        // Theme: Magic, Creatures, Nature. Higher top multiplier for a more volatile feel.
        { name: "Dragon Head", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23004d40'/%3E%3Cpath d='M80 30 C 100 40, 100 70, 80 90 L 40 90 C 20 70, 30 40, 40 35 Q 60 25 80 30 Z' fill='%23d32f2f'/%3E%3Cpolygon points='80 30, 85 20, 90 30' fill='%23ffc107'/%3E%3Cpolygon points='75 35, 80 25, 85 35' fill='%23ffc107'/%3E%3Cpath d='M50 70 Q 60 75 70 70' stroke='white' stroke-width='3' fill='none'/%3E%3Ccircle cx='75' cy='50' r='5' fill='yellow'/%3E%3C/svg%3E", multiplier: 15, winAnimation: { frames: 8, currentFrame: 0, frameRate: 95 } },
        { name: "Magic Potion", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23311b92'/%3E%3Cpath d='M50 30 h 20 v 20 L 80 50 C 80 70, 75 85, 60 95 C 45 85, 40 70, 40 50 L 50 50 Z' fill='%23ede7f6' stroke='%23b39ddb' stroke-width='3'/%3E%3Cpath d='M45 55 Q 60 65 75 55 V 90 Q 60 92 45 90 Z' fill='%237e57c2' opacity='0.8'/%3E%3Ccircle cx='55' cy='70' r='3' fill='white' opacity='0.7'/><circle cx='65' cy='80' r='2' fill='white' opacity='0.7'/><circle cx='60' cy='60' r='4' fill='white' opacity='0.7'/><rect x='48' y='25' width='24' height='5' fill='%23795548'/><path d='M50 30 Q 60 20 70 30' stroke='%23795548' stroke-width='3' fill='none'/></svg%3E", multiplier: 7, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Elf Bow", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231b5e20'/%3E%3Cpath d='M40 20 Q 80 60 40 100' stroke='%23795548' stroke-width='8' fill='none'/%3E%3Cpath d='M40 20 L 40 100' stroke='%23bdbdbd' stroke-width='3'/%3E%3Cpath d='M40 60 L 60 60 L 85 55 L 80 60 L 85 65 Z' fill='%23ffeb3b' stroke='%23795548' stroke-width='2'/%3E%3C/svg%3E", multiplier: 5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Glowing Mushroom", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%233e2723'/%3E%3Cpath d='M40 70 Q 60 40 80 70 Z' fill='%2300e676'/%3E%3Crect x='55' y='70' width='10' height='30' fill='%23e0e0e0'/%3E%3Ccircle cx='50' cy='60' r='5' fill='white' opacity='0.8'/><circle cx='70' cy='60' r='5' fill='white' opacity='0.8'/><circle cx='60' cy='50' r='5' fill='white' opacity='0.8'/></svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Ancient Rune", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23455a64'/%3E%3Crect x='35' y='35' width='50' height='50' rx='5' ry='5' fill='%2390a4ae'/%3E%3Cpath d='M50 50 L 70 50 L 60 70 L 70 90 M 60 70 L 50 90' stroke='%23263238' stroke-width='6' fill='none'/%3E%3C/svg%3E", multiplier: 1, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ]
};
