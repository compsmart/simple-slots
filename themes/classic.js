import { EffectPresets, EffectsHelper } from './effects.js';

export const ClassicTheme = {
    name: "Classic",
    visualEffects: {
        ...EffectPresets.retro,
        intensity: 0.85,
        backgroundEffects: {
            enabled: false,
            particles: {
                enabled: true,
                count: 60,
                color: '#ffffff',
                size: { min: 2, max: 7 },
                sparkle: true
            },
            pulse: {
                enabled: true,
                color: '#220033',
                speed: 1200,
                intensity: 0.5
            }
        },
        themeSpecific: {

        }
    },
    symbols: [
        { name: "Seven", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f44336'/%3E%3Cpath d='M40 30L80 30L60 90L40 90' stroke='white' stroke-width='8' fill='none'/%3E%3C/svg%3E", multiplier: 5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Bell", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffc107'/%3E%3Ccircle cx='60' cy='50' r='30' fill='%23ffeb3b'/%3E%3Crect x='55' y='80' width='10' height='20' fill='%23795548'/%3E%3Ccircle cx='60' cy='105' r='5' fill='%23795548'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Bar", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%233f51b5'/%3E%3Crect x='20' y='40' width='80' height='15' fill='gold'/%3E%3Crect x='20' y='60' width='80' height='15' fill='gold'/%3E%3Crect x='20' y='80' width='80' height='15' fill='gold'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Lemon", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffeb3b'/%3E%3Cellipse cx='60' cy='60' rx='40' ry='30' fill='%23fff176'/%3E%3C/svg%3E", multiplier: 1, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } },
        { name: "Cherry", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%234caf50'/%3E%3Ccircle cx='40' cy='80' r='20' fill='%23e53935'/%3E%3Ccircle cx='80' cy='80' r='20' fill='%23e53935'/%3E%3Cpath d='M60 30L40 80M60 30L80 80' stroke='%23795548' stroke-width='6' fill='none'/%3E%3C/svg%3E", multiplier: 0.5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
    ]
};
