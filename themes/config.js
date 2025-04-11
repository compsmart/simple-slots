export const reelStrips = [
    // Reel 1 (Example: 30 symbols total)
    // Counts: 0:1, 1:3, 2:4, 3:6, 4:16 (Check counts match array length)
    [4, 3, 4, 2, 4, 1, 4, 3, 4, 2, 4, 0, 4, 3, 4, 2, 4, 1, 4, 3, 4, 2, 4, 4, 3, 4, 1, 4, 2, 4],
    // Reel 2 (Example: 30 symbols total)
    // Counts: 0:1, 1:4, 2:5, 3:8, 4:12
    [4, 2, 3, 4, 1, 4, 2, 4, 3, 4, 1, 4, 2, 4, 0, 4, 1, 4, 2, 3, 4, 1, 4, 4, 2, 3, 4, 3, 4, 3],
    // Reel 3 (Example: 30 symbols total)
    // Counts: 0:1, 1:3, 2:6, 3:8, 4:12
    [3, 4, 2, 4, 3, 1, 4, 2, 3, 4, 2, 4, 3, 0, 4, 2, 3, 1, 4, 2, 3, 4, 2, 4, 3, 4, 1, 2, 4, 2],
    // Reel 4 (Like Reel 2)
    // Counts: 0:1, 1:4, 2:5, 3:8, 4:12
    [4, 2, 3, 4, 1, 4, 2, 4, 3, 4, 1, 4, 2, 4, 0, 4, 1, 4, 2, 3, 4, 1, 4, 4, 2, 3, 4, 3, 4, 3],
    // Reel 5 (Like Reel 1)
    // Counts: 0:1, 1:3, 2:4, 3:6, 4:16
    [4, 3, 4, 2, 4, 1, 4, 3, 4, 2, 4, 0, 4, 3, 4, 2, 4, 1, 4, 3, 4, 2, 4, 4, 3, 4, 1, 4, 2, 4]
];

// --- Shared Symbol Number Multipliers ---
// Maps symbol number (0-4) to its base multiplier (for 3 consecutive).
export const symbolNumberMultipliers = {
    0: 20,  // Symbol number 0 (e.g., Seven in Classic) pays 10x base
    1: 10,   // Symbol number 1 (e.g., Bell in Classic) pays 5x base
    2: 5,   // Symbol number 2 (e.g., Bar in Classic) pays 4x base
    3: 2,   // Symbol number 3 (e.g., Lemon in Classic) pays 3x base
    4: 1    // Symbol number 4 (e.g., Cherry in Classic) pays 2x base
};

// --- Payout Multiplier Rules (Based on Consecutive Count) ---
// Adjusts the base multiplier based on how many reels match.
export const PAYOUT_RULES = {
    3: 1,  // 3 consecutive reels pay base multiplier * 1
    4: 2,  // 4 consecutive reels pay base multiplier * 3
    5: 5  // 5 consecutive reels pay base multiplier * 10
    // Add rules for 2x if needed, e.g., 2: 0.5
};

export const PAYLINES = [
    // Line 1: Middle Horizontal
    [{ reel: 0, row: 1 }, { reel: 1, row: 1 }, { reel: 2, row: 1 }, { reel: 3, row: 1 }, { reel: 4, row: 1 }],
    // Line 2: Top Horizontal
    [{ reel: 0, row: 0 }, { reel: 1, row: 0 }, { reel: 2, row: 0 }, { reel: 3, row: 0 }, { reel: 4, row: 0 }],
    // Line 3: Bottom Horizontal
    [{ reel: 0, row: 2 }, { reel: 1, row: 2 }, { reel: 2, row: 2 }, { reel: 3, row: 2 }, { reel: 4, row: 2 }],
    // Line 4: Diagonal "V"
    //[{ reel: 0, row: 0 }, { reel: 1, row: 1 }, { reel: 2, row: 2 }, { reel: 3, row: 1 }, { reel: 4, row: 0 }],
    // Line 5: Diagonal "^"
    //[{ reel: 0, row: 2 }, { reel: 1, row: 1 }, { reel: 2, row: 0 }, { reel: 3, row: 1 }, { reel: 4, row: 2 }],
    // Line 6: Top Zig-Zag
    //[{ reel: 0, row: 0 }, { reel: 1, row: 0 }, { reel: 2, row: 1 }, { reel: 3, row: 2 }, { reel: 4, row: 2 }],
    // Line 7: Bottom Zig-Zag
    //[{ reel: 0, row: 2 }, { reel: 1, row: 2 }, { reel: 2, row: 1 }, { reel: 3, row: 0 }, { reel: 4, row: 0 }],
    // Line 8: Top-Middle Zig-Zag
    //[{ reel: 0, row: 0 }, { reel: 1, row: 1 }, { reel: 2, row: 0 }, { reel: 3, row: 1 }, { reel: 4, row: 0 }],
    // Line 9: Middle-Bottom Zig-Zag
    //[{ reel: 0, row: 1 }, { reel: 1, row: 2 }, { reel: 2, row: 1 }, { reel: 3, row: 2 }, { reel: 4, row: 1 }],
    // Line 10: W-Pattern
    //[{ reel: 0, row: 0 }, { reel: 1, row: 2 }, { reel: 2, row: 0 }, { reel: 3, row: 2 }, { reel: 4, row: 0 }],
    // Line 11: M-Pattern
    //[{ reel: 0, row: 2 }, { reel: 1, row: 0 }, { reel: 2, row: 2 }, { reel: 3, row: 0 }, { reel: 4, row: 2 }],
    // Line 12: Stair Step Up
    //[{ reel: 0, row: 2 }, { reel: 1, row: 1 }, { reel: 2, row: 1 }, { reel: 3, row: 0 }, { reel: 4, row: 0 }],
    // Line 13: Stair Step Down
    //[{ reel: 0, row: 0 }, { reel: 1, row: 0 }, { reel: 2, row: 1 }, { reel: 3, row: 1 }, { reel: 4, row: 2 }],
    // Line 14: Middle with Top Dips
    //[{ reel: 0, row: 1 }, { reel: 1, row: 0 }, { reel: 2, row: 1 }, { reel: 3, row: 0 }, { reel: 4, row: 1 }],
    // Line 15: Middle with Bottom Dips
    //[{ reel: 0, row: 1 }, { reel: 1, row: 2 }, { reel: 2, row: 1 }, { reel: 3, row: 2 }, { reel: 4, row: 1 }],
    // Line 16: Top Row S-Curve
    //[{ reel: 0, row: 0 }, { reel: 1, row: 0 }, { reel: 2, row: 1 }, { reel: 3, row: 0 }, { reel: 4, row: 0 }],
    // Line 17: Bottom Row S-Curve
    //[{ reel: 0, row: 2 }, { reel: 1, row: 2 }, { reel: 2, row: 1 }, { reel: 3, row: 2 }, { reel: 4, row: 2 }],
    // Line 18: Zigzag Up-Down
    //[{ reel: 0, row: 1 }, { reel: 1, row: 0 }, { reel: 2, row: 2 }, { reel: 3, row: 0 }, { reel: 4, row: 2 }],
    // Line 19: Zigzag Down-Up
    //[{ reel: 0, row: 1 }, { reel: 1, row: 2 }, { reel: 2, row: 0 }, { reel: 3, row: 2 }, { reel: 4, row: 0 }],
    // Line 20: Diamond Pattern
    //[{ reel: 0, row: 1 }, { reel: 1, row: 0 }, { reel: 2, row: 1 }, { reel: 3, row: 2 }, { reel: 4, row: 1 }],
];

// --- Optional: Minimum win length ---
export const MIN_WIN_LENGTH = 3; // Most wins require at least 3 symbols
