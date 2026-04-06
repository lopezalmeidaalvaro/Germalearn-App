import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { useAudio } from '../hooks/useAudio';
import type { FeedbackResult } from '../types';
import { useTranslation } from '../i18n/translations';
import GermanTextRenderer from './GermanTextRenderer';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

// Views
import TheoryView from './views/TheoryView';
import FlashcardView from './views/FlashcardView';
import PairsView from './views/PairsView';
import ChatView from './views/ChatView';
import WriteView from './views/WriteView';
import OrderView from './views/OrderView';
import CreativeView from './views/CreativeView';

const SessionController = () => {
    const context = useContext(GameContext);
    if (!context) return null;
    const { state, dispatch } = context;
    const t = useTranslation();

    const currentItem = state.session.queue[state.session.currentIndex];
    const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
    const { speak } = useAudio();

    useEffect(() => { setFeedback(null); }, [state.session.currentIndex]);

    if (!currentItem) return <div className="p-10 text-center">{t.loading}</div>;

    const handleNext = () => dispatch({ type: 'NEXT_STEP' });
    const handleSubmit = (result: FeedbackResult) => {
        setFeedback(result);
        dispatch({ type: 'SUBMIT_ANSWER', result, chunkId: currentItem.chunkId });

        if (result.status === 'correct') {
            if (currentItem.data.german) speak(currentItem.data.german, 'de-DE');
        }
    };

    const FeedbackOverlay = () => {
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
            <div className={`fixed bottom-0 left-0 right-0 p-6 pb-8 transition-transform z-50 animate-in slide-in-from-bottom-10 ${bgColor}`}>
                <div className="max-w-xl mx-auto">
                    <div className={`font-bold text-lg mb-2 flex items-center gap-2 ${textColor}`}>
                        {isCorrect ? <CheckCircle /> : isWarning ? <AlertCircle /> : <XCircle />}
                        <span>{feedback.message}</span>
                    </div>

                    {(isError || isWarning) && currentItem.type !== 'THEORY' && currentItem.type !== 'PAIRS' && (
                        <div className="mb-4">
                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 opacity-70 ${textColor}`}>
                                {isWarning ? t.betterOption : t.correctSolution}
                            </p>
                            <div className={`text-lg font-medium pl-4 border-l-4 ${isWarning ? 'border-yellow-500' : 'border-red-500'} dark:text-white`}>
                                <GermanTextRenderer text={currentItem.data.german} />
                            </div>
                        </div>
                    )}

                    <button onClick={handleNext} className={`w-full py-3 rounded-xl font-bold text-white shadow-lg ${btnColor}`}>{t.continueBtn2}</button>
                </div>
            </div>
        );
    };

    return (
        <div className="h-[calc(100vh-140px)] relative">
            <div className="absolute top-[-20px] left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${((state.session.currentIndex + 1) / state.session.queue.length) * 100}%` }}></div>
            </div>

            {currentItem.type === 'THEORY' && <TheoryView key={state.session.currentIndex} data={currentItem.data} onNext={handleNext} />}
            {currentItem.type === 'FLASHCARD' && <FlashcardView key={currentItem.chunkId} chunk={currentItem.data} onNext={handleNext} />}
            {currentItem.type === 'PAIRS' && <PairsView key={currentItem.chunkId || state.session.currentIndex} data={currentItem.data} onFinish={handleNext} />}
            {currentItem.type === 'CHAT' && <ChatView key={currentItem.chunkId || state.session.currentIndex} scenario={currentItem.data} onFinish={handleNext} />}

            <div className={feedback ? 'pointer-events-none opacity-50 transition-opacity' : ''}>
                {currentItem.type === 'WRITE' && <WriteView key={currentItem.chunkId} chunk={currentItem.data} onSubmit={handleSubmit} />}
                {currentItem.type === 'ORDER' && <OrderView key={currentItem.chunkId} chunk={currentItem.data} onSubmit={handleSubmit} />}
                {currentItem.type === 'CREATIVE' && <CreativeView key={currentItem.chunkId} chunk={currentItem.data} onSubmit={handleSubmit} />}
            </div>

            <FeedbackOverlay />
        </div>
    );
};

export default SessionController;
