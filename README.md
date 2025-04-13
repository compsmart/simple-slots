# Slot Game

A customizable casino slot machine game with multiple themes, built using pure JavaScript, HTML5 Canvas, and Web Audio API.

Try it here: [Slot Game Demo](https://slots.compsmart.co.uk)


![Slot Game Screenshot](https://github.com/compsmart/simpleslots/raw/v11/screenshot.png)

## Features

- Multiple visual themes including Classic, Space Adventure, Ancient Egypt, Aztec, Fantasy Forest, and Gemstones
- 20 configurable paylines
- Customizable symbols, payouts, and visual effects
- Epic win animations with visual and sound effects
- Win amount display with glowing pulse effects
- Interactive UI with visual feedback
- Game history tracking
- Responsive design
- Theme-specific sound effects and background music
- Pay table and payline visualization

## Installation

### Option 1: Quick Start with a Web Server

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/slot-game.git
   cd slot-game
   ```

2. Start a local server. You can use any of these methods:

   Using Node.js:
   ```
   npx http-server
   ```

   Using Python:
   ```
   # Python 3
   python -m http.server
   
   # Python 2
   python -m SimpleHTTPServer
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

### Option 2: Direct File Access

1. Download the ZIP from GitHub
2. Extract all files
3. Open `index.html` in your browser
   - Note: Some browsers may restrict audio playback when running from a local file

## Configuration

The game is highly configurable through several JavaScript files in the `themes` directory.

### Theme Configuration

Each theme has its own configuration file (e.g., `space-adventure.js`, `classic.js`). You can:

1. Edit symbol images and payout rates
2. Customize visual effects
3. Change background animations
4. Modify sound effects

### Payline Configuration

Paylines are defined in `themes/config.js`:

```javascript
export const PAYLINES = [
    // Line 1: Middle Horizontal
    [{ reel: 0, row: 1 }, { reel: 1, row: 1 }, { reel: 2, row: 1 }, { reel: 3, row: 1 }, { reel: 4, row: 1 }],
    // Additional paylines...
];
```

### Symbol Payout Rules

Symbol payouts are configured as multipliers in each theme file:

```javascript
export const symbolMultipliers = [
    5,   // Symbol 0
    10,  // Symbol 1
    15,  // Symbol 2
    20,  // Symbol 3
    50   // Symbol 4
];
```

### RTP (Return to Player) Adjustments

You can fine-tune the game's RTP by:

1. Modifying symbol frequencies on the reel strips
2. Adjusting symbol payout multipliers
3. Changing the number of active paylines

## How to Play

1. **Start the Game**: Open the game in your web browser.
2. **Adjust Your Bet**: Use the + and - buttons next to the bet display to increase or decrease your wager.
3. **Spin the Reels**: Click the "SPIN" button to play.
4. **View Paylines**: Toggle the "SHOW PAYLINES" button to see all possible winning combinations.
5. **View Pay Table**: Click the "PAY TABLE" button to see symbol payouts.
6. **Check History**: View your previous spins in the "HISTORY" section.
7. **Mute Sounds**: Toggle the sound button (speaker icon) to mute or unmute game audio.
8. **Switch Themes**: Select different themes from the dropdown menu (if available).

## Winning Combinations

- You win when matching symbols appear on an active payline, from left to right.
- The first symbol must be on the leftmost reel.
- Minimum 3 matching symbols are required for a win.
- Higher value symbols pay more.
- Winnings are multiplied by your bet amount.

## Demo Epic Win Animation

You can test the epic win animation by clicking the "TEST EPIC WIN" button.

## Development

### Project Structure

- `game.js` - Main game logic
- `index.html` - Main entry point
- `styles.css` - Game styling
- `themes/` - Theme configurations and effects
- `images/symbols/` - Symbol images
- `sounds/` - Sound effects and music

### Adding New Themes

1. Create a new theme file in `themes/` directory
2. Define symbols, their images, and payout values
3. Configure visual effects and animations
4. Add the theme's sound files in `sounds/themes/[your-theme-name]/`
5. Register the new theme in `themes/index.js`

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Edge
- Safari

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Sound effects from [place credits here]
- Symbol artwork by [place credits here]
- Background music by [place credits here]

## Future Enhancements

- Mobile touch support
- Progressive jackpots
- Bonus mini-games
- Local save system
- Additional themes
- Free spin features

---

Enjoy the game! Feel free to contribute or report issues.
