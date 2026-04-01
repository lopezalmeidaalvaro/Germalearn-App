import type { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`p-4 bg-gray-100 dark:bg-gray-700 rounded-xl transition-colors ${className}`}>
            {children}
        </div>
    );
};

export default Card;
