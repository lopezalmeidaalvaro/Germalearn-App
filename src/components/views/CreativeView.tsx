import { useState, useContext } from 'react';
import { PenTool, Loader2 } from 'lucide-react';
import { GameContext } from '../../context/GameContext';
import type { Chunk, FeedbackResult } from '../../types';
import { AITutorService } from '../../logic/aiTutor';

const CreativeView = ({ chunk, onSubmit }: { chunk: Chunk, onSubmit: (res: FeedbackResult) => void }) => {
    // START FIX: Direct context access for theme (Bypassing Tailwind dark mode issues)
    const context = useContext(GameContext);
    const isDark = context?.state.user?.theme === 'dark';
    const inputClass = isDark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900';
    const containerClass = isDark ? 'bg-gray-800 border-purple-900' : 'bg-white border-purple-100';
    const tagClass = isDark ? 'bg-purple-900/50 text-purple-300 border-purple-800' : 'bg-purple-50 text-purple-700 border-purple-200';
    // END FIX

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = async () => {
        setIsLoading(true);
        try {
            // 1. Obtenemos la respuesta cruda de la IA
            const result = await AITutorService.evaluateCreative(input, chunk);

            // 2. TRADUCCIÓN CORREGIDA (Aquí estaba el fallo)
            // Tu App espera 'error' para la barra roja, no 'incorrect'
            onSubmit({
                status: result.isCorrect ? 'correct' : 'error',  // ✅ CAMBIADO: 'incorrect' -> 'error'
                message: result.feedback,
                scoreModifier: result.isCorrect ? 1 : 0
            });

        } catch (error: any) {
            console.error("Error validando:", error);

            // 3. Si hay error, enviamos estado 'error'
            onSubmit({
                status: 'error',  // ✅ CAMBIADO: 'incorrect' -> 'error'
                message: error.message || "Error desconocido",
                scoreModifier: 0
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <h3 className="text-purple-600 font-bold mb-2 text-center uppercase tracking-widest text-sm flex justify-center gap-2"><PenTool size={16} /> Modo Creativo (AI)</h3>
            <p className="text-center text-gray-500 mb-6 text-sm">Crea una frase usando estas palabras clave (puedes conjugarlas):</p>
            <div className={`border-2 p-6 rounded-2xl mb-6 text-center shadow-sm ${containerClass}`}>
                <div className="flex justify-center flex-wrap gap-2">
                    {chunk.keywords?.map(k => <span key={k} className={`text-lg font-bold px-4 py-2 rounded-lg border ${tagClass}`}>{k}</span>)}
                </div>
            </div>
            <textarea
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && input.trim() && !isLoading) { e.preventDefault(); handleCheck(); } }}
                className={`w-full p-4 border-2 rounded-xl text-lg mb-4 focus:border-purple-500 outline-none resize-none ${inputClass}`}
                placeholder={AITutorService.getApiKey() ? "El Tutor IA evaluará tu frase..." : "Ej: Ich packe meinen Koffer..."}
                rows={3}
                disabled={isLoading}
            />
            <div className="flex-grow"></div>
            <button onClick={handleCheck} disabled={!input.trim() || isLoading} className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold disabled:opacity-50 shadow-lg hover:bg-purple-700 transition-colors flex justify-center items-center">
                {isLoading ? <><Loader2 className="animate-spin mr-2" /> Evaluando...</> : 'Validar Frase'}
            </button>
        </div>
    );
};

export default CreativeView;