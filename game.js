// Import themes FIRST
import { THEMES } from './themes/index.js'; // <-- Added Import
import {
    reelStrips,
    symbolNumberMultipliers,
    PAYOUT_RULES,
    PAYLINES,             // <-- Import PAYLINES
    MIN_WIN_LENGTH        // <-- Import MIN_WIN_LENGTH
} from './themes/config.js';// Game constants and variables
const REEL_COUNT = 5;
// const SYMBOL_COUNT = 5; // No longer needed directly, derived from theme
const SYMBOL_SIZE = 100; // Pixel size of each symbol
const REEL_SPIN_SPEED_FACTOR = 50; // Controls max speed (higher = faster) - ADJUST AS NEEDED
const SPIN_DURATION = 4000; // Base duration in ms
const DECELERATION_DURATION_RATIO = 0.4; // % of duration used for deceleration
const REEL_STAGGER_START = 80; // ms delay between reel starts
const REEL_STAGGER_STOP = 150; // ms added to duration for each subsequent reel
const DEFAULT_BALANCE = 1000;
const DEFAULT_BET = 10;
const VISIBLE_ROWS = 3; // Should always be 3 for this layout
const SYMBOLS_ON_STRIP = 30; // How many symbols on the virtual reel strip

// Game state
let canvas;
let ctx;
let balance = DEFAULT_BALANCE;
let betAmount = DEFAULT_BET;
let spinning = false;
let reels = []; // Holds reel state objects { position, symbols[], targetPosition, spinning, ... }
let currentReelResults = []; // Stores final symbol IDs [reelIndex][rowIndex] after spin
let winningLines = []; // Tracks which paylines resulted in wins
let payTable = [];
let spinHistory = [];
let backgroundParticles = [];
let lastTime = 0;
let winAnimationActive = false;
let confettiParticles = [];
let buttonEffects = {
    spin: { scale: 1, active: false, pressed: false },
    bet: { scale: 1, active: false, pressed: false, decreaseActive: false, increaseActive: false }
};

// Sound effects
let spinSound;
let winSound;
let buttonClickSound;
let soundEnabled = true;
let audioContext;
let audioBuffers = {}; // Store decoded audio buffers
let hasUserInteraction = false; // Track if user has interacted with the page

// DOM Elements
let balanceElement;
let betAmountElement;
let spinButton;
let decreaseBetButton;
let increaseBetButton;
let addCreditButton;
let paytableElement;
let historyElement;
let themeSwitcherElement; // <-- Added for clarity

// --- Game State Variable ---
let currentThemeName = "Classic"; // Default theme
let symbols = []; // Holds the currently loaded symbol objects for the active theme

// --- REMOVED OLD SYMBOLS and REEL_SETS ---
// const SYMBOLS = [ ... ]; // REMOVED
// const REEL_SETS = { ... }; // REMOVED

// --- Initialize game when all content is loaded ---
window.addEventListener('load', initGame);

function initGame() {
    // Get DOM elements
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    balanceElement = document.getElementById('balance');
    betAmountElement = document.getElementById('betAmount');
    spinButton = document.getElementById('spinButton'); // Keep reference for potential DOM button
    decreaseBetButton = document.getElementById('decreaseBet'); // Keep reference
    increaseBetButton = document.getElementById('increaseBet'); // Keep reference
    addCreditButton = document.getElementById('addCreditBtn');
    paytableElement = document.getElementById('paytableContent');
    historyElement = document.getElementById('spinHistory');
    themeSwitcherElement = document.getElementById('themeSwitcher');

    // Load sound effects
    loadSounds();

    // Set up event listeners
    if (spinButton) spinButton.addEventListener('click', () => { if (!spinning) spinReels(); });
    if (decreaseBetButton) decreaseBetButton.addEventListener('click', decreaseBet);
    if (increaseBetButton) increaseBetButton.addEventListener('click', increaseBet);
    addCreditButton.addEventListener('click', addCredit);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Set up the theme switcher UI
    setupThemeSwitcher();

    // --- Corrected Initialization Flow ---
    // 1. Validate shared config first
    if (!validateConfiguration()) {
        console.error("CRITICAL: Initial configuration validation failed. Game cannot start.");
        if (ctx) { // Display error on canvas if possible
            ctx.fillStyle = 'red'; ctx.font = '24px Arial'; ctx.textAlign = 'center';
            ctx.fillText("Configuration Error!", canvas.width / 2, canvas.height / 2);
        }
        return; // Stop initialization
    }

    // 2. Load initial theme's VISUALS
    loadThemeVisuals(currentThemeName).then(() => {
        // 3. Initialize reels using the validated GLOBAL config
        initReels();
        // 4. Update displays
        updateBalanceDisplay();
        updateBetDisplay(); // Also calls populatePaytable
        // 5. Start the game loop
        requestAnimationFrame(drawGame);
    }).catch(error => {
        console.error("Failed to initialize game after loading theme visuals:", error);
        // Handle initialization error (e.g., display error on canvas)
        if (ctx) {
            ctx.fillStyle = 'red'; ctx.font = '20px Arial'; ctx.textAlign = 'center';
            ctx.fillText("Theme Loading Error!", canvas.width / 2, canvas.height / 2);
        }
    });
    // --- End Corrected Flow ---
}

function validateConfiguration() {
    let isValid = true;
    if (!reelStrips || reelStrips.length !== REEL_COUNT) {
        console.error("Config Error: reelStrips is missing or doesn't have 5 reels.");
        isValid = false;
    } else {
        reelStrips.forEach((strip, i) => {
            if (!strip || strip.length === 0) {
                console.error(`Config Error: Reel strip ${i} is empty.`);
                isValid = false;
            } else {
                // Check if all indices are valid numbers (0-4 in this case)
                const validIndices = Object.keys(symbolNumberMultipliers).map(Number); // Get valid symbol numbers [0, 1, 2, 3, 4]
                if (strip.some(index => !validIndices.includes(index))) {
                    console.error(`Config Error: Reel strip ${i} contains invalid symbol numbers. Valid numbers are: ${validIndices.join(', ')}`, strip);
                    isValid = false;
                }
            }
        });
    }
    if (!symbolNumberMultipliers || Object.keys(symbolNumberMultipliers).length !== 5) { // Assuming 5 unique symbols 0-4
        console.error("Config Error: symbolNumberMultipliers is missing or doesn't define multipliers for numbers 0-4.");
        isValid = false;
    }
    if (!PAYOUT_RULES || !PAYOUT_RULES[3] || !PAYOUT_RULES[4] || !PAYOUT_RULES[5]) {
        console.error("Config Error: PAYOUT_RULES are missing or incomplete (need entries for 3, 4, 5).");
        isValid = false;
    }

    return isValid;
}

async function loadThemeVisuals(themeName) {
    console.log(`Attempting to load visuals for theme: ${themeName}`);
    const themeVisuals = THEMES[themeName];

    if (!themeVisuals || !themeVisuals.symbols || themeVisuals.symbols.length !== 5) { // Check for exactly 5 symbols
        console.error(`Theme visuals for "${themeName}" not found, invalid, or doesn't have exactly 5 symbols. Falling back to Classic.`);
        themeName = "Classic"; // Default fallback theme name
        themeVisuals = THEMES[themeName];
        if (!themeVisuals || !themeVisuals.symbols || themeVisuals.symbols.length !== 5) {
            console.error("CRITICAL: Fallback theme 'Classic' visuals also invalid or missing 5 symbols!");
            return Promise.reject(new Error("Failed to load any valid theme visuals."));
        }
    }

    currentThemeName = themeName;
    document.body.className = `theme-${themeName.toLowerCase().replace(/\s+/g, '-')}`;
    console.log(`Loading symbol visuals for theme: ${currentThemeName}`);
    symbols = []; // Clear existing symbols

    const themeSymbolsData = themeVisuals.symbols; // Get the 5 symbols

    const symbolPromises = themeSymbolsData.map((symbolData, index) => {
        // Basic validation of visual data
        if (!symbolData || !symbolData.path || !symbolData.name) {
            console.warn(`Invalid symbol visual data at index ${index} for theme ${themeName}`, symbolData);
            // Create a placeholder visual if needed
            symbols[index] = { name: `Symbol ${index}`, path: null, image: null, color: getRandomColor(), id: index };
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            const img = new Image();
            img.src = symbolData.path;
            const loadedSymbol = {
                ...symbolData, // name, path, winAnimation
                image: null,
                id: index // Store the index (0-4)
            };
            img.onload = () => {
                loadedSymbol.image = img;
                symbols[index] = loadedSymbol; // Place in correct index
                resolve();
            };
            img.onerror = (err) => {
                console.error(`Failed to load image for ${symbolData.name} (${symbolData.path}):`, err);
                loadedSymbol.color = getRandomColor();
                symbols[index] = loadedSymbol; // Place placeholder in correct index
                resolve();
            };
        });
    });

    await Promise.all(symbolPromises);

    // Ensure symbols array has 5 elements, even if some failed loading
    for (let i = 0; i < 5; i++) {
        if (!symbols[i]) {
            console.warn(`Symbol visual for index ${i} was missing after loading theme ${themeName}. Creating placeholder.`);
            symbols[i] = { name: `Symbol ${i}`, path: null, image: null, color: getRandomColor(), id: i };
        }
    }

    console.log(`Finished loading visuals for theme: ${themeName}. ${symbols.length} visual maps ready.`);
}

// --- Sound Loading and Playing (Using Web Audio API) ---
// ... (loadSounds, loadAudioBuffer, playSound functions remain the same) ...
function loadSounds() {
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        loadAudioBuffer('spin', 'sounds/spin.wav');
        loadAudioBuffer('win', 'sounds/win.wav');
        loadAudioBuffer('click', 'sounds/button-click.wav');

        // User interaction listener to unlock audio
        const unlockAudio = () => {
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
            hasUserInteraction = true;
            document.removeEventListener('click', unlockAudio);
            document.removeEventListener('touchstart', unlockAudio);
            document.removeEventListener('keydown', unlockAudio);
            console.log("Audio context resumed by user interaction.");
        };
        document.addEventListener('click', unlockAudio, { once: true });
        document.addEventListener('touchstart', unlockAudio, { once: true });
        document.addEventListener('keydown', unlockAudio, { once: true });

    } catch (e) {
        console.warn('Web Audio API not supported. Sound effects disabled.', e);
        soundEnabled = false;
    }
}

function loadAudioBuffer(id, url) {
    if (!audioContext) return Promise.reject("AudioContext not available");
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status} for ${url}`);
            return response.arrayBuffer();
        })
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            audioBuffers[id] = audioBuffer;
            console.log(`Loaded audio: ${id}`);
        })
        .catch(error => console.error(`Error loading audio ${id} from ${url}:`, error));
}

function playSound(id) {
    if (!soundEnabled || !hasUserInteraction || !audioBuffers[id] || !audioContext) {
        // console.log(`Sound ${id} blocked: enabled=${soundEnabled}, interaction=${hasUserInteraction}, buffer=${!!audioBuffers[id]}, context=${!!audioContext}`);
        return;
    }
    try {
        // Ensure context is running
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log("Audio context resumed for sound playback.");
                playSoundInternal(id);
            }).catch(err => console.error("Error resuming audio context:", err));
        } else {
            playSoundInternal(id);
        }
    } catch (error) {
        console.error(`Error initiating sound playback for ${id}:`, error);
    }
}

function playSoundInternal(id) {
    try {
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffers[id];
        source.connect(audioContext.destination);
        source.start(0);
    } catch (error) {
        console.error(`Error playing sound ${id} (internal):`, error);
    }
}


// --- Symbol Loading (REMOVED loadSymbols) ---
// async function loadSymbols() { ... } // REMOVED

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// --- Reel Initialization ---
// ... (initReels, generateReelSymbols functions remain largely the same, but use the global 'symbols' array) ...
function initReels() {
    reels = [];
    // Config is validated at startup, assume reelStrips is valid here
    // const configuredStrips = reelStrips; // Use imported global config

    for (let i = 0; i < REEL_COUNT; i++) {
        // Config validation moved to initGame
        reels.push({
            position: Math.floor(Math.random() * reelStrips[i].length), // Start random
            symbols: [...reelStrips[i]], // <-- LOAD the GLOBAL configured strip
            targetPosition: 0,
            spinning: false,
            startTime: 0,
            duration: 0,
            startPosition: 0,
            distance: 0,
        });
    }
    currentReelResults = Array(REEL_COUNT).fill(null).map(() => Array(VISIBLE_ROWS).fill(0));
    console.log("Reels initialized with GLOBAL configured strips.");
}



// --- Main Game Loop ---
// ... (drawGame function remains the same) ...
function drawGame(timestamp) {
    if (!ctx) return; // Ensure context is available

    // Calculate delta time for smooth animations
    if (!lastTime) lastTime = timestamp;
    const deltaTime = (timestamp - lastTime) / 1000.0; // Delta time in seconds
    lastTime = timestamp;

    // Throttle updates if delta time is too large (e.g., tabbed out)
    // const maxDeltaTime = 0.1; // 100ms max step
    // const clampedDeltaTime = Math.min(deltaTime, maxDeltaTime);
    // Use clampedDeltaTime for physics/animation updates if needed

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(timestamp); // Draw static or animated background
    drawReels(deltaTime); // Update and draw reels
    drawReelMask(); // Draw mask/overlay over reels if needed
    drawUIElements(); // Draw balance, bet, buttons

    if (!spinning && winningLines.length > 0) {
        drawWinLines(timestamp); // Draw winning line highlights
    }

    if (winAnimationActive) {
        drawWinCelebration(deltaTime); // Draw confetti etc.
    }

    requestAnimationFrame(drawGame);
}

// --- Drawing Functions ---
// ... (drawBackground, drawReels, drawReelMask functions remain the same) ...
function drawBackground(timestamp) {
    // Simple gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1a2e'); // Dark blue top
    gradient.addColorStop(1, '#2c3e50'); // Lighter slate bottom
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Optional: Add subtle background particles (keep simple)
    // ... (particle logic can be added back if desired) ...
}

function drawReels(deltaTime) {
    const reelWidth = SYMBOL_SIZE;
    const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1); // Dynamic spacing
    const startX = reelSpacing;
    const startY = 100; // Top Y of the reel viewport
    const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;

    for (let i = 0; i < REEL_COUNT; i++) {
        const reel = reels[i];
        if (!reel) continue; // Safety check
        const reelX = startX + i * (reelWidth + reelSpacing);

        // --- Animate Reel Position if Spinning ---
        if (reel.spinning) {
            updateReelPosition(reel, Date.now()); // Pass current time
        }

        // --- Draw Symbols for this Reel ---
        ctx.save();
        // Define a clipping region for the viewport
        ctx.beginPath();
        ctx.rect(reelX, startY, reelWidth, reelViewportHeight);
        ctx.clip(); // Clip anything drawn outside this rectangle

        const numSymbolsOnStrip = reel.symbols.length;
        if (numSymbolsOnStrip === 0) { // Prevent division by zero if symbols failed
            ctx.restore();
            continue;
        }

        const currentPosition = reel.position; // Fractional index

        // Calculate the index of the symbol currently nearest the top edge of the viewport
        const topVisibleSymbolIndex = Math.floor(currentPosition);

        // Calculate the pixel offset (how much the top symbol is shifted *up*)
        const verticalOffset = (currentPosition - topVisibleSymbolIndex) * SYMBOL_SIZE;

        // Draw enough symbols to cover the viewport + one above and one below for smooth scrolling
        for (let j = -1; j <= VISIBLE_ROWS; j++) {
            const symbolStripIndex = (topVisibleSymbolIndex + j + numSymbolsOnStrip) % numSymbolsOnStrip;
            const symbolId = reel.symbols[symbolStripIndex];
            const symbol = symbols[symbolId]; // Get the symbol object from the currently loaded theme

            // Calculate the Y position for the top of this symbol
            // Start at the top of the viewport, add offset based on j, then subtract the fractional offset
            const symbolTopY = startY + (j * SYMBOL_SIZE) - verticalOffset;

            // Check if the symbol is within the vertical bounds (+ buffer) before drawing
            if (symbolTopY + SYMBOL_SIZE >= startY && symbolTopY <= startY + reelViewportHeight) {
                // Draw the symbol if we have valid data
                if (symbol) {
                    if (symbol.image && symbol.image.complete && symbol.image.naturalHeight !== 0) { // Check if image is actually loaded
                        ctx.drawImage(symbol.image, reelX, symbolTopY, SYMBOL_SIZE, SYMBOL_SIZE);
                    } else {
                        // Fallback drawing if image failed to load or isn't ready
                        ctx.fillStyle = symbol.color || '#cccccc';
                        ctx.fillRect(reelX, symbolTopY, SYMBOL_SIZE, SYMBOL_SIZE);
                        ctx.fillStyle = '#000000';
                        ctx.font = '16px Arial';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(symbol.name ? symbol.name.substring(0, 1) : '?', reelX + SYMBOL_SIZE / 2, symbolTopY + SYMBOL_SIZE / 2);
                    }
                } else {
                    // Draw placeholder if symbol ID is somehow invalid for the current theme
                    ctx.fillStyle = '#555555';
                    ctx.fillRect(reelX, symbolTopY, SYMBOL_SIZE, SYMBOL_SIZE);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('?', reelX + SYMBOL_SIZE / 2, symbolTopY + SYMBOL_SIZE / 2);
                    // console.warn(`Invalid symbol ID ${symbolId} encountered on reel ${i}`);
                }
            }
        }
        ctx.restore(); // Remove clipping region
    }
}

function drawReelMask() {
    const reelWidth = SYMBOL_SIZE;
    const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
    const startX = reelSpacing;
    const startY = 100;
    const reelViewportHeight = SYMBOL_SIZE * VISIBLE_ROWS;
    const totalWidth = REEL_COUNT * reelWidth + (REEL_COUNT - 1) * reelSpacing;

    // Draw a border around the entire reel area
    ctx.strokeStyle = '#ffcc00'; // Gold border
    ctx.lineWidth = 5;
    ctx.strokeRect(startX - ctx.lineWidth / 2, startY - ctx.lineWidth / 2, totalWidth + ctx.lineWidth, reelViewportHeight + ctx.lineWidth);

    // Draw separators between reels
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    for (let i = 1; i < REEL_COUNT; i++) {
        const lineX = startX + i * reelWidth + (i - 0.5) * reelSpacing;
        ctx.beginPath();
        ctx.moveTo(lineX, startY);
        ctx.lineTo(lineX, startY + reelViewportHeight);
        ctx.stroke();
    }
}

function spinReels() {
    if (spinning) return;
    if (balance < betAmount) {
        console.warn("Insufficient balance!");
        // Add visual feedback if desired
        return;
    }
    // Basic check: Ensure reels and their symbols are loaded
    if (!reels || reels.length !== REEL_COUNT || reels.some(r => !r || !r.symbols || r.symbols.length === 0)) {
        console.error("Cannot spin: Reels not properly initialized with valid strips.");
        return;
    }


    playSound('spin');
    balance -= betAmount;
    updateBalanceDisplay();

    spinning = true;
    winningLines = [];
    winAnimationActive = false;
    confettiParticles = [];
    buttonEffects.spin.pressed = false;

    let maxDuration = 0;
    let spinStartTime = Date.now();

    // --- NEW CORE LOGIC ---
    const stopIndexes = []; // Store the chosen random stop index for each reel

    for (let i = 0; i < REEL_COUNT; i++) {
        const reel = reels[i];
        reel.spinning = true;

        // 1. Determine Random Stop Position for this reel
        const reelLength = reel.symbols.length;
        const stopIndex = Math.floor(Math.random() * reelLength); // Random index on the virtual strip
        stopIndexes.push(stopIndex); // Store it - this index will align with the middle row

        // 2. Set Animation Target
        reel.targetPosition = stopIndex; // The animation will stop with this index in the middle row

        // 3. Calculate Animation Parameters (Mostly same as before)
        reel.startTime = spinStartTime + i * REEL_STAGGER_START;
        reel.duration = SPIN_DURATION + i * REEL_STAGGER_STOP;
        reel.startPosition = reel.position; // Current visual position

        // Calculate distance needed to land targetPosition at the middle row visual top (which is index targetPosition)
        const currentPositionMod = reel.startPosition % reelLength;
        let difference = (reel.targetPosition - currentPositionMod + reelLength) % reelLength;
        if (difference < 1 && reel.duration > 0) { // Ensure at least one full rotation if not already there
            difference += reelLength;
        }

        const rotations = 3 + Math.floor(i / 2); // Add rotations for visual effect
        reel.distance = (rotations * reelLength) + difference;

        // --- REMOVE symbol overwriting ---
        // DELETE the lines like: reel.symbols[finalMiddleStripIndex] = ...

        // Track max duration
        const reelEndTime = reel.startTime + reel.duration;
        if (reelEndTime > maxDuration) {
            maxDuration = reelEndTime;
        }
    }

    // --- REMOVE finalResultsGrid generation ---
    // DELETE the loop that created finalResultsGrid upfront

    // Schedule completion check (same as before, but it will now *read* results)
    const completionDelay = Math.max(0, maxDuration - Date.now() + 100);
    setTimeout(() => spinCompleted(stopIndexes), completionDelay); // Pass stopIndexes if needed, or read from reels later
}


function updateReelPosition(reel, currentTime) {
    const elapsed = currentTime - reel.startTime;

    if (elapsed < 0) return; // Not started yet (due to stagger)

    if (elapsed >= reel.duration) {
        // --- Animation End ---
        reel.position = reel.targetPosition; // Snap precisely to the target integer index
        reel.spinning = false;
        // Clean up animation vars? Optional.
        // delete reel.startPosition;
        // delete reel.startTime;
        // delete reel.duration;
        // delete reel.distance;
        return;
    }

    // --- Animation In Progress ---
    const progress = elapsed / reel.duration; // Overall progress (0 to 1)

    // Calculate eased progress for smooth deceleration
    // Use easeOutQuart: (1 - (1-t)^4)
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easedProgress = easeOutQuart(progress);

    // Calculate the new position based on eased progress
    // The total distance to cover is reel.distance
    // The new position is start + (total distance * eased progress)
    let newPosition = reel.startPosition + reel.distance * easedProgress;

    // Position here represents the index at the *top* of the viewport.
    // We don't apply modulo here; the drawing function handles wrapping visuals.
    reel.position = newPosition;
}

// Modify spinCompleted to accept stopIndexes or read from reels
function spinCompleted() {
    // Force reels to their final position if any are still marked as spinning
    reels.forEach(reel => {
        if (reel?.spinning) {
            console.warn("SpinCompleted called while a reel was still marked spinning. Snapping to target.");
            // Snap position first for visual consistency before reading results
            reel.position = reel.targetPosition;
            reel.spinning = false;
        }
        // Ensure position is precisely the target integer after potential floating point issues/early call
        reel.position = reel.targetPosition;
    });

    spinning = false; // Set global flag

    // --- READ the visible symbols CORRECTLY based on drawReels logic ---
    currentReelResults = []; // Reset results grid
    for (let i = 0; i < REEL_COUNT; i++) {
        const reel = reels[i];
        const reelLength = reel.symbols.length;

        // targetPosition is the index intended to be at the TOP of the viewport when stopped
        // (because drawReels uses floor(position) as the top visible index)
        const finalTopIndex = Math.round(reel.targetPosition) % reelLength; // Index T

        // Calculate indices for middle and bottom rows relative to the top row index
        const finalMiddleIndex = (finalTopIndex + 1) % reelLength;        // Index T+1
        const finalBottomIndex = (finalTopIndex + 2) % reelLength;        // Index T+2

        // Get the actual symbol IDs from the configured reel strip at these visual positions
        const topSymbolId = reel.symbols[finalTopIndex];
        const middleSymbolId = reel.symbols[finalMiddleIndex];
        const bottomSymbolId = reel.symbols[finalBottomIndex];

        // Store results in [Top, Middle, Bottom] order
        currentReelResults[i] = [topSymbolId, middleSymbolId, bottomSymbolId];
    }
    console.log("Final Visible Results (Read Correctly):", currentReelResults); // DEBUG

    // --- Check for Wins (using the *actual* visual results) ---
    checkWinAndFinalize(); // This function remains the same as it uses currentReelResults
}

function checkWinAndFinalize() {
    spinning = false; // Set global spinning flag to false
    // Re-enable UI elements visually if needed (state check in drawUI handles this)

    // Check for wins using the stored currentReelResults
    const winInfo = checkWin(); // Returns null or win details object

    if (winInfo && winInfo.totalAmount > 0) {
        balance += winInfo.totalAmount;
        updateBalanceDisplay();
        playSound('win');
        // Add to history (use info from winInfo or winningLines)
        addToHistory(true, winInfo.bestMatch.symbolName, winInfo.bestMatch.count, winInfo.totalAmount);
        // Trigger win celebration if significant win
        if (winInfo.totalAmount >= betAmount * 5) { // Example threshold
            triggerWinCelebration(winInfo.totalAmount);
        }
    } else {
        // Get middle symbol NUMBERS for loss history
        try {
            const middleSymbolNumbers = currentReelResults.map(reelResult => reelResult[1]); // Get middle number (0-4)
            addToHistory(false, `Middle: ${middleSymbolNumbers.join(', ')}`, 0, 0); // Pass numbers
        } catch (e) {
            console.error("Error getting middle symbol numbers for history:", e, currentReelResults);
            addToHistory(false, "Spin finished", 0, 0);
        }
    }

    // Ensure button states are reset visually if needed
    buttonEffects.spin.pressed = false;
    // Hover states will be updated by mousemove
}


// --- Win Checking (Uses Config Multipliers) ---
function checkWin() {
    // Basic validation
    if (!currentReelResults || currentReelResults.length !== REEL_COUNT || !currentReelResults[0]) {
        console.error("Win check called with invalid results grid.");
        return null;
    }
    if (symbols.length !== 5) {
        console.error("Win check called but theme visuals (symbols array) not correctly loaded.");
        return null;
    }
    if (!PAYLINES || PAYLINES.length === 0) {
        console.error("Win check called but no PAYLINES are defined in config.");
        return null;
    }

    // --- DEBUG LOG: Starting checkWin with current results ---
    try {
        console.log("[DEBUG] checkWin - Starting. Results Grid:", JSON.parse(JSON.stringify(currentReelResults)));
    } catch (e) {
        console.error("[DEBUG] checkWin - Error stringifying currentReelResults:", e);
        console.log("[DEBUG] checkWin - Raw currentReelResults:", currentReelResults);
    }


    winningLines = []; // Reset winning lines array for this spin
    let totalWinAmount = 0;
    let bestMatchDetails = null; // Track the single highest multiplier win

    // --- Iterate through each defined PAYLINE ---
    PAYLINES.forEach((payline, paylineIndex) => {
        // --- DEBUG LOG: Checking specific payline ---
        console.log(`[DEBUG] checkWin - Checking Payline ${paylineIndex}`);

        // 1. Get the symbol on the first reel of this payline
        const firstReelPos = payline[0];
        // Check if results grid has data for this position
        if (!currentReelResults[firstReelPos.reel] || currentReelResults[firstReelPos.reel][firstReelPos.row] === undefined) {
            console.warn(`[DEBUG] checkWin - Payline ${paylineIndex}: Missing result data at Reel ${firstReelPos.reel}, Row ${firstReelPos.row}`);
            return; // Skip this payline if data is missing
        }
        const winningSymbolNumber = currentReelResults[firstReelPos.reel][firstReelPos.row];
        const visualSymbol = symbols[winningSymbolNumber]; // Get visual data
        const baseMultiplier = symbolNumberMultipliers[winningSymbolNumber];

        // --- DEBUG LOG: Payline starting symbol and multiplier ---
        console.log(`[DEBUG] checkWin - Payline ${paylineIndex} starts with symbol#: ${winningSymbolNumber} (Name: ${visualSymbol?.name || 'N/A'}) at [${firstReelPos.reel},${firstReelPos.row}]. Base Multiplier: ${baseMultiplier}`);


        // Skip if the first symbol is invalid or doesn't have a multiplier
        if (!visualSymbol || baseMultiplier === undefined || baseMultiplier <= 0) {
            // --- DEBUG LOG: Skipping invalid start symbol ---
            console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Symbol ${winningSymbolNumber} is not a valid winning start.`);
            return; // Not a paying symbol start
        }

        // 2. Count consecutive matching symbols along the payline from left-to-right
        let consecutiveCount = 1;
        let winningPositionsOnThisLine = [firstReelPos]; // Start with the first position

        for (let i = 1; i < payline.length; i++) { // Start checking from the second position on the line
            const pos = payline[i];
            // Check if reel index is within bounds
            if (pos.reel >= currentReelResults.length) {
                console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Reel index ${pos.reel} out of bounds.`);
                break;
            }
            // Check if result data exists
            if (!currentReelResults[pos.reel] || currentReelResults[pos.reel][pos.row] === undefined) {
                console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Result data missing at [${pos.reel}, ${pos.row}].`);
                break; // Stop if data missing
            }

            const currentSymbolNumber = currentReelResults[pos.reel][pos.row];

            // --- DEBUG LOG: Checking next position on the line ---
            console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Checking pos [${pos.reel},${pos.row}]. Found Symbol#: ${currentSymbolNumber}. Need Symbol#: ${winningSymbolNumber}`);

            // --- Check for Match ---
            if (currentSymbolNumber === winningSymbolNumber) {
                consecutiveCount++;
                winningPositionsOnThisLine.push(pos); // Add matching position
                console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Match found! Count is now ${consecutiveCount}`);
            } else {
                console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Sequence broken at Reel ${pos.reel}.`);
                break; // Sequence broken
            }
        }

        // --- DEBUG LOG: Final consecutive count for this line ---
        console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Final Consecutive Count = ${consecutiveCount}`);

        // 3. Check if the count meets the minimum length and has a payout rule
        const minWin = MIN_WIN_LENGTH || 3; // Use configured minimum or default to 3
        if (consecutiveCount >= minWin && PAYOUT_RULES[consecutiveCount]) {
            const countMultiplier = PAYOUT_RULES[consecutiveCount];
            const finalMultiplier = baseMultiplier * countMultiplier;
            const winAmount = finalMultiplier * betAmount;

            // --- DEBUG LOG: Checking payout condition ---
            console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Count ${consecutiveCount} >= ${minWin}. Rule multiplier ${countMultiplier}. Final multiplier ${finalMultiplier}. Win amount ${winAmount}`);

            // Only add if win amount is greater than 0
            if (winAmount > 0) {
                // --- DEBUG LOG: *** WIN DETECTED *** ---
                console.log(`%c[DEBUG] checkWin - *** WIN FOUND on Payline ${paylineIndex}! Symbol: ${winningSymbolNumber}, Count: ${consecutiveCount}, Amount: ${winAmount} ***`, "color: lime; font-weight: bold;");

                totalWinAmount += winAmount;

                const winLineData = {
                    paylineId: paylineIndex,
                    symbolName: visualSymbol.name,
                    symbolIndex: winningSymbolNumber,
                    positions: winningPositionsOnThisLine,
                    count: consecutiveCount,
                    multiplier: finalMultiplier,
                    amount: winAmount
                };
                winningLines.push(winLineData); // Add this winning line result

                // Update best overall match details based on multiplier
                if (!bestMatchDetails || finalMultiplier > bestMatchDetails.multiplier) {
                    bestMatchDetails = {
                        paylineId: paylineIndex,
                        symbolName: visualSymbol.name,
                        multiplier: finalMultiplier,
                        count: consecutiveCount,
                        amount: winAmount
                    };
                    console.log(`[DEBUG] checkWin - Updated bestMatchDetails.`);
                }
            } else {
                console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Calculated win amount is 0, not adding.`);
            }
        } else {
            // --- DEBUG LOG: Win condition not met ---
            console.log(`[DEBUG] checkWin - Payline ${paylineIndex}: Win condition not met (Count ${consecutiveCount} < ${minWin} or no PAYOUT_RULE for ${consecutiveCount}).`);
        }
    }); // --- End of PAYLINES loop ---

    // --- DEBUG LOG: Final result of checkWin ---
    try {
        console.log(`[DEBUG] checkWin - Complete. totalWinAmount=${totalWinAmount}. Final winningLines:`, JSON.parse(JSON.stringify(winningLines)));
    } catch (e) {
        console.error("[DEBUG] checkWin - Error stringifying final winningLines:", e);
        console.log("[DEBUG] checkWin - Raw final winningLines:", winningLines);
    }

    if (totalWinAmount > 0) {
        return {
            totalAmount: totalWinAmount,
            bestMatch: bestMatchDetails,
            allLines: winningLines
        };
    } else {
        return null; // No win on any payline
    }
}


// --- UI Drawing and Interaction ---
// ... (drawUIElements, drawText, drawRoundedRect functions remain the same) ...
// ... (handleMouseMove, handleMouseDown, handleMouseUp, getMousePos, isMouseOver functions remain the same) ...
function drawUIElements() {
    const padding = 15; // Padding inside the boxes

    // Draw Balance Display
    const balanceX = 50;
    const balanceY = canvas.height - 80;
    const balanceWidth = 200;
    const balanceHeight = 50;
    drawRoundedRect(balanceX, balanceY, balanceWidth, balanceHeight, 8, 'rgba(0, 0, 0, 0.6)', '#ffcc00', 2);
    // Label aligned left
    drawText('BALANCE:', balanceX + padding, balanceY + balanceHeight / 2, 'bold 18px Arial', '#ffcc00', 'left', 'middle');
    // Amount aligned right
    drawText(balance.toLocaleString(), balanceX + balanceWidth - padding, balanceY + balanceHeight / 2, 'bold 22px Arial', '#ffffff', 'right', 'middle'); // Use toLocaleString for formatting

    // Draw Bet Display and Buttons
    const betWidth = 150;
    const betHeight = 50;
    const betX = canvas.width / 2 - betWidth / 2;
    const betY = canvas.height - 80;
    const adjustBtnSize = 40;
    const decreaseBtnX = betX - adjustBtnSize - 10;
    const increaseBtnX = betX + betWidth + 10;
    const adjustBtnY = betY + (betHeight - adjustBtnSize) / 2;

    // Bet Amount Box
    drawRoundedRect(betX, betY, betWidth, betHeight, 8, 'rgba(0, 0, 0, 0.6)', '#ffcc00', 2);
    drawText('BET:', betX + padding, betY + betHeight / 2, 'bold 18px Arial', '#ffcc00', 'left', 'middle');
    drawText(betAmount.toString(), betX + betWidth - padding, betY + betHeight / 2, 'bold 22px Arial', '#ffffff', 'right', 'middle');

    // Decrease Bet Button (-) - Only draw if not spinning
    const decColor = buttonEffects.bet.decreaseActive ? '#cc9900' : '#ffcc00';
    const decFill = spinning ? '#555555' : decColor; // Grey out if spinning
    const decStroke = spinning ? '#888888' : '#ffffff';
    drawRoundedRect(decreaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize, 5, decFill, decStroke, 2);
    drawText('-', decreaseBtnX + adjustBtnSize / 2, adjustBtnY + adjustBtnSize / 2 + 1, 'bold 30px Arial', spinning ? '#aaaaaa' : '#1a1a2e', 'center', 'middle');

    // Increase Bet Button (+) - Only draw if not spinning
    const incColor = buttonEffects.bet.increaseActive ? '#cc9900' : '#ffcc00';
    const incFill = spinning ? '#555555' : incColor; // Grey out if spinning
    const incStroke = spinning ? '#888888' : '#ffffff';
    drawRoundedRect(increaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize, 5, incFill, incStroke, 2);
    drawText('+', increaseBtnX + adjustBtnSize / 2, adjustBtnY + adjustBtnSize / 2 + 1, 'bold 30px Arial', spinning ? '#aaaaaa' : '#1a1a2e', 'center', 'middle');


    // Draw Spin Button
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;
    const spinBtnX = canvas.width - spinBtnWidth - 50; // Positioned from right edge
    const spinBtnY = canvas.height - 80;

    // Apply scale effect (subtle hover)
    const targetScale = buttonEffects.spin.active && !spinning ? 1.05 : 1.0; // Only hover if not spinning
    buttonEffects.spin.scale += (targetScale - buttonEffects.spin.scale) * 0.2; // Smooth transition

    // Apply pressed effect
    let buttonShiftY = buttonEffects.spin.pressed && !spinning ? 3 : 0; // Only press if not spinning

    // Set button color based on state
    let btnGradientColors;
    if (spinning) {
        // Disabled look
        btnGradientColors = ['#666666', '#444444'];
    } else if (buttonEffects.spin.pressed) {
        // Pressed look
        btnGradientColors = ['#cc2855', '#dd0022'];
    } else if (buttonEffects.spin.active) {
        // Hover look (slightly brighter/different)
        btnGradientColors = ['#ff5588', '#ff2255'];
    }
    else {
        // Default look
        btnGradientColors = ['#ff3366', '#ff0033'];
    }

    const btnGradient = ctx.createLinearGradient(0, spinBtnY, 0, spinBtnY + spinBtnHeight);
    btnGradient.addColorStop(0, btnGradientColors[0]);
    btnGradient.addColorStop(1, btnGradientColors[1]);

    ctx.save();
    // Translate for scaling and pressing, centered on the button
    ctx.translate(spinBtnX + spinBtnWidth / 2, spinBtnY + spinBtnHeight / 2);
    ctx.scale(buttonEffects.spin.scale, buttonEffects.spin.scale);
    ctx.translate(-(spinBtnX + spinBtnWidth / 2), -(spinBtnY + spinBtnHeight / 2 + buttonShiftY)); // Apply shift *after* scaling rotation point

    // Draw the button shape
    const spinStrokeColor = spinning ? '#888888' : '#ffffff';
    drawRoundedRect(spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight, 10, btnGradient, spinStrokeColor, 2);

    // Draw text (adjust position slightly because of translation if needed, though center align helps)
    const spinTextColor = spinning ? '#aaaaaa' : '#ffffff';
    drawText('SPIN', spinBtnX + spinBtnWidth / 2, spinBtnY + spinBtnHeight / 2 + 1, 'bold 24px Arial', spinTextColor, 'center', 'middle');

    ctx.restore();
}

function drawText(text, x, y, font, color, align = 'left', baseline = 'top') {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
}

function drawRoundedRect(x, y, width, height, radius, fillStyle, strokeStyle, lineWidth) {
    ctx.beginPath();
    // Ensure radius is not too large for the rectangle dimensions
    const maxRadius = Math.min(width / 2, height / 2);
    const actualRadius = Math.min(radius, maxRadius);

    if (ctx.roundRect) {
        // Use native roundRect if available
        ctx.roundRect(x, y, width, height, actualRadius);
    } else {
        // Fallback for older browsers
        ctx.moveTo(x + actualRadius, y);
        ctx.lineTo(x + width - actualRadius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + actualRadius);
        ctx.lineTo(x + width, y + height - actualRadius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - actualRadius, y + height);
        ctx.lineTo(x + actualRadius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - actualRadius);
        ctx.lineTo(x, y + actualRadius);
        ctx.quadraticCurveTo(x, y, x + actualRadius, y);
    }
    ctx.closePath();

    if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
    if (strokeStyle && lineWidth > 0) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

function handleMouseMove(e) {
    if (spinning) { // Don't update hover effects while spinning
        buttonEffects.spin.active = false;
        buttonEffects.bet.decreaseActive = false;
        buttonEffects.bet.increaseActive = false;
        return;
    }
    const { mouseX, mouseY } = getMousePos(e);

    // Check Spin Button
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;
    const spinBtnX = canvas.width - spinBtnWidth - 50;
    const spinBtnY = canvas.height - 80;
    buttonEffects.spin.active = isMouseOver(mouseX, mouseY, spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight);

    // Check Bet Buttons
    const betWidth = 150;
    const betX = canvas.width / 2 - betWidth / 2;
    const betY = canvas.height - 80;
    const adjustBtnSize = 40;
    const betHeight = 50;
    const decreaseBtnX = betX - adjustBtnSize - 10;
    const increaseBtnX = betX + betWidth + 10;
    const adjustBtnY = betY + (betHeight - adjustBtnSize) / 2;
    buttonEffects.bet.decreaseActive = isMouseOver(mouseX, mouseY, decreaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize);
    buttonEffects.bet.increaseActive = isMouseOver(mouseX, mouseY, increaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize);
}

function handleMouseDown(e) {
    if (spinning) return; // Ignore clicks while spinning

    const { mouseX, mouseY } = getMousePos(e);

    // Check Spin Button Click
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;
    const spinBtnX = canvas.width - spinBtnWidth - 50;
    const spinBtnY = canvas.height - 80;
    if (isMouseOver(mouseX, mouseY, spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight)) {
        buttonEffects.spin.pressed = true;
        playSound('click');
        // Trigger spin slightly delayed to show press, then reset press state visually
        setTimeout(() => {
            spinReels();
            // No need to reset pressed here, spinReels start handles it
        }, 100); // Short delay to see the press
    }

    // Check Bet Buttons Click
    const betWidth = 150;
    const betX = canvas.width / 2 - betWidth / 2;
    const betY = canvas.height - 80;
    const adjustBtnSize = 40;
    const betHeight = 50;
    const decreaseBtnX = betX - adjustBtnSize - 10;
    const increaseBtnX = betX + betWidth + 10;
    const adjustBtnY = betY + (betHeight - adjustBtnSize) / 2;

    if (isMouseOver(mouseX, mouseY, decreaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize)) {
        playSound('click');
        decreaseBet();
        // Visual feedback is handled by hover state change + maybe draw state change if needed
    } else if (isMouseOver(mouseX, mouseY, increaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize)) {
        playSound('click');
        increaseBet();
        // Visual feedback handled by hover state
    }
}

function handleMouseUp(e) {
    // Reset pressed state for the spin button when mouse is released, *if* not spinning
    if (buttonEffects.spin.pressed && !spinning) {
        buttonEffects.spin.pressed = false;
        // Check if the mouse is still over the button to maintain active state
        handleMouseMove(e);
    }
}

function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        mouseX: (e.clientX - rect.left) * scaleX,
        mouseY: (e.clientY - rect.top) * scaleY
    };
}

function isMouseOver(mouseX, mouseY, x, y, width, height) {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
}


// --- Win Line Drawing ---
function drawWinLines(timestamp) {
    // No change needed at the start (check winningLines)
    if (!winningLines || winningLines.length === 0) return;

    const reelWidth = SYMBOL_SIZE;
    const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
    const startX = reelSpacing;
    const startY = 100;
    const symbolCenterOffsetY = SYMBOL_SIZE / 2;
    const symbolCenterOffsetX = SYMBOL_SIZE / 2;

    const flash = Math.floor(timestamp / 300) % 2 === 0; // Flash effect toggle

    // Define line colors - cycle through them for multiple winning lines
    const lineColors = ['#ff3366', '#ffcc00', '#4caf50', '#2196f3', '#9c27b0', '#ff9800', '#00bcd4', '#e91e63'];    // --- Iterate through EACH winning line found ---
    winningLines.forEach((lineData, lineIndex) => {
        if (!lineData || !lineData.positions || lineData.positions.length < MIN_WIN_LENGTH) return; // Safety check

        const color = lineColors[lineIndex % lineColors.length]; // Cycle colors per line

        // --- Draw the specific line segment connecting winning positions ---
        ctx.strokeStyle = flash ? color : '#ffffff'; // Use assigned color with flash
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = 0.85;

        ctx.beginPath();
        for (let k = 0; k < lineData.positions.length; k++) { // Iterate ONLY through positions of THIS line
            const pos = lineData.positions[k];
            // Fix: Use 'reel' and 'row' from the position objects (not reelIndex/rowIndex)
            const x = startX + pos.reel * (reelWidth + reelSpacing) + symbolCenterOffsetX;
            const y = startY + pos.row * SYMBOL_SIZE + symbolCenterOffsetY;

            if (k === 0) {
                ctx.moveTo(x, y); // Start the line path
            } else {
                ctx.lineTo(x, y); // Draw segment to the next point on this line
            }
        }
        ctx.stroke(); // Draw the complete line segment for this winning line
        ctx.globalAlpha = 1.0; // Reset alpha        // --- Highlight Symbols ON THIS LINE ---
        lineData.positions.forEach(pos => {
            const symbolData = symbols[lineData.symbolIndex]; // Get visual data
            if (!symbolData) return;

            // Fix: Use 'reel' and 'row' properties consistent with line drawing
            const x = startX + pos.reel * (reelWidth + reelSpacing);
            const y = startY + pos.row * SYMBOL_SIZE;
            const highlightColor = flash ? color : '#ffffff'; // Match line color
            let highlightInset = 4;
            let highlightLineWidth = 3;

            if (symbolData.winAnimation) {
                // Mark specific instances? Tricky without unique IDs.
                // For now, just pulse any symbol matching the winning type.
                // A better approach might involve tagging specific drawn instances.
                // Let's keep the existing pulse logic based on symbol type for now.
                if (symbolData.winAnimation.lastUpdate === undefined) symbolData.winAnimation.lastUpdate = timestamp;
                if (timestamp - symbolData.winAnimation.lastUpdate > symbolData.winAnimation.frameRate) {
                    symbolData.winAnimation.currentFrame = (symbolData.winAnimation.currentFrame + 1) % symbolData.winAnimation.frames;
                    symbolData.winAnimation.lastUpdate = timestamp;
                }
                const pulseFactor = Math.sin((symbolData.winAnimation.currentFrame / symbolData.winAnimation.frames) * Math.PI);
                highlightInset = 4 - pulseFactor * 2;
                highlightLineWidth = 3 + pulseFactor * 2;
            }

            ctx.strokeStyle = highlightColor;
            ctx.lineWidth = highlightLineWidth;
            drawRoundedRect(x + highlightInset, y + highlightInset, SYMBOL_SIZE - 2 * highlightInset, SYMBOL_SIZE - 2 * highlightInset, 5, null, highlightColor, highlightLineWidth);
        });
    }); // --- End of winningLines loop ---


    // --- Display Total Win Amount (No change needed here) ---
    const totalWin = winningLines.reduce((sum, line) => sum + line.amount, 0);
    if (totalWin > 0) {
        let winTextY = startY + SYMBOL_SIZE * VISIBLE_ROWS + 50;
        const winTextX = canvas.width / 2;
        // ... (rest of win amount drawing logic remains the same) ...
        const pulse = Math.sin(timestamp / 200) * 0.05 + 1;
        const baseFontSize = 36;
        const fontSize = Math.floor(baseFontSize * pulse);
        const glowIntensity = Math.abs(Math.sin(timestamp / 350)) * 10 + 5;
        const glowColor = `rgba(255, 223, 0, ${0.6 + Math.abs(Math.sin(timestamp / 350)) * 0.4})`;

        ctx.save();
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowIntensity;
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`WIN: ${totalWin.toLocaleString()}`, winTextX, winTextY);
        ctx.restore();
    }
}


// --- Win Celebration ---
// ... (triggerWinCelebration, drawWinCelebration functions remain the same) ...
function triggerWinCelebration(amount) {
    winAnimationActive = true;
    confettiParticles = []; // Clear existing
    // More particles for bigger wins relative to bet, capped
    const particleCount = Math.min(150, Math.max(30, Math.floor(amount / (betAmount * 0.1))));

    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height * 0.3 - 20, // Start further above screen
            size: Math.random() * 10 + 5, // Slightly larger confetti
            color: `hsl(${Math.random() * 360}, 90%, 65%)`, // Brighter colors
            speedX: (Math.random() - 0.5) * 8, // Faster horizontal spread
            speedY: Math.random() * 6 + 3, // Initial downward speed
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 15, // Faster rotation
            opacity: 1,
            life: 1.0 // Lifetime factor (1 = full life)
        });
    }

    // Auto-stop after a reasonable duration
    setTimeout(() => {
        winAnimationActive = false;
        // Particles will fade out naturally based on their life
    }, 5000); // Longer celebration
}

function drawWinCelebration(deltaTime) {
    if (!winAnimationActive && confettiParticles.length === 0) return; // Stop drawing if not active and no particles left

    const gravity = 250 * deltaTime; // Slightly stronger gravity

    let activeParticles = false; // Flag to check if any particles are still visible

    confettiParticles.forEach((p, index) => {
        // Update position
        p.x += p.speedX * deltaTime;
        p.y += p.speedY * deltaTime;
        p.speedY += gravity; // Apply gravity
        p.rotation += p.rotSpeed * deltaTime;
        p.speedX *= 0.99; // Air resistance for horizontal movement

        // Fade out based on lifetime or position
        if (p.y > canvas.height + p.size) { // Check if fully off screen
            p.life -= deltaTime * 1.5; // Fade out faster once below screen
        } else {
            p.life -= deltaTime * 0.20; // Slower fade while visible
        }
        p.opacity = Math.max(0, p.life);

        // Remove dead particles immediately
        if (p.opacity <= 0) {
            confettiParticles.splice(index, 1);
            return; // Skip drawing this particle
        }

        activeParticles = true; // Mark that there are still active particles

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        // Simple rectangle shape for confetti
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
    });

    // If the animation timed out and particles finished, ensure state is off
    if (!activeParticles) {
        winAnimationActive = false;
    }
}


// --- Bet/Balance Management ---
// ... (decreaseBet, increaseBet, addCredit functions remain the same) ...
// ... (updateBalanceDisplay remains the same) ...

function decreaseBet() {
    if (spinning) return;
    // Define bet levels dynamically or keep fixed
    const betOptions = [5, 10, 20, 50, 100, 200]; // Example levels
    let currentIndex = betOptions.indexOf(betAmount);
    if (currentIndex > 0) {
        betAmount = betOptions[currentIndex - 1];
        updateBetDisplay(); // Updates display AND paytable
    }
    // else: Optionally play a 'min bet' sound/visual cue
}

function increaseBet() {
    if (spinning) return;
    const betOptions = [5, 10, 20, 50, 100, 200]; // Example levels
    let currentIndex = betOptions.indexOf(betAmount);
    if (currentIndex < betOptions.length - 1) {
        const nextBet = betOptions[currentIndex + 1];
        if (balance >= nextBet) { // Check if balance allows increase
            betAmount = nextBet;
            updateBetDisplay(); // Updates display AND paytable
        } else {
            // Optional: Visual feedback that bet can't be increased due to balance
            console.log("Cannot increase bet, insufficient balance.");
            // Simple flash effect on bet display (using CSS class)
            if (betAmountElement) {
                betAmountElement.classList.add('flash-warn');
                setTimeout(() => { betAmountElement.classList.remove('flash-warn'); }, 300);
            }
            // Optional: Play a 'cannot afford' sound?
        }
    }
    // else: Optionally play a 'max bet' sound/visual cue
}

function addCredit() {
    if (spinning) return;
    playSound('click'); // Use a generic click or a specific 'credit' sound
    balance += 1000;
    updateBalanceDisplay();
    // Optional: Add visual feedback for credit addition (e.g., balance pulses)
    if (balanceElement) {
        balanceElement.classList.add('flash-success');
        setTimeout(() => balanceElement.classList.remove('flash-success'), 500);
    }
}

function updateBalanceDisplay() {
    if (balanceElement) {
        balanceElement.textContent = balance.toLocaleString(); // Format with commas
    }
}

// UPDATED updateBetDisplay to call populatePaytable
function updateBetDisplay() {
    if (betAmountElement) {
        betAmountElement.textContent = betAmount;
    }
    populatePaytable(); // Update paytable whenever bet changes
}

// --- Theme Loading and Management ---

// UPDATED function to load symbols for a specific theme using imported THEMES
async function loadThemeSymbols(themeName) {
    console.log(`Attempting to load theme: ${themeName}`);
    const themeData = THEMES[themeName]; // <-- Use imported THEMES

    if (!themeData || !themeData.symbols) {
        console.error(`Theme "${themeName}" not found or is invalid! Falling back to Classic.`);
        themeName = "Classic"; // Default fallback theme name
        themeData = THEMES[themeName];
        if (!themeData || !themeData.symbols) {
            console.error("CRITICAL: Fallback theme 'Classic' also not found or invalid!");
            // Handle critical failure - maybe display error on canvas?
            symbols = []; // Ensure symbols is empty
            return Promise.reject(new Error("Failed to load any valid theme.")); // Reject the promise
        }
    }

    currentThemeName = themeName; // Update the current theme name state
    document.body.className = `theme-${themeName.toLowerCase().replace(/\s+/g, '-')}`; // Optional: Add theme class to body for CSS styling
    console.log(`Loading symbols for theme: ${currentThemeName}`);
    symbols = []; // Clear existing symbols

    // Use the symbols array directly from the themeData object
    const themeSymbolsData = themeData.symbols;

    const symbolPromises = themeSymbolsData.map((symbolData, index) => {
        // Basic validation of symbol data
        if (!symbolData || !symbolData.path || !symbolData.name) {
            console.warn(`Invalid symbol data at index ${index} for theme ${themeName}`, symbolData);
            return Promise.resolve(); // Skip this symbol but continue loading others
        }
        return new Promise((resolve) => { // No reject needed, just resolve after attempt
            const img = new Image();
            img.src = symbolData.path;
            // Add crossOrigin attribute if loading from external URLs
            // img.crossOrigin = "Anonymous";

            const loadedSymbol = {
                ...symbolData,
                image: null, // Start with null image
                id: index     // Store original index if needed
            };

            img.onload = () => {
                loadedSymbol.image = img; // Assign image on successful load
                symbols.push(loadedSymbol);
                // console.log(`Loaded image for: ${symbolData.name}`);
                resolve();
            };
            img.onerror = (err) => {
                console.error(`Failed to load image for ${symbolData.name} (${symbolData.path}) in theme ${themeName}:`, err);
                loadedSymbol.color = getRandomColor(); // Assign fallback color
                symbols.push(loadedSymbol); // Add symbol even if image fails, uses fallback drawing
                resolve(); // Still resolve so game doesn't halt
            };
        });
    });

    await Promise.all(symbolPromises);

    // Sort the loaded 'symbols' array to match the order in the theme definition file.
    // This is crucial because reel generation and win checking rely on index matching.
    symbols.sort((a, b) => {
        const indexA = themeSymbolsData.findIndex(s => s.name === a.name);
        const indexB = themeSymbolsData.findIndex(s => s.name === b.name);
        return indexA - indexB;
    });


    if (symbols.length === 0) {
        console.error(`CRITICAL: No symbols were successfully processed for theme ${themeName}!`);
        // Potentially reject promise or set a flag to prevent game start
        return Promise.reject(new Error(`No symbols loaded for theme ${themeName}`));
    } else if (symbols.length !== themeSymbolsData.length) {
        console.warn(`Loaded ${symbols.length} symbols, but theme definition has ${themeSymbolsData.length}. Some may have failed.`);
    }

    console.log(`Finished loading symbols for theme: ${themeName}. ${symbols.length} symbols ready.`);
    // The promise resolves implicitly here if no errors were thrown/rejected
}

function populatePaytable() {
    if (!paytableElement) return;
    paytableElement.innerHTML = ''; // Clear existing content

    // --- Add Explanatory Text Section (Keep as is) ---
    const infoContainer = document.createElement('div');
    infoContainer.className = 'paytable-info';
    const title = document.createElement('h3');
    title.className = 'paytable-title';
    title.textContent = 'How to Play & Win';
    infoContainer.appendChild(title);
    const explanation1 = document.createElement('p');
    explanation1.className = 'paytable-explanation';
    explanation1.innerHTML = `Spin the reels and try to land <strong>matching symbols</strong> on consecutive reels, starting from the <strong>leftmost reel</strong> (Reel 1).`;
    infoContainer.appendChild(explanation1);
    const explanation2 = document.createElement('p');
    explanation2.className = 'paytable-explanation';
    explanation2.innerHTML = `You need <strong>3, 4, or 5 identical symbols</strong> lined up adjacently from left-to-right on any of the three rows to score a win!`;
    infoContainer.appendChild(explanation2);
    const explanation3 = document.createElement('p');
    explanation3.className = 'paytable-explanation';
    explanation3.innerHTML = `The table below shows the <strong>Multiplier</strong> applied to your <strong>Total Bet</strong> for each winning combination. Higher multipliers mean bigger wins!`;
    infoContainer.appendChild(explanation3);
    const themeNote = document.createElement('p');
    themeNote.className = 'paytable-note';
    themeNote.innerHTML = `<i>While the symbols change with each exciting theme, the core payout rules remain the same.</i>`;
    infoContainer.appendChild(themeNote);
    // No separator needed if using a table border
    // const separator = document.createElement('hr');
    // separator.className = 'paytable-separator';
    // infoContainer.appendChild(separator);
    paytableElement.appendChild(infoContainer);
    // --- End of Explanatory Text Section ---


    // --- Generate Paytable Grid using HTML Table ---

    // Basic validation (keep as is)
    if (!symbols || symbols.length !== 5) {
        paytableElement.innerHTML += '<div>Error: Theme visuals not loaded.</div>';
        return;
    }
    if (!symbolNumberMultipliers || !PAYOUT_RULES) {
        paytableElement.innerHTML += '<div>Error: Paytable config missing.</div>';
        return;
    }

    // Create the table element
    const table = document.createElement('table');
    table.className = 'paytable-grid'; // Add class for styling

    // Create Table Header (<thead>)
    const thead = table.createTHead();
    const headerRow = thead.insertRow();

    // Define header cells
    const headers = ['Symbol', 'x3', 'x4', 'x5'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });

    // Create Table Body (<tbody>)
    const tbody = table.createTBody();

    // Populate Table Rows
    symbols.forEach((visualSymbol, symbolNumber) => {
        const row = tbody.insertRow();

        // Cell 1: Symbol Image & Name
        const cellSymbol = row.insertCell();
        cellSymbol.className = 'paytable-symbol-cell'; // Keep class for specific styling
        if (visualSymbol.image && visualSymbol.image.complete && visualSymbol.image.naturalHeight !== 0) {
            const img = document.createElement('img');
            img.src = visualSymbol.path;
            img.alt = visualSymbol.name;
            img.className = 'paytable-symbol-img'; // Keep class
            cellSymbol.appendChild(img);
            cellSymbol.appendChild(document.createTextNode(` ${visualSymbol.name}`));
        } else {
            // Fallback display
            cellSymbol.innerHTML = `<span class="paytable-fallback-color" style="background-color:${visualSymbol.color || '#ccc'}"></span> ${visualSymbol.name}`;
        }

        // Cells 2, 3, 4: Multipliers (x3, x4, x5)
        const baseMultiplier = symbolNumberMultipliers[symbolNumber] ?? 0; // Get base multiplier from config

        [3, 4, 5].forEach(count => { // Iterate for 3, 4, 5 consecutive symbols
            const cellMultiplier = row.insertCell();
            cellMultiplier.className = 'paytable-multiplier-cell'; // Add class for styling values

            const countMultiplierRule = PAYOUT_RULES[count] ?? 0; // Get rule (e.g., 1, 3, 10)
            const finalMultiplier = baseMultiplier * countMultiplierRule; // Calculate final multiplier

            // Display the calculated multiplier value
            cellMultiplier.textContent = finalMultiplier > 0 ? `${finalMultiplier}x` : '-';
        });
    });

    // Append the complete table to the paytable element
    paytableElement.appendChild(table);
}


// Update theme change logic
function changeTheme(newThemeName) {
    if (spinning || newThemeName === currentThemeName) {
        // ... (revert dropdown if needed) ...
        return;
    }

    console.log(`Changing theme visuals to: ${newThemeName}`);
    // Load ONLY the visuals
    loadThemeVisuals(newThemeName).then(() => {
        console.log("Theme visuals loaded successfully, updating paytable.");
        // Reels don't need re-initialization as config is the same
        populatePaytable(); // Update paytable display with new visuals/names
        // Force redraw if needed
    }).catch(error => {
        console.error(`Failed to change theme visuals to ${newThemeName}:`, error);
        // Revert dropdown selection if loading failed
        if (themeSwitcherElement) {
            const dropdown = themeSwitcherElement.querySelector('select');
            if (dropdown) dropdown.value = currentThemeName;
        }
    });
}

// UPDATED function to set up theme switcher using imported THEMES
function setupThemeSwitcher() {
    if (!themeSwitcherElement) {
        console.warn("Theme switcher container element not found.");
        return; // Ensure the container exists in HTML
    }

    // Clear any existing content
    themeSwitcherElement.innerHTML = '';

    // Create a label
    const label = document.createElement('label');
    label.htmlFor = 'themeSelect';
    label.textContent = 'Select Theme: ';
    label.style.marginRight = '5px'; // Add some spacing

    // Create a dropdown (select element)
    const dropdown = document.createElement('select');
    dropdown.id = 'themeSelect';
    dropdown.className = 'theme-dropdown'; // Add class for styling

    // Add options for each theme from the imported THEMES object
    Object.keys(THEMES).forEach(themeKey => { // Iterate over keys ("Classic", "AncientEgypt", etc.)
        const theme = THEMES[themeKey];
        const option = document.createElement('option');
        option.value = theme.name; // The value should be the theme name
        option.textContent = theme.name; // Display the theme name
        // Set current theme as selected
        if (theme.name === currentThemeName) {
            option.selected = true;
        }
        dropdown.appendChild(option);
    });

    // Add change event listener
    dropdown.addEventListener('change', (e) => {
        if (!spinning) { // Add extra check here
            changeTheme(e.target.value);
        } else {
            console.log("Prevented theme change during spin.");
            // Revert selection visually
            e.target.value = currentThemeName;
        }
    });

    // Add label and dropdown to the container
    themeSwitcherElement.appendChild(label);
    themeSwitcherElement.appendChild(dropdown);
}


// --- History ---
// ... (addToHistory function remains the same) ...
function addToHistory(isWin, details, count, amount) {
    if (!historyElement) return; // Don't run if element missing

    const item = document.createElement('div');
    item.className = `history-item ${isWin ? 'win' : 'loss'}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Add seconds

    let displayDetails = details;
    if (!isWin && details.startsWith("Middle:")) {
        try {
            // Example details: "Middle: 4, 1, 0, 2, 4"
            const numbers = details.substring("Middle: ".length).split(',').map(s => parseInt(s.trim(), 10));
            displayDetails = "Middle: " + numbers.map(num => symbols[num]?.name || `Num ${num}?`).join(', ');
        } catch (e) {
            console.error("Error parsing history details:", e);
            displayDetails = details; // Fallback to raw numbers
        }
    }


    if (isWin) {
        item.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <strong>WIN: ${amount.toLocaleString()}</strong> (Bet: ${betAmount})<br>
            <span class="details">${count}x ${displayDetails}</span>
        `;
    } else {
        item.innerHTML = `
             <span class="timestamp">${timestamp}</span>
             <span>No Win</span> (Bet: ${betAmount})<br>
             <span class="details">${displayDetails}</span> <!-- Shows symbol names on loss -->
        `;
    }

    historyElement.prepend(item); // Add to top
    // ... (limit history items, store in spinHistory array) ...
    spinHistory.unshift({ isWin, details: displayDetails, count, betAmount, winAmount: amount, time: timestamp, theme: currentThemeName });
    if (spinHistory.length > 100) spinHistory.pop();
}