import React, { useRef, useEffect, type KeyboardEvent } from "react";

type CellProps = {
    children: React.ReactNode;
    isSelected?: boolean;
    isEditing?: boolean;
    onSelect?: () => void;
    onStartEditing?: () => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    className?: string;
};

const SpreadsheetCell: React.FC<CellProps> = ({
                                                  children,
                                                  isSelected = false,
                                                  isEditing = false,
                                                  onSelect,
                                                  onStartEditing,
                                                  className = '',
                                                  onKeyDown
                                              }) => {
    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isSelected && cellRef.current) {
            cellRef.current.focus();
        }
    }, [isSelected]);

    const handleKeyDown = (e: KeyboardEvent) => {

        if (!isEditing && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            onStartEditing?.();
        }
        onKeyDown?.(e);
    };

    return (
        <div
            ref={cellRef}
            className={`p-2 border-r border-gray-200 text-sm flex items-center relative ${className} 
                ${isSelected ? 'border-dark-f-green border-2' : ''}
                focus:outline-none focus:ring-0 focus:border-dark-f-green
            `}
            onClick={onSelect}
            onDoubleClick={onStartEditing}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {children}

            {isSelected && !isEditing && (
                <div className="absolute square-dot w-2 h-2 bg-dark-f-green"></div>
            )}
        </div>
    );
};

export default SpreadsheetCell;