import React, { createContext, useReducer, useEffect } from 'react';
import type { AppState, Action } from '../types';
import { StorageManager } from '../logic/storage';
import { SessionGenerator } from '../logic/session';
import { SRSSystem } from '../logic/srs';
import { B1_CHUNKS, GLOBAL_CHUNKS } from '../data/constants';

// --- RPG FORMULAS ---
const getXPRequiredForLevel = (level: number) => {
    if (level <= 1) return 0;
    // Curva progresiva: Cada nivel cuesta más
    // Usaremos formula simple para control:
    let total = 0;
    for (let i = 1; i < level; i++) {
        total += Math.floor(100 * Math.pow(1.5, i - 1));
    }
    return total;
};

const calculateLevel = (currentXP: number) => {
    let level = 1;
    while (getXPRequiredForLevel(level + 1) <= currentXP) {
        level++;
    }
    return level;
};

const getRankTitle = (level: number) => {
    if (level <= 5) return "Novato";
    if (level <= 10) return "Explorador";
    if (level <= 20) return "Aventurero";
    if (level <= 30) return "Veterano";
    if (level <= 50) return "Maestro";
    return "Leyenda";
};

const initialState: AppState = {
    screen: 'auth',
    isAuthenticated: false,
    isAdminMode: false,
    user: null,
    mastery: {},
    session: { queue: [], currentIndex: 0, correctCount: 0, currentStreak: 0, mistakes: [], isGymMode: false, isReviewMode: false, isCorrectionMode: false, sessionType: 'LESSON' },
};

// --- STREAK HELPER ---
const calculateNewStreak = (currentStreak: number, lastDateStr: string) => {
    const today = new Date().toISOString().split('T')[0];
    if (lastDateStr === today) return { newStreak: currentStreak, newDate: today };

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If last practice was yesterday, increment. Otherwise (older than yesterday), reset to 1.
    if (lastDateStr === yesterdayStr) {
        return { newStreak: currentStreak + 1, newDate: today };
    } else {
        return { newStreak: 1, newDate: today };
    }
};

function appReducer(state: AppState, action: Action): AppState {
    let newState = { ...state };
    switch (action.type) {
        case 'LOGIN': {
            let user = { ...action.data.user };

            // Migration: Ensure streak properties exist
            if (typeof user.streak !== 'number') user.streak = 0;
            if (!user.lastPracticeDate) user.lastPracticeDate = '2000-01-01'; // Old date to start fresh

            if (!action.data.user) return { ...state, isAuthenticated: true, screen: 'dashboard', user: user, mastery: action.data.mastery };

            // --- TIME-BASED HEART RECOVERY ---
            if (user.hearts < user.maxHearts && user.nextHeartRefill) {
                const now = Date.now();
                const timeDiff = now - user.nextHeartRefill;

                if (timeDiff >= 0) {
                    // Calculate hearts recovered (1 initial + extras for every 30min passed after the first one)
                    const intervalsPassed = 1 + Math.floor(timeDiff / (30 * 60 * 1000));
                    const newHearts = Math.min(user.maxHearts, user.hearts + intervalsPassed);

                    user.hearts = newHearts;

                    if (newHearts < user.maxHearts) {
                        // Reset timer for the next heart: Current Target + 30mins
                        // Accurate logic: nextHeartRefill should be advanced by N intervals
                        // user.nextHeartRefill = user.nextHeartRefill + (intervalsPassed * 30 * 60 * 1000); // Original
                        // Fix: If timeDiff is huge, we might overshoot. Just ensure it's in future. 
                        // Simplification: Always set to Now + 30m if we just refilled.
                        user.nextHeartRefill = Date.now() + (30 * 60 * 1000);
                    } else {
                        user.nextHeartRefill = undefined;
                    }
                }
            } else if (user.hearts >= user.maxHearts) {
                user.nextHeartRefill = undefined; // Cleanup
            }

            newState = { ...state, isAuthenticated: true, screen: 'dashboard', user: user, mastery: action.data.mastery };
            break;
        }

        case 'LOGOUT':
            StorageManager.clearSession();
            newState = { ...initialState, screen: 'auth' };
            break;
        case 'OPEN_SETTINGS': newState = { ...state, screen: 'settings' }; break;
        case 'CLOSE_SETTINGS': newState = { ...state, screen: 'dashboard' }; break;
        case 'OPEN_EXAM_B1': newState = { ...state, screen: 'examen_b1' }; break;
        case 'UNLOCK_ADMIN': newState = { ...state, isAdminMode: true }; break;
        case 'UPDATE_SETTINGS':
            if (state.user) newState = { ...state, user: { ...state.user, theme: action.theme } };
            break;
        case 'CHANGE_PASSWORD':
            if (state.user) {
                const updatedUser = { ...state.user, password: action.newPass };
                newState = { ...state, user: updatedUser };
                StorageManager.saveUser(updatedUser.username, { user: updatedUser, mastery: state.mastery });
            }
            break;
        case 'GO_TO_DASHBOARD': newState = { ...state, screen: 'dashboard', selectedChapterId: undefined }; break;
        case 'GO_TO_GRAMMAR_MAP': newState = { ...state, screen: 'grammar_map' }; break;
        case 'OPEN_CHAPTER_PATH': newState = { ...state, screen: 'chapter_path', selectedChapterId: action.chapterId }; break;

        case 'UPDATE_STREAK': {
            if (state.user) {
                const { newStreak, newDate } = calculateNewStreak(state.user.streak, state.user.lastPracticeDate);
                newState = {
                    ...state,
                    user: { ...state.user, streak: newStreak, lastPracticeDate: newDate }
                };
            }
            break;
        }

        case 'START_SESSION':
            // Admin Mode bypasses hearts check
            if (state.user && state.user.hearts <= 0 && !action.isGym && !action.levelNode?.isGym && !state.isAdminMode) return state;
            const queue = SessionGenerator.generate(B1_CHUNKS, state.mastery, action.grammarId, action.chapterId, action.isGym, undefined, action.levelNode);
            if (queue.length === 0) return state;
            let title = 'Mix Diario';
            let sType: 'LESSON' | 'BOSS' | 'GYM' = 'LESSON';

            if (action.grammarId) { title = 'Entrenamiento Gramatical'; sType = 'GYM'; }
            if (action.isGym) { title = 'Gimnasio'; sType = 'GYM'; }
            if (action.levelNode) {
                title = action.levelNode.title;
                if (action.levelNode.type === 'boss') sType = 'BOSS';
                if (action.levelNode.isGym) sType = 'GYM';
            }

            newState = {
                ...state,
                screen: 'session',
                session: {
                    queue: queue, currentIndex: 0, correctCount: 0, currentStreak: 0, mistakes: [],
                    isGymMode: action.isGym || !!action.levelNode?.isGym,
                    isReviewMode: false,
                    isCorrectionMode: false,
                    activeTitle: title,
                    sessionType: sType
                }
            };
            break;

        case 'START_REVIEW':
            if (!state.user) return state;
            const srsQueue = SessionGenerator.generate(GLOBAL_CHUNKS, state.mastery, undefined, undefined, true, undefined);
            newState = {
                ...state,
                screen: 'session',
                session: {
                    queue: srsQueue, currentIndex: 0, correctCount: 0, currentStreak: 0, mistakes: [],
                    isGymMode: true, isReviewMode: true, isCorrectionMode: false, activeTitle: 'Repaso Inteligente',
                    sessionType: 'GYM'
                }
            };
            break;

        case 'START_CORRECTIONS':
            if (!state.user || state.user.mistakesInbox.length === 0) return state;
            const correctionQueue = SessionGenerator.generate(GLOBAL_CHUNKS, state.mastery, undefined, undefined, false, state.user.mistakesInbox);

            // FIX: Prevent infinite loading if IDs are invalid
            if (correctionQueue.length === 0) {
                return {
                    ...state,
                    user: { ...state.user, mistakesInbox: [] }
                };
            }

            newState = {
                ...state,
                screen: 'session',
                session: {
                    queue: correctionQueue, currentIndex: 0, correctCount: 0, currentStreak: 0, mistakes: [],
                    isGymMode: true, isReviewMode: false, isCorrectionMode: true, activeTitle: 'Correcciones',
                    sessionType: 'GYM'
                }
            };
            break;

        case 'SUBMIT_ANSWER':
            if (state.user) {
                const isCorrect = action.result.status === 'correct' || action.result.status === 'warning';
                let newHearts = state.user.hearts;
                let nextRefill = state.user.nextHeartRefill;

                if (!isCorrect && !state.session.isGymMode && !state.session.isReviewMode && !state.session.isCorrectionMode && !state.isAdminMode) {
                    // Logic: If we are at MAX hearts descending to MAX-1, set timer.
                    // If we are already below MAX, timer is already running, DON'T touch it.
                    if (state.user.hearts === state.user.maxHearts) {
                        nextRefill = Date.now() + (30 * 60 * 1000); // 30 minutes from now
                    }
                    newHearts = Math.max(0, state.user.hearts - 1);
                }

                let newQueue = state.session.queue;
                if (!isCorrect) {
                    const currentItem = state.session.queue[state.session.currentIndex];
                    newQueue = [...newQueue, { ...currentItem }];
                }

                let newInbox = state.user.mistakesInbox;
                if (!isCorrect && action.chunkId && !newInbox.includes(action.chunkId)) {
                    newInbox = [...newInbox, action.chunkId];
                } else if (isCorrect && action.chunkId && state.session.isCorrectionMode) {
                    newInbox = newInbox.filter(id => id !== action.chunkId);
                }

                let newMastery = { ...state.mastery };
                if (action.chunkId) {
                    const current = newMastery[action.chunkId] || { strength: 0, lastReviewed: 0, nextReview: 0, consecutiveCorrect: 0, errors: [] };
                    const srs = SRSSystem.calculateNextReview(current, isCorrect);
                    newMastery[action.chunkId] = {
                        ...current,
                        strength: srs.strength,
                        nextReview: srs.nextReview,
                        stability: srs.stability,
                        difficulty: srs.difficulty,
                        lastReviewed: Date.now(),
                        consecutiveCorrect: isCorrect ? current.consecutiveCorrect + 1 : 0
                    };
                }

                // XP MOVED TO NEXT_STEP (Summary)
                const currentStreak = isCorrect ? state.session.currentStreak + 1 : 0;

                newState = {
                    ...state,
                    mastery: newMastery,
                    user: { ...state.user, hearts: newHearts, mistakesInbox: newInbox, nextHeartRefill: nextRefill },
                    session: {
                        ...state.session,
                        queue: newQueue,
                        correctCount: state.session.correctCount + (isCorrect ? 1 : 0),
                        currentStreak: currentStreak
                    }
                };
            }
            break;

        case 'CLOSE_LEVEL_UP_MODAL':
            newState = { ...state, showLevelUpModal: false, levelUpData: undefined };
            break;

        case 'BUY_HEARTS':
            if (state.user && state.user.xp >= 50 && state.user.hearts < state.user.maxHearts) {
                newState = {
                    ...state,
                    user: {
                        ...state.user,
                        xp: state.user.xp - 50,
                        hearts: state.user.maxHearts,
                        nextHeartRefill: undefined
                    }
                };
            }
            break;

        case 'NEXT_STEP':
            if (state.user && state.session.currentIndex >= state.session.queue.length - 1) {
                // --- RPG REWARD CALCULATION ---
                let baseXP = 50;
                if (state.session.sessionType === 'BOSS') baseXP = 150;
                if (state.session.sessionType === 'GYM') baseXP = 15;

                // MULTIPLIER (Perfect Run logic: simple check for now)
                let bonusXP = 0;
                if (state.session.correctCount >= state.session.queue.length) {
                    bonusXP = Math.floor(baseXP * 0.2); // +20% for Perfect
                }

                const totalReward = baseXP + bonusXP;

                const oldLevel = calculateLevel(state.user.xp);
                const newTotalXP = state.user.xp + totalReward;
                const newLevel = calculateLevel(newTotalXP);

                let showModal = state.showLevelUpModal;
                let lvlData = state.levelUpData;

                if (newLevel > oldLevel) {
                    showModal = true;
                    lvlData = { level: newLevel, rank: getRankTitle(newLevel) };
                }

                // --- STREAK UPDATE ON SESSION COMPLETE ---
                const { newStreak, newDate } = calculateNewStreak(state.user.streak, state.user.lastPracticeDate);

                newState = {
                    ...state,
                    screen: 'summary',
                    showLevelUpModal: showModal,
                    levelUpData: lvlData,
                    user: { ...state.user, xp: newTotalXP, streak: newStreak, lastPracticeDate: newDate },
                    session: {
                        ...state.session,
                        sessionRewards: { baseXP, bonusXP, totalXP: totalReward, isPerfect: bonusXP > 0 }
                    }
                };
            }
            else newState = { ...state, session: { ...state.session, currentIndex: state.session.currentIndex + 1 } };
            break;
        case 'EXIT_SESSION':
            newState = { ...state, screen: state.selectedChapterId ? 'chapter_path' : 'dashboard' };
            break;
        case 'REFILL_HEARTS':
            if (state.user) newState = { ...state, user: { ...state.user, hearts: state.user.maxHearts } };
            break;
    }
    if (newState.isAuthenticated && newState.user && action.type !== 'CHANGE_PASSWORD') {
        StorageManager.saveUser(newState.user.username, { user: newState.user, mastery: newState.mastery });
    }
    return newState;
}

export const GameContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    useEffect(() => {
        const saved = StorageManager.getActiveSession();
        if (saved) { const u = StorageManager.getUser(saved); if (u) dispatch({ type: 'LOGIN', username: saved, data: u }); }
    }, []);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
            {/* Level Up Modal Injection Point could be here or in App */}
        </GameContext.Provider>
    );
};

export { calculateLevel, getRankTitle, getXPRequiredForLevel };
