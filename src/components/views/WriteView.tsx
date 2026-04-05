import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import type { Chunk, FeedbackResult } from '../../types';
import { useAudio } from '../../hooks/useAudio';
import { LinguisticEngine } from '../../logic/linguistic';
import { GameContext } from '../../context/GameContext';
import { useTranslation } from '../../i18n/translations';

const WriteView = ({ chunk, onSubmit }: { chunk: Chunk, onSubmit: (res: FeedbackResult) => void }) => {
    // START FIX: Direct context access
    const context = React.useContext(GameContext);
    const isDark = context?.state.user?.theme === 'dark';
    const inputClass = isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900';
    const containerClass = isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900';
    const t = useTranslation();
    // END FIX

    const [input, setInput] = useState('');
    const { listen, isListening, hasSpeechSupport, playSound } = useAudio();

    const handleMic = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isListening) return;
        playSound('click');
        listen((text) => setInput(text));
    };

    const handleSubmit = () => {
        onSubmit(LinguisticEngine.evaluateStrict(input, chunk.german));
    };

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-gray-500 font-bold mb-6 text-center uppercase tracking-widest text-sm">{t.translateExactly}</h3>
            <div className="flex items-start mb-6">
                <div className="w-12 h-12 mr-3 rounded-xl bg-indigo-100 flex items-center justify-center text-2xl shrink-0">🇩🇪</div>
                <div className={`p-4 rounded-xl rounded-tl-none border-2 text-lg font-medium ${containerClass}`}>{chunk.spanish}</div>
            </div>
            <div className="relative">
                <textarea
                    autoFocus rows={3} value={input} onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) { e.preventDefault(); handleSubmit(); } }}
                    placeholder={t.writeInGerman}
                    className={`w-full p-4 pr-12 text-xl border-2 rounded-2xl resize-none outline-none focus:border-indigo-500 shadow-inner ${inputClass}`}
                />
                {hasSpeechSupport && (
                    <button
                        type="button"
                        onClick={handleMic}
                        className={`absolute right-3 bottom-3 p-2 rounded-full transition-all ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}
                        title="Hablar"
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                )}
            </div>
            <div className="flex-grow"></div>
            <button onClick={handleSubmit} disabled={!input.trim()} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 shadow-lg">{t.check}</button>
        </div>
    );
};

export default WriteView;
