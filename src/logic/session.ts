import type { Chunk, ExerciseType, SessionItem, UserMastery, LevelNode } from '../types';
import { CHAT_SCENARIOS, GRAMMAR_SYSTEMS, CHAPTER_THEORY } from '../data/constants';
import { ROLEPLAY_SCENARIOS } from '../data/roleplayScenarios';

export class SessionGenerator {
    static generate(allChunks: Chunk[], mastery: UserMastery, grammarSystemId?: string, chapterId?: string, isGym?: boolean, reviewInbox?: string[], levelConfig?: LevelNode): SessionItem[] {
        let queue: SessionItem[] = [];

        if (levelConfig?.type === 'chat') {
            let roleplayScenario: any = null;

            if (chapterId && ROLEPLAY_SCENARIOS[chapterId]) {
                const scenarios = ROLEPLAY_SCENARIOS[chapterId];
                roleplayScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
                console.log("🎲 Selected Dynamic Roleplay:", roleplayScenario.title);
            } else if (levelConfig.chatId && levelConfig.chatId !== 'dynamic' && CHAT_SCENARIOS[levelConfig.chatId]) {
                // Fallback to legacy static chat if specified explicitly
                roleplayScenario = CHAT_SCENARIOS[levelConfig.chatId];
            } else {
                // Random fallback from Chapter 1 if nothing matches
                const scenarios = ROLEPLAY_SCENARIOS['cap1'];
                roleplayScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            }

            if (roleplayScenario) {
                queue.push({ type: 'CHAT', data: roleplayScenario });
                return queue;
            }
        }

        let selectedChunks: any[] = [];

        if (grammarSystemId) {
            let system: any = null;
            for (const level of GRAMMAR_SYSTEMS) {
                const found = level.systems.find(s => s.id === grammarSystemId);
                if (found) { system = found; break; }
            }
            if (system) {
                if (system.theory) system.theory.forEach((t: any) => queue.push({ type: 'THEORY', data: t }));
                selectedChunks = system.exercises;
            }
        }
        else if (chapterId && levelConfig) {
            if (levelConfig.type === 'intro') {
                const theory = CHAPTER_THEORY[chapterId];
                if (theory) theory.forEach((t: any) => queue.push({ type: 'THEORY', data: t }));
                return queue;
            }
            let pool = allChunks.filter(c => c.chapterId === chapterId);
            if (levelConfig.onlyCreative) pool = pool.filter(c => c.keywords && c.keywords.length > 0);
            else if (levelConfig.difficulty) {
                pool = pool.filter(c => c.difficulty === levelConfig.difficulty);
                if (pool.length < 3) pool = allChunks.filter(c => c.chapterId === chapterId);
            }
            selectedChunks = pool.sort(() => Math.random() - 0.5).slice(0, 8);
        }
        else if (isGym || (reviewInbox && reviewInbox.length > 0)) {
            if (reviewInbox && reviewInbox.length > 0) {
                selectedChunks = allChunks.filter(c => reviewInbox.includes(c.id));
            }
            else if (isGym) {
                const now = Date.now();
                const dueItems = allChunks.filter(c => {
                    const m = mastery[c.id];
                    return m && m.nextReview < now;
                });

                if (dueItems.length > 0) {
                    selectedChunks = dueItems.sort(() => Math.random() - 0.5).slice(0, 10);
                } else {
                    selectedChunks = allChunks.sort(() => Math.random() - 0.5).slice(0, 10);
                }
            }
        }
        else {
            selectedChunks = allChunks.sort(() => Math.random() - 0.5).slice(0, 8);
        }

        selectedChunks.forEach(chunk => {
            let type: ExerciseType = 'WRITE';
            if (levelConfig?.onlyCreative) type = 'CREATIVE';
            else if (levelConfig?.type === 'practice') {
                const rand = Math.random();
                if (rand < 0.3) type = 'FLASHCARD'; else if (rand < 0.6) type = 'ORDER'; else type = 'WRITE';
            } else if (isGym || levelConfig?.isGym || (reviewInbox && reviewInbox.length > 0)) {
                type = chunk.keywords ? 'CREATIVE' : 'WRITE';
            } else {
                const rand = Math.random();
                if (rand < 0.2) type = 'FLASHCARD'; else if (rand < 0.5) type = 'ORDER'; else if (rand < 0.75 && chunk.keywords) type = 'CREATIVE'; else type = 'WRITE';
            }
            queue.push({ type, data: chunk, chunkId: chunk.id });
        });

        if (selectedChunks.length >= 4 && !isGym && !reviewInbox && !levelConfig?.isGym && !levelConfig?.onlyCreative && !grammarSystemId) {
            const pairsData = selectedChunks.sort(() => Math.random() - 0.5).slice(0, 4);
            queue.push({ type: 'PAIRS', data: pairsData });
        }

        return queue;
    }
}
