// filepath: c:\projects\copilot-agent\slot-game\themes\gemstones.js
import { EffectPresets, EffectsHelper } from './effects.js';

export const GemstonesTheme = {
    name: "Gemstones",
    visualEffects: {
        ...EffectPresets.neon,
        intensity: 0.85,
        neonGlow: {
            enabled: true,
            color: '#ff00ff', // Vibrant magenta
            size: 12,
            pulseSpeed: 600,
            intensity: 0.9
        },
        electricEdges: {
            enabled: false,
            color: '#ffffff',
            arcs: 6,
            speed: 800,
            intensity: 0.8
        },
        backgroundEffects: {
            enabled: true,
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
            gemSparkle: {
                enabled: true,
                intensity: 0.9,
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff']
            },
            prismEffect: {
                enabled: true,
                rainbowIntensity: 0.7
            }
        }
    },
    symbols: [
        // Theme: Jewels, Wealth. Higher overall multipliers, potentially fewer low wins.
        { name: "Diamond", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%231565c0'/%3E%3Cpolygon points='60 25, 30 55, 45 60, 75 60, 90 55' fill='%23e3f2fd'/%3E%3Cpolygon points='30 55, 60 95, 45 60' fill='%2390caf9'/%3E%3Cpolygon points='90 55, 60 95, 75 60' fill='%23bbdefb'/%3E%3Cpolygon points='45 60, 60 95, 75 60' fill='%2364b5f6'/%3E%3Cpath d='M30 55 L 45 60 L 75 60 L 90 55 M 45 60 L 60 95 L 75 60' stroke='%230d47a1' stroke-width='2' fill='none'/%3E%3C/svg%3E", multiplier: 12, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Ruby", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23c62828'/%3E%3Crect x='35' y='35' width='50' height='50' rx='10' ry='10' fill='%23ef9a9a' stroke='%23b71c1c' stroke-width='3'/%3E%3Cpath d='M35 60 L 85 60 M 60 35 L 60 85' stroke='%23ffcdd2' stroke-width='5' opacity='0.7'/%3E%3C/svg%3E", multiplier: 8, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Emerald", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%232e7d32'/%3E%3Crect x='40' y='30' width='40' height='60' fill='%23a5d6a7' stroke='%231b5e20' stroke-width='3'/%3E%3Cpath d='M40 40 L 80 40 M 40 50 L 80 50 M 40 60 L 80 60 M 40 70 L 80 70 M 40 80 L 80 80' stroke='%23e8f5e9' stroke-width='3' opacity='0.6'/%3E%3C/svg%3E", multiplier: 6, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Sapphire", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%230277bd'/%3E%3Cellipse cx='60' cy='60' rx='35' ry='25' fill='%2390caf9' stroke='%2301579b' stroke-width='3'/%3E%3Cellipse cx='60' cy='60' rx='20' ry='12' fill='%23e3f2fd' opacity='0.8'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Amethyst", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%236a1b9a'/%3E%3Cpolygon points='60 30, 80 50, 70 80, 50 80, 40 50' fill='%23e1bee7' stroke='%234a148c' stroke-width='3'/%3E%3Cpolygon points='60 30, 70 80, 50 80' fill='%23ce93d8'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ]
};
