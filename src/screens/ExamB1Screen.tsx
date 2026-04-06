import { useState, useContext, useRef, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { AITutorService } from '../logic/aiTutor';
import { useTranslation } from '../i18n/translations';

interface FeedbackResult {
    status: 'correct' | 'warning' | 'error';
    message: string;
}

// --- SHARED COMPONENTS ---

const FeedbackOverlay = ({ feedback, onClose }: { feedback: FeedbackResult | null, onClose: () => void }) => {
    const t = useTranslation();
    if (!feedback) return null;
    const isCorrect = feedback.status === 'correct';
    const isWarning = feedback.status === 'warning';
    const isError = feedback.status === 'error';

    let bgColor = 'bg-green-100 dark:bg-green-900';
    let textColor = 'text-green-800 dark:text-green-100';
    let btnColor = 'bg-green-600';

    if (isWarning) {
        bgColor = 'bg-yellow-50 dark:bg-yellow-900/50';
        textColor = 'text-yellow-800 dark:text-yellow-100';
        btnColor = 'bg-yellow-600';
    } else if (isError) {
        bgColor = 'bg-red-100 dark:bg-red-900';
        textColor = 'text-red-800 dark:text-red-100';
        btnColor = 'bg-red-600';
    }

    return (
        <div className={`fixed bottom-0 left-0 right-0 p-6 pb-8 transition-transform z-50 animate-in slide-in-from-bottom-10 ${bgColor} border-t-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
            <div className="max-w-xl mx-auto">
                <div className={`font-bold text-lg mb-4 flex items-start gap-3 ${textColor}`}>
                    <div className="mt-1 text-2xl">{isCorrect ? '✨' : '⚠️'}</div>
                    <span className="leading-relaxed">{feedback.message}</span>
                </div>

                <button onClick={onClose} className={`w-full py-3 rounded-xl font-bold text-white shadow-lg ${btnColor} hover:opacity-90 active:scale-95 transition-all`}>
                    {t.understood}
                </button>
            </div>
        </div>
    );
};

// --- WRITING SECTION COMPONENTS ---

const WritingTask = ({ title, instruction, solution, onCorrect }: { title: string, instruction: string, solution: string, id?: string, onCorrect: (text: string, task: string) => Promise<void> }) => {
    const t = useTranslation();
    const [showSolution, setShowSolution] = useState(false);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCorrection = async () => {
        if (!text.trim()) return;
        setIsLoading(true);
        await onCorrect(text, instruction);
        setIsLoading(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b pb-2">{title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">{instruction}</p>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t.writeAnswerHere}
                className="w-full h-32 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"
                disabled={isLoading}
            />

            <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-400">{text.split(/\s+/).filter(w => w.length > 0).length} {t.wordCount}</span>

                <div className="flex gap-3">
                    <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                        {showSolution ? <>{t.hideSolution}</> : <>{t.viewSolution}</>}
                    </button>

                    <button
                        onClick={handleCorrection}
                        disabled={isLoading || !text.trim()}
                        className="flex items-center gap-2 text-sm font-bold text-white bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md"
                    >
                        {isLoading ? <span className="animate-spin">↻</span> : <span>✨</span>}
                        {isLoading ? t.correcting : t.correctWithAI}
                    </button>
                </div>
            </div>

            {showSolution && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 animate-in fade-in slide-in-from-top-2">
                    <h4 className="text-xs font-bold text-green-600 dark:text-green-400 mb-2 uppercase tracking-wide">{t.sampleSolution}</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-serif leading-relaxed whitespace-pre-wrap">
                        {solution}
                    </p>
                </div>
            )}
        </div>
    );
};

// --- WRITING SECTION COMPONENTS ---
const WritingSection = ({ onCorrect, lang }: { onCorrect: (text: string, instruction: string) => Promise<void>, lang: string }) => {
    const t = useTranslation();
    const handleAICorrection = onCorrect;
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-4 rounded-2xl flex items-start gap-3">
                <span className="text-yellow-600 mt-1 text-xl">📝</span>
                <div>
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-500">{t.instructionsSchreiben}</h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 opacity-90">{t.instructionsSchreibenDesc}</p>
                </div>
            </div>

            <WritingTask
                id="t2-1"
                title={lang === 'en' ? 'Task 2.1: Absence Email' : 'Tarea 2.1: Email de Ausencia'}
                instruction={lang === 'en' ? 'Write a formal email to Ms. Blau. You cannot attend the course. Include: Reason (sick colleague), Apology, Ask for homework, and When you will return.' : 'Escribe un email formal a la Sra. Blau. No puedes ir al curso. Incluye: Razón (compañero enfermo), Disculpa, Preguntar deberes y Cuándo vuelves.'}
                solution={`Liebe Frau Blau,

ich schreibe Ihnen, weil ich nächste Woche leider nicht zum Kurs "Computer reparieren" kommen kann.
Ich muss länger arbeiten, da ein Kollege krank ist.

Es tut mir sehr leid. Könnten Sie mir bitte sagen, welche Hausaufgaben wir machen müssen?
In zwei Wochen bin ich wieder dabei.

Viele Grüße
Dein Name`}
                onCorrect={handleAICorrection}
            />

            <WritingTask
                id="t2-2"
                title={lang === 'en' ? 'Task 2.2: WhatsApp Mediation' : 'Tarea 2.2: Mediación WhatsApp'}
                instruction={lang === 'en' ? 'Write an informal WhatsApp summarizing the electronics chart. Data: Mobile 27%, Laptop 18%, TV 17%, Tablet 13%.' : 'Escribe un WhatsApp informal resumiendo el gráfico de electrónica. Datos: Móvil 27%, Laptop 18%, TV 17%, Tablet 13%.'}
                solution={`Hallo!

Ich habe im Internet eine interessante Grafik gefunden. In Deutschland wollen 27% der Leute in den nächsten 12 Monaten ein neues Handy kaufen.
Danach kommen Laptops mit 18% und Fernseher mit 17%. Tablets sind mit 13% auf Platz 4.
Total verrückt, wie viel Elektronik wir kaufen, oder?

Bis später!`}
                onCorrect={handleAICorrection}
            />

            <WritingTask
                id="t4-2"
                title={lang === 'en' ? 'Task 4.2: Company Excursion' : 'Tarea 4.2: Excursión de Empresa'}
                instruction={lang === 'en' ? 'Organize the Betriebsausflug (Formal). Define: What (Museum+Dinner), Where (Zur Post), When (Friday 20), and Who organizes.' : 'Organiza el Betriebsausflug (Formal). Define: Qué (Museo+Cena), Dónde (Zur Post), Cuándo (Viernes 20) y Quién organiza.'}
                solution={`Für unseren nächsten Betriebsausflug schlage ich einen Kultur- und Restaurantbesuch vor.

Wir könnten am Freitag, den 20. Mai, zuerst ins Moderne Kunstmuseum gehen. Die Führung dauert eine Stunde.
Danach essen wir im Restaurant "Zur Post" zu Abend. Das ist direkt nebenan.

Wir treffen uns um 17 Uhr vor dem Museum.
Ich kann die Reservierung für das Restaurant organisieren. Wer kümmert sich um die Tickets für das Museum?

Was denkt ihr?`}
                onCorrect={handleAICorrection}
            />
        </div>
    );
};

// --- READING SECTION COMPONENTS ---

const GapFillExercise = ({ lang }: { lang: string }) => {
    // 10 Gaps
    const t = useTranslation();
    const gaps = [
        { id: 1, options: ["Ihrer", "Seiner", "Dessen"], correct: "Ihrer" },
        { id: 2, options: ["der", "die", "das"], correct: "die" },
        { id: 3, options: ["suche", "finde", "nehme"], correct: "finde" },
        { id: 4, options: ["am", "um", "im"], correct: "im" },
        { id: 5, options: ["einer", "eine", "einem"], correct: "einer" },
        { id: 6, options: ["bei", "an", "zu"], correct: "an" },
        { id: 7, options: ["Außerdem", "Sondern", "Aber"], correct: "Außerdem" },
        { id: 8, options: ["werde", "wurde", "werden"], correct: "werden" },
        { id: 9, options: ["offenes", "offener", "offenem"], correct: "offener" },
        { id: 10, options: ["ich", "mich", "mir"], correct: "mir" }
    ];

    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [validated, setValidated] = useState(false);

    const handleSelect = (id: number, val: string) => {
        setAnswers(prev => ({ ...prev, [id]: val }));
        setValidated(false);
    };

    const checkAnswers = () => {
        setValidated(true);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b pb-2">
                {lang === 'en' ? 'Task 3.1: Gap-fill (Bankkaufmann)' : 'Tarea 3.1: Rellenar Huecos (Bankkaufmann)'}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                {lang === 'en' ? 'Select the correct word for each gap.' : 'Selecciona la palabra correcta para cada hueco.'}
            </p>

            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl leading-loose text-gray-800 dark:text-gray-200 font-serif">
                Sehr geehrte Frau Bagan, <br /><br />
                mit großem Interesse habe ich auf
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[1] === gaps[0].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(1, e.target.value)} value={answers[1] || ""}>
                    <option value="">[...]</option>
                    {gaps[0].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Webseite
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[2] === gaps[1].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(2, e.target.value)} value={answers[2] || ""}>
                    <option value="">[...]</option>
                    {gaps[1].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Anzeige für die Ausbildung gelesen. Ich
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[3] === gaps[2].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(3, e.target.value)} value={answers[3] || ""}>
                    <option value="">[...]</option>
                    {gaps[2].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Ihre Bank sehr modern. Besonders gefällt mir der Service
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[4] === gaps[3].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(4, e.target.value)} value={answers[4] || ""}>
                    <option value="">[...]</option>
                    {gaps[3].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Internet. Ich möchte gerne in
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[5] === gaps[4].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(5, e.target.value)} value={answers[5] || ""}>
                    <option value="">[...]</option>
                    {gaps[4].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                großen Firma arbeiten. Das Interesse
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[6] === gaps[5].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(6, e.target.value)} value={answers[6] || ""}>
                    <option value="">[...]</option>
                    {gaps[5].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Zahlen habe ich schon lange.
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[7] === gaps[6].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(7, e.target.value)} value={answers[7] || ""}>
                    <option value="">[...]</option>
                    {gaps[6].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                spreche ich Englisch. Bankkaufmann möchte ich
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[8] === gaps[7].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(8, e.target.value)} value={answers[8] || ""}>
                    <option value="">[...]</option>
                    {gaps[7].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                , weil ich ein
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[9] === gaps[8].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(9, e.target.value)} value={answers[9] || ""}>
                    <option value="">[...]</option>
                    {gaps[8].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Mensch bin. Das würde
                <select className={`mx-1 p-1 rounded border ${validated ? (answers[10] === gaps[9].correct ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800') : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 outline-none text-black dark:text-white'}`} onChange={e => handleSelect(10, e.target.value)} value={answers[10] || ""}>
                    <option value="">[...]</option>
                    {gaps[9].options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                Spaß machen.
                <br /><br /> Mit freundlichen Grüßen <br /> Max Mustermann
            </div>

            <div className="flex justify-end pt-2">
                <button onClick={checkAnswers} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow transition-transform active:scale-95">
                    {t.checkAnswers}
                </button>
            </div>
        </div>
    );
};

const QuizExercise = ({ lang }: { lang: string }) => {
    const t = useTranslation();
    const questions = [
        {
            id: 1, q: lang === 'en' ? "Glass (Glas)" : "El vidrio (Glas)", options: [
                { id: 'a', text: lang === 'en' ? "Throw during the day (tagsüber)" : "Tirar durante el día (tagsüber)" },
                { id: 'b', text: lang === 'en' ? "Throw at night" : "Tirar por la noche" },
                { id: 'c', text: lang === 'en' ? "Never throw" : "No tirar nunca" }
            ], correct: 'a'
        },
        {
            id: 2, q: lang === 'en' ? "If bins are full" : "Si los cubos están llenos", options: [
                { id: 'a', text: lang === 'en' ? "Leave trash on the floor" : "Dejar la basura en el suelo" },
                { id: 'b', text: lang === 'en' ? "Wait until tomorrow" : "Esperar a mañana" },
                { id: 'c', text: lang === 'en' ? "Talk to administration (Hausverwaltung)" : "Hablar con la administración (Hausverwaltung)" }
            ], correct: 'c'
        },
        {
            id: 3, q: lang === 'en' ? "Milk cartons" : "Cartones de leche", options: [
                { id: 'a', text: lang === 'en' ? "To paper (Papier)" : "Al papel (Papier)" },
                { id: 'b', text: lang === 'en' ? "To general waste (Restmüll)" : "Al resto (Restmüll)" },
                { id: 'c', text: lang === 'en' ? "To plastic bin (Plastiktonne)" : "Al contenedor de plástico (Plastiktonne)" }
            ], correct: 'c'
        },
        {
            id: 4, q: lang === 'en' ? "You receive a fine if" : "Se recibe multa si", options: [
                { id: 'a', text: lang === 'en' ? "You separate trash well" : "Separas bien la basura" },
                { id: 'b', text: lang === 'en' ? "You throw carpets in general waste" : "Tiras alfombras en la basura general (Restmüll)" },
                { id: 'c', text: lang === 'en' ? "You throw paper in the blue bin" : "Tiras papel en el azul" }
            ], correct: 'b'
        },
    ];

    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [validated, setValidated] = useState(false);

    const handleSelect = (qid: number, optId: string) => {
        setAnswers(prev => ({ ...prev, [qid]: optId }));
        setValidated(false);
    };

    const checkAnswers = () => {
        setValidated(true);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b pb-2">
                {lang === 'en' ? 'Task 5.1: Recycling Rules (Comprehension)' : 'Tarea 5.1: Reglas de Reciclaje (Comprensión)'}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                {lang === 'en' ? 'Choose the correct option according to the rules.' : 'Elige la opción correcta según las normas.'}
            </p>

            <div className="space-y-6">
                {/* Reading Text Card */}
                <div className="bg-gray-100 dark:bg-gray-700/50 p-6 rounded-xl border-l-4 border-indigo-500 shadow-sm mb-6">
                    <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-wide mb-2">Mülltrennung leicht gemacht</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 font-serif leading-relaxed space-y-2">
                        <span className="block italic mb-2">Beachten Sie, dass die Mülltonnen an ihrem Platz bleiben müssen. Bitte stellen Sie keinen Müll neben den Tonnen ab. Entsorgen Sie kein Altglas zwischen 22:00 Uhr und 7:00 Uhr.</span>

                        <span className="block"><strong>1. Papiertonne:</strong> Pappe, Papier und Kartons, z. B. Zeitungen, Bücher. Bitte keine Getränke oder Milchpackungen in die Papiertonne werfen. <em>Besonderheiten: Kartons bitte klein machen.</em></span>

                        <span className="block"><strong>2. Altglastonnen:</strong> Glas, wie z. B. Flaschen und Gläser. Keine Teller und Tassen. <em>Besonderheiten: Bitte nach Farben sortieren: Weiß in die Weißglastonne, Grün in die Grünglastonne.</em></span>

                        <span className="block"><strong>3. Plastiktonne:</strong> Verpackungen und andere Abfälle aus Kunststoff, z. B. Plastikflaschen, Joghurtbecher, Milch- und Saftpackungen. Bitte keine Textilien. <em>Besonderheiten: Machen Sie die Packungen leer, aber spülen Sie sie nicht aus.</em></span>

                        <span className="block"><strong>4. Restmülltonne:</strong> Anderer Hausmüll, z. B. alte Fotos, schmutzige Papiere, kaputte Teller, Zigarettenstummel. <em>Verbot: Es ist untersagt, große Sachen wie Teppiche in die Restmülltonne zu geben. Bringen Sie diese zum Recyclinghof.</em></span>
                    </p>
                </div>

                {questions.map(quest => (
                    <div key={quest.id} className="space-y-2">
                        <p className="font-bold text-gray-800 dark:text-gray-200">{quest.id}. {quest.q}</p>
                        <div className="space-y-1">
                            {quest.options.map(opt => {
                                let itemClass = "flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transition-colors";
                                if (validated) {
                                    if (opt.id === quest.correct) {
                                        itemClass = "flex items-center gap-3 p-3 rounded-xl border border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 font-bold";
                                    } else if (answers[quest.id] === opt.id) {
                                        itemClass = "flex items-center gap-3 p-3 rounded-xl border border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200";
                                    } else {
                                        itemClass += " opacity-50";
                                    }
                                } else if (answers[quest.id] === opt.id) {
                                    itemClass = "flex items-center gap-3 p-3 rounded-xl border border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 shadow-sm";
                                }

                                return (
                                    <div key={opt.id} onClick={() => handleSelect(quest.id, opt.id)} className={itemClass}>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers[quest.id] === opt.id ? 'border-indigo-500 outline-2 outline-indigo-500' : 'border-gray-400'}`}>
                                            {answers[quest.id] === opt.id && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                        </div>
                                        <span>{opt.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end pt-4">
                <button onClick={checkAnswers} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow transition-transform active:scale-95">
                    {t.checkAnswers}
                </button>
            </div>
        </div>
    );
};

const ReadingSection = ({ lang }: { lang: string }) => {
    const t = useTranslation();
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 p-4 rounded-2xl flex items-start gap-3">
                <span className="text-blue-600 mt-1 text-xl">📖</span>
                <div>
                    <h3 className="font-bold text-blue-800 dark:text-blue-500">{t.instructionsLesen}</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 opacity-90">{t.instructionsLesenDesc}</p>
                </div>
            </div>

            <GapFillExercise lang={lang}/>
            <QuizExercise lang={lang}/>
        </div>
    );
};

// --- LISTENING SECTION COMPONENTS ---

const AudioPlayer = ({ src, lang = 'es' }: { src: string, lang?: string }) => {
    const [error, setError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-xl mb-4">
            {!error ? (
                <audio
                    ref={audioRef}
                    key={src}
                    controls
                    className="w-full"
                    onError={() => setError(true)}
                >
                    <source src={src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <div className="text-red-500 font-bold flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <span>⚠️</span> {lang === 'en' ? 'Audio temporarily unavailable' : 'Audio no disponible temporalmente'}
                </div>
            )}
        </div>
    );
};

const ListeningExercise = ({ title, audioSrc, lang, children }: { title: string, audioSrc: string, lang: string, children: React.ReactNode }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 border-b pb-2">{title}</h3>
            <AudioPlayer key={audioSrc} src={audioSrc} lang={lang} />
            {children}
        </div>
    );
};

const DialogosExercise = ({ lang }: { lang: string }) => {
    const t = useTranslation();
    const questions = [
        { id: 1, text: lang === 'en' ? "Finja and Birger are neighbors." : "Finja y Birger son vecinos.", correct: "true" },
        { id: 2, text: lang === 'en' ? "Mrs. Steiger works in the Cafe." : "La Sra. Steiger trabaja en el Café.", correct: "false" },
        { id: 3, text: lang === 'en' ? "Cristina wants to work on the weekend." : "Cristina quiere trabajar el fin de semana.", correct: "false" },
        { id: 4, text: lang === 'en' ? "Mr. Meyer's problem is the wrong flowers." : "El problema del Sr. Meyer son las flores equivocadas.", correct: "true" }
    ];

    // State: {[id]: 'true' | 'false'}
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [validated, setValidated] = useState(false);

    const checkAnswers = () => setValidated(true);

    return (
        <ListeningExercise lang={lang} title={lang === 'en' ? "Task 4.1.1: Various Dialogues" : "Tarea 4.1.1: Diálogos Variados"} audioSrc="/audios_examen/audio_dialogos.mp3">
            <div className="space-y-4">
                {questions.map(q => {
                    const isCorrect = validated && answers[q.id] === q.correct;
                    const isWrong = validated && answers[q.id] && answers[q.id] !== q.correct;

                    return (
                        <div key={q.id} className={`p-4 rounded-xl border transition-colors ${isCorrect ? 'bg-green-50 border-green-500 dark:bg-green-900/20' : isWrong ? 'bg-red-50 border-red-500 dark:bg-red-900/20' : 'border-gray-100 dark:border-gray-600'}`}>
                            <p className="font-medium text-gray-800 dark:text-gray-200 mb-2">{q.id}. {q.text}</p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`qEx1_${q.id}`} onChange={() => { setAnswers({ ...answers, [q.id]: 'true' }); setValidated(false); }} checked={answers[q.id] === 'true'} />
                                    <span className="text-sm dark:text-gray-300">{lang === 'en' ? 'True' : 'Verdadero'}</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name={`qEx1_${q.id}`} onChange={() => { setAnswers({ ...answers, [q.id]: 'false' }); setValidated(false); }} checked={answers[q.id] === 'false'} />
                                    <span className="text-sm dark:text-gray-300">{lang === 'en' ? 'False' : 'Falso'}</span>
                                </label>
                            </div>
                        </div>
                    );
                })}
                <div className="flex justify-end">
                    <button onClick={checkAnswers} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">{t.checkAnswers}</button>
                </div>
            </div>
        </ListeningExercise>
    );
};

const WiesbadenExercise = ({ lang }: { lang: string }) => {
    const t = useTranslation();
    const questions = [
        { id: 1, q: lang === 'en' ? "Roman tourists?" : "¿Turistas romanos?", options: lang === 'en' ? ["Didn't change much", "New visitors", "There were no tourists"] : ["No cambiaron mucho", "Nuevos visitantes", "No había turistas"], correct: 0 },
        { id: 2, q: lang === 'en' ? "Why did they visit the city?" : "¿Por qué visitaban la ciudad?", options: lang === 'en' ? ["For the casino", "For health", "For business"] : ["Por el casino", "Por salud", "Por negocios"], correct: 1 },
        { id: 3, q: lang === 'en' ? "What did they use the 'balls' for?" : "¿Para qué usaban las 'bolas'?", options: lang === 'en' ? ["Play", "Dye blonde", "Clean"] : ["Jugar", "Teñirse rubio", "Limpiar"], correct: 1 },
        { id: 4, q: lang === 'en' ? "What do they visit first?" : "¿Qué visitan primero?", options: lang === 'en' ? ["The Castle", "The Park", "The Museum"] : ["El Castillo", "El Parque", "El Museo"], correct: 0 },
    ];

    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [validated, setValidated] = useState(false);

    const checkAnswers = () => setValidated(true);

    return (
        <ListeningExercise lang={lang} title={lang === 'en' ? "Task 4.1.2: Wiesbaden Tour" : "Tarea 4.1.2: Tour Wiesbaden"} audioSrc="/audios_examen/audio_wiesbaden.mp3">
            <div className="space-y-6">
                {questions.map(q => (
                    <div key={q.id}>
                        <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">{q.id}. {q.q}</p>
                        <div className="space-y-2">
                            {q.options.map((opt, idx) => {
                                let labelClass = "flex items-center gap-2 p-2 rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer";
                                if (validated) {
                                    if (idx === q.correct) labelClass = "flex items-center gap-2 p-2 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-500 text-green-800 dark:text-green-200";
                                    else if (answers[q.id] === idx) labelClass = "flex items-center gap-2 p-2 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-500 text-red-800 dark:text-red-200";
                                }
                                return (
                                    <div key={idx} className={labelClass} onClick={() => { setAnswers({ ...answers, [q.id]: idx }); setValidated(false); }}>
                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers[q.id] === idx ? 'border-indigo-500' : 'border-gray-400'}`}>
                                            {answers[q.id] === idx && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                                        </div>
                                        <span className="text-sm dark:text-gray-300">{opt}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button onClick={checkAnswers} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">{t.checkAnswers}</button>
                </div>
            </div>
        </ListeningExercise>
    );
};

const ModaExercise = ({ lang }: { lang: string }) => {
    const t = useTranslation();
    const statements = [
        { id: 1, text: lang === 'en' ? "Eco fashion is too expensive." : "La moda bio es demasiado cara.", correct: 1 },
        { id: 2, text: lang === 'en' ? "Fashion should not be harmful." : "La moda no debe ser dañina.", correct: 2 },
        { id: 3, text: lang === 'en' ? "Child labor should not be supported." : "No hay que apoyar el trabajo infantil.", correct: 3 },
    ];

    const [answers, setAnswers] = useState<{ [key: number]: number }>({});
    const [validated, setValidated] = useState(false);
    const speakers = [1, 2, 3];

    return (
        <ListeningExercise lang={lang} title={lang === 'en' ? "Task 5.2: Eco Fashion" : "Tarea 5.2: Moda Ecológica"} audioSrc="/audios_examen/audio_moda.mp3">
            <div className="space-y-4">
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    {lang === 'en' ? "Associate each opinion to the speaker (1, 2 or 3)." : "Asocia cada opinión al hablante (1, 2 o 3)."}
                </p>
                {statements.map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <span className="text-sm dark:text-gray-200 flex-1 mr-4">{s.text}</span>
                        <div className="flex gap-2">
                            {speakers.map(sp => {
                                const isSelected = answers[s.id] === sp;
                                let btnClass = `w-8 h-8 rounded-full font-bold text-sm transition-all ${isSelected ? 'bg-indigo-600 text-white shadow' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'}`;

                                if (validated) {
                                    if (sp === s.correct) btnClass = "w-8 h-8 rounded-full font-bold text-sm bg-green-500 text-white shadow ring-2 ring-green-300";
                                    else if (isSelected) btnClass = "w-8 h-8 rounded-full font-bold text-sm bg-red-500 text-white opacity-50";
                                }

                                return (
                                    <button key={sp} onClick={() => { setAnswers({ ...answers, [s.id]: sp }); setValidated(false); }} className={btnClass}>
                                        {sp}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
                <div className="flex justify-end pt-2">
                    <button onClick={() => setValidated(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">{t.checkAnswers}</button>
                </div>
            </div>
        </ListeningExercise>
    );
};

const OpinionExercise = ({ lang }: { lang: string }) => {
    const dialogues = [
        { id: 1, label: lang === 'en' ? "Dialogue 1" : "Diálogo 1", correct: "agree" },
        { id: 2, label: lang === 'en' ? "Dialogue 2" : "Diálogo 2", correct: "disagree" },
    ];
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [validated, setValidated] = useState(false);

    return (
        <ListeningExercise lang={lang} title={lang === 'en' ? "Task: Opinions (Agree/Disagree)" : "Tarea: Opiniones (Acuerdo/Desacuerdo)"} audioSrc="/audios_examen/audio_opinion.mp3">
            <div className="space-y-4">
                {dialogues.map(d => (
                    <div key={d.id} className="flex items-center justify-between border-b dark:border-gray-700 pb-4 last:border-0 last:pb-0">
                        <span className="font-bold dark:text-gray-200">{d.label}</span>
                        <div className="flex gap-4">
                            <button
                                onClick={() => { setAnswers({ ...answers, [d.id]: 'agree' }); setValidated(false); }}
                                className={`px-3 py-1 rounded-lg text-sm border ${answers[d.id] === 'agree' ? (validated && d.correct === 'agree' ? 'bg-green-100 border-green-500 text-green-800' : 'bg-indigo-100 border-indigo-500 text-indigo-800') : 'border-gray-300 dark:border-gray-600 dark:text-gray-300'}`}
                            >
                                Stimmt zu
                            </button>
                            <button
                                onClick={() => { setAnswers({ ...answers, [d.id]: 'disagree' }); setValidated(false); }}
                                className={`px-3 py-1 rounded-lg text-sm border ${answers[d.id] === 'disagree' ? (validated && d.correct === 'disagree' ? 'bg-green-100 border-green-500 text-green-800' : 'bg-indigo-100 border-indigo-500 text-indigo-800') : 'border-gray-300 dark:border-gray-600 dark:text-gray-300'}`}
                            >
                                Widerspricht
                            </button>
                        </div>
                    </div>
                ))}
                <div className="flex justify-end">
                    <button onClick={() => setValidated(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">
                        {lang === 'en' ? 'Check' : 'Comprobar'}
                    </button>
                </div>
            </div>
        </ListeningExercise>
    )
}

const ListeningSection = ({ lang }: { lang: string }) => {
    const t = useTranslation();
    return (
        <div className="space-y-12 animate-in fade-in duration-500">
            <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 p-4 rounded-2xl flex items-start gap-3">
                <span className="text-purple-600 mt-1 text-xl">🎧</span>
                <div>
                    <h3 className="font-bold text-purple-800 dark:text-purple-500">{t.instructionsHoeren}</h3>
                    <p className="text-sm text-purple-700 dark:text-purple-300 opacity-90">{t.instructionsHoerenDesc}</p>
                </div>
            </div>

            <DialogosExercise lang={lang} />
            <WiesbadenExercise lang={lang} />
            <ModaExercise lang={lang} />
            <OpinionExercise lang={lang} />
        </div>
    );
};

// --- MAIN SCREEN ---

const ExamB1Screen = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const t = useTranslation();
    const lang = state.user?.baseLanguage ?? 'es';

    const [currentSection, setCurrentSection] = useState<'schreiben' | 'lesen' | 'hoeren'>('schreiben');
    const [feedback, setFeedback] = useState<FeedbackResult | null>(null);

    const handleAICorrection = async (text: string, instruction: string) => {
        try {
            const result = await AITutorService.evaluateExamTask(text, instruction);
            setFeedback({
                status: result.isCorrect ? 'correct' : 'error',
                message: result.feedback
            });
        } catch (error: any) {
            setFeedback({
                status: 'error',
                message: error.message || t.aiConnectionError
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8 animate-in fade-in duration-500 pb-32">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button
                        onClick={() => dispatch({ type: 'GO_TO_DASHBOARD' })}
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 mr-4 transition-colors text-xl font-bold"
                    >
                        ←
                    </button>
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                            {lang === 'en' ? 'B1.1 Exam' : 'Examen B1.1'} <span className="text-yellow-500">{lang === 'en' ? 'Mock Test' : 'Simulacro'}</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">{t.examSubtitle}</p>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-8 overflow-x-auto">
                <button
                    onClick={() => {
                        // 🛑 FUERZA BRUTA: Detener audios antes de cambiar
                        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
                        setCurrentSection('schreiben');
                    }}
                    className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${currentSection === 'schreiben' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {lang === 'en' ? '📝 Writing' : '📝 Schreiben'}
                </button>
                <button
                    onClick={() => {
                        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
                        setCurrentSection('lesen');
                    }}
                    className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${currentSection === 'lesen' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {lang === 'en' ? '📖 Reading' : '📖 Lesen'}
                </button>
                <button
                    onClick={() => {
                        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });
                        setCurrentSection('hoeren');
                    }}
                    className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${currentSection === 'hoeren' ? 'bg-white dark:bg-gray-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                >
                    {lang === 'en' ? '🎧 Listening' : '🎧 Hören'}
                </button>
            </div>

            {/* Sections with Persistence (using display:none) */}
            <div className={currentSection === 'schreiben' ? 'block' : 'hidden'}>
                <WritingSection onCorrect={handleAICorrection} lang={lang} />
            </div>

            <div className={currentSection === 'lesen' ? 'block' : 'hidden'}>
                <ReadingSection lang={lang} />
            </div>

            <div className={currentSection === 'hoeren' ? 'block' : 'hidden'}>
                <ListeningSection lang={lang} />
            </div>

            <div className="flex justify-center pt-8 border-t dark:border-gray-800 mt-12">
                <button
                    onClick={() => {
                        // 🛑 Force Stop Audio
                        document.querySelectorAll('audio').forEach(a => { a.pause(); a.currentTime = 0; });

                        dispatch({ type: 'UPDATE_STREAK' });
                        dispatch({ type: 'GO_TO_DASHBOARD' });
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <span>✅</span> {t.examFinish}
                </button>
            </div>

            <FeedbackOverlay feedback={feedback} onClose={() => setFeedback(null)} />
        </div>
    );
};

export default ExamB1Screen;
