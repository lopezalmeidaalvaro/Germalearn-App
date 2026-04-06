import { useContext } from 'react';
import { ArrowRight, Star, Lock, Heart } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import { CHAPTERS, CHAPTER_PATH_NODES } from '../data/constants';
import { GamificationLogic } from '../logic/gamification';
import { useTranslation } from '../i18n/translations';

const ChapterPathScreen = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const t = useTranslation();

    const isDark = state.user?.theme === 'dark';
    const chapter = CHAPTERS.find(c => c.id === state.selectedChapterId);

    if (!chapter) return null;

    const handleStartSession = (level: any, isLocked: boolean) => {
        if (isLocked) return;

        // Heart Check
        if (state.user && state.user.hearts <= 0 && !state.isAdminMode && !level.isGym) {
            alert(t.noHeartsAlert);
            return;
        }

        dispatch({ type: 'START_SESSION', isGym: false, chapterId: chapter.id, levelNode: level });
    };

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button onClick={() => dispatch({ type: 'GO_TO_DASHBOARD' })} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4">
                        <ArrowRight className="rotate-180" size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-extrabold">{chapter.title}</h1>
                        <p className="text-sm opacity-60">{t.learningPath}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-1 font-bold px-3 py-1 rounded-full transition-colors ${state.isAdminMode ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700' : 'text-red-500 bg-red-100 dark:bg-red-900/20'}`}>
                    <Heart size={16} fill={state.isAdminMode ? "currentColor" : "none"} /> {state.isAdminMode ? '∞' : state.user?.hearts}
                </div>
            </div>

            <div className="flex flex-col items-center space-y-4 relative">
                <div className="absolute top-4 bottom-4 w-2 bg-gray-200 dark:bg-gray-700 rounded-full -z-10"></div>

                {CHAPTER_PATH_NODES.map((level, index) => {
                    const isLocked = !GamificationLogic.isLevelUnlocked(level, index, CHAPTER_PATH_NODES, state.user, state.isAdminMode || false);
                    const NodeIcon = level.icon;
                    return (
                        <div key={level.id} className="relative w-full flex justify-center py-2">
                            <button
                                onClick={() => handleStartSession(level, isLocked)}
                                className={`
                  relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-xl transition-transform hover:scale-110 active:scale-95
                  ${isLocked
                                        ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed opacity-80'
                                        : `${level.type === 'boss' ? 'bg-yellow-500 border-yellow-600' : level.type === 'chat' ? 'bg-pink-500 border-pink-600' : 'bg-indigo-600 border-indigo-700'} text-white`
                                    }
                `}
                            >
                                {isLocked ? <Lock size={24} /> : <NodeIcon size={24} />}
                                {level.type === 'boss' && !isLocked && (
                                    <div className="absolute -top-6 animate-bounce text-yellow-500">
                                        <Star size={24} fill="currentColor" stroke="none" />
                                    </div>
                                )}
                            </button>
                            <div className={`absolute left-[52%] md:left-[55%] top-6 bg-white dark:bg-gray-800 px-3 py-1 rounded-xl shadow-md border dark:border-gray-700 text-xs font-bold whitespace-nowrap ${isLocked ? 'opacity-50' : ''} ${isDark ? 'text-white' : 'text-gray-700'}`}>
                                {level.title}
                                {isLocked && <span className="block text-[10px] text-red-500">{t.levelRequired} {GamificationLogic.getRequiredLevel(index)}</span>}
                                <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-l border-b dark:border-gray-700 transform rotate-45"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChapterPathScreen;
