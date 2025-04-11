import { EffectPresets, EffectsHelper } from './effects.js';

export const AztecTheme = {
    name: "Aztec",
    visualEffects: {
        ...EffectPresets.vibrant,
        intensity: 0.8,
        neonGlow: {
            enabled: false,
            color: '#e6a11f', // Golden yellow color
            size: 8,
            pulseSpeed: 2000,
            intensity: 0.7
        },
        electricEdges: {
            enabled: false,
            color: '#ff9900',
            arcs: 3,
            speed: 1200,
            intensity: 0.5
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: true,
                count: 35,
                color: '#e6a11f',
                size: { min: 1, max: 3 },
                sparkle: false
            },
            pulse: {
                enabled: true,
                color: '#412612', // Deep brown
                speed: 4000,
                intensity: 0.3
            }
        },
        themeSpecific: {
            jungleVines: {
                enabled: true,
                intensity: 0.4,
                color: '#2e7d32',
                count: 8
            },
            templeGlow: {
                enabled: true,
                color: '#ffcc00',
                intensity: 0.6,
                pulseSpeed: 3000
            }
        }
    },
    symbols: [
        // Theme: Aztec gods, artifacts, and cultural symbols
        { name: "Sun God", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23d4342a'/%3E%3Ccircle cx='60' cy='60' r='30' fill='%23fec611'/%3E%3Ccircle cx='60' cy='60' r='20' fill='%23d4342a'/%3E%3Ccircle cx='60' cy='60' r='10' fill='%23fec611'/%3E%3Cpath d='M60 10 V 30 M 60 90 V 110 M 10 60 H 30 M 90 60 H 110 M 24 24 L 39 39 M 81 39 L 96 24 M 24 96 L 39 81 M 81 81 L 96 96' stroke='%23fec611' stroke-width='5'/%3E%3C/svg%3E", multiplier: 12, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Golden Mask", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23006064'/%3E%3Cpath d='M40 40 L 60 20 L 80 40 L 80 85 Q 60 100 40 85 Z' fill='%23fec611' stroke='%23006064' stroke-width='2'/%3E%3Ccircle cx='50' cy='55' r='6' fill='%23006064'/%3E%3Ccircle cx='70' cy='55' r='6' fill='%23006064'/%3E%3Cpath d='M50 75 Q 60 85 70 75' stroke='%23006064' stroke-width='3' fill='none'/%3E%3Cpath d='M30 45 L 40 40 M 80 40 L 90 45' stroke='%23fec611' stroke-width='3'/%3E%3C/svg%3E", multiplier: 8, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Jade Stone", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23795548'/%3E%3Cpolygon points='60,30 85,50 85,80 60,100 35,80 35,50' fill='%2326a69a' stroke='%23004d40' stroke-width='3'/%3E%3Cpath d='M55 50 L 65 50 L 70 60 L 65 70 L 55 70 L 50 60 Z' fill='%23004d40'/%3E%3Cpath d='M45 50 L 50 45 M 75 50 L 70 45 M 75 70 L 70 75 M 45 70 L 50 75' stroke='%23b2dfdb' stroke-width='2'/%3E%3C/svg%3E", multiplier: 5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Snake", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23388e3c'/%3E%3Cpath d='M30 90 Q 45 75 60 90 Q 75 105 90 90 Q 105 75 90 60 Q 75 45 60 60 Q 45 75 30 60 Q 15 45 30 30' fill='none' stroke='%23ffeb3b' stroke-width='8' stroke-linecap='round'/%3E%3Ccircle cx='30' cy='30' r='5' fill='%23f44336'/%3E%3Ccircle cx='25' cy='28' r='2' fill='%23000000'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Jaguar", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffcc80'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='30' fill='%23ef6c00'/%3E%3Ccircle cx='45' cy='50' r='5' fill='%23000000'/%3E%3Ccircle cx='75' cy='50' r='5' fill='%23000000'/%3E%3Cpath d='M50 70 Q 60 75 70 70' stroke='%23000000' stroke-width='3' fill='none'/%3E%3Cpath d='M30 40 L 40 30 M 80 30 L 90 40' stroke='%23000000' stroke-width='3'/%3E%3Cpath d='M40 65 Q 60 90 80 65' fill='%23ffcc80' stroke='none'/%3E%3Cpath d='M45 55 Q 50 60 55 55 M 65 55 Q 70 60 75 55' fill='none' stroke='%23000000' stroke-width='2'/%3E%3Ccircle cx='45' cy='50' r='2' fill='%23ffffff'/%3E%3Ccircle cx='75' cy='50' r='2' fill='%23ffffff'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ]
};