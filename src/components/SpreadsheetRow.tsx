import React, { useState } from "react";
import SpreadsheetCell from "./SpreadsheetCell";

interface SpreadsheetRowData {
    jobRequest: string;
    submitted: string;
    status: string;
    submitter: string;
    url: string;
    assigned: string;
    priority: string;
    dueDate: string;
    estValue: string;
}

type RowProps = {
    row: SpreadsheetRowData;
    rowIndex: number;
    onCellChange: (rowIndex: number, columnKey: string, value: string) => void;
    selectedCell: {row: number, col: string} | null;
    onCellSelect: (rowIndex: number, colKey: string) => void;
};

const SpreadsheetRow: React.FC<RowProps> = ({
                                                row,
                                                rowIndex,
                                                onCellChange,
                                                selectedCell,
                                                onCellSelect
                                            }) => {
    const [editingCell, setEditingCell] = useState<string | null>(null);

    const columns = [
        { key: 'jobRequest', label: 'Job Request' },
        { key: 'submitted', label: 'Submitted' },
        { key: 'status', label: 'Status' },
        { key: 'submitter', label: 'Submitter' },
        { key: 'url', label: 'URL' },
        { key: 'assigned', label: 'Assigned' },
        { key: 'priority', label: 'Priority' },
        { key: 'dueDate', label: 'Due Date' },
        { key: 'estValue', label: 'Est. Value' },
    ];

    const handleCellClick = (colKey: string) => {
        onCellSelect(rowIndex - 1, colKey);
        setEditingCell(null);
    };

    const handleDoubleClick = (colKey: string) => {
        onCellSelect(rowIndex - 1, colKey);
        setEditingCell(colKey);
    };

    const handleInputBlur = () => {
        setEditingCell(null);
    };

    return (
        <div className="grid grid-cols-[32px_minmax(300px,1fr)_repeat(9,minmax(80px,1fr))] border-b border-gray-300 max-h-12">
            <SpreadsheetCell
                isSelected={selectedCell?.row === rowIndex - 1 && selectedCell?.col === 'index'}
                onSelect={() => handleCellClick('index')}
                onStartEditing={() => handleDoubleClick('index')}
                isEditing={editingCell === 'index'}
                className={
                    selectedCell?.row === rowIndex - 1
                        ? 'highlighted-row-index'
                        : ''
                }
            >
                <span className="row-index truncate custom-cursor">{rowIndex}</span>
            </SpreadsheetCell>
            {columns.map((col) => (
                <SpreadsheetCell
                    key={col.key}
                    isSelected={selectedCell?.row === rowIndex - 1 && selectedCell?.col === col.key}
                    onSelect={() => handleCellClick(col.key)}
                    onStartEditing={() => handleDoubleClick(col.key)}
                    isEditing={editingCell === col.key}
                >
                    {editingCell === col.key ? (
                        <input
                            value={row[col.key as keyof SpreadsheetRowData]}
                            onChange={(e) => onCellChange(rowIndex - 1, col.key, e.target.value)}
                            onBlur={handleInputBlur}
                            className="w-full bg-transparent outline-none"
                            autoFocus
                        />
                    ) : (
                        <div className="w-full truncate custom-cursor">
                            {row[col.key as keyof SpreadsheetRowData]}
                        </div>
                    )}
                </SpreadsheetCell>
            ))}

            <div className="p-2 border-l border-dashed border-gray-400 custom-cursor"></div>
        </div>
    );
};

export default SpreadsheetRow;