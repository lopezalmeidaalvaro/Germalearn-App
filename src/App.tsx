import { useContext, useEffect } from 'react';
import { GameProvider, GameContext } from './context/GameContext';
import { X, Trophy } from 'lucide-react';
import { useTranslation } from './i18n/translations';

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
  const t = useTranslation();

  // Verificamos el tema
  const isDark = state.user?.theme === 'dark';

  // Sincronización con el HTML root (necesario para clases dark: de Tailwind)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const showLayout = !['auth', 'session', 'summary'].includes(state.screen);

  // Stop audio when session screen is left
  useEffect(() => {
    if (state.screen !== 'session') {
      window.speechSynthesis?.cancel();
    }
  }, [state.screen]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'
      }`}>

      {/* PANTALLA DE AUTENTICACIÓN */}
      {state.screen === 'auth' && <AuthScreen />}

      {/* NAVEGACIÓN CON LAYOUT (Dashboard, Settings, etc.) */}
      {showLayout && (
        <Layout>
          {state.screen === 'dashboard' && <DashboardScreen />}
          {state.screen === 'grammar_map' && <GrammarMapScreen />}
          {state.screen === 'chapter_path' && <ChapterPathScreen />}
          {state.screen === 'examen_b1' && <ExamB1Screen />}
          {state.screen === 'settings' && <SettingsScreen />}
        </Layout>
      )}

      {/* PANTALLA DE SESIÓN ACTIVA */}
      {state.screen === 'session' && (
        <div className={`container mx-auto p-4 max-w-xl min-h-screen ${isDark ? 'bg-gray-950' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                dispatch({ type: 'EXIT_SESSION' });
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            </button>
            <span className="font-bold text-indigo-500 text-xs uppercase tracking-wider bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              {state.session.isReviewMode
                ? t.reviewMode
                : (t as any)[state.session.activeTitle ?? ''] ?? state.session.activeTitle}
            </span>
            <div className="w-6" />
          </div>
          <SessionController />
        </div>
      )}

      {/* PANTALLA DE RESUMEN (FINAL DE SESIÓN) */}
      {state.screen === 'summary' && (
        <div className={`flex flex-col items-center justify-center min-h-screen p-6 text-center animate-in zoom-in duration-500 ${isDark ? 'bg-gray-950' : 'bg-white'
          }`}>
          <Trophy size={80} className="text-yellow-500 mb-6 animate-bounce" />
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t.sessionComplete}
          </h2>

          {/* REWARD CARD - Ahora se adapta perfectamente */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-3xl shadow-xl w-full max-w-xs mb-8 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.baseXP}</span>
              <span className="font-bold">{state.session.sessionRewards?.baseXP || 0}</span>
            </div>

            {state.session.sessionRewards?.bonusXP ? (
              <div className="flex justify-between items-center mb-2 text-green-500">
                <span className="text-sm font-bold">{t.performanceBonus}</span>
                <span className="font-bold">+{state.session.sessionRewards.bonusXP}</span>
              </div>
            ) : null}

            <div className="h-px bg-gray-200 dark:bg-gray-800 my-4" />

            <div className="flex justify-between items-center text-xl font-black text-indigo-600 dark:text-indigo-400">
              <span>TOTAL</span>
              <span>+{state.session.sessionRewards?.totalXP || 0} XP</span>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'EXIT_SESSION' })}
            className="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            {t.continueBtn}
          </button>
        </div>
      )}

      {/* MODAL DE SUBIDA DE NIVEL */}
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