import { useContext } from 'react';
import { Home, Map, Dumbbell, User } from 'lucide-react';
import { GameContext } from '../../context/GameContext';
import { useTranslation } from '../../i18n/translations';

const MobileNav = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const t = useTranslation();

    const navItems = [
        { id: 'dashboard', icon: Home, label: t.home, action: 'GO_TO_DASHBOARD' },
        { id: 'grammar_map', icon: Map, label: t.mapNav, action: 'GO_TO_GRAMMAR_MAP' },
        { id: 'start_gym', icon: Dumbbell, label: t.gymNav, action: 'START_SESSION', isGym: true }, // Special case handling needed
        { id: 'settings', icon: User, label: t.profileNav, action: 'OPEN_SETTINGS' },
    ];

    const isActive = (itemId: string) => {
        if (itemId === 'start_gym') return false; // Gym is an action, not a persistent screen usually, or maybe it is 'session' screen?
        return state.screen === itemId;
    }

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-safe z-50">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.id);

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === 'start_gym') {
                                    dispatch({ type: 'START_SESSION', isGym: true });
                                } else {
                                    dispatch({ type: item.action } as any);
                                }
                            }}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'
                                }`}
                        >
                            <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

export default MobileNav;
