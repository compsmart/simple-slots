// Game constants and variables
const REEL_COUNT = 5;
const SYMBOL_COUNT = 5; // Number of unique symbol types
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
let symbols = []; // Holds loaded symbol objects { name, path, image, multiplier, ... }
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

// Symbol paths and their multipliers
const SYMBOLS = [
    { name: "Seven", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f44336'/%3E%3Cpath d='M40 30L80 30L60 90L40 90' stroke='white' stroke-width='8' fill='none'/%3E%3C/svg%3E", multiplier: 10, winAnimation: { frames: 8, currentFrame: 0, frameRate: 100 } },
    { name: "Bell", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffc107'/%3E%3Ccircle cx='60' cy='50' r='30' fill='%23ffeb3b'/%3E%3Crect x='55' y='80' width='10' height='20' fill='%23795548'/%3E%3Ccircle cx='60' cy='105' r='5' fill='%23795548'/%3E%3C/svg%3E", multiplier: 5, winAnimation: { frames: 8, currentFrame: 0, frameRate: 110 } },
    { name: "Cherry", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%234caf50'/%3E%3Ccircle cx='40' cy='80' r='20' fill='%23e53935'/%3E%3Ccircle cx='80' cy='80' r='20' fill='%23e53935'/%3E%3Cpath d='M60 30L40 80M60 30L80 80' stroke='%23795548' stroke-width='6' fill='none'/%3E%3C/svg%3E", multiplier: 4, winAnimation: { frames: 8, currentFrame: 0, frameRate: 120 } },
    { name: "Bar", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%233f51b5'/%3E%3Crect x='20' y='40' width='80' height='15' fill='gold'/%3E%3Crect x='20' y='60' width='80' height='15' fill='gold'/%3E%3Crect x='20' y='80' width='80' height='15' fill='gold'/%3E%3C/svg%3E", multiplier: 3, winAnimation: { frames: 8, currentFrame: 0, frameRate: 130 } },
    { name: "Lemon", path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffeb3b'/%3E%3Cellipse cx='60' cy='60' rx='40' ry='30' fill='%23fff176'/%3E%3C/svg%3E", multiplier: 2, winAnimation: { frames: 8, currentFrame: 0, frameRate: 140 } }
];

// --- Initialize game when all content is loaded ---
window.addEventListener('load', initGame);

function initGame() {
    // Get DOM elements
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    balanceElement = document.getElementById('balance');
    betAmountElement = document.getElementById('betAmount');
    spinButton = document.getElementById('spinButton');
    decreaseBetButton = document.getElementById('decreaseBet');
    increaseBetButton = document.getElementById('increaseBet');
    addCreditButton = document.getElementById('addCreditBtn');
    paytableElement = document.getElementById('paytableContent');
    historyElement = document.getElementById('spinHistory');

    // Load sound effects
    loadSounds();

    // Set up event listeners
    spinButton.addEventListener('click', spinReels); // Connect HTML button
    decreaseBetButton.addEventListener('click', decreaseBet);
    increaseBetButton.addEventListener('click', increaseBet);
    addCreditButton.addEventListener('click', addCredit);
    // Add listeners to canvas for interactive UI (spin, bet +/-)
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp); // Needed to reset pressed state

    // Load symbols
    loadSymbols().then(() => {
        initReels();
        updateBalanceDisplay();
        updateBetDisplay();
        populatePaytable();
        // Start the game loop
        requestAnimationFrame(drawGame);
    });
}

// --- Sound Loading and Playing (Using Web Audio API) ---
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
        };
        document.addEventListener('click', unlockAudio);
        document.addEventListener('touchstart', unlockAudio);
        document.addEventListener('keydown', unlockAudio);

    } catch (e) {
        console.warn('Web Audio API not supported. Sound effects disabled.');
        soundEnabled = false;
    }
}

function loadAudioBuffer(id, url) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.arrayBuffer();
        })
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            audioBuffers[id] = audioBuffer;
            console.log(`Loaded audio: ${id}`);
        })
        .catch(error => console.error(`Error loading audio ${id}:`, error));
}

function playSound(id) {
    if (!soundEnabled || !hasUserInteraction || !audioBuffers[id] || !audioContext) return;
    try {
        // Ensure context is running
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffers[id];
        source.connect(audioContext.destination);
        source.start(0);
    } catch (error) {
        console.error(`Error playing sound ${id}:`, error);
    }
}

// --- Symbol Loading ---
async function loadSymbols() {
    const symbolPromises = SYMBOLS.map(symbolData => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = symbolData.path;
            img.onload = () => {
                symbols.push({ ...symbolData, image: img });
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load ${symbolData.name} image`);
                // Add placeholder info if image fails
                symbols.push({ ...symbolData, image: null, color: getRandomColor() });
                resolve();
            };
        });
    });
    await Promise.all(symbolPromises);
    // Ensure symbols array is in the same order as SYMBOLS definition
    symbols.sort((a, b) => SYMBOLS.findIndex(s => s.name === a.name) - SYMBOLS.findIndex(s => s.name === b.name));
    if (symbols.length === 0) {
        console.error("CRITICAL: No symbols loaded!");
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// --- Reel Initialization ---
function initReels() {
    reels = [];
    for (let i = 0; i < REEL_COUNT; i++) {
        reels.push({
            position: 0, // Current visual position (fractional symbol index)
            symbols: generateReelSymbols(), // Array of symbol IDs on the strip
            targetPosition: 0, // Target symbol index for the middle row
            spinning: false,
            // Animation state variables (will be set during spin)
            startTime: 0,
            duration: 0,
            startPosition: 0,
            distance: 0,
        });
    }
    // Initialize results structure
    currentReelResults = Array(REEL_COUNT).fill(null).map(() => Array(VISIBLE_ROWS).fill(0));
}

function generateReelSymbols() {
    const reelSymbols = [];
    for (let i = 0; i < SYMBOLS_ON_STRIP; i++) {
        // Ensure symbols array has content before accessing length
        if (symbols.length > 0) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            reelSymbols.push(randomIndex);
        } else {
            reelSymbols.push(0); // Default to first symbol if loading failed
            console.warn("Using default symbol index because symbols array is empty.");
        }
    }
    return reelSymbols;
}

// --- Main Game Loop ---
function drawGame(timestamp) {
    if (!ctx) return; // Ensure context is available

    // Calculate delta time for smooth animations
    if (!lastTime) lastTime = timestamp;
    const deltaTime = (timestamp - lastTime) / 1000.0; // Delta time in seconds
    lastTime = timestamp;

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
        const currentPosition = reel.position; // Fractional index

        // Calculate the index of the symbol currently nearest the top edge of the viewport
        const topVisibleSymbolIndex = Math.floor(currentPosition);

        // Calculate the pixel offset (how much the top symbol is shifted *up*)
        const verticalOffset = (currentPosition - topVisibleSymbolIndex) * SYMBOL_SIZE;

        // Draw enough symbols to cover the viewport + one above and one below for smooth scrolling
        for (let j = -1; j <= VISIBLE_ROWS; j++) {
            const symbolStripIndex = (topVisibleSymbolIndex + j + numSymbolsOnStrip) % numSymbolsOnStrip;
            const symbolId = reel.symbols[symbolStripIndex];
            const symbol = symbols[symbolId]; // Get the symbol object

            // Calculate the Y position for the top of this symbol
            // Start at the top of the viewport, add offset based on j, then subtract the fractional offset
            const symbolTopY = startY + (j * SYMBOL_SIZE) - verticalOffset;

            // Draw the symbol if we have valid data
            if (symbol) {
                if (symbol.image) {
                    ctx.drawImage(symbol.image, reelX, symbolTopY, SYMBOL_SIZE, SYMBOL_SIZE);
                } else {
                    // Fallback drawing if image failed to load
                    ctx.fillStyle = symbol.color || '#cccccc';
                    ctx.fillRect(reelX, symbolTopY, SYMBOL_SIZE, SYMBOL_SIZE);
                    ctx.fillStyle = '#000000';
                    ctx.font = '16px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(symbol.name ? symbol.name.substring(0, 1) : '?', reelX + SYMBOL_SIZE / 2, symbolTopY + SYMBOL_SIZE / 2);
                }
            } else {
                // Draw placeholder if symbol ID is somehow invalid
                ctx.fillStyle = '#555555';
                ctx.fillRect(reelX, symbolTopY, SYMBOL_SIZE, SYMBOL_SIZE);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 20px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('?', reelX + SYMBOL_SIZE / 2, symbolTopY + SYMBOL_SIZE / 2);
            }
        }
        ctx.restore(); // Remove clipping region
    }
}

// Optional: Draw a frame or mask over the reels
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
    ctx.strokeRect(startX - 5, startY - 5, totalWidth + 10, reelViewportHeight + 10);

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

// --- Spin Logic ---

function spinReels() {
    if (spinning) return;
    if (balance < betAmount) {
        alert("Insufficient balance!");
        return;
    }

    playSound('spin');
    balance -= betAmount;
    updateBalanceDisplay();

    spinning = true;
    // Disable UI buttons via state, not direct DOM manipulation if drawn on canvas
    winningLines = []; // Clear previous win lines visually
    winAnimationActive = false; // Stop any previous win celebration
    confettiParticles = [];

    // 1. Determine Final Symbol IDs for each position on each reel
    const finalResultsGrid = []; // [reelIndex][rowIndex] -> symbolId
    for (let i = 0; i < REEL_COUNT; i++) {
        finalResultsGrid[i] = [];
        for (let j = 0; j < VISIBLE_ROWS; j++) {
            // Ensure symbols array is populated before trying to get its length
            if (symbols.length > 0) {
                finalResultsGrid[i][j] = Math.floor(Math.random() * symbols.length);
            } else {
                finalResultsGrid[i][j] = 0; // Default if symbols failed to load
            }
        }
    }

    // 2. Prepare each reel for spinning
    let maxDuration = 0;
    for (let i = 0; i < REEL_COUNT; i++) {
        const reel = reels[i];
        reel.spinning = true;

        // Get the final symbol ID for the MIDDLE row (index 1)
        const finalMiddleSymbolId = finalResultsGrid[i][1];

        // Find a suitable index on the strip for this symbol ID.
        // Start search near the current position for realism? Or fully random? Let's try random.
        let targetStripIndex = Math.floor(Math.random() * reel.symbols.length);
        let attempts = 0;
        // Ensure the target index *will* hold the desired symbol ID after we place it
        while (attempts < reel.symbols.length * 2) { // Limit attempts
            // Check if placing symbols here would cause immediate index issues
            const topIndex = (targetStripIndex - 1 + reel.symbols.length) % reel.symbols.length;
            const bottomIndex = (targetStripIndex + 1) % reel.symbols.length;
            if (topIndex !== targetStripIndex && bottomIndex !== targetStripIndex && topIndex !== bottomIndex) {
                break; // Found a valid index
            }
            targetStripIndex = (targetStripIndex + 1) % reel.symbols.length; // Try next index
            attempts++;
        }
        if (attempts >= reel.symbols.length * 2) {
            console.warn(`Could not find suitable distinct indices for reel ${i}. Using ${targetStripIndex}`);
        }

        // *** CRITICAL: Place the final symbols onto the reel strip NOW ***
        // Ensure indices wrap correctly and are distinct
        const finalTopStripIndex = (targetStripIndex - 1 + reel.symbols.length) % reel.symbols.length;
        const finalMiddleStripIndex = targetStripIndex; // This is our target
        const finalBottomStripIndex = (targetStripIndex + 1) % reel.symbols.length;

        reel.symbols[finalTopStripIndex] = finalResultsGrid[i][0]; // Top result symbol
        reel.symbols[finalMiddleStripIndex] = finalResultsGrid[i][1]; // Middle result symbol
        reel.symbols[finalBottomStripIndex] = finalResultsGrid[i][2]; // Bottom result symbol

        // Calculate animation parameters
        reel.startTime = Date.now() + i * REEL_STAGGER_START; // Stagger start time
        reel.duration = SPIN_DURATION + i * REEL_STAGGER_STOP; // Stagger stop time
        reel.startPosition = reel.position; // Store current position

        // Calculate target position: must end with finalMiddleStripIndex centered.
        // This means reel.position should end up being exactly finalMiddleStripIndex.
        reel.targetPosition = (finalMiddleStripIndex - 1 + reel.symbols.length) % reel.symbols.length;

        // Calculate the total distance to spin (in symbol units)
        // Needs to cover distance + several full rotations
        const currentPositionMod = reel.startPosition % reel.symbols.length;
        let difference = (reel.targetPosition - currentPositionMod + reel.symbols.length) % reel.symbols.length;
        if (difference === 0) difference = reel.symbols.length; // Ensure at least one step difference

        const rotations = 3 + Math.floor(i / 2); // Add more rotations for later reels
        reel.distance = (rotations * reel.symbols.length) + difference;

        // Keep track of the longest duration for the final check
        if (reel.startTime + reel.duration > maxDuration) {
            maxDuration = reel.startTime + reel.duration;
        }
    }

    // Store the final grid results for win checking later
    currentReelResults = finalResultsGrid;

    // Set a timeout to check for win conditions AFTER the longest reel finishes
    // Add a small buffer (e.g., 100ms)
    setTimeout(spinCompleted, maxDuration - Date.now() + 100);
}


// --- Reel Animation Update ---
function updateReelPosition(reel, currentTime) {
    const elapsed = currentTime - reel.startTime;

    if (elapsed < 0) return; // Not started yet (due to stagger)

    if (elapsed >= reel.duration) {
        // --- Animation End ---
        reel.position = reel.targetPosition; // Snap precisely to the target integer index
        reel.spinning = false;
        // Clean up animation vars? Optional.
        delete reel.startPosition;
        delete reel.startTime;
        delete reel.duration;
        delete reel.distance;
        return;
    }

    // --- Animation In Progress ---
    const progress = elapsed / reel.duration; // Overall progress (0 to 1)

    // Calculate eased progress for smooth deceleration
    // Use easeOutQuart: progress^4 for the easing factor, apply to remaining distance
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    const easedProgress = easeOutQuart(progress);

    // Calculate the new position based on eased progress
    // The total distance to cover is reel.distance
    // The new position is start + (total distance * eased progress)
    let newPosition = reel.startPosition + reel.distance * easedProgress;

    // Ensure position wraps around the symbol strip length for visual continuity
    // We calculate the position without modulo first to ensure smooth easing over multiple rotations,
    // but the visual representation in drawReels uses modulo.
    reel.position = newPosition;
}


// --- Spin Completion and Win Check ---
function spinCompleted() {
    if (reels.some(r => r.spinning)) {
        // If somehow called early and a reel is still spinning, wait a bit longer.
        console.warn("SpinCompleted called while reels still spinning. Retrying...");
        setTimeout(spinCompleted, 150);
        return;
    }

    spinning = false;
    // Re-enable UI buttons if needed (handled by 'spinning' state check in drawUI)

    // Check for wins using the stored currentReelResults
    const winInfo = checkWin(); // Returns null or win details object

    if (winInfo && winInfo.totalAmount > 0) {
        balance += winInfo.totalAmount;
        updateBalanceDisplay();
        playSound('win');
        // Add to history (use info from winInfo or winningLines)
        addToHistory(true, winInfo.bestMatch.symbolName, winInfo.bestMatch.count, winInfo.totalAmount);

        // Trigger win celebration if significant win
        if (winInfo.totalAmount >= betAmount * 5) {
            triggerWinCelebration(winInfo.totalAmount);
        }
    } else {
        // Add loss to history (get symbols from currentReelResults)
        const middleSymbols = currentReelResults.map(reel => symbols[reel[1]].name).join(', ');
        addToHistory(false, `Middle: ${middleSymbols}`, 0, 0);
    }
}

// Check for wins (using simplified 'scatter from left' logic as before)
function checkWin() {
    if (currentReelResults.length !== REEL_COUNT || currentReelResults[0] === null) {
        console.error("Win check called with invalid results:", currentReelResults);
        return null; // Not ready or error
    }

    winningLines = []; // Clear previous lines
    let totalWinAmount = 0;
    let bestMatchDetails = null; // Track the single highest-value line for basic reporting

    // Check each symbol type
    for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
        const symbol = symbols[symbolIndex];
        let consecutiveReels = 0;
        let positions = []; // Store {reelIndex, rowIndex} for this symbol line

        // Check reels from left to right
        for (let reelIndex = 0; reelIndex < REEL_COUNT; reelIndex++) {
            let foundInReel = false;
            // Check all 3 rows in the current reel
            for (let rowIndex = 0; rowIndex < VISIBLE_ROWS; rowIndex++) {
                if (currentReelResults[reelIndex][rowIndex] === symbolIndex) {
                    foundInReel = true;
                    positions.push({ reelIndex, rowIndex });
                    // Don't break here, collect all positions for visual highlighting
                }
            }
            if (foundInReel) {
                consecutiveReels++;
            } else {
                break; // Sequence broken
            }
        }

        // Win condition: Must be on at least 3 consecutive reels starting from the left
        if (consecutiveReels >= 3) {
            let multiplier;
            if (consecutiveReels === 5) {
                multiplier = symbol.multiplier * 10;
            } else if (consecutiveReels === 4) {
                multiplier = symbol.multiplier * 3;
            } else { // consecutiveReels === 3
                multiplier = symbol.multiplier;
            }

            const winAmount = multiplier * betAmount;
            totalWinAmount += winAmount;

            // Keep only positions from the winning consecutive reels
            const winningPositions = positions.filter(p => p.reelIndex < consecutiveReels);

            const winLineData = {
                symbolName: symbol.name,
                symbolIndex: symbolIndex,
                positions: winningPositions,
                count: consecutiveReels, // How many reels the win spans
                multiplier: multiplier,
                amount: winAmount
            };
            winningLines.push(winLineData);

            // Update best match if this win is better
            if (!bestMatchDetails || multiplier > bestMatchDetails.multiplier) {
                bestMatchDetails = {
                    symbolName: symbol.name,
                    multiplier: multiplier,
                    count: consecutiveReels,
                    amount: winAmount
                };
            }
        }
    }

    if (totalWinAmount > 0) {
        return {
            totalAmount: totalWinAmount,
            bestMatch: bestMatchDetails, // Provide details of the best single line
            allLines: winningLines      // Provide all winning lines data
        };
    } else {
        return null; // No win
    }
}


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
    drawText(balance.toString(), balanceX + balanceWidth - padding, balanceY + balanceHeight / 2, 'bold 22px Arial', '#ffffff', 'right', 'middle');

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

    // Decrease Bet Button (-)
    const decColor = buttonEffects.bet.decreaseActive ? '#cc9900' : '#ffcc00';
    drawRoundedRect(decreaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize, 5, decColor, '#ffffff', 2);
    drawText('-', decreaseBtnX + adjustBtnSize / 2, adjustBtnY + adjustBtnSize / 2 + 1, 'bold 30px Arial', '#1a1a2e', 'center', 'middle');

    // Increase Bet Button (+)
    const incColor = buttonEffects.bet.increaseActive ? '#cc9900' : '#ffcc00';
    drawRoundedRect(increaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize, 5, incColor, '#ffffff', 2);
    // *** CORRECTED Y-COORDINATE HERE ***
    drawText('+', increaseBtnX + adjustBtnSize / 2, adjustBtnY + adjustBtnSize / 2 + 1, 'bold 30px Arial', '#1a1a2e', 'center', 'middle');
    // Draw Spin Button (Keep as is, seems okay)
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;
    const spinBtnX = canvas.width - spinBtnWidth - 50; // Positioned from right edge
    const spinBtnY = canvas.height - 80;

    // Apply scale effect
    const targetScale = buttonEffects.spin.active ? 1.1 : 1.0;
    buttonEffects.spin.scale += (targetScale - buttonEffects.spin.scale) * 0.2; // Smooth transition

    // Apply pressed effect
    let buttonShiftY = buttonEffects.spin.pressed ? 3 : 0;
    const btnGradient = ctx.createLinearGradient(0, spinBtnY, 0, spinBtnY + spinBtnHeight);
    if (buttonEffects.spin.pressed) {
        btnGradient.addColorStop(0, '#cc2855');
        btnGradient.addColorStop(1, '#dd0022');
    } else {
        btnGradient.addColorStop(0, '#ff3366');
        btnGradient.addColorStop(1, '#ff0033');
    }

    ctx.save();
    // Translate for scaling and pressing
    ctx.translate(spinBtnX + spinBtnWidth / 2, spinBtnY + spinBtnHeight / 2 + buttonShiftY);
    ctx.scale(buttonEffects.spin.scale, buttonEffects.spin.scale);
    ctx.translate(-(spinBtnX + spinBtnWidth / 2), -(spinBtnY + spinBtnHeight / 2));

    // Draw the button shape
    drawRoundedRect(spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight, 10, btnGradient, '#ffffff', 2);
    // Draw text (adjust position slightly because of translation)
    drawText('SPIN', spinBtnX + spinBtnWidth / 2, spinBtnY + spinBtnHeight / 2 + 1, 'bold 24px Arial', '#ffffff', 'center', 'middle');

    ctx.restore();
}

// Helper to draw text
function drawText(text, x, y, font, color, align = 'left', baseline = 'top') {
    ctx.fillStyle = color;
    ctx.font = font;
    ctx.textAlign = align;
    ctx.textBaseline = baseline;
    ctx.fillText(text, x, y);
}

// Helper to draw rounded rectangles (with fallback)
function drawRoundedRect(x, y, width, height, radius, fillStyle, strokeStyle, lineWidth) {
    ctx.beginPath();
    if (ctx.roundRect) {
        // Use native roundRect if available
        ctx.roundRect(x, y, width, height, radius);
    } else {
        // Fallback for older browsers
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
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

// Mouse event handlers for canvas UI
function handleMouseMove(e) {
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
    const { mouseX, mouseY } = getMousePos(e);

    // Check Spin Button Click
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;
    const spinBtnX = canvas.width - spinBtnWidth - 50;
    const spinBtnY = canvas.height - 80;
    if (isMouseOver(mouseX, mouseY, spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight)) {
        if (!spinning) {
            buttonEffects.spin.pressed = true;
            playSound('click');
            // Trigger spin slightly delayed to show press
            setTimeout(() => {
                spinReels();
                // Reset pressed state soon after spin starts
                // setTimeout(() => { buttonEffects.spin.pressed = false; }, 150);
            }, 50);
        }
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
        if (!spinning) {
            playSound('click');
            decreaseBet();
            // Optional visual flash for click:
            buttonEffects.bet.decreaseActive = true; // Set active on down
            // No need for timeout to reset here, mousemove handles hover state
        }
    } else if (isMouseOver(mouseX, mouseY, increaseBtnX, adjustBtnY, adjustBtnSize, adjustBtnSize)) {
        if (!spinning) {
            playSound('click');
            increaseBet();
            buttonEffects.bet.increaseActive = true; // Set active on down
        }
    }
}

function handleMouseUp(e) {
    // Reset pressed state for the spin button when mouse is released
    if (buttonEffects.spin.pressed) {
        buttonEffects.spin.pressed = false;
    }
    // Active state for bet buttons is handled by mousemove, no action needed here
}

// Helper function to get mouse position relative to canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        mouseX: (e.clientX - rect.left) * scaleX,
        mouseY: (e.clientY - rect.top) * scaleY
    };
}

// Helper function to check if mouse is over an area
function isMouseOver(mouseX, mouseY, x, y, width, height) {
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
}


// --- Win Line Drawing ---
// --- Win Line Drawing ---
function drawWinLines(timestamp) {
    if (!winningLines || winningLines.length === 0) return;

    const reelWidth = SYMBOL_SIZE;
    const reelSpacing = (canvas.width - (reelWidth * REEL_COUNT)) / (REEL_COUNT + 1);
    const startX = reelSpacing;
    const startY = 100;
    const symbolCenterOffsetY = SYMBOL_SIZE / 2;
    const symbolCenterOffsetX = SYMBOL_SIZE / 2; // Added for clarity

    const flash = Math.floor(timestamp / 300) % 2 === 0; // Flash effect toggle

    winningLines.forEach((line, index) => {
        // Cycle through colors for different lines
        const colors = ['#ff3366', '#ffcc00', '#4caf50', '#2196f3', '#9c27b0'];
        const color = colors[index % colors.length];

        ctx.strokeStyle = flash ? color : '#ffffff';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // --- Revised Line Drawing Logic ---
        // Sort positions primarily by reel, then by row for consistent line drawing order
        const sortedPositions = [...line.positions].sort((a, b) => {
            if (a.reelIndex !== b.reelIndex) {
                return a.reelIndex - b.reelIndex;
            }
            return a.rowIndex - b.rowIndex;
        });

        if (sortedPositions.length > 1) {
            ctx.beginPath();
            // Start at the center of the first symbol
            const firstPos = sortedPositions[0];
            let currentX = startX + firstPos.reelIndex * (reelWidth + reelSpacing) + symbolCenterOffsetX;
            let currentY = startY + firstPos.rowIndex * SYMBOL_SIZE + symbolCenterOffsetY;
            ctx.moveTo(currentX, currentY);

            // Connect to the center of each subsequent symbol in the sorted list
            for (let k = 1; k < sortedPositions.length; k++) {
                const nextPos = sortedPositions[k];
                const nextX = startX + nextPos.reelIndex * (reelWidth + reelSpacing) + symbolCenterOffsetX;
                const nextY = startY + nextPos.rowIndex * SYMBOL_SIZE + symbolCenterOffsetY;

                // Draw line segment to the next point
                ctx.lineTo(nextX, nextY);

                // Optional: Move to the next point if not adjacent? Or just connect all?
                // For simplicity and clarity, let's connect all points sequentially.
                // If you only want lines between adjacent reels, uncomment the following:
                // if (nextPos.reelIndex === sortedPositions[k-1].reelIndex + 1) {
                //      ctx.lineTo(nextX, nextY);
                // } else {
                //      ctx.moveTo(nextX, nextY); // Move to start of next non-adjacent segment
                // }
            }
            ctx.stroke(); // Draw all connected segments
        }
        // --- End of Revised Line Drawing Logic ---


        // Highlight the winning symbols themselves (logic remains the same)
        line.positions.forEach(pos => {
            const x = startX + pos.reelIndex * (reelWidth + reelSpacing);
            const y = startY + pos.rowIndex * SYMBOL_SIZE;
            const symbolData = symbols[line.symbolIndex];

            let highlightInset = 4;
            let highlightLineWidth = 3;

            if (symbolData && symbolData.winAnimation) {
                const anim = symbolData.winAnimation;
                if (anim.lastUpdate === undefined) anim.lastUpdate = timestamp;

                if (timestamp - anim.lastUpdate > anim.frameRate) {
                    anim.currentFrame = (anim.currentFrame + 1) % anim.frames;
                    anim.lastUpdate = timestamp;
                }
                const pulseFactor = Math.sin((anim.currentFrame / anim.frames) * Math.PI);
                highlightInset = 4 - pulseFactor * 2;
                highlightLineWidth = 3 + pulseFactor * 2;
            }

            ctx.strokeStyle = flash ? color : '#ffffff';
            ctx.lineWidth = highlightLineWidth;
            ctx.strokeRect(x + highlightInset, y + highlightInset, reelWidth - 2 * highlightInset, SYMBOL_SIZE - 2 * highlightInset);
        });
    });

    // --- Display Win Breakdown Text ---
    const totalWin = winningLines.reduce((sum, line) => sum + line.amount, 0);
    let winTextY = startY + SYMBOL_SIZE * VISIBLE_ROWS + 40; // Initial Y position below reels

    if (totalWin > 0) {
        // Display Total Win First
        drawText(`WIN: ${totalWin}`, canvas.width / 2, winTextY, 'bold 28px Arial', '#ffdd44', 'center', 'middle');
        winTextY += 35; // Move down for breakdown

        // Display Individual Line Wins
        ctx.font = 'bold 16px Arial'; // Smaller font for breakdown
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff'; // White color for breakdown text

        winningLines.forEach(line => {
            // Find the symbol image path for display if needed
            const symbolImagePath = symbols[line.symbolIndex]?.path;

            drawText(
                `${line.count}x ${line.symbolName} = ${line.amount}`,
                canvas.width / 2,
                winTextY
            );
            winTextY += 22; // Space between breakdown lines
        });
    }
    // --- End of Win Breakdown Text ---
}

// --- Win Celebration ---
function triggerWinCelebration(amount) {
    winAnimationActive = true;
    confettiParticles = []; // Clear existing
    const particleCount = Math.min(100, Math.floor(amount / (betAmount * 0.2))); // More particles for bigger wins

    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: -Math.random() * canvas.height * 0.5, // Start above screen
            size: Math.random() * 8 + 4,
            color: `hsl(${Math.random() * 360}, 90%, 60%)`,
            speedX: (Math.random() - 0.5) * 6,
            speedY: Math.random() * 5 + 2, // Initial downward speed
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            life: 1.0 // Lifetime factor (1 = full life)
        });
    }

    // Auto-stop after a few seconds
    setTimeout(() => {
        winAnimationActive = false;
        // Optionally fade out remaining particles instead of abruptly stopping
    }, 4000);
}

function drawWinCelebration(deltaTime) {
    const gravity = 150 * deltaTime; // Gravity effect

    confettiParticles.forEach((p, index) => {
        // Update position
        p.x += p.speedX * deltaTime;
        p.y += p.speedY * deltaTime;
        p.speedY += gravity; // Apply gravity
        p.rotation += p.rotSpeed * deltaTime;

        // Fade out near end of life (or based on position)
        if (p.y > canvas.height) {
            p.life -= deltaTime * 0.5; // Fade out faster once below screen
        } else {
            p.life -= deltaTime * 0.15; // Gradual fade
        }
        p.opacity = Math.max(0, p.life);

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        // Simple rectangle shape for confetti
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();

        // Remove dead particles
        if (p.life <= 0) {
            confettiParticles.splice(index, 1);
        }
    });

    // If all particles are gone, stop the animation state
    if (confettiParticles.length === 0) {
        winAnimationActive = false;
    }
}

// --- Bet/Balance Management ---

function decreaseBet() {
    if (spinning) return;
    const betOptions = [5, 10, 20, 50, 100];
    let currentIndex = betOptions.indexOf(betAmount);
    if (currentIndex > 0) {
        betAmount = betOptions[currentIndex - 1];
        updateBetDisplay();
    }
}

function increaseBet() {
    if (spinning) return;
    const betOptions = [5, 10, 20, 50, 100];
    let currentIndex = betOptions.indexOf(betAmount);
    if (currentIndex < betOptions.length - 1) {
        if (balance >= betOptions[currentIndex + 1]) { // Check if balance allows increase
            betAmount = betOptions[currentIndex + 1];
            updateBetDisplay();
        } else {
            // Optional: Visual feedback that bet can't be increased due to balance
            console.log("Cannot increase bet, insufficient balance.");
            // Simple flash effect on bet display?
            betAmountElement.style.transition = 'color 0.1s ease-in-out';
            betAmountElement.style.color = '#ff5555'; // Flash red
            setTimeout(() => { betAmountElement.style.color = ''; }, 200); // Reset color
        }
    }
}

function addCredit() {
    if (spinning) return;
    playSound('click'); // Assume a 'credit added' sound is desired
    balance += 1000;
    updateBalanceDisplay();
    // Optional: Add visual feedback for credit addition
}

function updateBalanceDisplay() {
    // Update the HTML element directly
    balanceElement.textContent = balance;
    // Optionally add formatting (e.g., commas)
}

function updateBetDisplay() {
    // Update the HTML element directly
    betAmountElement.textContent = betAmount;
}


// --- Paytable and History ---

function populatePaytable() {
    paytableElement.innerHTML = ''; // Clear existing

    // Header
    const header = document.createElement('div');
    header.className = 'paytable-header';
    header.innerHTML = `
        <span>Symbol</span>
        <span>3x</span>
        <span>4x</span>
        <span>5x</span>`;
    paytableElement.appendChild(header);

    // Rows for each symbol
    symbols.forEach(symbol => {
        const row = document.createElement('div');
        row.className = 'paytable-row';

        // Symbol Image/Name
        const symbolCell = document.createElement('span');
        symbolCell.className = 'paytable-symbol-cell';
        if (symbol.image) {
            const img = document.createElement('img');
            img.src = symbol.path;
            img.alt = symbol.name;
            img.className = 'paytable-symbol-img';
            symbolCell.appendChild(img);
        } else {
            symbolCell.textContent = symbol.name; // Fallback to name
        }

        // Multipliers
        const mult3x = document.createElement('span');
        mult3x.textContent = `${symbol.multiplier}x`;

        const mult4x = document.createElement('span');
        mult4x.textContent = `${symbol.multiplier * 3}x`;

        const mult5x = document.createElement('span');
        mult5x.textContent = `${symbol.multiplier * 10}x`;

        row.appendChild(symbolCell);
        row.appendChild(mult3x);
        row.appendChild(mult4x);
        row.appendChild(mult5x);
        paytableElement.appendChild(row);
    });
}

function addToHistory(isWin, details, count, amount) {
    const item = document.createElement('div');
    item.className = `history-item ${isWin ? 'win' : 'loss'}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isWin) {
        item.innerHTML = `
            <span class="timestamp">${timestamp}</span>
            <strong>WIN: ${amount}</strong> (Bet: ${betAmount})<br>
            <span class="details">${count}x ${details}</span>
        `;
    } else {
        item.innerHTML = `
             <span class="timestamp">${timestamp}</span>
             <strong>No Win</strong> (Bet: ${betAmount})<br>
             <span class="details">${details}</span>
        `;
    }

    historyElement.prepend(item); // Add to top

    // Limit history items
    while (historyElement.children.length > 15) {
        historyElement.removeChild(historyElement.lastChild);
    }

    // Also store in array if needed for more complex logic later
    spinHistory.unshift({ isWin, details, count, betAmount, winAmount: amount, time: timestamp });
    if (spinHistory.length > 50) spinHistory.pop();
}

// (Removed the overly simplistic calculateOdds function as it's not accurate)