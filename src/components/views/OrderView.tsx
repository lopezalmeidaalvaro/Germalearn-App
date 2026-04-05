import { useState, useMemo, useContext, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { GameContext } from '../../context/GameContext';
import type { Chunk, FeedbackResult } from '../../types';
import { useTranslation } from '../../i18n/translations';

const OrderView = ({ chunk, onSubmit }: { chunk: Chunk, onSubmit: (res: FeedbackResult) => void }) => {
    // START FIX: Direct context access
    const context = useContext(GameContext);
    const isDark = context?.state.user?.theme === 'dark';
    const dropZoneClass = isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-50 border-gray-300';
    const selectedBtnClass = isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-800';
    const optionBtnClass = isDark ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-700';
    const t = useTranslation();
    // END FIX

    const [selected, setSelected] = useState<string[]>([]);

    // FIX: Reset state when question changes
    useEffect(() => {
        setSelected([]);
    }, [chunk.id]);

    const words = useMemo(() => chunk.german.split(' ').sort(() => Math.random() - 0.5), [chunk.id]);
    const handleCheck = () => {
        const attempt = selected.join(' ');
        if (attempt === chunk.german) onSubmit({ status: 'correct', message: t.correctOrder, scoreModifier: 1 });
        else onSubmit({ status: 'error', message: t.wrongOrder, scoreModifier: 0 });
    };
    return (
        <div className="flex flex-col h-full">
            <h3 className="text-gray-500 font-bold mb-6 text-center uppercase tracking-widest text-sm flex justify-center gap-2"><Shuffle size={16} /> {t.orderSentence}</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4 italic">"{chunk.spanish}"</p>
            <div className={`p-4 rounded-xl min-h-[80px] mb-6 flex flex-wrap gap-2 items-center justify-center border-2 border-dashed ${dropZoneClass}`}>
                {selected.map((word, i) => (
                    <button key={i} onClick={() => setSelected(s => s.filter((_, idx) => idx !== i))} className={`px-3 py-2 rounded-lg shadow font-medium animate-in zoom-in ${selectedBtnClass}`}>{word}</button>
                ))}
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
                {words.map((word, i) => {
                    const isSelected = selected.filter(w => w === word).length >= words.filter(w => w === word).length;
                    if (isSelected) return null;
                    return <button key={i} onClick={() => setSelected([...selected, word])} className={`px-4 py-2 rounded-xl font-bold shadow hover:scale-105 transition-transform ${optionBtnClass}`}>{word}</button>;
                })}
            </div>
            <div className="flex-grow"></div>
            <button onClick={handleCheck} disabled={selected.length === 0} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold disabled:opacity-50">{t.check}</button>
        </div>
    );
};

export default OrderView;
