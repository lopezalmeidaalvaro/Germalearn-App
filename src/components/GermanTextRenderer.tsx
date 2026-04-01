
const GermanTextRenderer = ({ text, className = "", size = "md" }: { text: string, className?: string, size?: 'sm' | 'md' | 'lg' | 'xl' }) => {
    if (!text || typeof text !== 'string') return null;
    const parts = text.split(/(\s+|[.,!?;:()])/);
    const sizeClasses = { sm: "text-sm", md: "text-base", lg: "text-xl", xl: "text-3xl" };

    return (
        <div className={`flex flex-wrap justify-center items-baseline gap-1 ${className} ${sizeClasses[size]}`}>
            {parts.map((part, i) => {
                const lower = part.toLowerCase();
                let colorClass = "text-gray-800 dark:text-gray-200";

                if (['der', 'den', 'dem', 'des', 'er', 'ihn', 'ihm', 'einen', 'einem'].includes(lower)) {
                    colorClass = "text-blue-600 dark:text-blue-400 font-bold";
                } else if (['die', 'eine', 'einer', 'sie', 'ihr', 'ihre'].includes(lower)) {
                    colorClass = "text-red-500 dark:text-red-400 font-bold";
                } else if (['das', 'ein', 'es'].includes(lower)) {
                    colorClass = "text-green-600 dark:text-green-400 font-bold";
                }

                const prev = parts[i - 2]?.toLowerCase();
                if (prev && /^[A-ZÄÖÜ]/.test(part)) {
                    if (['der', 'den', 'dem', 'einen'].includes(prev)) colorClass = "text-blue-800 dark:text-blue-300 border-b-2 border-blue-200 dark:border-blue-900";
                    else if (['die', 'eine'].includes(prev)) colorClass = "text-red-800 dark:text-red-300 border-b-2 border-red-200 dark:border-red-900";
                    else if (['das', 'ein'].includes(prev)) colorClass = "text-green-800 dark:text-green-300 border-b-2 border-green-200 dark:border-green-900";
                }
                return <span key={i} className={`${colorClass} transition-colors duration-300`}>{part}</span>;
            })}
        </div>
    );
};

export default GermanTextRenderer;
