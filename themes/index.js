// filepath: c:\projects\copilot-agent\slot-game\themes\index.js
import { ClassicTheme } from './classic.js';
import { AncientEgyptTheme } from './ancient-egypt.js';
import { SpaceAdventureTheme } from './space-adventure.js';
import { FantasyForestTheme } from './fantasy-forest.js';
import { GemstonesTheme } from './gemstones.js';

// Collect all themes in a single object for easy access
export const THEMES = {
    [ClassicTheme.name]: ClassicTheme,
    [AncientEgyptTheme.name]: AncientEgyptTheme,
    [SpaceAdventureTheme.name]: SpaceAdventureTheme,
    [FantasyForestTheme.name]: FantasyForestTheme,
    [GemstonesTheme.name]: GemstonesTheme
};

// Export individual themes for direct imports if needed
export { ClassicTheme, AncientEgyptTheme, SpaceAdventureTheme, FantasyForestTheme, GemstonesTheme };
