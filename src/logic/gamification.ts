
import type { LevelNode, UserProfile } from '../types';

export class GamificationLogic {
    // Helper to calculate level from XP (Duplicated from GameContext to avoid circular deps or complex refactor)
    public static calculateLevel(currentXP: number) {
        let level = 1;
        const getXPRequired = (lvl: number) => {
            if (lvl <= 1) return 0;
            let total = 0;
            for (let i = 1; i < lvl; i++) {
                total += Math.floor(100 * Math.pow(1.5, i - 1));
            }
            return total;
        };

        while (getXPRequired(level + 1) <= currentXP) {
            level++;
        }
        return level;
    }

    static isLevelUnlocked(
        _node: LevelNode,
        index: number,
        _allNodes: LevelNode[],
        user: UserProfile | null,
        isAdminMode: boolean
    ): boolean {
        // 1. Admin Mode always unlocks everything
        if (isAdminMode) return true;

        // 2. First level is always unlocked
        if (index === 0) return true;

        if (!user) return false;

        // 3. LEVEL BASED UNLOCKING (Formula: Required Level = 1 + (index * 2))
        // Section 1 (Index 0) -> Level 1
        // Section 2 (Index 1) -> Level 3
        // Section 3 (Index 2) -> Level 5
        const userLevel = GamificationLogic.calculateLevel(user.xp);
        const requiredLevel = 1 + (index * 2);

        if (userLevel >= requiredLevel) {
            return true;
        }

        return false;
    }

    static getRequiredLevel(index: number): number {
        return 1 + (index * 2);
    }
}
