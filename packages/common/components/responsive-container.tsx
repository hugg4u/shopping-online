import React from 'react';

interface ResponsiveContainerProps {
    children: React.ReactNode;
    className?: string;
    fullWidth?: boolean;
    noPadding?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
    children,
    className = '',
    fullWidth = false,
    noPadding = false,
}) => {
    const containerClasses = `
    ${fullWidth ? 'w-full' : 'responsive-container'}
    ${noPadding ? '' : 'px-4 sm:px-6 lg:px-8'}
    ${className}
  `.trim();

    return <div className={containerClasses}>{children}</div>;
};

interface ResponsiveGridProps {
    children: React.ReactNode;
    className?: string;
    cols?: {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    gap?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
    children,
    className = '',
    cols = { default: 1, sm: 2, lg: 4 },
    gap = 'gap-4 sm:gap-6',
}) => {
    const getGridCols = () => {
        let classes = '';
        if (cols.default) classes += `grid-cols-${cols.default} `;
        if (cols.sm) classes += `sm:grid-cols-${cols.sm} `;
        if (cols.md) classes += `md:grid-cols-${cols.md} `;
        if (cols.lg) classes += `lg:grid-cols-${cols.lg} `;
        if (cols.xl) classes += `xl:grid-cols-${cols.xl} `;
        return classes.trim();
    };

    return (
        <div className={`grid ${getGridCols()} ${gap} ${className}`}>
            {children}
        </div>
    );
};

export default ResponsiveContainer;
