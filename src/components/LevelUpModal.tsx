import React from 'react';
import { Trophy, Star } from 'lucide-react';
import Button from './ui/Button';

interface LevelUpModalProps {
    level: number;
    rank: string;
    onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, rank, onClose }) => {

    // Auto-close sound? Or just animation

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white w-full max-w-sm p-8 rounded-3xl shadow-2xl border-4 border-yellow-400/50 flex flex-col items-center text-center relative overflow-hidden">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent animate-pulse" />

                {/* Content */}
                <div className="relative z-10">
                    <div className="mb-4 relative inline-block">
                        <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-bounce" />
                        <Star size={30} className="text-white absolute -top-2 -right-4 animate-ping" />
                    </div>

                    <h2 className="text-3xl font-black uppercase italic tracking-wider mb-2 text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-sm">
                        ¡Nivel Subido!
                    </h2>

                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 mb-6">
                        <p className="text-sm opacity-80 uppercase tracking-widest mb-1">Nuevo Nivel</p>
                        <p className="text-6xl font-black text-white drop-shadow-lg">{level}</p>
                        <div className="w-full h-1 bg-white/20 my-2 rounded-full" />
                        <p className="text-lg text-yellow-300 font-bold">{rank}</p>
                    </div>

                    <Button onClick={onClose} className="w-full bg-yellow-500 hover:bg-yellow-400 text-indigo-900 font-black text-lg py-4 rounded-xl shadow-lg transform transition hover:scale-105">
                        ¡GENIAL!
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LevelUpModal;
