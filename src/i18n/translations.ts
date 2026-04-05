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
