// Symbol map for SVG sprite sheets
// Each theme can have its own symbol map with positions for each symbol

export const SYMBOL_MAPS = {
    // Classic theme symbols on a 2000px grid with 4x4 symbols (500x500 each)
    'classic': {
        'cherry': { sx: 1450, sy: 1450, sw: 500, sh: 500 },
        'seven': { sx: 500, sy: 500, sw: 500, sh: 500 },
        'diamond': { sx: 500, sy: 1000, sw: 500, sh: 500 },
        'bell': { sx: 500, sy: 50, sw: 500, sh: 500 },
        'lemon': { sx: 500, sy: 1450, sw: 500, sh: 500 },
        // Additional positions can be added as needed
    },

    'aztec': {
        // Additional positions can be added as needed
    },

    // Template for other themes
    'ancientegypt': {
        // Define positions for ancient egypt symbols
        'pharaoh mask': { sx: 230, sy: 60, sw: 290, sh: 340 },
        'scarab beetle': { sx: 230, sy: 380, sw: 290, sh: 330 },
        'eye of horus': { sx: 530, sy: 370, sw: 290, sh: 340 },
        'ankh': { sx: 230, sy: 680, sw: 290, sh: 340 },
        'papyrus scroll': { sx: 530, sy: 680, sw: 290, sh: 340 },
    },

    'spaceadventure': {
        // Define positions for space adventure symbols
    }
};
