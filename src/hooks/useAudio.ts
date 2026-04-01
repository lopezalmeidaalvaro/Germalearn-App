import { useState, useEffect } from 'react';

export const useAudio = () => {
    const [isListening, setIsListening] = useState(false);
    const [hasSpeechSupport, setHasSpeechSupport] = useState(false);

    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        // Check for Speech Recognition support
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setHasSpeechSupport(true);
        }

        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            updateVoices();
            window.speechSynthesis.onvoiceschanged = updateVoices;
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const speak = (text: string, lang: 'de-DE' | 'es-ES' = 'de-DE') => {
        if (!window.speechSynthesis) return;

        // Cancel logic can be abrupt, ensure we want this (usually yes for a game)
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9; // Slightly slower for better comprehension

        // CRITICAL: Voice Selection Logic
        // 1. Use state voices if available, otherwise try direct fetch
        const availableVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();

        // 2. Filter for specific language matches
        const languageVoices = availableVoices.filter(v => v.lang === lang || v.lang.replace('_', '-') === lang);

        // 3. Prioritize "Google" (common on Android/Chrome) or "Anna" (common on iOS)
        let selectedVoice = languageVoices.find(v =>
            v.name.includes('Google') ||
            v.name.includes('Anna') ||
            v.name.includes('Premium') ||
            v.name.includes('Siri') // Sometimes Siri voices are exposed
        );

        // 4. Fallback: First available voice for the language
        if (!selectedVoice && languageVoices.length > 0) {
            selectedVoice = languageVoices[0];
        }

        // 5. Assign voice if found (otherwise safe fallback to system default)
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        window.speechSynthesis.speak(utterance);
    };

    const listen = (onResult: (text: string) => void) => {
        if (!hasSpeechSupport) {
            alert("Tu navegador no soporta reconocimiento de voz.");
            return;
        }
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'de-DE';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = () => setIsListening(false);

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const transcript = event.results[0][0].transcript;
                onResult(transcript.replace(/\.$/, ""));
            };
            recognition.start();
        } catch (e) {
            console.error("Error al iniciar voz:", e);
            setIsListening(false);
        }
    };

    const playSound = (type: 'send' | 'receive' | 'error' | 'click' | 'success') => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            const t = ctx.currentTime;
            if (type === 'receive') { osc.frequency.setValueAtTime(500, t); gain.gain.setValueAtTime(0.1, t); }
            else if (type === 'send') { osc.frequency.setValueAtTime(800, t); gain.gain.setValueAtTime(0.05, t); }
            else if (type === 'error') { osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, t); }
            else if (type === 'success') { osc.type = 'triangle'; osc.frequency.setValueAtTime(440, t); }
            else if (type === 'click') { osc.frequency.setValueAtTime(600, t); gain.gain.setValueAtTime(0.02, t); }

            if (type !== 'click') gain.gain.exponentialRampToValueAtTime(0.01, t + 0.2);
            else gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

            osc.start(); osc.stop(t + (type === 'success' ? 0.3 : 0.2));
        } catch (e) { console.error(e); }
    };
    return { speak, playSound, listen, isListening, hasSpeechSupport };
};
