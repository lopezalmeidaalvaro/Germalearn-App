import { useContext } from 'react';
import { Home, Map, Dumbbell, User, LogOut, Heart, Zap, Flame } from 'lucide-react';
import { GameContext } from '../../context/GameContext';
import { GamificationLogic } from '../../logic/gamification';

const Sidebar = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;

    // isDark removed as it was unused

    const navItems = [
        { id: 'dashboard', icon: Home, label: 'Inicio', action: 'GO_TO_DASHBOARD' },
        { id: 'grammar_map', icon: Map, label: 'Mapa Gramatical', action: 'GO_TO_GRAMMAR_MAP' },
        { id: 'settings', icon: User, label: 'Perfil y Ajustes', action: 'OPEN_SETTINGS' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-colors">
            {/* Logo area */}
            <div className="p-6">
                <h1 className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">
                    GERMALEARN
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Mobile Version</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = state.screen === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => dispatch({ type: item.action } as any)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition-all ${active
                                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={() => dispatch({ type: 'START_SESSION', isGym: true })}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-gray-500 dark:text-gray-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 transition-all"
                    >
                        <Dumbbell size={20} />
                        <span>Grammar Gym</span>
                    </button>
                </div>
            </nav>

            {/* User Stats Widget (Sidebar Footer) */}
            <div className="p-4 m-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {state.user?.username?.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold text-sm truncate dark:text-white">{state.user?.username}</p>
                        <p className="text-xs text-gray-500">Nivel {GamificationLogic.calculateLevel(state.user?.xp || 0)}</p>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1 text-red-500 font-bold" title="Vidas">
                        <Heart size={16} fill="currentColor" /> {state.isAdminMode ? '∞' : state.user?.hearts}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 font-bold" title="XP">
                        <Zap size={16} fill="currentColor" /> {state.user?.xp}
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 font-bold" title="Racha">
                        <Flame size={16} fill="currentColor" /> {state.user?.streak}
                    </div>
                </div>
            </div>

            <div className="px-4 pb-6">
                <button
                    onClick={() => dispatch({ type: 'LOGOUT' })}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 px-4 transition-colors"
                >
                    <LogOut size={16} /> <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
