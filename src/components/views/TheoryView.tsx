import { GraduationCap } from 'lucide-react';
import { useTranslation, useLanguage, getBilingualText } from '../../i18n/translations';

type BilingualField = string | { es: string; en: string };

const TheoryView = ({ data, onNext }: { data: { title: BilingualField, content: BilingualField }, onNext: () => void }) => {
    const t = useTranslation();
    const lang = useLanguage();
    const title = getBilingualText(data.title, lang);
    const content = getBilingualText(data.content, lang);
    return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center animate-in fade-in slide-in-from-right">
            <div className="bg-indigo-100 dark:bg-indigo-900 p-6 rounded-full mb-6 text-indigo-600 dark:text-indigo-300"><GraduationCap size={64} /></div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md leading-relaxed whitespace-pre-line">{content}</p>
            <button onClick={onNext} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700">{t.understood}</button>
        </div>
    );
};

export default TheoryView;
