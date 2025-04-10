// Game constants and variables
const REEL_COUNT = 5;
const SYMBOL_COUNT = 5;
const SYMBOL_SIZE = 100; // Smaller symbols to fit 5 reels
const REEL_SPIN_SPEED = 0.3; // Base speed for spinning reels
const SPIN_DURATION = 3000; // 3 seconds for spinning animation
const DEFAULT_BALANCE = 1000;
const DEFAULT_BET = 10;
const PAYLINES = [
    { name: "Top", positions: [0, 0, 0, 0, 0], color: "#ff3366" },
    { name: "Middle", positions: [1, 1, 1, 1, 1], color: "#ffcc00" },
    { name: "Bottom", positions: [2, 2, 2, 2, 2], color: "#4caf50" },
    { name: "V Shape", positions: [0, 1, 2, 1, 0], color: "#2196f3" },
    { name: "Inverted V", positions: [2, 1, 0, 1, 2], color: "#9c27b0" }
];

// Game state
let canvas;
let ctx;
let balance = DEFAULT_BALANCE;
let betAmount = DEFAULT_BET;
let spinning = false;
let symbols = [];
let reels = [];
let currentReelResults = []; // Will now be a 2D array [row][column]
let activePaylines = PAYLINES.length; // All paylines active by default
let winningLines = []; // Tracks which paylines resulted in wins
let payTable = [];
let spinHistory = [];
let backgroundParticles = [];
let lastTime = 0;
let winAnimationActive = false;
let confettiParticles = [];
let buttonEffects = {
    spin: { scale: 1, active: false, pressed: false },
    bet: {
        scale: 1,
        active: false,
        pressed: false,
        decreaseActive: false,
        increaseActive: false
    }
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
    {
        name: "Seven",
        path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23f44336'/%3E%3Cpath d='M40 30L80 30L60 90L40 90' stroke='white' stroke-width='8' fill='none'/%3E%3C/svg%3E",
        multiplier: 10,
        winAnimation: {
            frames: 8,
            currentFrame: 0,
            frameRate: 100 // ms per frame
        }
    },
    {
        name: "Bell",
        path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffc107'/%3E%3Ccircle cx='60' cy='50' r='30' fill='%23ffeb3b'/%3E%3Crect x='55' y='80' width='10' height='20' fill='%23795548'/%3E%3Ccircle cx='60' cy='105' r='5' fill='%23795548'/%3E%3C/svg%3E",
        multiplier: 5,
        winAnimation: {
            frames: 8,
            currentFrame: 0,
            frameRate: 110 // ms per frame
        }
    },
    {
        name: "Cherry",
        path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%234caf50'/%3E%3Ccircle cx='40' cy='80' r='20' fill='%23e53935'/%3E%3Ccircle cx='80' cy='80' r='20' fill='%23e53935'/%3E%3Cpath d='M60 30L40 80M60 30L80 80' stroke='%23795548' stroke-width='6' fill='none'/%3E%3C/svg%3E",
        multiplier: 4,
        winAnimation: {
            frames: 8,
            currentFrame: 0,
            frameRate: 120 // ms per frame
        }
    },
    {
        name: "Bar",
        path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%233f51b5'/%3E%3Crect x='20' y='40' width='80' height='15' fill='gold'/%3E%3Crect x='20' y='60' width='80' height='15' fill='gold'/%3E%3Crect x='20' y='80' width='80' height='15' fill='gold'/%3E%3C/svg%3E",
        multiplier: 3,
        winAnimation: {
            frames: 8,
            currentFrame: 0,
            frameRate: 130 // ms per frame
        }
    },
    {
        name: "Lemon",
        path: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23ffeb3b'/%3E%3Cellipse cx='60' cy='60' rx='40' ry='30' fill='%23fff176'/%3E%3C/svg%3E",
        multiplier: 2,
        winAnimation: {
            frames: 8,
            currentFrame: 0,
            frameRate: 140 // ms per frame
        }
    }
];

// Initialize game when all content is loaded
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
    spinButton.addEventListener('click', spinReels);
    decreaseBetButton.addEventListener('click', decreaseBet);
    increaseBetButton.addEventListener('click', increaseBet);
    addCreditButton.addEventListener('click', addCredit);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    // Load symbols
    loadSymbols().then(() => {
        initReels();
        drawGame();
        populatePaytable();
        updateBalanceDisplay();
    });
}

// Load sound effects
function loadSounds() {
    // Initialize Web Audio API context (for better sound control)
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();

        // Load and decode audio files
        loadAudioBuffer('spin', 'sounds/spin.wav');
        loadAudioBuffer('win', 'sounds/win.wav');
        loadAudioBuffer('click', 'sounds/button-click.wav');

        // Also create HTML5 Audio elements as fallback
        spinSound = new Audio('sounds/spin.wav');
        winSound = new Audio('sounds/win.wav');
        buttonClickSound = new Audio('sounds/button-click.wav');
    } catch (e) {
        console.log('Web Audio API is not supported in this browser');

        // Fallback to standard HTML5 Audio
        spinSound = new Audio('sounds/spin.wav');
        winSound = new Audio('sounds/win.wav');
        buttonClickSound = new Audio('sounds/button-click.wav');
    }

    // Ensure all page interactions unlock audio
    const unlockAudio = function () {
        hasUserInteraction = true;

        // Resume AudioContext if available
        if (audioContext && audioContext.state === 'suspended') {
            audioContext.resume();
        }

        // Silent play of all sounds to unlock them
        if (spinSound) {
            spinSound.volume = 0;
            spinSound.play().catch(() => { });
            spinSound.pause();
            spinSound.volume = 1;
        }

        if (winSound) {
            winSound.volume = 0;
            winSound.play().catch(() => { });
            winSound.pause();
            winSound.volume = 1;
        }

        if (buttonClickSound) {
            buttonClickSound.volume = 0;
            buttonClickSound.play().catch(() => { });
            buttonClickSound.pause();
            buttonClickSound.volume = 1;
        }
    };

    // Attach to many common user interactions to ensure audio is unlocked
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
}

// Helper function to load audio buffers into Web Audio API
function loadAudioBuffer(id, url) {
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            audioBuffers[id] = audioBuffer;
            console.log(`Loaded audio: ${id}`);
        })
        .catch(error => console.error(`Error loading audio ${id}:`, error));
}

// Play a sound using Web Audio API (more reliable than HTML5 Audio)
function playSound(soundId) {
    if (!soundEnabled) return;

    try {
        // Try to use Web Audio API first (more reliable)
        if (audioContext && audioBuffers[soundId]) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffers[soundId];
            source.connect(audioContext.destination);
            source.start(0);
            return true;
        } else {
            // Fall back to HTML5 Audio
            let audioElement;
            switch (soundId) {
                case 'spin': audioElement = spinSound; break;
                case 'win': audioElement = winSound; break;
                case 'click': audioElement = buttonClickSound; break;
            }

            if (audioElement) {
                audioElement.currentTime = 0;
                const promise = audioElement.play();
                if (promise) {
                    promise.catch(error => console.log(`Failed to play ${soundId} sound:`, error));
                }
            }
        }
    } catch (error) {
        console.log(`Error playing sound ${soundId}:`, error);
    }
}

// Load symbol images
async function loadSymbols() {
    const symbolPromises = SYMBOLS.map(symbolData => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = symbolData.path;
            img.onload = () => {
                symbols.push({
                    ...symbolData,
                    image: img
                });
                resolve();
            };
            img.onerror = () => {
                console.error(`Failed to load ${symbolData.name} image`);
                // Use a placeholder color rectangle instead
                symbols.push({
                    ...symbolData,
                    image: null,
                    color: getRandomColor()
                });
                resolve();
            };
        });
    });

    await Promise.all(symbolPromises);
    // Sort by same order as SYMBOLS array
    symbols.sort((a, b) => {
        return SYMBOLS.findIndex(s => s.name === a.name) - SYMBOLS.findIndex(s => s.name === b.name);
    });
}

// Fallback function to generate random colors for symbols if images fail to load
function getRandomColor() {
    const colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize reel positions
function initReels() {
    reels = [];
    for (let i = 0; i < REEL_COUNT; i++) {
        reels.push({
            position: 0,
            symbols: generateReelSymbols(),
            targetPosition: 0,
            spinning: false
        });
    }
}

// Generate random symbols for a reel
function generateReelSymbols() {
    const reelSymbols = [];
    for (let i = 0; i < 20; i++) { // Create a long strip of symbols
        const randomIndex = Math.floor(Math.random() * symbols.length);
        reelSymbols.push(randomIndex);
    }
    return reelSymbols;
}

// Main drawing function
function drawGame(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(timestamp);
    drawReels();

    if (!spinning) {
        drawWinLine();
    }

    // Draw confetti celebration if active
    if (winAnimationActive) {
        drawWinCelebration();
    }

    // Draw interactive UI elements
    drawUIElements();

    // Calculate delta time for smooth animations
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    requestAnimationFrame(drawGame);
}

// Draw background
function drawBackground(timestamp) {
    // Draw slot machine body with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2c3e50');
    gradient.addColorStop(1, '#1a1a2e');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create floating particles in background
    if (backgroundParticles.length < 20 && Math.random() < 0.05) {
        backgroundParticles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + 10,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 1 + 0.5,
            color: `rgba(255, 215, ${Math.floor(Math.random() * 100) + 100}, ${Math.random() * 0.7 + 0.3})`
        });
    }

    // Animate existing particles
    backgroundParticles.forEach((particle, index) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Move particle upward
        particle.y -= particle.speed;

        // Remove particles that have moved off-screen
        if (particle.y < -10) {
            backgroundParticles.splice(index, 1);
        }
    });

    // Draw decorative elements
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(50, 50, canvas.width - 100, 400);

    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(70, 70, canvas.width - 140, 360);
}

// Draw reels
function drawReels() {
    const reelWidth = SYMBOL_SIZE;
    const reelSpacing = 20;
    const startX = (canvas.width - (reelWidth * REEL_COUNT + reelSpacing * (REEL_COUNT - 1))) / 2;
    const startY = 100;
    const reelHeight = SYMBOL_SIZE * 3;

    for (let i = 0; i < REEL_COUNT; i++) {
        const reel = reels[i];
        const reelX = startX + i * (reelWidth + reelSpacing);

        // Draw reel background
        ctx.fillStyle = '#000';
        ctx.fillRect(reelX, startY, reelWidth, reelHeight);

        // Create clipping region for this reel
        ctx.save();
        ctx.beginPath();
        ctx.rect(reelX, startY, reelWidth, reelHeight);
        ctx.clip();

        // Draw visible symbols on the reel
        for (let j = -1; j <= 3; j++) {
            const symbolIndex = Math.floor(reel.position + j) % reel.symbols.length;
            const symbolId = reel.symbols[(symbolIndex + reel.symbols.length) % reel.symbols.length];
            const symbol = symbols[symbolId];
            const symbolY = startY + j * SYMBOL_SIZE + (reel.position % 1) * SYMBOL_SIZE;

            // Draw symbol (no need to check bounds - clipping will handle it)
            if (symbol.image) {
                ctx.drawImage(symbol.image, reelX, symbolY, SYMBOL_SIZE, SYMBOL_SIZE);
            } else {
                // Fallback to colored rectangle if image is not available
                ctx.fillStyle = symbol.color;
                ctx.fillRect(reelX, symbolY, SYMBOL_SIZE, SYMBOL_SIZE);

                // Draw symbol name as text
                ctx.fillStyle = '#fff';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(symbol.name, reelX + SYMBOL_SIZE / 2, symbolY + SYMBOL_SIZE / 2);
            }
        }

        // Restore context (removes clipping)
        ctx.restore();
        // Draw reel border
        ctx.strokeStyle = '#ffcc00';
        ctx.lineWidth = 3;
        ctx.strokeRect(reelX, startY, reelWidth, reelHeight);
    }

    // Note: The red view window rectangle has been removed
}

// Draw win lines
function drawWinLine() {
    if (currentReelResults.length === 0 || winningLines.length === 0) return;

    const reelWidth = SYMBOL_SIZE;
    const reelSpacing = 20;
    const startX = (canvas.width - (reelWidth * REEL_COUNT + reelSpacing * (REEL_COUNT - 1))) / 2;
    const startY = 100;

    // Draw each winning symbol set
    const time = new Date().getTime();
    const flash = Math.floor(time / 200) % 2 === 0; // Flash effect

    // Assign colors to each winning symbol type
    const colors = ['#ff3366', '#ffcc00', '#4caf50', '#2196f3', '#9c27b0'];

    // Draw all winning symbols and connections
    winningLines.forEach((winLine, index) => {
        const symbolIndex = winLine.symbolIndex;
        const positions = winLine.positions;
        const symbolColor = colors[index % colors.length];

        // Set line color with flash effect
        ctx.strokeStyle = flash ? symbolColor : '#ffffff';
        ctx.lineWidth = 4;

        // Draw lines connecting all winning symbols
        if (positions.length > 1) {
            ctx.beginPath();

            // Sort positions from left to right for cleaner lines
            const sortedPositions = [...positions].sort((a, b) => a.reelIndex - b.reelIndex);

            // Start at the center of the first symbol
            const firstPos = sortedPositions[0];
            const firstX = startX + firstPos.reelIndex * (reelWidth + reelSpacing) + reelWidth / 2;
            const firstY = startY + firstPos.rowIndex * SYMBOL_SIZE + SYMBOL_SIZE / 2;
            ctx.moveTo(firstX, firstY);

            // Connect to each subsequent symbol
            for (let i = 1; i < sortedPositions.length; i++) {
                const pos = sortedPositions[i];
                const x = startX + pos.reelIndex * (reelWidth + reelSpacing) + reelWidth / 2;
                const y = startY + pos.rowIndex * SYMBOL_SIZE + SYMBOL_SIZE / 2;
                ctx.lineTo(x, y);
            }

            ctx.stroke();
        }

        // Draw a highlight around each winning symbol
        positions.forEach(pos => {
            const x = startX + pos.reelIndex * (reelWidth + reelSpacing);
            const y = startY + pos.rowIndex * SYMBOL_SIZE;

            // Draw highlight
            ctx.strokeStyle = flash ? symbolColor : '#ffffff';
            ctx.lineWidth = 3;
            ctx.strokeRect(x + 5, y + 5, reelWidth - 10, SYMBOL_SIZE - 10);

            // Draw symbol indicator
            if (flash) {
                ctx.fillStyle = symbolColor;
                ctx.beginPath();
                ctx.arc(x + reelWidth - 15, y + 15, 8, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    });

    // Animate winning symbols with pulsing effect
    winningLines.forEach((winLine) => {
        const symbolIndex = winLine.symbolIndex;
        const symbol = symbols[symbolIndex];

        // Update animation frame
        if (symbol.winAnimation) {
            if (!symbol.winAnimation.lastUpdate || Date.now() - symbol.winAnimation.lastUpdate > symbol.winAnimation.frameRate) {
                symbol.winAnimation.currentFrame = (symbol.winAnimation.currentFrame + 1) % symbol.winAnimation.frames;
                symbol.winAnimation.lastUpdate = Date.now();
            }

            // Apply visual effect based on current frame
            winLine.positions.forEach(pos => {
                const x = startX + pos.reelIndex * (reelWidth + reelSpacing);
                const y = startY + pos.rowIndex * SYMBOL_SIZE;

                // Pulse effect - scale symbol up and down
                const scale = 1 + Math.sin(symbol.winAnimation.currentFrame / symbol.winAnimation.frames * Math.PI) * 0.2;

                ctx.save();
                ctx.translate(x + SYMBOL_SIZE / 2, y + SYMBOL_SIZE / 2);
                ctx.scale(scale, scale);
                ctx.translate(-(x + SYMBOL_SIZE / 2), -(y + SYMBOL_SIZE / 2));

                // Draw scaled symbol
                if (symbol.image) {
                    ctx.drawImage(symbol.image, x, y, SYMBOL_SIZE, SYMBOL_SIZE);
                }

                ctx.restore();
            });
        }
    });

    // Display total win amount - moved lower below the slot window
    const totalWin = winningLines.reduce((sum, line) => sum + line.amount, 0);
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`WIN! ${totalWin}`, canvas.width / 2, startY + SYMBOL_SIZE * 3 + 70);

    // Show individual symbol wins - also moved lower
    let yOffset = 100;
    ctx.font = 'bold 16px Arial';
    winningLines.forEach(winLine => {
        ctx.fillText(
            `${winLine.symbolName}: ${winLine.count}x on ${winLine.reelsWithSymbol} reels - ${winLine.amount}`,
            canvas.width / 2,
            startY + SYMBOL_SIZE * 3 + yOffset
        );
        yOffset += 25;
    });
}

// Draw win celebration with confetti
function drawWinCelebration() {
    confettiParticles.forEach((particle, index) => {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);

        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size / 3);

        ctx.restore();

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.speedY += 0.2; // Gravity
        particle.rotation += particle.rotSpeed;

        // Remove particles that are off-screen
        if (particle.y > canvas.height + 100) {
            confettiParticles.splice(index, 1);
        }
    });
}

// Draw UI elements function
function drawUIElements() {
    // Draw Balance Display
    const balanceX = 50;
    const balanceY = canvas.height - 80;
    const balanceWidth = 200;
    const balanceHeight = 50;

    // Balance background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(balanceX, balanceY, balanceWidth, balanceHeight, 8);
    } else {
        ctx.rect(balanceX, balanceY, balanceWidth, balanceHeight);
    }
    ctx.fill();
    ctx.stroke();

    // Balance text
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('BALANCE:', balanceX + 15, balanceY + balanceHeight / 2 - 10);

    // Balance amount
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(balance.toString(), balanceX + 15, balanceY + balanceHeight / 2 + 15);

    // Draw Bet Display
    const betX = canvas.width / 2 - 100;
    const betY = canvas.height - 80;
    const betWidth = 200;
    const betHeight = 50;

    // Bet background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(betX, betY, betWidth, betHeight, 8);
    } else {
        ctx.rect(betX, betY, betWidth, betHeight);
    }
    ctx.fill();
    ctx.stroke();

    // Bet text
    ctx.fillStyle = '#ffcc00';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BET AMOUNT:', betX + betWidth / 2, betY + betHeight / 2 - 10);
    // Bet amount
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(betAmount.toString(), betX + betWidth / 2, betY + betHeight / 2 + 15);

    // Draw bet adjustment buttons
    // Decrease bet button (-)
    const decreaseBtnX = betX - 40;
    const decreaseBtnY = betY + 5;
    const adjustBtnSize = 40;

    if (buttonEffects.bet?.decreaseActive) {
        ctx.fillStyle = '#cc9900'; // Darker when active
    } else {
        ctx.fillStyle = '#ffcc00';
    }
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(decreaseBtnX, decreaseBtnY, adjustBtnSize, adjustBtnSize, 5);
    } else {
        ctx.rect(decreaseBtnX, decreaseBtnY, adjustBtnSize, adjustBtnSize);
    }
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Minus symbol
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('-', decreaseBtnX + adjustBtnSize / 2, decreaseBtnY + adjustBtnSize / 2);

    // Increase bet button (+)
    const increaseBtnX = betX + betWidth + 5;
    const increaseBtnY = betY + 5;

    if (buttonEffects.bet?.increaseActive) {
        ctx.fillStyle = '#cc9900'; // Darker when active
    } else {
        ctx.fillStyle = '#ffcc00';
    }
    ctx.beginPath();
    if (ctx.roundRect) {
        ctx.roundRect(increaseBtnX, increaseBtnY, adjustBtnSize, adjustBtnSize, 5);
    } else {
        ctx.rect(increaseBtnX, increaseBtnY, adjustBtnSize, adjustBtnSize);
    }
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Plus symbol
    ctx.fillStyle = '#1a1a2e';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('+', increaseBtnX + adjustBtnSize / 2, increaseBtnY + adjustBtnSize / 2);

    // Animated spin button
    ctx.save();

    // Apply scale effect if button is active
    if (buttonEffects.spin.active) {
        buttonEffects.spin.scale = Math.min(buttonEffects.spin.scale + 0.05, 1.2);
    } else {
        buttonEffects.spin.scale = Math.max(buttonEffects.spin.scale - 0.05, 1);
    }

    // Draw spin button with scale effect
    const spinBtnX = canvas.width - 150;
    const spinBtnY = canvas.height - 80;
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;

    // Apply pressed effect - shift button down and change gradient when pressed
    let buttonShiftY = 0;
    if (buttonEffects.spin.pressed) {
        buttonShiftY = 4; // Shift down by 4px when pressed
    }

    ctx.translate(spinBtnX + spinBtnWidth / 2, spinBtnY + spinBtnHeight / 2 + buttonShiftY);
    ctx.scale(buttonEffects.spin.scale, buttonEffects.spin.scale);
    ctx.translate(-(spinBtnX + spinBtnWidth / 2), -(spinBtnY + spinBtnHeight / 2));

    // Button gradient - darker when pressed
    const btnGradient = ctx.createLinearGradient(spinBtnX, spinBtnY, spinBtnX, spinBtnY + spinBtnHeight);
    if (buttonEffects.spin.pressed) {
        btnGradient.addColorStop(0, '#cc2855'); // Darker color when pressed
        btnGradient.addColorStop(1, '#cc0022');
    } else {
        btnGradient.addColorStop(0, '#ff3366');
        btnGradient.addColorStop(1, '#ff0033');
    }

    // Draw button
    ctx.fillStyle = btnGradient;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Use rounded rect with fallback for older browsers
    if (ctx.roundRect) {
        ctx.roundRect(spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight, 10);
    } else {
        // Fallback for browsers that don't support roundRect
        ctx.rect(spinBtnX, spinBtnY, spinBtnWidth, spinBtnHeight);
    }
    ctx.fill();
    ctx.stroke();

    // Draw text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', spinBtnX + spinBtnWidth / 2, spinBtnY + spinBtnHeight / 2);

    ctx.restore();
}

// Mouse event handlers for UI interactions
function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();

    // Calculate scaling factor in case canvas is resized by CSS
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Apply scaling to get the true canvas coordinates
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Check if mouse is over spin button
    const spinBtnX = canvas.width - 150;
    const spinBtnY = canvas.height - 80;
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;

    buttonEffects.spin.active = (
        mouseX >= spinBtnX &&
        mouseX <= spinBtnX + spinBtnWidth &&
        mouseY >= spinBtnY &&
        mouseY <= spinBtnY + spinBtnHeight
    );

    // Define bet adjustment button coordinates
    const betX = canvas.width / 2 - 100;
    const betY = canvas.height - 80;
    const betWidth = 200;
    const adjustBtnSize = 40;

    // Check if mouse is over decrease bet button
    const decreaseBtnX = betX - 40;
    const decreaseBtnY = betY + 5;

    buttonEffects.bet.decreaseActive = (
        mouseX >= decreaseBtnX &&
        mouseX <= decreaseBtnX + adjustBtnSize &&
        mouseY >= decreaseBtnY &&
        mouseY <= decreaseBtnY + adjustBtnSize
    );

    // Check if mouse is over increase bet button
    const increaseBtnX = betX + betWidth + 5;
    const increaseBtnY = betY + 5;

    buttonEffects.bet.increaseActive = (
        mouseX >= increaseBtnX &&
        mouseX <= increaseBtnX + adjustBtnSize &&
        mouseY >= increaseBtnY &&
        mouseY <= increaseBtnY + adjustBtnSize
    );
}

function handleMouseDown(e) {
    // Similar to mousemove but trigger the button press action
    // if mouse is over the button
    const rect = canvas.getBoundingClientRect();

    // Calculate scaling factor in case canvas is resized by CSS
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Apply scaling to get the true canvas coordinates
    const mouseX = (e.clientX - rect.left) * scaleX;
    const mouseY = (e.clientY - rect.top) * scaleY;

    // Check if clicked on spin button
    const spinBtnX = canvas.width - 150;
    const spinBtnY = canvas.height - 80;
    const spinBtnWidth = 120;
    const spinBtnHeight = 50;

    if (
        mouseX >= spinBtnX &&
        mouseX <= spinBtnX + spinBtnWidth &&
        mouseY >= spinBtnY &&
        mouseY <= spinBtnY + spinBtnHeight
    ) {
        // Set the button to pressed state
        buttonEffects.spin.pressed = true;

        // Play button click sound
        playSound('click');

        // Trigger spin with a slight delay to show the button press animation
        setTimeout(() => {
            spinReels();
            // Reset pressed state after a brief delay
            setTimeout(() => {
                buttonEffects.spin.pressed = false;
            }, 200);
        }, 100);
    }

    // Define bet adjustment button coordinates
    const betX = canvas.width / 2 - 100;
    const betY = canvas.height - 80;
    const betWidth = 200;
    const adjustBtnSize = 40;

    // Check if clicked on decrease bet button
    const decreaseBtnX = betX - 40;
    const decreaseBtnY = betY + 5;

    if (
        mouseX >= decreaseBtnX &&
        mouseX <= decreaseBtnX + adjustBtnSize &&
        mouseY >= decreaseBtnY &&
        mouseY <= decreaseBtnY + adjustBtnSize
    ) {
        // Play button click sound
        playSound('click');

        // Flash the button active state
        buttonEffects.bet.decreaseActive = true;
        setTimeout(() => {
            buttonEffects.bet.decreaseActive = false;
        }, 200);

        // Decrease bet
        decreaseBet();
    }

    // Check if clicked on increase bet button
    const increaseBtnX = betX + betWidth + 5;
    const increaseBtnY = betY + 5;

    if (
        mouseX >= increaseBtnX &&
        mouseX <= increaseBtnX + adjustBtnSize &&
        mouseY >= increaseBtnY &&
        mouseY <= increaseBtnY + adjustBtnSize
    ) {
        // Play button click sound
        playSound('click');

        // Flash the button active state
        buttonEffects.bet.increaseActive = true;
        setTimeout(() => {
            buttonEffects.bet.increaseActive = false;
        }, 200);

        // Increase bet
        increaseBet();
    }
}

function handleMouseUp() {
    // Reset any button press states if needed
}

// Spin the reels
function spinReels() {
    if (spinning) return;

    // Check if player has enough balance
    if (balance < betAmount) {
        alert("Insufficient balance! Please add more credits.");
        return;
    }

    // Play spin sound using our new sound system
    playSound('spin');

    // Deduct bet amount
    balance -= betAmount;
    updateBalanceDisplay();

    spinning = true;
    spinButton.disabled = true;
    decreaseBetButton.disabled = true;
    increaseBetButton.disabled = true;

    // Reset results
    currentReelResults = [];

    // Generate random results for each reel
    const results = [];
    for (let i = 0; i < REEL_COUNT; i++) {
        results.push(Math.floor(Math.random() * symbols.length));
    }

    // Animate each reel with slight delay between them
    for (let i = 0; i < REEL_COUNT; i++) {
        const reel = reels[i];
        reel.spinning = true;

        // Add a random number of full rotations plus the target position
        const fullRotations = 2 + Math.random() * 2;
        const targetIndex = Math.floor(Math.random() * reel.symbols.length);
        reel.symbols[targetIndex] = results[i]; // Set the chosen result
        reel.targetPosition = reel.position + fullRotations * reel.symbols.length + targetIndex;

        setTimeout(() => {
            animateReel(i, Date.now(), SPIN_DURATION + i * 400);
        }, i * 200);
    }
}

// Animate a single reel
function animateReel(reelIndex, startTime, duration) {
    const reel = reels[reelIndex];
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;

    if (elapsed < duration) {
        // Calculate progress from 0 to 1
        const progress = elapsed / duration;

        // Store initial position if not already stored
        if (!reel.initialPosition) {
            reel.initialPosition = reel.position;
        }

        // Calculate total distance to travel
        const totalDistance = reel.targetPosition - reel.initialPosition;

        // Use a cubic bezier easing for ultra smooth motion (similar to CSS ease-in-out)
        // This provides a much smoother acceleration and deceleration curve
        let t = progress;

        // Apply easing - cubic bezier approximation of ease-in-out
        // Creates a natural slow-start, consistent middle speed, and gentle slow-down
        if (t < 0.5) {
            // First half - accelerate smoothly
            t = 4 * t * t * t;
        } else {
            // Second half - decelerate smoothly
            t = 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        // Calculate new position based on easing
        reel.position = reel.initialPosition + totalDistance * t;

        // Request next animation frame
        requestAnimationFrame(() => animateReel(reelIndex, startTime, duration));
    } else {        // Snap to exact integer position to align symbols perfectly
        reel.position = Math.round(reel.targetPosition) % reel.symbols.length;
        reel.spinning = false;
        delete reel.initialPosition; // Clean up for next spin

        // Record results for all three visible positions (top, middle, bottom)
        if (!currentReelResults[reelIndex]) {
            currentReelResults[reelIndex] = [];
        }

        for (let row = 0; row < 3; row++) {
            // Calculate the symbol at each position
            const offset = row - 1; // -1 for top, 0 for middle, 1 for bottom
            const resultIndex = Math.floor(reel.position + 1 + offset) % reel.symbols.length;
            currentReelResults[reelIndex][row] = reel.symbols[(resultIndex + reel.symbols.length) % reel.symbols.length];
        }

        // Check if all reels have stopped
        if (reels.every(r => !r.spinning)) {
            spinCompleted();
        }
    }
}

// Handle the completion of a spin
function spinCompleted() {
    spinning = false;
    spinButton.disabled = false;
    decreaseBetButton.disabled = false;
    increaseBetButton.disabled = false;
    // Check for win
    const win = checkWin();
    if (win) {
        // Add a short delay before playing win sound to ensure no audio overlap
        setTimeout(() => {
            // Play win sound using our improved sound system
            playSound('win');
        }, 300);

        const winAmount = win.multiplier * betAmount;
        balance += winAmount;
        updateBalanceDisplay();
        updateBalanceDisplay();

        // Add to history
        addToHistory(true, win.symbolName, win.count, winAmount);

        // Trigger win celebration for big wins
        if (winAmount >= betAmount * 5) {
            triggerWinCelebration(winAmount);
        }
    } else {
        // Add loss to history
        const resultSymbols = currentReelResults.map(index => symbols[index].name).join(', ');
        addToHistory(false, resultSymbols, 0, 0);
    }
}

// Check if current symbols result in a win
function checkWin() {
    if (currentReelResults.length !== REEL_COUNT) return null;

    // Reset winning lines
    winningLines = [];

    // Track the best winning symbols for each type
    const symbolWins = {};
    let totalWinAmount = 0;
    let bestMatch = null;

    // For scattered pays, we need to check each symbol type independently
    for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
        // Count occurrences of this symbol on each reel (anywhere on the reel)
        const symbolCountPerReel = Array(REEL_COUNT).fill(0);

        // Check each reel
        for (let reelIndex = 0; reelIndex < REEL_COUNT; reelIndex++) {
            // Check all three positions (top, middle, bottom) on this reel
            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                if (currentReelResults[reelIndex][rowIndex] === symbolIndex) {
                    symbolCountPerReel[reelIndex]++;
                }
            }
        }

        // If the symbol appears at least once on each of the first 3 reels, it's a win
        if (symbolCountPerReel[0] > 0 && symbolCountPerReel[1] > 0 && symbolCountPerReel[2] > 0) {
            // Count how many reels contain this symbol (can be 3, 4, or 5)
            let reelsWithSymbol = 3; // We already know the first 3 have at least one
            if (symbolCountPerReel[3] > 0) reelsWithSymbol++;
            if (symbolCountPerReel[4] > 0) reelsWithSymbol++;

            const symbol = symbols[symbolIndex];

            // Calculate total number of this symbol across all reels
            const totalSymbols = symbolCountPerReel.reduce((sum, count) => sum + count, 0);

            // Enhanced multipliers based on how many reels have the symbol:
            // 3 reels: base multiplier
            // 4 reels: 3x base multiplier
            // 5 reels: 10x base multiplier
            let multiplier;
            if (reelsWithSymbol === 5) {
                multiplier = symbol.multiplier * 10; // Jackpot for symbols on all 5 reels
            } else if (reelsWithSymbol === 4) {
                multiplier = symbol.multiplier * 3; // Big win for symbols on 4 reels
            } else {
                multiplier = symbol.multiplier; // Base win for symbols on 3 reels
            }

            const winAmount = multiplier * betAmount;
            totalWinAmount += winAmount;

            // Find the positions where this symbol appears
            const positions = [];
            for (let reelIndex = 0; reelIndex < REEL_COUNT; reelIndex++) {
                for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                    if (currentReelResults[reelIndex][rowIndex] === symbolIndex) {
                        positions.push({ reelIndex, rowIndex });
                    }
                }
            }

            // Record this winning set of symbols
            winningLines.push({
                symbolName: symbol.name,
                symbolIndex: symbolIndex,
                positions: positions, // Store the actual positions of the winning symbols
                count: totalSymbols,
                reelsWithSymbol: reelsWithSymbol,
                multiplier: multiplier,
                amount: winAmount
            });

            // Track best match for display purposes
            if (!bestMatch || multiplier > bestMatch.multiplier) {
                bestMatch = {
                    symbolName: symbol.name,
                    multiplier: multiplier,
                    count: totalSymbols,
                    reelsWithSymbol: reelsWithSymbol,
                    amount: winAmount,
                    totalAmount: totalWinAmount
                };
            }
        }
    }

    if (bestMatch) {
        bestMatch.totalAmount = totalWinAmount; // Update with total from all lines
    }

    return bestMatch;
}

// Trigger win celebration with confetti
function triggerWinCelebration(amount) {
    winAnimationActive = true;

    // Create confetti
    for (let i = 0; i < amount / 10; i++) {
        confettiParticles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 10 + 5,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.5) * 10 - 7,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }

    // End celebration after 3 seconds
    setTimeout(() => {
        winAnimationActive = false;
        confettiParticles = [];
    }, 3000);
}

// Decrease bet amount
function decreaseBet() {
    if (betAmount > 5) {
        // Play button click sound using our improved sound system
        playSound('click');

        betAmount -= 5;
        updateBetDisplay();
    }
}

// Increase bet amount
function increaseBet() {
    if (betAmount < 100) {
        // Play button click sound using our improved sound system
        playSound('click');

        betAmount += 5;
        updateBetDisplay();
    }
}

// Add credit to balance
function addCredit() {
    // Play button click sound using our improved sound system
    playSound('click');

    balance += 1000;
    updateBalanceDisplay();
}

// Update balance display
function updateBalanceDisplay() {
    balanceElement.textContent = balance;
}

// Update bet amount display
function updateBetDisplay() {
    betAmountElement.textContent = betAmount;
}

// Populate paytable
function populatePaytable() {
    paytableElement.innerHTML = '';

    // Add header for paytable
    const headerRow = document.createElement('div');
    headerRow.className = 'paytable-header';
    headerRow.innerHTML = '<span>Symbol</span><span>Combination</span><span>Multiplier</span><span>Odds</span>';
    paytableElement.appendChild(headerRow);

    symbols.forEach(symbol => {
        // Calculate odds based on symbol distribution and reel count
        // For a 5-reel machine with 5 possible symbols
        const odds3x = calculateOdds(3, REEL_COUNT); // 3 of a kind
        const odds4x = calculateOdds(4, REEL_COUNT); // 4 of a kind
        const odds5x = calculateOdds(5, REEL_COUNT); // 5 of a kind

        // Create row for 3 of a kind
        const row3x = createPaytableRow(symbol, 3, symbol.multiplier, odds3x);
        paytableElement.appendChild(row3x);

        // Create row for 4 of a kind
        const row4x = createPaytableRow(symbol, 4, symbol.multiplier * 3, odds4x);
        paytableElement.appendChild(row4x);

        // Create row for 5 of a kind
        const row5x = createPaytableRow(symbol, 5, symbol.multiplier * 10, odds5x);
        paytableElement.appendChild(row5x);

        // Add separator except after the last symbol
        if (symbols.indexOf(symbol) < symbols.length - 1) {
            const separator = document.createElement('hr');
            separator.className = 'paytable-separator';
            paytableElement.appendChild(separator);
        }
    });
}

// Helper function to create a paytable row
function createPaytableRow(symbol, count, multiplier, odds) {
    const row = document.createElement('div');
    row.className = 'paytable-row';

    // Symbol column
    const symbolElement = document.createElement('div');
    symbolElement.className = 'paytable-symbol-container';

    if (symbol.image) {
        const img = document.createElement('img');
        img.src = symbol.path;
        img.className = 'paytable-symbol';
        symbolElement.appendChild(img);
    } else {
        // Color box fallback
        const colorBox = document.createElement('div');
        colorBox.className = 'paytable-symbol';
        colorBox.style.backgroundColor = symbol.color;
        symbolElement.appendChild(colorBox);
    }

    const nameElement = document.createElement('span');
    nameElement.textContent = symbol.name;
    nameElement.className = 'symbol-name';
    symbolElement.appendChild(nameElement);

    // Combination column
    const combinationElement = document.createElement('span');
    combinationElement.textContent = `${count}x`;
    combinationElement.className = 'combination-count';

    // Multiplier column
    const multiplierElement = document.createElement('span');
    multiplierElement.textContent = `${multiplier}x bet`;
    multiplierElement.className = 'paytable-multiplier';

    // Odds column
    const oddsElement = document.createElement('span');
    oddsElement.textContent = odds;
    oddsElement.className = 'paytable-odds';

    row.appendChild(symbolElement);
    row.appendChild(combinationElement);
    row.appendChild(multiplierElement);
    row.appendChild(oddsElement);

    return row;
}

// Calculate approximate odds for getting a specific number of the same symbol
function calculateOdds(count, reelCount) {
    // Simplified odds calculation for demonstration
    // Real odds would depend on the actual symbol distribution on each reel
    const symbolsPerReel = SYMBOL_COUNT;

    // Base probability of hitting a specific symbol on one reel
    const probPerReel = 1 / symbolsPerReel;

    // Calculate combinations (simplified version)
    let oddsValue;
    if (count === 3 && reelCount === 5) {
        // For 3 of a kind in 5 reels, need 3 specific positions out of 5
        oddsValue = 1 / (Math.pow(symbolsPerReel, 3) * 10); // Approximate
    } else if (count === 4 && reelCount === 5) {
        // For 4 of a kind in 5 reels, need 4 specific positions out of 5
        oddsValue = 1 / (Math.pow(symbolsPerReel, 4) * 5); // Approximate
    } else if (count === 5 && reelCount === 5) {
        // For 5 of a kind in 5 reels, need all 5 positions
        oddsValue = 1 / Math.pow(symbolsPerReel, 5); // Direct calculation
    } else {
        oddsValue = 1 / Math.pow(symbolsPerReel, count); // Fallback
    }
    // Format as "1 in X" odds
    const inOdds = Math.round(1 / oddsValue);
    return `1 in ${inOdds}`;
}

// Add spin result to history
function addToHistory(isWin, symbols, count, amount) {
    const historyItem = document.createElement('div');
    historyItem.className = `history-item ${isWin ? 'win' : 'loss'}`;

    if (isWin) {
        historyItem.innerHTML = `
            <strong>WIN!</strong> ${count}x ${symbols}<br>
            Bet: ${betAmount} | Win: ${amount}
        `;
    } else {
        historyItem.innerHTML = `
            <strong>No Win</strong> | ${symbols}<br>
            Bet: ${betAmount}
        `;
    }

    // Add to history container
    historyElement.prepend(historyItem);

    // Limit history to last 10 items
    if (historyElement.children.length > 10) {
        historyElement.removeChild(historyElement.lastChild);
    }

    // Store in history array
    spinHistory.push({
        isWin,
        symbols,
        betAmount,
        winAmount: amount,
        timestamp: new Date()
    });

    // Limit history array to last 20 items
    if (spinHistory.length > 20) {
        spinHistory.shift();
    }
}
