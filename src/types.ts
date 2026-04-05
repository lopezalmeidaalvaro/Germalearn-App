import React from 'react';

// ==========================================
// TYPES
// ==========================================

export type ChunkId = string;
export type ExerciseType = 'THEORY' | 'FLASHCARD' | 'WRITE' | 'ORDER' | 'CREATIVE' | 'PAIRS' | 'CHAT';

export interface Chunk {
    id: ChunkId;
    german: string;
    spanish: string;
    grammarTags: string[];
    difficulty: number;
    chapterId?: string;
    keywords?: string[];
}

export interface RoleplayScenario {
    id: string;
    title: string;
    aiPersona: string;
    userMission: string;
    systemPrompt: string;
    avatarColor?: string;
    // Legacy support for static chats if needed, using partial or union type could be cleaner but this works for now
    partnerName?: string;
    steps?: {
        sender: 'bot' | 'user';
        text?: string;
        options?: {
            text: string;
            isCorrect: boolean;
            feedback: string;
        }[];
    }[];
}

export interface UserMastery {
    [chunkId: string]: {
        strength: number;
        lastReviewed: number;
        nextReview: number;
        consecutiveCorrect: number;
        errors: string[];
        stability?: number;
        difficulty?: number;
    };
}

export interface LevelNode {
    id: string;
    type: 'intro' | 'practice' | 'challenge' | 'creative' | 'boss' | 'chat';
    title: string;
    icon: React.ElementType;
    difficulty?: number;
    onlyCreative?: boolean;
    isGym?: boolean;
    chatId?: string;
}

export interface FeedbackResult {
    status: 'correct' | 'warning' | 'error';
    message: string;
    scoreModifier: number;
}

export interface UserProfile {
    username: string;
    password?: string;
    xp: number;
    streak: number;
    hearts: number;
    maxHearts: number;
    mistakesInbox: ChunkId[];
    theme: 'light' | 'dark';
    baseLanguage: 'en' | 'es';
    lastPracticeDate: string; // ISO Date YYYY-MM-DD
    completedNodes: string[];
    nextHeartRefill?: number;
}

export interface SessionItem {
    type: ExerciseType;
    data: any;
    chunkId?: string;
}

export interface AppState {
    screen: 'auth' | 'dashboard' | 'grammar_map' | 'chapter_path' | 'session' | 'summary' | 'settings' | 'examen_b1';
    isAuthenticated: boolean;
    isAdminMode: boolean;
    user: UserProfile | null;
    mastery: UserMastery;
    session: {
        queue: SessionItem[];
        currentIndex: number;
        correctCount: number;
        currentStreak: number; // ✅ Bonus Combo
        mistakes: Chunk[];
        isGymMode: boolean;
        isReviewMode: boolean;
        isCorrectionMode: boolean;
        activeTitle?: string;
        // RPG Economy
        sessionType: 'LESSON' | 'BOSS' | 'GYM';
        sessionRewards?: {
            baseXP: number;
            bonusXP: number;
            totalXP: number;
            isPerfect: boolean;

        };
    };
    selectedChapterId?: string;
    showLevelUpModal?: boolean;
    levelUpData?: { level: number; rank: string };
}

export type Action =
    | { type: 'LOGIN', username: string, data: any }
    | { type: 'LOGOUT' }
    | { type: 'CHANGE_PASSWORD', newPass: string }
    | { type: 'UPDATE_SETTINGS', theme: 'light' | 'dark' }
    | { type: 'OPEN_SETTINGS' } | { type: 'CLOSE_SETTINGS' }
    | { type: 'GO_TO_DASHBOARD' } | { type: 'GO_TO_GRAMMAR_MAP' }
    | { type: 'OPEN_CHAPTER_PATH', chapterId: string }
    | { type: 'START_SESSION', isGym: boolean, grammarId?: string, chapterId?: string, levelNode?: LevelNode }
    | { type: 'START_REVIEW' }
    | { type: 'START_CORRECTIONS' }
    | { type: 'SUBMIT_ANSWER', result: FeedbackResult, chunkId?: string }
    | { type: 'NEXT_STEP' }
    | { type: 'EXIT_SESSION' }
    | { type: 'REFILL_HEARTS' }
    | { type: 'BUY_HEARTS' }
    | { type: 'UNLOCK_ADMIN' }
    | { type: 'CLOSE_LEVEL_UP_MODAL' }
    | { type: 'OPEN_EXAM_B1' }
    | { type: 'UPDATE_STREAK' }
    | { type: 'UPDATE_BASE_LANGUAGE', lang: 'en' | 'es' };
