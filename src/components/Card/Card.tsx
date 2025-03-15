import { ReactNode } from 'react';
import './Card.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    hoverable?: boolean;
}

export const Card = ({ children, className = '', onClick, hoverable = false }: CardProps) => {
    const cardClass = `card ${hoverable ? 'card-hoverable' : ''} ${onClick ? 'card-clickable' : ''} ${className}`;

    return (
        <div className={cardClass} onClick={onClick}>
            {children}
        </div>
    );
};

interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export const CardHeader = ({ children, className = '' }: CardHeaderProps) => {
    return <div className={`card-header ${className}`}>{children}</div>;
};

interface CardBodyProps {
    children: ReactNode;
    className?: string;
}

export const CardBody = ({ children, className = '' }: CardBodyProps) => {
    return <div className={`card-body ${className}`}>{children}</div>;
};

interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export const CardFooter = ({ children, className = '' }: CardFooterProps) => {
    return <div className={`card-footer ${className}`}>{children}</div>;
};