import { useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import { GRAMMAR_SYSTEMS } from '../data/constants';

const GrammarMapScreen = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const isDark = state.user?.theme === 'dark';

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center mb-4">
                <button onClick={() => dispatch({ type: 'GO_TO_DASHBOARD' })} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4">
                    <ArrowRight className="rotate-180" size={24} />
                </button>
                <h1 className="text-3xl font-extrabold">Mapa Gramatical</h1>
            </div>

            <div className="space-y-8">
                {GRAMMAR_SYSTEMS.map((lvl) => (
                    <div key={lvl.level} className="relative pl-8 border-l-4 border-gray-200 dark:border-gray-700">
                        <div className={`absolute -left-[18px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${lvl.color}`}>
                            {lvl.level}
                        </div>
                        <h2 className="text-xl font-bold mb-4">{lvl.title}</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {lvl.systems.map((sys) => {
                                const SysIcon = sys.icon;
                                return (
                                    <div
                                        key={sys.id}
                                        onClick={() => dispatch({ type: 'START_SESSION', isGym: false, grammarId: sys.id })}
                                        className={`flex p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95 ${isDark ? 'bg-gray-800 border-gray-700 hover:border-indigo-500' : 'bg-white border-gray-200 hover:border-indigo-400'}`}
                                    >
                                        <div className={`p-3 rounded-lg mr-4 flex items-center justify-center ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
                                            <SysIcon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{sys.name}</h3>
                                            <p className="text-sm opacity-60 leading-tight">{sys.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GrammarMapScreen;
