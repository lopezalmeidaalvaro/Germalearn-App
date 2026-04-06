import React, { useState, useContext } from 'react';
import { Brain, User, Lock } from 'lucide-react';
import { GameContext } from '../context/GameContext';
import { StorageManager } from '../logic/storage';

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
    if (!context) return null;
    const { dispatch } = context;

    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Leer el idioma del estado global o intentar recuperar de una preferencia guardada, por defecto 'en'.
    // Durante el login, state.user aún no está cargado habitualmente (es nulo), 
    // así que se confiará en 'en' por defecto según requerido.
    const lang = (context.state.user?.baseLanguage as 'es' | 'en') || localStorage.getItem('prefersLanguage') || 'en';

    // Pequeño diccionario local de traducciones
    const localTranslations = {
        login: { es: 'Entrar', en: 'Login' },
        register: { es: 'Registro', en: 'Register' },
        username: { es: 'Usuario', en: 'Username' },
        password: { es: 'Contraseña', en: 'Password' },
        startBtn: { es: 'Comenzar', en: 'Start' },
        userExists: { es: 'El usuario ya existe', en: 'User already exists' },
        userNotFound: { es: 'Usuario o contraseña incorrectos', en: 'Incorrect username or password' },
        fillFields: { es: 'Por favor, rellena todos los campos', en: 'Please fill all fields' }
    };

    const trans = localTranslations;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!username.trim() || !password.trim()) { setError(trans.fillFields[lang as 'es' | 'en']); return; }

        if (isLogin) {
            const userData = StorageManager.getUser(username);
            if (userData && userData.user && userData.user.password === password) {
                StorageManager.persistSession(username);
                dispatch({ type: 'LOGIN', username, data: userData });
            } else { setError(trans.userNotFound[lang as 'es' | 'en']); }
        } else {
            if (StorageManager.getUser(username)) { setError(trans.userExists[lang as 'es' | 'en']); } else {
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
                    <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 rounded-lg font-bold text-sm ${isLogin ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>{trans.login[lang as 'es' | 'en']}</button>
                    <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 rounded-lg font-bold text-sm ${!isLogin ? 'bg-white shadow text-indigo-600' : 'text-gray-500'}`}>{trans.register[lang as 'es' | 'en']}</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={18} /><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500 transition-colors" placeholder={trans.username[lang as 'es' | 'en']} /></div>
                    <div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={18} /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:border-indigo-500 transition-colors" placeholder={trans.password[lang as 'es' | 'en']} /></div>
                    {error && <div className="text-red-500 text-sm font-medium text-center">{error}</div>}
                    <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg mt-4 hover:bg-indigo-700 transition-colors">{trans.startBtn[lang as 'es' | 'en']}</button>
                </form>
            </div>
            <p className="fixed bottom-4 text-xs text-gray-400">GermanMaster Ultimate Edition - v2.3</p>
        </div>
    );
};

export default AuthScreen;
