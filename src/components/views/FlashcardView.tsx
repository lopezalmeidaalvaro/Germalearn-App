import { useState, useContext } from 'react';
import { Volume2 } from 'lucide-react';
import { GameContext } from '../../context/GameContext';
import type { Chunk } from '../../types';
import { useAudio } from '../../hooks/useAudio';
import GermanTextRenderer from '../GermanTextRenderer';

const FlashcardView = ({ chunk, onNext }: { chunk: Chunk, onNext: () => void }) => {
    // FIX: Direct context access for theme
    const context = useContext(GameContext);
    const isDark = context?.state.user?.theme === 'dark';

    // Explicit conditional classes to bypass potential Tailwind dark mode issues
    const frontClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
    const frontText = isDark ? 'text-white' : 'text-gray-900';
    const backClass = isDark ? 'bg-gray-900 border-indigo-500' : 'bg-indigo-50 border-indigo-200';
    const backText = isDark ? 'text-white' : 'text-gray-900';

    const [isFlipped, setIsFlipped] = useState(false);
    const { speak } = useAudio();

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
        if (!isFlipped && chunk.german) speak(chunk.german, 'de-DE');
    };

    return (
        <div className="h-full flex flex-col items-center justify-center cursor-pointer perspective-1000" onClick={handleFlip}>
            <div className={`relative w-full max-w-sm aspect-[4/5] transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Frente */}
                <div className={`absolute w-full h-full rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 border-2 [backface-visibility:hidden] ${frontClass}`}>
                    <span className="text-4xl mb-4">🇪🇸</span>
                    <p className={`text-xl font-bold text-center ${frontText}`}>{chunk.spanish}</p>
                    <p className="text-xs text-gray-500 mt-8 absolute bottom-6">Toca para voltear</p>
                </div>
                {/* Dorso */}
                <div className={`absolute w-full h-full rounded-3xl shadow-xl flex flex-col items-center justify-center p-6 border-2 [backface-visibility:hidden] rotate-y-180 ${backClass}`}>
                    <div className="absolute top-4 right-4"><Volume2 size={24} className="text-indigo-600 opacity-80" /></div>
                    <span className="text-4xl mb-4">🇩🇪</span>
                    <GermanTextRenderer text={chunk.german} size="xl" className={`text-center ${backText}`} />
                </div>
            </div>
            {isFlipped && <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg animate-in fade-in slide-in-from-bottom-4">Siguiente</button>}
        </div>
    );
};

export default FlashcardView;
