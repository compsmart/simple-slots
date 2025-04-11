// filepath: c:\projects\copilot-agent\slot-game\themes\ancient-egypt.js
import { EffectPresets, EffectsHelper } from './effects.js';

export const AncientEgyptTheme = {
    name: "AncientEgypt",
    visualEffects: {
        ...EffectPresets.neon,
        intensity: 0.75,
        neonGlow: {
            enabled: true,
            color: '#ffd700', // Gold color
            size: 10,
            pulseSpeed: 1500,
            intensity: 0.8
        },
        electricEdges: {
            enabled: false,
            color: '#ffeebb',
            arcs: 4,
            speed: 1000,
            intensity: 0.6
        },
        backgroundEffects: {
            enabled: true,
            particles: {
                enabled: false,
                count: 40,
                color: '#ffd700',
                size: { min: 1, max: 4 }
            },
            pulse: {
                enabled: true,
                color: '#332200',
                speed: 3000,
                intensity: 0.4
            }
        },
        themeSpecific: {
            sandStorm: {
                enabled: true,
                intensity: 0.3,
                color: '#d4b683'
            },
            hieroglyphGlow: {
                enabled: true,
                color: '#ffcc00'
            }
        }
    },
    symbols: [
        // Theme: Pyramids, Pharaohs, Hieroglyphs. Slightly higher top multiplier.
        { name: "Pharaoh Mask", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23DAA520'/%3E%3Crect x='35' y='30' width='50' height='60' rx='10' ry='10' fill='%23005792'/%3E%3Crect x='45' y='35' width='30' height='40' fill='%23FDBE34'/%3E%3Crect x='40' y='85' width='40' height='10' fill='%23005792'/%3E%3Ccircle cx='50' cy='60' r='5' fill='white'/%3E%3Ccircle cx='70' cy='60' r='5' fill='white'/%3E%3C/svg%3E", multiplier: 12, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
        { name: "Scarab Beetle", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%2300838f'/%3E%3Cellipset cx='60' cy='60' rx='35' ry='25' fill='%2300bcd4'/%3E%3Cpath d='M60 35 V 85 M40 45 L 80 75 M 80 45 L 40 75' stroke='%23263238' stroke-width='4'/%3E%3C/svg%3E", multiplier: 6, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
        { name: "Eye of Horus", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%238d6e63'/%3E%3Cpath d='M30 60 Q 60 40 90 60 Q 60 80 30 60 Z' fill='white' stroke='black' stroke-width='3'/%3E%3Ccircle cx='60' cy='60' r='10' fill='%231e88e5'/%3E%3Cpath d='M60 70 L 50 90 M60 70 L 75 85 Q 90 95 90 80' stroke='black' stroke-width='4' fill='none'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
        { name: "Ankh", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffab00'/%3E%3Cpath d='M60 55 V 100 M 40 75 H 80' stroke='%233e2723' stroke-width='8'/%3E%3Cellipse cx='60' cy='40' rx='15' ry='20' stroke='%233e2723' stroke-width='8' fill='none'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
        { name: "Papyrus Scroll", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23c8e6c9'/%3E%3Crect x='30' y='30' width='60' height='60' rx='5' ry='5' fill='%23f5f5dc' stroke='%238d6e63' stroke-width='3'/%3E%3Cpath d='M35 40 h 50 M 35 50 h 40 M 35 60 h 50 M 35 70 h 30 M 35 80 h 45' stroke='%235d4037' stroke-width='2'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
    ]
};
