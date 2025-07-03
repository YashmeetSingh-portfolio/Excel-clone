import React from "react";

type CellProps = {
    children: React.ReactNode;
};

const SpreadsheetCell: React.FC<CellProps> = ({ children }) => {
    return (
        <div className="p-2 border-r border-gray-200 text-sm flex items-center">
            {children}
        </div>
    );
};

export default SpreadsheetCell;
