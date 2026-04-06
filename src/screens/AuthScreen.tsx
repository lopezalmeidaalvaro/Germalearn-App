import React, { useState, useContext } from 'react';
import { Brain, User, Lock } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import { StorageManager } from '../logic/storage';
import { useTranslation } from '../i18n/translations';

const defaultUser = {
    username: 'Guest',
    password: '123',
    xp: 0,
    streak: 0,
    hearts: 5,
    maxHearts: 5,
    mistakesInbox: [],
    theme: 'light',
    completedNodes: []
};

const AuthScreen = () => {
    const context = useContext(GameContext);
    const t = useTranslation();
    if (!context) return null;
    const { dispatch } = context;

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username.trim() || !password.trim()) { setError(t.fillFields); return; }

        if (isLogin) {
            const userData = StorageManager.getUser(username);
            if (userData && userData.user && userData.user.password === password) {
                StorageManager.persistSession(username);
                dispatch({ type: 'LOGIN', username, data: userData });
            } else { setError(t.userNotFound); }
        } else {
            if (StorageManager.getUser(username)) { setError(t.userExists); } else {
                const newUser = { ...defaultUser, username, password } as any;
                const initialData = { user: newUser, mastery: {} };
                StorageManager.saveUser(username, initialData);
                StorageManager.persistSession(username);
                dispatch({ type: 'LOGIN', username, data: initialData });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-900">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg"><Brain size={40} /></div>
                </div>
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">GermanMaster Ultimate</h2>
                <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                    <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-lg font-bold text-sm ${isLogin ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>{t.login}</button>
                    <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-lg font-bold text-sm ${!isLogin ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>{t.register}</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={18} /><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500 transition-colors" placeholder={t.username} /></div>
                    <div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={18} /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500 transition-colors" placeholder={t.password} /></div>
                    {error && <div className="text-red-500 text-sm font-medium text-center">{error}</div>}
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg mt-4 hover:bg-indigo-700 transition-colors">{t.startBtn}</button>
                </form>
            </div>
            <p className="fixed bottom-4 text-xs text-gray-400">GermanMaster Ultimate Edition - v2.3</p>
        </div>
    );
};

export default AuthScreen;
