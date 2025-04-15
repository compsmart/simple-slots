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
        'sun god': { sx: 80, sy: 70, sw: 330, sh: 330 },
        'golden mask': { sx: 230, sy: 380, sw: 290, sh: 0 },
        'jade stone': { sx: 530, sy: 370, sw: 290, sh: 0 },
        'snake': { sx: 230, sy: 680, sw: 290, sh: 0 },
        'jaguar': { sx: 530, sy: 680, sw: 290, sh: 0 },
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
    },

    'gemstones': {
        'diamond': { sx: 600, sy: 260, sw: 220, sh: 220 },
        'ruby': { sx: 320, sy: 30, sw: 220, sh: 220 },
        'emerald': { sx: 595, sy: 20, sw: 220, sh: 220 },
        'sapphire': { sx: 870, sy: 260, sw: 230, sh: 230 },
        'amethyst': { sx: 1150, sy: 20, sw: 230, sh: 230 },
    },

    'fantasyforest': {
        'dragon head': { sx: 230, sy: 30, sw: 170, sh: 170 },
        'magic potion': { sx: 30, sy: 360, sw: 190, sh: 190 },
        'elf bow': { sx: 610, sy: 20, sw: 200, sh: 200 },
        'glowing mushroom': { sx: 430, sy: 360, sw: 170, sh: 170 },
        'ancient rune': { sx: 230, sy: 205, sw: 170, sh: 170 },
        'magic ball': { sx: 230, sy: 380, sw: 170, sh: 170 },

    }
};
