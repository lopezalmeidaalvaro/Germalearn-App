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
    // Session
    loading: string;
    continueBtn2: string;
    betterOption: string;
    correctSolution: string;
    // Theory
    understood: string;
    // Exam B1
    examSubtitle: string;
    examFinish: string;
    writeAnswerHere: string;
    wordCount: string;
    viewSolution: string;
    hideSolution: string;
    correctWithAI: string;
    correcting: string;
    sampleSolution: string;
    instructionsSchreiben: string;
    instructionsSchreibenDesc: string;
    instructionsLesen: string;
    instructionsLesenDesc: string;
    instructionsHoeren: string;
    instructionsHoerenDesc: string;
    tabHoeren: string;
    checkAnswers: string;
    aiConnectionError: string;
    // ChatView
    onlineStatus: string;
    encryptedMessages: string;
    evaluationLabel: string;
    summarySection: string;
    summaryPlaceholder: string;
    generatingOptions: string;
    connectionError: string;
    writeSummaryMin: string;
    evaluationError: string;
    // Session titles
    sessionTitleGrammar: string;
    sessionTitleGym: string;
    sessionTitleReview: string;
    sessionTitleCorrections: string;
    sessionTitleMix: string;
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
        loading: 'Cargando...',
        continueBtn2: 'Continuar',
        betterOption: 'Mejor opción / Ejemplo:',
        correctSolution: 'Solución correcta:',
        understood: 'Entendido',
        examSubtitle: 'Evaluación Completa',
        examFinish: 'Terminar Simulacro',
        writeAnswerHere: 'Escribe tu respuesta aquí...',
        wordCount: 'palabras',
        viewSolution: '📖 Ver Solución',
        hideSolution: '❌ Ocultar',
        correctWithAI: 'Corregir con IA',
        correcting: 'Corrigiendo...',
        sampleSolution: 'Musterlösung (Solución Modelo)',
        instructionsSchreiben: 'Instrucciones (Schreiben)',
        instructionsSchreibenDesc: 'Completa las 3 tareas. Usa "Corregir con IA" para recibir feedback instantáneo.',
        instructionsLesen: 'Instrucciones (Lesen)',
        instructionsLesenDesc: 'Lee los textos y completa los ejercicios. Pulsa "Comprobar" para validar tus respuestas.',
        instructionsHoeren: 'Instrucciones (Hören)',
        instructionsHoerenDesc: 'Escucha los audios y responde a las preguntas.',
        tabHoeren: '🎧 Hören (Escuchar)',
        checkAnswers: 'Comprobar',
        aiConnectionError: 'Error de conexión con IA',
        onlineStatus: 'en línea',
        encryptedMessages: 'Los mensajes están cifrados de extremo a extremo.',
        evaluationLabel: 'Evaluación:',
        summarySection: 'Zusammenfassung (Resumen)',
        summaryPlaceholder: 'Escribe un breve resumen de la conversación (15 palabras)...',
        generatingOptions: 'Generando opciones...',
        connectionError: 'Error de conexión',
        writeSummaryMin: 'Escribe al menos 5 palabras.',
        evaluationError: 'Error al evaluar.',
        sessionTitleGrammar: 'Entrenamiento Gramatical',
        sessionTitleGym: 'Gimnasio',
        sessionTitleReview: 'Repaso Inteligente',
        sessionTitleCorrections: 'Correcciones',
        sessionTitleMix: 'Mix Diario',
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
        loading: 'Loading...',
        continueBtn2: 'Continue',
        betterOption: 'Better option / Example:',
        correctSolution: 'Correct solution:',
        understood: 'Got it',
        examSubtitle: 'Full Assessment',
        examFinish: 'Finish Mock Exam',
        writeAnswerHere: 'Write your answer here...',
        wordCount: 'words',
        viewSolution: '📖 View Solution',
        hideSolution: '❌ Hide',
        correctWithAI: 'Correct with AI',
        correcting: 'Correcting...',
        sampleSolution: 'Musterlösung (Model Solution)',
        instructionsSchreiben: 'Instructions (Schreiben)',
        instructionsSchreibenDesc: 'Complete the 3 tasks. Use "Correct with AI" to receive instant feedback.',
        instructionsLesen: 'Instructions (Lesen)',
        instructionsLesenDesc: 'Read the texts and complete the exercises. Press "Check" to validate your answers.',
        instructionsHoeren: 'Instructions (Hören)',
        instructionsHoerenDesc: 'Listen to the audio and answer the questions.',
        tabHoeren: '🎧 Hören (Listen)',
        checkAnswers: 'Check',
        aiConnectionError: 'AI connection error',
        onlineStatus: 'online',
        encryptedMessages: 'Messages are end-to-end encrypted.',
        evaluationLabel: 'Evaluation:',
        summarySection: 'Zusammenfassung (Summary)',
        summaryPlaceholder: 'Write a brief summary of the conversation (15 words)...',
        generatingOptions: 'Generating options...',
        connectionError: 'Connection error',
        writeSummaryMin: 'Write at least 5 words.',
        evaluationError: 'Error while evaluating.',
        sessionTitleGrammar: 'Grammar Training',
        sessionTitleGym: 'Gym',
        sessionTitleReview: 'Smart Review',
        sessionTitleCorrections: 'Corrections',
        sessionTitleMix: 'Daily Mix',
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

/**
 * Hook that returns just the current language code.
 */
export const useLanguage = (): Lang => {
    const context = useContext(GameContext);
    return context?.state.user?.baseLanguage ?? 'es';
};

/**
 * Gets the display text for a Chunk based on the current language.
 * Returns chunk.english when lang='en' and it exists, otherwise chunk.spanish.
 */
export const getChunkText = (chunk: { spanish: string; english?: string }, lang: Lang): string => {
    if (lang === 'en' && chunk.english) return chunk.english;
    return chunk.spanish;
};

/**
 * Resolves a BilingualText object or plain string to the correct language.
 */
export const getBilingualText = (text: string | { es: string; en: string } | undefined, lang: Lang): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return lang === 'en' ? text.en : text.es;
};

