import React from "react";
import SpreadsheetCell from "./SpreadsheetCell";
import "../styles/spread-sheet.css";
import { IndianRupee } from "lucide-react";

type RowProps = {
    row: {
        jobRequest: string;
        submitted: string;
        status: string;
        submitter: string;
        url: string;
        assigned: string;
        priority: string;
        dueDate: string;
        estValue: string;
    };
    rowIndex: number;
};

const SpreadsheetRow: React.FC<RowProps> = ({ row, rowIndex }) => {
    return (
        <div className="grid grid-cols-[32px_minmax(300px,1fr)_repeat(9,minmax(80px,1fr))] border-b border-gray-300 max-h-12">
            <SpreadsheetCell>
                <span className="row-index truncate overflow-hidden whitespace-nowrap">{rowIndex}</span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="truncate overflow-hidden whitespace-nowrap">{row.jobRequest}</span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="start-end truncate overflow-hidden whitespace-nowrap">{row.submitted}</span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="center truncate overflow-hidden whitespace-nowrap">
                    <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                            row.status === "Complete"
                                ? "status-btn completed"
                                : row.status === "In-process"
                                    ? "in-process status-btn"
                                    : row.status === "Blocked"
                                        ? "status-btn blocked"
                                        : row.status === ""
                                            ? ""
                                            : "status-btn need-to-start"
                        }`}
                    >
                        {row.status}
                    </span>
                </span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="truncate overflow-hidden whitespace-nowrap">{row.submitter}</span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <a
                    href={row.url}
                    className="text-blue-600 underline truncate overflow-hidden whitespace-nowrap block"
                >
                    {row.url}
                </a>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="truncate overflow-hidden whitespace-nowrap">{row.assigned}</span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="center truncate overflow-hidden whitespace-nowrap">
                    <span
                        className={`px-2 py-1 rounded text-xs ${
                            row.priority === "High"
                                ? "difficulty-high"
                                : row.priority === "Medium"
                                    ? "difficulty-medium"
                                    : "difficulty-low"
                        }`}
                    >
                        {row.priority}
                    </span>
                </span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <span className="start-end truncate overflow-hidden whitespace-nowrap">{row.dueDate}</span>
            </SpreadsheetCell>
            <SpreadsheetCell>
                <div className="flex justify-between items-center w-full truncate overflow-hidden whitespace-nowrap">
                    <span className="start-end truncate overflow-hidden whitespace-nowrap">{row.estValue}</span>
                    {row.estValue && <IndianRupee size={16} className="rupee" />}
                </div>
            </SpreadsheetCell>
            <div className="p-2 border-l border-dashed border-gray-400 text-center text-gray-400 cursor-pointer"></div>
        </div>
    );
};

export default SpreadsheetRow;
