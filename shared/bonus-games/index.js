/**
 * Bonus Games Integration Module
 * 
 * This file provides functions to integrate bonus games with the slot machine themes.
 * It handles loading theme-specific assets and configurations for bonus games.
 */

import { createBoardGameBonus } from './board-game.js';

// Map to store preloaded audio buffers
const audioBuffers = {};

// Function to check if a bonus game should be triggered
export function checkBonusTrigger(reelResults, theme) {
    // Get the theme's scatter symbol ID (default to 0)
    const scatterSymbolId = theme.config?.scatterSymbolId || 0;

    // Count how many scatter symbols are in the results
    let scatterCount = 0;
    for (const reel of reelResults) {
        for (const symbol of reel) {
            if (symbol === scatterSymbolId) {
                scatterCount++;
            }
        }
    }

    // Return the count of scatter symbols (0 if none)
    return scatterCount >= 3 ? scatterCount : 0;
}

// Function to load theme-specific bonus game configuration
export async function loadBonusGameConfig(theme, audioContext) {
    if (!theme) return null;

    // Default bonus game config
    const baseConfig = {
        boardSize: 24,
        diceMax: 6,
        boardLayout: 'circle',
        assets: {
            background: null,
            dice: [],
            player: null,
            tiles: {
                win: null,
                moveForward: null,
                moveBackward: null,
                collect: null
            },
            sounds: {
                start: null,
                roll: null,
                move: null,
                win: null,
                collect: null
            }
        },
        text: {
            title: `${theme.name} Bonus Game`,
            instructions: "Roll the dice to move around the board!",
            rollButton: "Roll Dice",
            winPrefix: "Win ",
            forward: "Forward ",
            backward: "Back ",
            collect: "Collect",
            gameOver: "Bonus Complete!",
            totalWin: "Total Win: "
        }
    };

    // If theme has specific bonus game config, merge it
    if (theme.bonusGame) {
        Object.assign(baseConfig, theme.bonusGame);
    }

    // Load theme assets if available
    if (baseConfig.assets) {
        if (baseConfig.assets.background && typeof baseConfig.assets.background === 'string') {
            baseConfig.assets.background = await loadImage(baseConfig.assets.background);
        }

        if (baseConfig.assets.player && typeof baseConfig.assets.player === 'string') {
            baseConfig.assets.player = await loadImage(baseConfig.assets.player);
        }

        // Load dice images if provided as strings
        if (baseConfig.assets.dice && Array.isArray(baseConfig.assets.dice)) {
            const dicePromises = baseConfig.assets.dice.map(dice => {
                return typeof dice === 'string' ? loadImage(dice) : Promise.resolve(dice);
            });
            baseConfig.assets.dice = await Promise.all(dicePromises);
        }

        // Load tile images if provided as strings
        if (baseConfig.assets.tiles) {
            for (const tileType in baseConfig.assets.tiles) {
                const tilePath = baseConfig.assets.tiles[tileType];
                if (typeof tilePath === 'string') {
                    baseConfig.assets.tiles[tileType] = await loadImage(tilePath);
                }
            }
        }

        // Load sound assets if provided
        if (baseConfig.assets.sounds && audioContext) {
            for (const soundType in baseConfig.assets.sounds) {
                const soundPath = baseConfig.assets.sounds[soundType];
                if (typeof soundPath === 'string') {
                    baseConfig.assets.sounds[soundType] = await loadSound(soundPath, audioContext);
                }
            }
        }
    }

    return baseConfig;
}

// Function to create and start a bonus game
export function startBonusGame(theme, canvas, ctx, options = {}) {
    if (!theme || !canvas || !ctx) {
        console.error('Missing required parameters for bonus game');
        return null;
    }

    const bonusGameConfig = options.bonusGameConfig || {};

    // Set up options for the board game
    const gameOptions = {
        canvas,
        ctx,
        scatter: options.scatter || 3,
        betAmount: options.betAmount || 10,
        audioContext: options.audioContext,
        masterGainNode: options.masterGainNode,
        soundEnabled: options.soundEnabled !== false,
        onComplete: options.onComplete || function (winAmount) {
            console.log(`Bonus game complete! Won: ${winAmount}`);
        },
        config: bonusGameConfig
    };

    // Create and start the board game
    const bonusGame = createBoardGameBonus(gameOptions);
    bonusGame.start();

    return bonusGame;
}

// Helper function to load an image
function loadImage(src) {
    return new Promise((resolve, reject) => {
        if (!src) {
            resolve(null);
            return;
        }

        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
            resolve(null);
        };
        img.src = src;
    });
}

// Helper function to load a sound file
async function loadSound(src, audioContext) {
    if (!src || !audioContext) {
        return null;
    }

    // Check if already loaded
    if (audioBuffers[src]) {
        return audioBuffers[src];
    }

    try {
        const response = await fetch(src);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        // Cache the decoded buffer
        audioBuffers[src] = audioBuffer;

        return audioBuffer;
    } catch (error) {
        console.error(`Error loading sound ${src}:`, error);
        return null;
    }
}
