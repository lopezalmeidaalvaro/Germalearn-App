import type { FeedbackResult } from '../types';

export class LinguisticEngine {
    private static levenshtein(a: string, b: string): number {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
        for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
                }
            }
        }
        return matrix[b.length][a.length];
    }

    static analyzeV2Error(input: string, target: string): string | null {
        const cleanInput = input.trim();
        const inputWords = cleanInput.split(/\s+/);
        const targetWords = target.split(/\s+/);
        if (targetWords.length > 2 && inputWords.length > 2) {
            const targetVerb = targetWords[1].toLowerCase().replace(/[.,?!]/g, '');
            if (inputWords[1].toLowerCase().replace(/[.,?!]/g, '') !== targetVerb &&
                inputWords[2].toLowerCase().replace(/[.,?!]/g, '') === targetVerb) {
                return "⚠️ ¡Regla V2! En alemán, el verbo conjugado SIEMPRE debe ir en la posición 2.";
            }
        }
        return null;
    }

    static analyzeGermanError(input: string, target: string): string | null {
        const v2Error = this.analyzeV2Error(input, target);
        if (v2Error) return v2Error;
        const cleanInput = input.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
        const cleanTarget = target.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
        if ((cleanTarget.includes('bin') || cleanTarget.includes('ist') || cleanTarget.includes('sind')) && cleanInput.includes('habe')) {
            return "⚠️ Para movimiento o cambio de estado, usamos 'sein' (bin/ist), no 'haben'.";
        }
        if (cleanTarget.includes('der ') && cleanInput.includes('die ')) return "⚠️ Género incorrecto: Es masculino (Der).";
        if (cleanTarget.includes('das ') && cleanInput.includes('der ')) return "⚠️ Género incorrecto: Es neutro (Das).";
        return null;
    }

    static evaluateCreative(input: string, keywords: string[] = []): FeedbackResult {
        const lowerInput = input.trim().toLowerCase();
        if (!keywords || keywords.length === 0) return input.length > 5 ? { status: 'correct', message: '¡Frase aceptada!', scoreModifier: 1.0 } : { status: 'error', message: 'Demasiado corta.', scoreModifier: 0 };
        const missing = keywords.filter(k => !lowerInput.includes(k.toLowerCase()));
        if (missing.length === 0) return { status: 'correct', message: '¡Excelente! Usaste todos los conceptos clave.', scoreModifier: 1.2 };
        else if (missing.length === 1 && keywords.length >= 3) return { status: 'warning', message: `Te faltó algo relacionado con: "${missing[0]}"`, scoreModifier: 0.5 };
        else return { status: 'error', message: `Faltan conceptos clave: ${missing.join(', ')}`, scoreModifier: 0 };
    }

    static evaluateStrict(input: string, target: string): FeedbackResult {
        const cleanInput = input.trim();
        const cleanTarget = target.trim();
        if (!cleanInput) return { status: 'error', message: '¡Escribe algo!', scoreModifier: 0 };
        if (cleanInput === cleanTarget) return { status: 'correct', message: '¡Perfecto!', scoreModifier: 1.0 };
        const grammarTip = this.analyzeGermanError(cleanInput, cleanTarget);
        if (grammarTip) return { status: 'warning', message: grammarTip, scoreModifier: 0.4 };
        const distance = this.levenshtein(cleanInput.toLowerCase(), cleanTarget.toLowerCase());
        if (cleanInput.toLowerCase() === cleanTarget.toLowerCase()) return { status: 'warning', message: 'Cuidado con las mayúsculas.', scoreModifier: 0.9 };
        if (distance <= Math.max(2, cleanTarget.length * 0.25)) return { status: 'warning', message: `Casi... Typo detectado (${distance} letras).`, scoreModifier: 0.8 };
        return { status: 'error', message: 'Incorrecto.', scoreModifier: 0 };
    }
}
