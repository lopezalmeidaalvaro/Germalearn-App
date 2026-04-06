import { useContext } from 'react';
import { GameContext } from '../context/GameContext';

// ==========================================
// TRANSLATIONS DICTIONARY
// ==========================================

export type Lang = 'en' | 'es';

export interface Translations {
    // Exercise buttons
    check: string;
    next: string;
    validate: string;
    evaluating: string;
    finishAndEvaluate: string;
    // Exercise headings
    translateExactly: string;
    orderSentence: string;
    creativeMode: string;
    creativeInstruction: string;
    tapToFlip: string;
    // Settings
    preferredLanguage: string;
    preferredLanguageDesc: string;
    settingsTitle: string;
    settingsSubtitle: string;
    currentRank: string;
    level: string;
    nextLevel: string;
    darkMode: string;
    darkModeDesc: string;
    changePassword: string;
    newPassword: string;
    developerZone: string;
    godModeActive: string;
    godModeDesc: string;
    accessKey: string;
    godModeActivated: string;
    minChars: string;
    passwordUpdated: string;
    apiKeySaved: string;
    apiKeyEnvManaged: string;
    apiKeyDesc: string;
    logOut: string;
    // Auth
    login: string;
    register: string;
    username: string;
    password: string;
    startBtn: string;
    fillFields: string;
    userNotFound: string;
    userExists: string;
    // Dashboard
    lessonOfDay: string;
    lessonDesc: string;
    beginBtn: string;
    grammarMap: string;
    grammarMapDesc: string;
    intensivePractice: string;
    smartReview: string;
    wordsToReview: string;
    freshMemory: string;
    errorCorrections: string;
    errorsToFix: string;
    noErrors: string;
    chapters: string;
    courseB1: string;
    // Session / Summary
    reviewMode: string;
    sessionComplete: string;
    baseXP: string;
    performanceBonus: string;
    continueBtn: string;
    // LevelUpModal
    levelUp: string;
    newLevel: string;
    awesome: string;
    // Grammar Map
    grammarMapTitle: string;
    // Chapter Path
    learningPath: string;
    noHeartsAlert: string;
    levelRequired: string;
    // Sidebar / Nav
    home: string;
    mapNav: string;
    profileAndSettings: string;
    profileNav: string;
    gymNav: string;
    // Flashcard
    speakGerman: string;
    // Placeholders
    writeInGerman: string;
    creativeAIPlaceholder: string;
    creativeLocalPlaceholder: string;
    // Feedback messages
    correctOrder: string;
    wrongOrder: string;
}

export const translations: Record<Lang, Translations> = {
    es: {
        check: 'Comprobar',
        next: 'Siguiente',
        validate: 'Validar Frase',
        evaluating: 'Evaluando...',
        finishAndEvaluate: 'Finalizar & Evaluar',
        translateExactly: 'Traduce exactamente',
        orderSentence: 'Ordena la frase',
        creativeMode: 'Modo Creativo (AI)',
        creativeInstruction: 'Crea una frase usando estas palabras clave (puedes conjugarlas):',
        tapToFlip: 'Toca para voltear',
        preferredLanguage: 'Idioma Base',
        preferredLanguageDesc: 'Idioma para explicaciones y traducciones',
        settingsTitle: 'Configuración',
        settingsSubtitle: 'Gestiona tu perfil, preferencias del sistema y claves de API.',
        currentRank: 'Rango Actual',
        level: 'Nivel',
        nextLevel: 'Siguiente Nivel',
        darkMode: 'Modo Oscuro',
        darkModeDesc: 'Descansa tu vista',
        changePassword: 'Cambiar Contraseña',
        newPassword: 'Nueva contraseña',
        developerZone: 'Zona de Desarrollador',
        godModeActive: 'MODO DIOS ACTIVADO',
        godModeDesc: 'Vidas infinitas & Todo desbloqueado',
        accessKey: 'Clave de acceso...',
        godModeActivated: '¡Modo Dios Activado!',
        minChars: 'Mínimo 3 caracteres',
        passwordUpdated: '¡Contraseña actualizada!',
        apiKeySaved: '¡API Key guardada!',
        apiKeyEnvManaged: '✓ Gestionada por variable de entorno',
        apiKeyDesc: 'Introduce tu clave personal para usar el Tutor IA.',
        logOut: 'Cerrar Sesión',
        login: 'Entrar',
        register: 'Registro',
        username: 'Usuario',
        password: 'Contraseña',
        startBtn: 'Comenzar',
        fillFields: 'Completa los campos',
        userNotFound: 'Usuario no encontrado o contraseña incorrecta',
        userExists: 'El usuario ya existe',
        lessonOfDay: 'Lección del Día',
        lessonDesc: 'Mezcla equilibrada de temas B1.',
        beginBtn: 'Comenzar',
        grammarMap: 'Gramática (A1-B2)',
        grammarMapDesc: 'Mapa de Sistemas',
        intensivePractice: 'Práctica intensiva',
        smartReview: 'Repaso Inteligente (SRS)',
        wordsToReview: 'palabras para repasar hoy',
        freshMemory: '¡Memoria fresca!',
        errorCorrections: 'Correcciones de Errores',
        errorsToFix: 'errores por corregir',
        noErrors: '¡Sin errores pendientes!',
        chapters: 'Capítulos',
        courseB1: 'Curso B1',
        reviewMode: 'Modo Repaso',
        sessionComplete: '¡Sesión Completada!',
        baseXP: 'XP Base',
        performanceBonus: '⭐ Bonus Desempeño',
        continueBtn: 'Continuar',
        levelUp: '¡Nivel Subido!',
        newLevel: 'Nuevo Nivel',
        awesome: '¡GENIAL!',
        grammarMapTitle: 'Mapa Gramatical',
        learningPath: 'Ruta de Aprendizaje',
        noHeartsAlert: '¡Te has quedado sin vidas! Practica en el Gimnasio para recuperar corazones o espera.',
        levelRequired: 'Nivel',
        home: 'Inicio',
        mapNav: 'Mapa Gramatical',
        profileAndSettings: 'Perfil y Ajustes',
        profileNav: 'Perfil',
        gymNav: 'Gym',
        speakGerman: 'Hablar',
        writeInGerman: 'Escribe en alemán...',
        creativeAIPlaceholder: 'El Tutor IA evaluará tu frase...',
        creativeLocalPlaceholder: 'Ej: Ich packe meinen Koffer...',
        correctOrder: '¡Orden correcto!',
        wrongOrder: 'Orden incorrecto.',
    },
    en: {
        check: 'Check',
        next: 'Next',
        validate: 'Validate Sentence',
        evaluating: 'Evaluating...',
        finishAndEvaluate: 'Finish & Evaluate',
        translateExactly: 'Translate exactly',
        orderSentence: 'Order the sentence',
        creativeMode: 'Creative Mode (AI)',
        creativeInstruction: 'Create a sentence using these keywords (you can conjugate them):',
        tapToFlip: 'Tap to flip',
        preferredLanguage: 'Preferred Language',
        preferredLanguageDesc: 'Language for explanations and translations',
        settingsTitle: 'Settings',
        settingsSubtitle: 'Manage your profile, system preferences and API keys.',
        currentRank: 'Current Rank',
        level: 'Level',
        nextLevel: 'Next Level',
        darkMode: 'Dark Mode',
        darkModeDesc: 'Rest your eyes',
        changePassword: 'Change Password',
        newPassword: 'New password',
        developerZone: 'Developer Zone',
        godModeActive: 'GOD MODE ACTIVE',
        godModeDesc: 'Infinite lives & Everything unlocked',
        accessKey: 'Access key...',
        godModeActivated: 'God Mode Activated!',
        minChars: 'Minimum 3 characters',
        passwordUpdated: 'Password updated!',
        apiKeySaved: 'API Key saved!',
        apiKeyEnvManaged: '✓ Managed by environment variable',
        apiKeyDesc: 'Enter your personal key to use the AI Tutor.',
        logOut: 'Log Out',
        login: 'Login',
        register: 'Register',
        username: 'Username',
        password: 'Password',
        startBtn: 'Start',
        fillFields: 'Please fill in all fields',
        userNotFound: 'User not found or incorrect password',
        userExists: 'User already exists',
        lessonOfDay: 'Lesson of the Day',
        lessonDesc: 'A balanced mix of B1 topics.',
        beginBtn: 'Begin',
        grammarMap: 'Grammar (A1-B2)',
        grammarMapDesc: 'System Map',
        intensivePractice: 'Intensive practice',
        smartReview: 'Smart Review (SRS)',
        wordsToReview: 'words to review today',
        freshMemory: 'Memory is fresh!',
        errorCorrections: 'Error Corrections',
        errorsToFix: 'errors to correct',
        noErrors: 'No pending errors!',
        chapters: 'Chapters',
        courseB1: 'B1 Course',
        reviewMode: 'Review Mode',
        sessionComplete: 'Session Complete!',
        baseXP: 'Base XP',
        performanceBonus: '⭐ Performance Bonus',
        continueBtn: 'Continue',
        levelUp: 'Level Up!',
        newLevel: 'New Level',
        awesome: 'AWESOME!',
        grammarMapTitle: 'Grammar Map',
        learningPath: 'Learning Path',
        noHeartsAlert: 'You have run out of lives! Practice in the Gym to regain hearts or wait.',
        levelRequired: 'Level',
        home: 'Home',
        mapNav: 'Grammar Map',
        profileAndSettings: 'Profile & Settings',
        profileNav: 'Profile',
        gymNav: 'Gym',
        speakGerman: 'Speak',
        writeInGerman: 'Write in German...',
        creativeAIPlaceholder: 'The AI Tutor will evaluate your sentence...',
        creativeLocalPlaceholder: 'E.g.: Ich packe meinen Koffer...',
        correctOrder: 'Correct order!',
        wrongOrder: 'Wrong order.',
    },
};

/**
 * Hook that returns translation strings based on the user's baseLanguage preference.
 * Falls back to Spanish ('es') if context is unavailable.
 */
export const useTranslation = (): Translations => {
    const context = useContext(GameContext);
    const lang: Lang = context?.state.user?.baseLanguage ?? 'es';
    return translations[lang];
};
