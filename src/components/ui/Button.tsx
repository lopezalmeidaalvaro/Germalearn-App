import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'danger' | 'outline' | 'ghost';
    className?: string;
    icon?: ReactNode;
    disabled?: boolean;
}

const Button = ({ children, onClick, variant = 'primary', className = '', icon, disabled }: ButtonProps) => {
    const baseStyles = "py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        danger: "border-2 border-red-100 dark:border-red-900/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20",
        outline: "border border-gray-300 dark:border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600",
        ghost: "hover:bg-gray-200 dark:hover:bg-gray-700"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
