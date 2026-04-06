import { useState, useContext } from 'react';
import { Settings, Moon, Sun, Lock, Save, LogOut, Key, Trophy } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import { AITutorService } from '../logic/aiTutor';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

import { calculateLevel, getRankTitle, getXPRequiredForLevel } from '../context/GameContext'; // Import helpers
import { useTranslation } from '../i18n/translations';

const SettingsScreen = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;

    const isDark = state.user?.theme === 'dark';
    const baseLang = state.user?.baseLanguage ?? 'en';
    const t = useTranslation();
    const [pass, setPass] = useState('');
    const [apiKey, setApiKey] = useState(AITutorService.getApiKey() || '');
    const [msg, setMsg] = useState('');

    // Level & Rank Logic (RPG Style)
    const currentXP = state.user?.xp || 0;
    const level = calculateLevel(currentXP);
    const rank = getRankTitle(level);

    const prevThreshold = getXPRequiredForLevel(level);
    const nextThreshold = getXPRequiredForLevel(level + 1);

    // XP within current level
    const xpInLevel = currentXP - prevThreshold;
    const levelSpan = nextThreshold - prevThreshold;

    const progress = Math.min(100, Math.max(0, (xpInLevel / levelSpan) * 100));

    // Fix for visual bug: Explicitly force colors based on isDark state
    // preventing global dark class from affecting these cards when modal is in light mode.
    const cardClass = isDark
        ? '!bg-gray-700 !text-white'
        : '!bg-gray-100 !text-gray-900 border border-gray-200'; // Added border for better light mode definition

    // Fix for inputs inside cards: Force them to respect the local theme
    const inputClass = isDark
        ? 'dark:bg-gray-600 dark:border-gray-500 !text-white'
        : '!bg-white !text-gray-900 !border-gray-300 border shadow-sm';

    const handleChangePass = () => {
        if (pass.length < 3) { setMsg(t.minChars); return; }
        dispatch({ type: 'CHANGE_PASSWORD', newPass: pass });
        setMsg(t.passwordUpdated);
        setTimeout(() => setMsg(''), 2000);
    };

    const handleSaveKey = () => {
        AITutorService.setApiKey(apiKey);
        setMsg(t.apiKeySaved);
        setTimeout(() => setMsg(''), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto w-full p-6 md:p-8 animate-in fade-in duration-500">
            <div className="w-full">
                <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold flex items-center tracking-tight text-gray-900 dark:text-white">
                        <Settings className="mr-3 text-indigo-500" size={36} /> {t.settingsTitle}
                    </h1>
                    <p className="mt-2 font-medium text-gray-500 dark:text-gray-400">
                        {t.settingsSubtitle}
                    </p>
                </div>

                <div className="space-y-6">
                    {/* PROFILE SUMMARY */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-xl text-white shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20"><Trophy size={60} /></div>
                        <div className="flex justify-between items-end mb-2 relative z-10">
                            <div>
                                <p className="text-xs uppercase tracking-wider opacity-80">{t.currentRank}</p>
                                <p className="text-2xl font-black text-yellow-300">{rank}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-4xl font-black">{level}</p>
                                <p className="text-[10px] uppercase">{t.level}</p>
                            </div>
                        </div>
                        <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden relative z-10">
                            <div className="bg-yellow-400 h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] mt-1 opacity-80 relative z-10">
                            <span>{currentXP} XP</span>
                            <span>{nextThreshold} XP ({t.nextLevel})</span>
                        </div>
                    </div>
                    {/* Theme Toggle */}
                    <Card className={`flex items-center justify-between ${cardClass}`}>
                        <div className="flex items-center">
                            {isDark ? <Moon className="text-indigo-400 mr-3" /> : <Sun className="text-yellow-500 mr-3" />}
                            <div><p className="font-bold">{t.darkMode}</p><p className="text-xs opacity-70">{t.darkModeDesc}</p></div>
                        </div>
                        <button onClick={() => dispatch({ type: 'UPDATE_SETTINGS', theme: isDark ? 'light' : 'dark' })} className={`w-14 h-8 rounded-full p-1 transition-colors ${isDark ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
                        </button>
                    </Card>

                    {/* Language Selector */}
                    <Card className={`flex items-center justify-between ${cardClass}`}>
                        <div>
                            <p className="font-bold">{t.preferredLanguage}</p>
                            <p className="text-xs opacity-70">{t.preferredLanguageDesc}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => dispatch({ type: 'UPDATE_BASE_LANGUAGE', lang: 'en' })}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
                                    baseLang === 'en'
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900'
                                        : isDark ? 'bg-gray-800 text-gray-400 border-gray-700 hover:border-indigo-500' : 'bg-gray-100 text-gray-500 border-gray-200 hover:border-indigo-300'
                                }`}
                            >
                                <span className="text-base">🇺🇸</span> English
                            </button>
                            <button
                                onClick={() => dispatch({ type: 'UPDATE_BASE_LANGUAGE', lang: 'es' })}
                                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm transition-all border-2 ${
                                    baseLang === 'es'
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-indigo-900'
                                        : isDark ? 'bg-gray-800 text-gray-400 border-gray-700 hover:border-indigo-500' : 'bg-gray-100 text-gray-500 border-gray-200 hover:border-indigo-300'
                                }`}
                            >
                                <span className="text-base">🇪🇸</span> Español
                            </button>
                        </div>
                    </Card>

                    {/* Change Password */}
                    <Card className={cardClass}>
                        <p className="font-bold mb-2 flex items-center gap-2"><Lock size={16} /> {t.changePassword}</p>
                        <div className="flex gap-2">
                            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder={t.newPassword} className={`flex-1 p-3 rounded-lg border outline-none ${inputClass}`} />
                            <Button onClick={handleChangePass}><Save size={20} /></Button>
                        </div>
                        {msg && <p className="text-xs text-green-500 mt-2 font-bold">{msg}</p>}
                    </Card>

                    {/* Developer Zone */}
                    <Card className={`border-2 border-transparent hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors ${cardClass}`}>
                        <p className="font-bold mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            {t.developerZone}
                        </p>
                        {state.isAdminMode ? (
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 p-3 rounded-lg text-sm font-bold border border-yellow-200 dark:border-yellow-900/50 flex items-center gap-2">
                                <span>👑</span> {t.godModeActive}
                                <p className="text-xs font-normal block w-full mt-1 opacity-80">{t.godModeDesc}</p>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    placeholder={t.accessKey}
                                    className={`flex-1 p-3 rounded-lg border outline-none text-sm ${inputClass}`}
                                    onChange={(e) => {
                                        if (e.target.value === '0801') {
                                            dispatch({ type: 'UNLOCK_ADMIN' });
                                            setMsg(t.godModeActivated);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </Card>

                    {/* API Key */}
                    {/* API Key */}
                    <Card className={cardClass}>
                        <p className="font-bold mb-2 flex items-center gap-2"><Key size={16} /> Gemini API Key <span className="text-xs opacity-50 font-normal">(SDK Oficial: gemini-flash-latest)</span></p>

                        {import.meta.env.VITE_GEMINI_API_KEY ? (
                            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-3 rounded-lg text-sm font-bold border border-green-200 dark:border-green-900/50">
                                {t.apiKeyEnvManaged}
                            </div>
                        ) : (
                            <>
                                <p className="text-xs mb-2 opacity-70">{t.apiKeyDesc}</p>
                                <div className="flex gap-2">
                                    <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="AIzaSy..." className={`flex-1 p-3 rounded-lg border outline-none ${inputClass}`} />
                                    <Button onClick={handleSaveKey}><Save size={20} /></Button>
                                </div>
                            </>
                        )}
                    </Card>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="danger" onClick={() => dispatch({ type: 'LOGOUT' })} icon={<LogOut size={20} />} className="w-full py-3 text-lg">
                            {t.logOut}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;

