import { useContext } from 'react';
import { BookOpen, Map, Dumbbell, RotateCcw, ArrowRight, AlertTriangle, Brain, Star } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import { B1_CHUNKS, CHAPTERS } from '../data/constants';
import { useTranslation } from '../i18n/translations';

const DashboardScreen = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const t = useTranslation();
    const baseLang = state.user?.baseLanguage ?? 'es';

    const isDark = state.user?.theme === 'dark';

    const totalChunks = B1_CHUNKS.length;
    const masteredChunks = Object.values(state.mastery).filter(m => m.strength > 80).length;
    const progressPercent = Math.round((masteredChunks / totalChunks) * 100);

    const srsDueCount = Object.values(state.mastery).filter(m => m.nextReview < Date.now()).length;
    const mistakeCount = state.user?.mistakesInbox.length || 0;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8 animate-in fade-in duration-500">
            {/* Header moved to Layout */}

            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
                <div className="relative z-10 mb-4 md:mb-0">
                    <h2 className="text-3xl font-extrabold mb-2">{t.lessonOfDay}</h2>
                    <p className="opacity-90 mb-6 font-medium">{t.lessonDesc}</p>
                    <button onClick={() => dispatch({ type: 'START_SESSION', isGym: false })} disabled={state.user?.hearts === 0} className={`px-8 py-3 rounded-2xl font-bold text-indigo-700 shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 active:scale-95 ${state.user?.hearts === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white'}`}>
                        <BookOpen size={20} /><span>{t.beginBtn}</span>
                    </button>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm text-center min-w-[120px]">
                    <div className="text-3xl font-black">{progressPercent}%</div>
                    <div className="text-xs uppercase tracking-wide opacity-80">{t.courseB1}</div>
                </div>
                <Brain className="absolute right-[-20px] bottom-[-40px] opacity-10 rotate-12" size={200} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div onClick={() => dispatch({ type: 'GO_TO_GRAMMAR_MAP' })} className={`p-5 rounded-3xl border-2 cursor-pointer flex items-center transition-all hover:shadow-md group ${isDark ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-100 hover:border-blue-200'}`}>
                    <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600 group-hover:scale-110 transition-transform"><Map size={24} /></div>
                    <div><span className={`font-bold block ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.grammarMap}</span><span className="text-xs text-gray-500">{t.grammarMapDesc}</span></div>
                </div>

                <div onClick={() => dispatch({ type: 'START_SESSION', isGym: true })} className={`p-5 rounded-3xl border-2 cursor-pointer flex items-center transition-all hover:shadow-md group ${isDark ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-100 hover:border-indigo-200'}`}>
                    <div className="bg-purple-100 p-3 rounded-full mr-4 text-purple-600 group-hover:scale-110 transition-transform"><Dumbbell size={24} /></div>
                    <div><span className={`font-bold block ${isDark ? 'text-white' : 'text-gray-800'}`}>Grammar Gym</span><span className="text-xs text-gray-500">{t.intensivePractice}</span></div>
                </div>

                {/* BLOQUE DE REPASO INTELIGENTE (SRS) */}
                <div className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-colors md:col-span-2 ${srsDueCount > 0 ? (isDark ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200') : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full mr-4 ${srsDueCount > 0 ? 'bg-orange-100 text-orange-600 animate-pulse' : 'bg-gray-100 text-gray-400'}`}><RotateCcw size={24} /></div>
                        <div>
                            <span className={`font-bold block ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.smartReview}</span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{srsDueCount > 0 ? `${srsDueCount} ${t.wordsToReview}` : t.freshMemory}</span>
                        </div>
                    </div>
                    {srsDueCount > 0 && (
                        <button onClick={() => dispatch({ type: 'START_REVIEW' })} className="bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 hover:scale-110 transition-transform"><ArrowRight size={20} /></button>
                    )}
                </div>

                {/* BLOQUE DE CORRECCIONES */}
                <div className={`p-5 rounded-3xl border-2 flex items-center justify-between transition-colors md:col-span-2 ${mistakeCount > 0 ? (isDark ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200') : (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100')}`}>
                    <div className="flex items-center">
                        <div className={`p-3 rounded-full mr-4 ${mistakeCount > 0 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-400'}`}><AlertTriangle size={24} /></div>
                        <div>
                            <span className={`font-bold block ${isDark ? 'text-white' : 'text-gray-800'}`}>{t.errorCorrections}</span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{mistakeCount > 0 ? `${mistakeCount} ${t.errorsToFix}` : t.noErrors}</span>
                        </div>
                    </div>
                    {mistakeCount > 0 && (
                        <button onClick={() => dispatch({ type: 'START_CORRECTIONS' })} className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 hover:scale-110 transition-transform"><ArrowRight size={20} /></button>
                    )}
                </div>

            </div>

            <div>
                <h3 className={`text-xl font-extrabold mb-4 flex items-center ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    <Star className="mr-2 text-yellow-500" fill="currentColor" /> {t.chapters}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {CHAPTERS.map(chap => {
                        const IconComponent = chap.icon;
                        return (
                            <div key={chap.id} onClick={() => {
                                if ((chap as any).route === '/examen-b1') {
                                    dispatch({ type: 'OPEN_EXAM_B1' });
                                } else {
                                    dispatch({ type: 'OPEN_CHAPTER_PATH', chapterId: chap.id });
                                }
                            }}
                                className={`p-6 rounded-2xl border-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 ${isDark ? 'bg-gray-800 border-gray-700 hover:border-indigo-500 text-white' : 'bg-white border-gray-200 hover:border-indigo-400'}`}
                            >
                                <div className="flex items-center mb-3 text-indigo-500"><IconComponent size={32} /></div>
                                <h3 className="text-xl font-bold mb-1">{typeof chap.title === 'object' ? chap.title[baseLang] : chap.title}</h3>
                                <p className="text-xs opacity-60">{typeof chap.desc === 'object' ? chap.desc[baseLang] : chap.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
