import { useState, useEffect, useRef } from 'react';
import { Video, Phone, MoreVertical, ChevronLeft, AlertCircle, CheckCircle, CheckCheck, Send, Sparkles } from 'lucide-react';
import type { RoleplayScenario } from '../../types';
import { useAudio } from '../../hooks/useAudio';
import { AITutorService } from '../../logic/aiTutor';
import { Lock } from 'lucide-react';

const ChatView = ({ scenario, onFinish }: { scenario: RoleplayScenario, onFinish: () => void }) => {
    const { speak, playSound } = useAudio();
    const [history, setHistory] = useState<any[]>([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [toast, setToast] = useState<{ msg: string, type: 'error' | 'success' } | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // NEW STATE FOR JSON MODE
    const [currentOptions, setCurrentOptions] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [summaryText, setSummaryText] = useState('');
    const [summaryFeedback, setSummaryFeedback] = useState<{ isCorrect: boolean, msg: string } | null>(null);
    const [isEvaluatingSummary, setIsEvaluatingSummary] = useState(false);

    // STRICT AI SYSTEM PROMPT FOR JSON MODE
    const JSON_SYSTEM_INSTRUCTIONS = `
    🔴 ROLE: German Tutor (Level B1.1).
    🔴 OUTPUT FORMAT: JSON ONLY (No markdown, no plain text).
    Structure:
    {
      "aiMessage": "String (German B1.1, short, direct, somewhat robotic/functional)",
      "userOptions": ["Option 1 (Affirmative)", "Option 2 (Negative/Doubt)", "Option 3 (Question)"],
      "isFinished": boolean (true ONLY after 5 exchanges)
    }
    
    🔴 RULES:
    1. **Constraint**: Max 5 turns. Count them. On turn 5, set "isFinished": true.
    2. **Tone**: Functional, direct.
    3. **Options**: Always provide exactly 3 valid German responses for the user.
    `;

    const isDynamic = !!scenario.systemPrompt;
    // Legacy support logic
    const currentStep = !isDynamic && scenario.steps ? scenario.steps[stepIndex] : null;

    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history, isTyping, currentOptions]);

    useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

    // TRIGGER AI RESPONSE (JSON MODE)
    const triggerAIResponse = async (currentHistory: any[]) => {
        setIsTyping(true);
        try {
            const aiHistory = currentHistory
                .filter(m => m.sender === 'user' || m.sender === 'bot')
                .map(m => ({ role: m.sender, parts: m.text }));

            // CALL NEW JSON API
            const jsonResponse = await AITutorService.chatJson(
                aiHistory,
                scenario.systemPrompt + JSON_SYSTEM_INSTRUCTIONS,
                AITutorService.getApiKey()
            );

            console.log("🤖 AI JSON:", jsonResponse);

            // PROCESS RESPONSE
            const botText = jsonResponse.aiMessage || "Entschuldigung, weiter.";
            const options = jsonResponse.userOptions || ["Ja", "Nein", "Weiter"];
            const finished = !!jsonResponse.isFinished;

            const botMsg = { sender: 'bot', text: botText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };

            setHistory(prev => [...prev, botMsg]);
            setCurrentOptions(options);
            setIsFinished(finished);

            playSound('receive');
            speak(botText, 'de-DE');

        } catch (error) {
            console.error("Chat Error:", error);
            setToast({ msg: "Error de conexión", type: 'error' });
            // Fallback to keep flow going
            setCurrentOptions(["Weiter"]);
        } finally {
            setIsTyping(false);
        }
    };

    // INIT DYNAMIC CHAT
    useEffect(() => {
        if (isDynamic && history.length === 0) {
            setHistory([{
                sender: 'system',
                text: `🎯 MISIÓN: ${scenario.userMission}`,
                time: 'Info'
            }]);

            // Start Conversation
            triggerAIResponse([]);
        }
    }, [scenario.id]);

    // STATIC SCENARIO LOGIC (Legacy)
    useEffect(() => {
        if (!isDynamic && scenario.steps && stepIndex < scenario.steps.length) {
            const step = scenario.steps[stepIndex];
            if (step.sender === 'bot') {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    const newMsg = { sender: 'bot', text: step.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
                    setHistory(prev => [...prev, newMsg]);
                    playSound('receive');
                    speak(step.text || '', 'de-DE');
                    setStepIndex(prev => prev + 1);
                }, 1500 + Math.random() * 500);
            }
        } else if (!isDynamic && scenario.steps && stepIndex >= scenario.steps.length && history.length > 0) {
            setTimeout(onFinish, 2000);
        }
    }, [stepIndex, isDynamic]);

    const handleOptionClick = (text: string) => {
        playSound('send');
        const userMsg = { sender: 'user', text: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        const newHistory = [...history, userMsg];
        setHistory(newHistory);
        setCurrentOptions([]); // Hide options while loading
        triggerAIResponse(newHistory);
    };

    const handleStaticChoice = (option: any) => {
        if (option.isCorrect) {
            playSound('send');
            const newMsg = { sender: 'user', text: option.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            setHistory(prev => [...prev, newMsg]);
            setStepIndex(prev => prev + 1);
        } else {
            playSound('error');
            setToast({ msg: option.feedback, type: 'error' });
        }
    };

    const handleFinishSummary = async () => {
        if (summaryText.split(' ').length < 5) {
            setToast({ msg: "Escribe al menos 5 palabras.", type: 'error' });
            return;
        }

        setIsEvaluatingSummary(true);
        try {
            // Reuse evaluateExamTask for convenience as it does exactly what we want (corrects text)
            const result = await AITutorService.evaluateExamTask(
                summaryText,
                `Resume la conversación de roleplay anterior sobre: ${scenario.userMission}`,
                AITutorService.getApiKey()
            );

            setSummaryFeedback({ isCorrect: result.isCorrect, msg: result.feedback });
            if (result.isCorrect) {
                playSound('success');
                setTimeout(onFinish, 4000); // Give time to read feedback
            } else {
                playSound('error');
            }
        } catch (e) {
            setToast({ msg: "Error al evaluar.", type: 'error' });
        } finally {
            setIsEvaluatingSummary(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#E5DDD5] dark:bg-[#0b141a] rounded-xl overflow-hidden shadow-2xl border dark:border-gray-800 relative font-sans">
            <div className="bg-[#008069] dark:bg-[#1f2c34] p-3 shadow-md flex items-center gap-3 text-white z-10">
                <button onClick={onFinish} className="p-1 rounded-full hover:bg-black/10"><ChevronLeft /></button>
                <div className={`w-10 h-10 rounded-full ${scenario.avatarColor} flex items-center justify-center text-white font-bold border-2 border-white/20`}>
                    {scenario.aiPersona ? scenario.aiPersona[0] : scenario.partnerName?.[0]}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-sm leading-tight">
                        {scenario.aiPersona || scenario.partnerName}
                        {isDynamic && <span className="ml-2 text-[10px] bg-white/20 px-1 rounded">AI</span>}
                    </h3>
                    <p className="text-xs opacity-80 flex items-center gap-1">en línea</p>
                </div>
                <div className="flex gap-4 pr-2">
                    <Video size={20} className="opacity-80" />
                    <Phone size={20} className="opacity-80" />
                    <MoreVertical size={20} className="opacity-80" />
                </div>
            </div>

            {toast && (
                <div className={`absolute top-16 left-4 right-4 p-3 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-in slide-in-from-top-5 fade-in duration-300 ${toast.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800'}`}>
                    {toast.type === 'error' ? <AlertCircle className="shrink-0" /> : <CheckCircle className="shrink-0" />}
                    <p className="text-sm font-medium">{toast.msg}</p>
                </div>
            )}

            <div className="flex-grow p-4 overflow-y-auto space-y-3 relative" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundSize: '400px' }}>
                <div className="absolute inset-0 bg-[#E5DDD5]/90 dark:bg-[#0b141a]/95 -z-10" />

                <div className="flex justify-center mb-6">
                    <div className="bg-[#FFD279] dark:bg-[#1f2c34] text-[#5e5e5e] dark:text-[#ffcc00] text-[10px] px-3 py-1 rounded-lg shadow-sm text-center max-w-[80%]">
                        <Lock size={8} className="inline mr-1 mb-[1px]" /> Los mensajes están cifrados de extremo a extremo.
                    </div>
                </div>

                {history.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}>
                        {msg.sender === 'system' ? (
                            <div className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-xs px-3 py-1 rounded-full shadow-sm mb-2 font-bold max-w-[90%] text-center border border-yellow-200 dark:border-yellow-800">
                                {msg.text}
                            </div>
                        ) : (
                            <div className={`max-w-[75%] p-2 px-3 rounded-lg shadow-sm relative text-[15px] leading-snug ${msg.sender === 'user' ? 'bg-[#d9fdd3] dark:bg-[#005c4b] text-gray-900 dark:text-gray-100 rounded-tr-none' : 'bg-white dark:bg-[#202c33] text-gray-900 dark:text-gray-100 rounded-tl-none'}`}>
                                <div className={`absolute top-0 w-2 h-2 ${msg.sender === 'user' ? '-right-2 bg-[#d9fdd3] dark:bg-[#005c4b]' : '-left-2 bg-white dark:bg-[#202c33]'}`} style={{ clipPath: msg.sender === 'user' ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
                                {msg.text}
                                <div className="flex justify-end items-center gap-1 mt-1 opacity-60">
                                    <span className="text-[10px]">{msg.time}</span>
                                    {msg.sender === 'user' && <CheckCheck size={12} className="text-blue-500" />}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                        <div className="bg-white dark:bg-[#202c33] p-3 rounded-tl-none shadow-sm flex gap-1 items-center h-10 w-16 justify-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}

                {/* SUMMARY FEEDBACK */}
                {summaryFeedback && (
                    <div className={`mx-4 p-3 rounded-lg text-sm border ${summaryFeedback.isCorrect ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                        <strong>{summaryFeedback.isCorrect ? "✅ " : "⚠️ "}Evaluación:</strong> {summaryFeedback.msg}
                    </div>
                )}

                <div ref={scrollRef} />
            </div>

            {/* INPUT AREA */}
            <div className="bg-[#f0f2f5] dark:bg-[#1f2c34] p-2 py-3 flex flex-col gap-2 border-t dark:border-gray-700 min-h-[60px]">

                {/* DYNAMIC JSON OPTIONS - ONLY SHOW IF NOT FINISHED */}
                {isDynamic && !isFinished && currentOptions.length > 0 && (
                    <div className="grid gap-2 animate-in slide-in-from-bottom-10 fade-in duration-500">
                        {currentOptions.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleOptionClick(opt)}
                                disabled={isTyping}
                                className="w-full text-left p-3 rounded-lg bg-white dark:bg-[#2a3942] hover:bg-gray-100 dark:hover:bg-[#374248] shadow-sm border border-transparent active:scale-[0.98] transition-all text-sm font-medium dark:text-gray-200 flex items-center justify-between group disabled:opacity-50"
                            >
                                <span>{opt}</span>
                                <Send size={16} className="text-[#008069] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                )}

                {/* LEGACY STATIC OPTIONS */}
                {!isDynamic && currentStep && currentStep.sender === 'user' && (
                    <div className="grid gap-2 animate-in slide-in-from-bottom-10 fade-in duration-500">
                        {currentStep.options?.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleStaticChoice(opt)}
                                className="w-full text-left p-3 rounded-full bg-white dark:bg-[#2a3942] hover:bg-gray-100 dark:hover:bg-[#374248] shadow-sm border border-transparent active:scale-[0.98] transition-all text-sm font-medium dark:text-gray-200 flex items-center justify-between group"
                            >
                                <span>{opt.text}</span>
                                <Send size={16} className="text-[#008069] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                            </button>
                        ))}
                    </div>
                )}

                {/* FINAL SUMMARY TASK - ONLY WHEN FINISHED */}
                {isFinished && (
                    <div className="flex flex-col gap-2 px-2 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center gap-2 mb-1">
                            <Sparkles size={16} className="text-yellow-500" />
                            <span className="text-xs font-bold text-gray-500 uppercase">Zusammenfassung (Resumen)</span>
                        </div>
                        <textarea
                            value={summaryText}
                            onChange={e => setSummaryText(e.target.value)}
                            placeholder="Escribe un breve resumen de la conversación (15 palabras)..."
                            className="w-full bg-white dark:bg-[#2a3942] rounded-lg p-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#008069] resize-none h-20"
                            disabled={isEvaluatingSummary || (summaryFeedback?.isCorrect === true)}
                        />
                        <button
                            onClick={handleFinishSummary}
                            disabled={isEvaluatingSummary || !summaryText.trim() || (summaryFeedback?.isCorrect === true)}
                            className="bg-[#008069] text-white p-2 rounded-lg font-bold text-sm hover:bg-[#006e5a] transition-colors disabled:opacity-50"
                        >
                            {isEvaluatingSummary ? "Evaluando..." : "Finalizar & Evaluar"}
                        </button>
                    </div>
                )}

                {/* PLACEHOLDER IF LOADING OR WAITING - NO INPUT FIELD HERE */}
                {isTyping && currentOptions.length === 0 && (
                    <div className="text-center text-xs text-gray-400 py-2">Generando opciones...</div>
                )}
            </div>
        </div>
    );
};

export default ChatView;
