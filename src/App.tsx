import { useContext, useEffect } from 'react';
import { GameProvider, GameContext } from './context/GameContext';
import { X, Trophy } from 'lucide-react';

// Screens
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import SettingsScreen from './screens/SettingsScreen';
import GrammarMapScreen from './screens/GrammarMapScreen';
import ChapterPathScreen from './screens/ChapterPathScreen';
import ExamB1Screen from './screens/ExamB1Screen';
import SessionController from './components/SessionController';
import LevelUpModal from './components/LevelUpModal';
import Layout from './components/ui/Layout';

const GameNavigator = () => {
  const context = useContext(GameContext);
  if (!context) return null;
  const { state, dispatch } = context;

  const isDark = state.user?.theme === 'dark';

  // Sync theme with HTML root for Tailwind dark mode to work globally
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showLayout = !['auth', 'session', 'summary'].includes(state.screen);

  return (
    <div className={`min-h-screen font-sans transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {state.screen === 'auth' && <AuthScreen />}

      {showLayout && (
        <Layout>
          {state.screen === 'dashboard' && <DashboardScreen />}
          {state.screen === 'grammar_map' && <GrammarMapScreen />}
          {state.screen === 'chapter_path' && <ChapterPathScreen />}
          {state.screen === 'examen_b1' && <ExamB1Screen />}
          {state.screen === 'settings' && <SettingsScreen />}
        </Layout>
      )}

      {state.screen === 'session' && (
        <div className="container mx-auto p-4 max-w-xl">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => dispatch({ type: 'EXIT_SESSION' })}><X className="text-gray-400" /></button>
            <span className="font-bold text-indigo-500 text-xs uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900 px-3 py-1 rounded-full">
              {state.session.isReviewMode ? 'Modo Repaso' : state.session.activeTitle}
            </span>
            <div className="w-6" />
          </div>
          <SessionController />
        </div>
      )}
      {state.screen === 'summary' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in zoom-in">
          <Trophy size={80} className="text-yellow-500 mb-6 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">¡Sesión Completada!</h2>

          {/* REWARD CARD */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-xs mb-8 border border-gray-100 dark:border-gray-700">

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm opacity-70">XP Base</span>
              <span className="font-bold">{state.session.sessionRewards?.baseXP || 0}</span>
            </div>

            {state.session.sessionRewards?.bonusXP ? (
              <div className="flex justify-between items-center mb-2 text-green-500">
                <span className="text-sm font-bold">⭐ Bonus Desempeño</span>
                <span className="font-bold">+{state.session.sessionRewards.bonusXP}</span>
              </div>
            ) : null}

            <div className="h-px bg-gray-200 dark:bg-gray-700 my-3" />

            <div className="flex justify-between items-center text-xl font-black text-indigo-600 dark:text-indigo-400">
              <span>TOTAL</span>
              <span>+{state.session.sessionRewards?.totalXP || 0} XP</span>
            </div>
          </div>

          <button onClick={() => dispatch({ type: 'EXIT_SESSION' })} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform">
            Continuar
          </button>
        </div>
      )}

      {state.showLevelUpModal && state.levelUpData && (
        <LevelUpModal
          level={state.levelUpData.level}
          rank={state.levelUpData.rank}
          onClose={() => dispatch({ type: 'CLOSE_LEVEL_UP_MODAL' })}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameNavigator />
    </GameProvider>
  );
}
