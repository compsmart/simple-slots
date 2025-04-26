/**
 * Board Game Bonus Feature
 * 
 * A fun and engaging bonus game that triggers when 3+ scatter symbols appear.
 * Players roll a dice/spin a wheel to move around a board with different tiles:
 * - Win Money: Award coins to the player
 * - Move Forward: Advance extra spaces
 * - Move Backward: Go back spaces
 * - Collect: End the bonus game and collect winnings
 * 
 * The game is fully themeable with different graphics, sounds, and text per theme.
 */

// Base class for the board game bonus feature
export class BoardGameBonus {
    constructor(options = {}) {
        // Canvas and context
        this.canvas = options.canvas;
        this.ctx = options.ctx;        // Game state
        this.active = false;
        this.position = 0;
        this.totalWin = 0;
        this.currentRoll = null;
        this.moving = false;
        this.gameOver = false;
        this.scatter = options.scatter || 3; // Number of scatters that triggered the bonus
        this.remainingSpins = options.scatter || 3; // Remaining spins based on scatter count
        this.showingWinScreen = false;
        this.winAnimationStartTime = 0;
        this.displayWinAmount = 0;

        // Spinner state
        this.isSpinning = false;
        this.spinnerPosition = 0;
        this.spinnerSymbols = [1, 2, 3, 4, 5, 6]; // Values that can appear on the spinner

        // Timers and animation
        this.animationId = null;
        this.lastTime = 0;
        this.spinStartTime = 0;
        this.moveStartTime = 0;

        // Audio
        this.audioContext = options.audioContext;
        this.masterGainNode = options.masterGainNode;
        this.soundEnabled = options.soundEnabled !== false;

        // Callback when game ends
        this.onComplete = options.onComplete || function () { };

        // Base configuration - will be overridden by theme
        this.config = {
            boardSize: 24, // Number of tiles
            diceMax: 6,    // Maximum dice roll
            boardLayout: 'circle', // 'circle', 'square', 'path'
            baseBet: options.betAmount || 10, tiles: {
                win: {
                    frequency: 0.5,  // 50% of tiles (increased from 40%)
                    values: [1, 2, 5, 10, 20, 50], // Multipliers of bet
                    color: '#4CAF50'
                },
                moveForward: {
                    frequency: 0.3, // 30% of tiles (increased from 25%)
                    values: [1, 2, 3], // Steps forward
                    color: '#2196F3'
                },
                moveBackward: {
                    frequency: 0.2,  // 20% of tiles (unchanged)
                    values: [1, 2, 3], // Steps backward
                    color: '#F44336'
                }
                // Removed collect tiles
            },
            // Theme-specific assets will be set via theme config
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
            // Theme-specific text
            text: {
                title: "Bonus Board Game",
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

        // Override with theme-specific config
        if (options.config) {
            this.applyThemeConfig(options.config);
        }

        // Generate the game board
        this.board = this.generateBoard();

        // Bind event handlers
        this.handleClick = this.handleClick.bind(this);
    }

    // Apply theme-specific configuration
    applyThemeConfig(themeConfig) {
        // Deep merge the theme config with the base config
        if (themeConfig.boardSize) this.config.boardSize = themeConfig.boardSize;
        if (themeConfig.diceMax) this.config.diceMax = themeConfig.diceMax;
        if (themeConfig.boardLayout) this.config.boardLayout = themeConfig.boardLayout;

        // Merge tile configuration
        if (themeConfig.tiles) {
            for (const tileType in themeConfig.tiles) {
                if (this.config.tiles[tileType]) {
                    Object.assign(this.config.tiles[tileType], themeConfig.tiles[tileType]);
                }
            }
        }

        // Merge assets
        if (themeConfig.assets) {
            Object.assign(this.config.assets, themeConfig.assets);
        }

        // Merge text
        if (themeConfig.text) {
            Object.assign(this.config.text, themeConfig.text);
        }
    }

    // Generate the game board with random tile distribution
    generateBoard() {
        const board = [];
        const { tiles, boardSize } = this.config;

        // Create a weighted distribution of tile types
        const tileTypes = [];
        for (const type in tiles) {
            const frequency = tiles[type].frequency;
            const count = Math.floor(boardSize * frequency);
            for (let i = 0; i < count; i++) {
                tileTypes.push(type);
            }
        }

        // Fill any remaining spots with win tiles
        while (tileTypes.length < boardSize) {
            tileTypes.push('win');
        }

        // Shuffle the tile types
        for (let i = tileTypes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tileTypes[i], tileTypes[j]] = [tileTypes[j], tileTypes[i]];
        }

        // Create the board with random values for each tile type
        for (let i = 0; i < boardSize; i++) {
            const tileType = tileTypes[i];
            let tileValue = null;

            if (tileType === 'win') {
                const values = tiles.win.values;
                tileValue = values[Math.floor(Math.random() * values.length)];
            } else if (tileType === 'moveForward') {
                const values = tiles.moveForward.values;
                tileValue = values[Math.floor(Math.random() * values.length)];
            } else if (tileType === 'moveBackward') {
                const values = tiles.moveBackward.values;
                tileValue = values[Math.floor(Math.random() * values.length)];
            }

            board.push({
                type: tileType,
                value: tileValue,
                x: 0, // Will be calculated when rendering
                y: 0,
                width: 0,
                height: 0
            });
        }        // No need to ensure collect tiles since we've removed them

        return board;
    }    // Start the bonus game
    start() {
        if (this.active) return;

        this.active = true;
        // No longer reset position to 0 - player stays where they are after each spin
        // this.position = 0;  
        this.totalWin = 0;
        this.gameOver = false;

        // Play start sound
        this.playSound('start');

        // Add event listener for clicks
        this.canvas.addEventListener('click', this.handleClick);

        // Start the animation loop
        this.lastTime = performance.now();
        this.animationId = requestAnimationFrame(timestamp => this.update(timestamp));
    }

    // Stop the bonus game
    stop() {
        this.active = false;

        // Remove event listener
        this.canvas.removeEventListener('click', this.handleClick);

        // Stop animation loop
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // Call the completion callback with the total win
        this.onComplete(this.totalWin);
    }    // Handle clicks during the bonus game
    handleClick(event) {
        if (!this.active || (this.gameOver && !this.showingWinScreen)) return;

        // Get mouse position
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        // Check if the spin button was clicked
        if (this.isSpinButtonClicked(mouseX, mouseY)) {
            this.spinReel();
        }

        // If on win screen, clicking anywhere will end the game
        if (this.showingWinScreen) {
            this.stop();
        }
    }// Check if the spin button was clicked
    isSpinButtonClicked(x, y) {
        // Don't allow spinning if already spinning, moving or game is over
        if (this.isSpinning || this.moving || this.gameOver || this.showingWinScreen || this.remainingSpins <= 0) return false;

        const buttonX = this.canvas.width - 120; // Button in bottom right
        const buttonY = this.canvas.height - 60;
        const buttonWidth = 100;
        const buttonHeight = 40;

        return (
            x >= buttonX &&
            x <= buttonX + buttonWidth &&
            y >= buttonY &&
            y <= buttonY + buttonHeight
        );
    }

    // Spin the reel
    spinReel() {
        if (this.isSpinning || this.moving || this.remainingSpins <= 0) return;

        // Decrement remaining spins
        this.remainingSpins--;

        this.isSpinning = true;
        this.spinStartTime = performance.now();
        this.currentRoll = null;

        // Play spin sound
        this.playSound('roll');

        // Simulate the spinner animation
        const spinDuration = 1500; // 1.5 seconds for spinning animation
        setTimeout(() => {
            // Generate random spin result
            this.currentRoll = Math.floor(Math.random() * this.config.diceMax) + 1;
            this.isSpinning = false;

            // Start moving the player
            this.startMoving();

            // If this was the last spin, prepare to show win screen after the move
            if (this.remainingSpins <= 0 && !this.gameOver) {
                // Will show win screen after the move completes
                this.gameOver = true;
            }
        }, spinDuration);
    }

    // Start moving the player
    startMoving() {
        this.moving = true;
        this.moveStartTime = performance.now();

        // Play move sound
        this.playSound('move');
    }    // Process a single step move
    processMove() {
        // Advance the player one step
        this.position = (this.position + 1) % this.board.length;

        // Play move sound
        this.playSound('move');

        // When all steps are completed, process the tile effect
        if (--this.currentRoll <= 0) {
            this.moving = false;
            this.processTileEffect();
        }
    }// Process the effect of the current tile
    processTileEffect() {
        const currentTile = this.board[this.position];

        switch (currentTile.type) {
            case 'win':
                // Award the win amount
                const winAmount = currentTile.value * this.config.baseBet;
                this.totalWin += winAmount;

                // Play win sound
                this.playSound('win');
                break;

            case 'moveForward':
                // Start moving forward extra steps
                this.currentRoll = currentTile.value;
                this.moving = true;
                this.moveStartTime = performance.now();
                break;

            case 'moveBackward':
                // Move backward
                for (let i = 0; i < currentTile.value; i++) {
                    this.position = (this.position - 1 + this.board.length) % this.board.length;
                }
                break;

            // Removed 'collect' case - game continues until all spins are used
        }

        // Check if this was the last spin
        if (this.remainingSpins <= 0 && !this.moving && !this.isSpinning && !this.gameOver) {
            this.gameOver = true;
            // Play win sound
            this.playSound('win');
        }
    }

    // Main update loop
    update(timestamp) {
        // Calculate delta time
        const deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the game
        this.draw(timestamp);

        // Process movement if needed
        if (this.moving && timestamp - this.moveStartTime > 500) {
            this.processMove();
            this.moveStartTime = timestamp;
        }

        // Continue animation loop if active
        if (this.active) {
            this.animationId = requestAnimationFrame(timestamp => this.update(timestamp));
        }
    }    // Draw the game
    draw(timestamp) {
        // Draw background
        this.drawBackground();

        // If showing win screen, only draw that
        if (this.showingWinScreen) {
            this.drawWinScreen(timestamp);
            return;
        }

        // Draw board
        this.drawBoard();

        // Draw player
        this.drawPlayer();

        // Draw spinner instead of dice
        this.drawSpinner();

        // Draw UI
        this.drawUI(timestamp);

        // Draw game over state if applicable
        if (this.gameOver && !this.showingWinScreen) {
            this.prepareWinScreen(timestamp);
        }
    }

    // Draw background
    drawBackground() {
        // If a background image is available, draw it
        if (this.config.assets.background) {
            this.ctx.drawImage(
                this.config.assets.background,
                0, 0,
                this.canvas.width,
                this.canvas.height
            );
        } else {
            // Otherwise, draw a gradient background
            const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            gradient.addColorStop(0, '#1a237e');
            gradient.addColorStop(1, '#283593');

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // Draw the game board
    drawBoard() {
        const { boardSize, boardLayout } = this.config;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2 - 50; // Move up a bit to make room for UI

        // Calculate board dimensions based on canvas size
        const boardRadius = Math.min(this.canvas.width, this.canvas.height) * 0.35;
        const tileSize = 60; // Size of each tile

        // Position tiles based on board layout
        if (boardLayout === 'circle') {
            // Arrange tiles in a circle
            for (let i = 0; i < this.board.length; i++) {
                const angle = (i / boardSize) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * boardRadius;
                const y = centerY + Math.sin(angle) * boardRadius;

                // Update tile position
                this.board[i].x = x - tileSize / 2;
                this.board[i].y = y - tileSize / 2;
                this.board[i].width = tileSize;
                this.board[i].height = tileSize;

                // Draw the tile
                this.drawTile(this.board[i]);
            }
        } else if (boardLayout === 'square') {
            // Arrange tiles in a square path
            const side = Math.ceil(Math.sqrt(boardSize));
            const offset = tileSize * (side - 1) / 2;

            let tileIndex = 0;

            // Draw tiles along the perimeter of a square
            // Top edge
            for (let i = 0; i < side - 1 && tileIndex < boardSize; i++) {
                const tile = this.board[tileIndex++];
                tile.x = centerX - offset + i * tileSize;
                tile.y = centerY - offset;
                tile.width = tileSize;
                tile.height = tileSize;
                this.drawTile(tile);
            }

            // Right edge
            for (let i = 0; i < side - 1 && tileIndex < boardSize; i++) {
                const tile = this.board[tileIndex++];
                tile.x = centerX + offset;
                tile.y = centerY - offset + i * tileSize;
                tile.width = tileSize;
                tile.height = tileSize;
                this.drawTile(tile);
            }

            // Bottom edge
            for (let i = 0; i < side - 1 && tileIndex < boardSize; i++) {
                const tile = this.board[tileIndex++];
                tile.x = centerX + offset - i * tileSize;
                tile.y = centerY + offset;
                tile.width = tileSize;
                tile.height = tileSize;
                this.drawTile(tile);
            }

            // Left edge
            for (let i = 0; i < side - 1 && tileIndex < boardSize; i++) {
                const tile = this.board[tileIndex++];
                tile.x = centerX - offset;
                tile.y = centerY + offset - i * tileSize;
                tile.width = tileSize;
                tile.height = tileSize;
                this.drawTile(tile);
            }
        } else {
            // Default to linear path
            const rowSize = Math.min(8, Math.ceil(boardSize / 3));
            const rows = Math.ceil(boardSize / rowSize);
            const offsetX = (rowSize * tileSize) / 2;
            const offsetY = (rows * tileSize) / 2;

            let tileIndex = 0;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < rowSize && tileIndex < boardSize; col++) {
                    // Zigzag pattern - even rows go left to right, odd rows go right to left
                    const adjustedCol = row % 2 === 0 ? col : rowSize - 1 - col;
                    const tile = this.board[tileIndex++];

                    tile.x = centerX - offsetX + adjustedCol * tileSize;
                    tile.y = centerY - offsetY + row * tileSize;
                    tile.width = tileSize;
                    tile.height = tileSize;

                    this.drawTile(tile);
                }
            }
        }
    }

    // Draw an individual tile
    drawTile(tile) {
        const { x, y, width, height, type, value } = tile;
        const { tiles } = this.config;

        // Draw tile background
        if (this.config.assets.tiles && this.config.assets.tiles[type]) {
            // Draw themed tile image
            this.ctx.drawImage(
                this.config.assets.tiles[type],
                x, y, width, height
            );
        } else {
            // Draw default colored tile
            this.ctx.fillStyle = tiles[type].color;
            this.ctx.fillRect(x, y, width, height);

            // Draw border
            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);
        }

        // Draw tile text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center'; let text = '';
        switch (type) {
            case 'win':
                text = this.config.text.winPrefix + value + 'x';
                break;
            case 'moveForward':
                text = this.config.text.forward + value;
                break;
            case 'moveBackward':
                text = this.config.text.backward + value;
                break;
            // Removed 'collect' case
        }

        this.ctx.fillText(text, x + width / 2, y + height / 2 + 5);
    }

    // Draw the player token
    drawPlayer() {
        if (this.board.length === 0) return;

        const tile = this.board[this.position];
        const { x, y, width, height } = tile;

        if (this.config.assets.player) {
            // Draw themed player image
            this.ctx.drawImage(
                this.config.assets.player,
                x + width / 2 - 20,
                y + height / 2 - 20,
                40, 40
            );
        } else {
            // Draw default player token
            this.ctx.fillStyle = '#ffeb3b';
            this.ctx.beginPath();
            this.ctx.arc(
                x + width / 2,
                y + height / 2,
                20,
                0, Math.PI * 2
            );
            this.ctx.fill();

            this.ctx.strokeStyle = '#ffd600';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
    }    // Draw the slot reel spinner
    drawSpinner() {
        const spinnerX = this.canvas.width - 80;
        const spinnerY = this.canvas.height - 120;
        const spinnerWidth = 60;
        const spinnerHeight = 80;

        // Draw reel background
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(spinnerX - spinnerWidth / 2, spinnerY - spinnerHeight / 2, spinnerWidth, spinnerHeight);

        // Draw reel border
        this.ctx.strokeStyle = '#ffcc00';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(spinnerX - spinnerWidth / 2, spinnerY - spinnerHeight / 2, spinnerWidth, spinnerHeight);

        // Draw viewing window
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(spinnerX - spinnerWidth / 2 + 5, spinnerY - 20, spinnerWidth - 10, 40);

        // Draw the current symbol or animated symbols
        if (this.isSpinning) {
            // Animated spinning reel
            const spinProgress = (performance.now() - this.spinStartTime) / 1000;
            const spinSpeed = 15; // Symbols per second
            const symbolIndex = Math.floor(spinProgress * spinSpeed) % this.spinnerSymbols.length;

            // Draw the spinning symbol
            this.drawSpinnerSymbol(spinnerX, spinnerY, this.spinnerSymbols[symbolIndex]);
        } else if (this.currentRoll !== null) {
            // Show the current spin result
            this.drawSpinnerSymbol(spinnerX, spinnerY, this.currentRoll);
        } else {
            // Default state - show a placeholder
            this.drawSpinnerSymbol(spinnerX, spinnerY, "?");
        }

        // Draw spin button
        const buttonX = spinnerX - 50;
        const buttonY = spinnerY + 50;
        const buttonWidth = 100;
        const buttonHeight = 40;

        // Only draw the button if spins remain and not currently spinning/moving
        if (this.remainingSpins > 0 && !this.isSpinning && !this.moving && !this.gameOver) {
            this.ctx.fillStyle = '#2196F3';
            this.ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

            this.ctx.strokeStyle = '#ffffff';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);

            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('SPIN', buttonX + buttonWidth / 2, buttonY + buttonHeight / 2 + 6);
        }

        // Draw remaining spins indicator
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Spins: ${this.remainingSpins}`, spinnerX, spinnerY - 50);
    }

    // Draw a symbol on the spinner
    drawSpinnerSymbol(x, y, symbol) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(symbol, x, y);
    }

    // Draw dots on a dice face
    drawDiceDots(x, y, size, value) {
        this.ctx.fillStyle = '#333333';
        const dotSize = size / 10;
        const offset = size / 4;

        switch (value) {
            case 1:
                // Center dot
                this.ctx.beginPath();
                this.ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 2:
                // Top-left and bottom-right dots
                this.ctx.beginPath();
                this.ctx.arc(x - offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 3:
                // Top-left, center, and bottom-right dots
                this.ctx.beginPath();
                this.ctx.arc(x - offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 4:
                // Four corners
                this.ctx.beginPath();
                this.ctx.arc(x - offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x - offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 5:
                // Four corners plus center
                this.ctx.beginPath();
                this.ctx.arc(x - offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x - offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;

            case 6:
                // Six dots (3 on each side)
                this.ctx.beginPath();
                this.ctx.arc(x - offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y - offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x - offset, y, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x - offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.arc(x + offset, y + offset, dotSize, 0, Math.PI * 2);
                this.ctx.fill();
                break;
        }
    }    // Draw the UI elements
    drawUI(timestamp) {
        // Draw title
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 28px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            this.config.text.title,
            this.canvas.width / 2,
            50
        );

        // Draw instructions
        this.ctx.font = '18px Arial';
        this.ctx.fillText(
            this.config.text.instructions,
            this.canvas.width / 2,
            80
        );

        // Draw player position indicator (adding this to show position is maintained)
        this.ctx.font = '16px Arial';
        this.ctx.fillText(
            `Current Position: ${this.position + 1} of ${this.board.length}`,
            this.canvas.width / 2,
            110
        );

        // Draw accumulated win amount prominently
        const winBoxX = 50;
        const winBoxY = 50;
        const winBoxWidth = 200;
        const winBoxHeight = 80;

        // Win amount box
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(winBoxX, winBoxY, winBoxWidth, winBoxHeight);

        this.ctx.strokeStyle = '#ffcc00';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(winBoxX, winBoxY, winBoxWidth, winBoxHeight);

        // Win amount text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText('BONUS WIN:', winBoxX + 15, winBoxY + 30);

        this.ctx.font = 'bold 28px Arial';
        this.ctx.fillText(this.totalWin, winBoxX + 15, winBoxY + 60);

        // No need to draw the roll button as it's now part of the spinner component
    }// Prepare the win screen
    prepareWinScreen(timestamp) {
        // Show the win screen after a delay if not already triggered
        if (!this.showingWinScreen && this.remainingSpins <= 0) {
            setTimeout(() => {
                this.showingWinScreen = true;
                this.winAnimationStartTime = performance.now();
                this.displayWinAmount = 0;

                // Play the win sound
                this.playSound('win');
            }, 1000);
        }
    }

    // Draw win celebration screen with animated counter
    drawWinScreen(timestamp) {
        // Create a festive background with particles or gradient
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height / 2, 10,
            this.canvas.width / 2, this.canvas.height / 2, this.canvas.width
        );
        gradient.addColorStop(0, '#4A148C');
        gradient.addColorStop(1, '#1A237E');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add sparkling/shining effects
        this.drawSparkles(timestamp);

        // Calculate animated win amount
        const animDuration = 3000; // 3 seconds for the counter animation
        const elapsed = timestamp - this.winAnimationStartTime;
        const progress = Math.min(1, elapsed / animDuration);

        // Ease-out animation for the counter
        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
        const easedProgress = easeOutQuart(progress);

        this.displayWinAmount = Math.round(this.totalWin * easedProgress);

        // Draw festive "BONUS WIN!" text
        this.ctx.fillStyle = '#FFD700'; // Gold color
        this.ctx.font = 'bold 50px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
        this.ctx.shadowBlur = 10;
        this.ctx.fillText(
            'BONUS WIN!',
            this.canvas.width / 2,
            this.canvas.height / 2 - 60
        );

        // Draw the animated win amount
        this.ctx.font = 'bold 60px Arial';
        this.ctx.fillText(
            this.displayWinAmount,
            this.canvas.width / 2,
            this.canvas.height / 2 + 30
        );

        // Reset shadow
        this.ctx.shadowBlur = 0;

        // Draw tap to continue text
        if (progress >= 1) {
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = '24px Arial';
            this.ctx.fillText(
                'Tap anywhere to continue',
                this.canvas.width / 2,
                this.canvas.height - 100
            );
        }
    }

    // Draw sparkling effects for the win screen
    drawSparkles(timestamp) {
        const numSparkles = 30;
        const maxRadius = 4;

        for (let i = 0; i < numSparkles; i++) {
            // Create a twinkling effect
            const twinkle = 0.5 + 0.5 * Math.sin(timestamp / 200 + i * 0.3);
            const radius = maxRadius * twinkle;

            // Distribute sparkles around in a circular pattern
            const angle = (i / numSparkles) * Math.PI * 2;
            const distance = 150 + Math.sin(timestamp / 1000 + i) * 50;

            const x = this.canvas.width / 2 + Math.cos(angle + timestamp / 3000) * distance;
            const y = this.canvas.height / 2 + Math.sin(angle + timestamp / 2000) * distance;

            // Draw the sparkle
            this.ctx.fillStyle = `rgba(255, 215, 0, ${twinkle})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    // Play sound effect
    playSound(soundName) {
        if (!this.soundEnabled || !this.audioContext || !this.config.assets.sounds) return;

        const sound = this.config.assets.sounds[soundName];
        if (!sound) return;

        // Create audio source
        const source = this.audioContext.createBufferSource();
        source.buffer = sound;

        // Connect to gain node for volume control
        if (this.masterGainNode) {
            source.connect(this.masterGainNode);
        } else {
            source.connect(this.audioContext.destination);
        }

        // Play the sound
        source.start();
    }
}

// Export a factory function to create themed bonus games
export function createBoardGameBonus(options = {}) {
    return new BoardGameBonus(options);
}
