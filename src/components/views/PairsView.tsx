import { useState } from 'react';
import { Grid } from 'lucide-react';
import type { Chunk } from '../../types';
import { useAudio } from '../../hooks/useAudio';

const PairsView = ({ data, onFinish }: { data: Chunk[], onFinish: () => void }) => {
    const { speak } = useAudio();
    const [cards, setCards] = useState(() => {
        const all = data.flatMap((d, i) => [
            { id: `g-${i}`, text: d.german, pairId: i, state: 'hidden', lang: 'de' },
            { id: `s-${i}`, text: d.spanish, pairId: i, state: 'hidden', lang: 'es' }
        ]);
        return all.sort(() => Math.random() - 0.5);
    });
    const [selected, setSelected] = useState<string | null>(null);

    const handleClick = (id: string, text: string, lang: string) => {
        if (lang === 'de') speak(text, 'de-DE');

        if (selected === id) { setSelected(null); return; }
        if (!selected) { setSelected(id); return; }
        const c1 = cards.find(c => c.id === selected)!;
        const c2 = cards.find(c => c.id === id)!;
        if (c1.pairId === c2.pairId) {
            setCards(prev => prev.map(c => (c.id === selected || c.id === id) ? { ...c, state: 'matched' } : c));
            setSelected(null);
        } else {
            setTimeout(() => setSelected(null), 500);
            setSelected(id); setSelected(null);
        }
    };

    const isDone = cards.every(c => (c as any).state === 'matched');

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-orange-500 font-bold mb-4 text-center uppercase tracking-widest text-sm flex justify-center gap-2"><Grid size={16} /> Encuentra las parejas</h3>
            <div className="grid grid-cols-2 gap-3 mb-6 flex-grow overflow-y-auto">
                {cards.map(card => (
                    <button
                        key={card.id}
                        onClick={() => (card as any).state !== 'matched' && handleClick(card.id, card.text, (card as any).lang!)}
                        disabled={(card as any).state === 'matched'}
                        className={`p-2 rounded-xl text-xs sm:text-sm font-bold transition-all h-24 flex items-center justify-center text-center ${(card as any).state === 'matched' ? 'opacity-0 pointer-events-none' :
                                selected === card.id ? 'bg-indigo-600 text-white scale-105 shadow-lg' :
                                    'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-indigo-300'
                            }`}
                    >
                        {card.text}
                    </button>
                ))}
            </div>
            {isDone && <button onClick={onFinish} className="w-full bg-green-500 text-white py-3 rounded-xl font-bold animate-bounce shadow-lg">¡Completado! Continuar</button>}
        </div>
    );
};

export default PairsView;
