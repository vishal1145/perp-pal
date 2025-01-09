'use client';
import React from 'react';

type ButtonProps = {
    label: string;
    onClick?: () => void;
    buttonType?: 'button' | 'submit' | 'reset';
    className?: string;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    buttonSize?: 'small' | 'medium' | 'large';
};

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    buttonType = 'button',
    className = '',
    disabled = false,
    variant = 'primary',
    buttonSize = 'medium',
}) => {
    const variantClasses = {
        primary: 'bg-cyan-500 hover:bg-cyan-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
        danger: 'bg-red-500 hover:bg-red-600 text-white',
        outline: 'bg-transparent border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-100',
    };

    const sizeClasses = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-2 text-base',
        large: 'px-12 py-2 text-lg',
    };

    return (
        <button
            type={buttonType}
            onClick={onClick}
            disabled={disabled}
            className={`rounded-lg shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[buttonSize]} ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;
