import React, { useState, useRef } from "react";
import SpreadsheetRow from "./SpreadsheetRow"; // Assuming this is where your row component is
import {CalendarDays, Hash, Link2, Plus, RefreshCcw} from "lucide-react";
import {FaBriefcase, FaGlobe} from "react-icons/fa";
import {AiOutlineDownCircle} from "react-icons/ai";
import {HiMiniUser} from "react-icons/hi2";
import '../styles/spread-sheet.css';
import Tabs from './Tabs'; // Assuming Tabs is also updated

const columnKeys = ['jobRequest', 'submitted', 'status', 'submitter', 'url', 'assigned', 'priority', 'dueDate', 'estValue'];

const Spreadsheet: React.FC = () => {
    const initialData = Array.from({ length: 100 }, () => ({
        jobRequest: "",
        submitted: "",
        status: "",
        submitter: "",
        url: "",
        assigned: "",
        priority: "",
        dueDate: "",
        estValue: ""
    }));

    const [data, setData] = useState(initialData);
    const [selectedCell, setSelectedCell] = useState<{row: number; col: string} | null>(null);
    const [activeFilter, setActiveFilter] = useState("All Orders");

    const spreadsheetRef = useRef<HTMLDivElement>(null);

    const handleCellChange = (rowIndex: number, columnKey: string, value: string) => {
        const newData = [...data];
        newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
        setData(newData);
    };

    const handleCellSelect = (rowIndex: number, colKey: string) => {
        setSelectedCell({ row: rowIndex, col: colKey });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!selectedCell) return;

        const { row, col } = selectedCell;
        const colIndex = columnKeys.indexOf(col);

        let newRow = row;
        let newColIndex = colIndex;

        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                newRow = Math.max(0, row - 1);
                break;
            case 'ArrowDown':
                event.preventDefault();
                newRow = Math.min(data.length - 1, row + 1);
                break;
            case 'ArrowLeft':
                event.preventDefault();
                newColIndex = Math.max(0, colIndex - 1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                newColIndex = Math.min(columnKeys.length - 1, colIndex + 1);
                break;
            case 'Tab':
                // Allow default tab behavior between focusable elements
                return;
            default:
                return;
        }

        const newColKey = columnKeys[newColIndex];
        setSelectedCell({ row: newRow, col: newColKey });

        // Focus the new cell after state update
        // This requires SpreadsheetRow and its cells to be able to receive focus
        const targetCellId = `cell-${newRow}-${newColKey}`;
        setTimeout(() => {
            const targetElement = document.getElementById(targetCellId);
            targetElement?.focus();
        }, 0);
    };

    const filterData = (data: typeof initialData) => {
        switch(activeFilter) {
            case "Pending":
                return data.filter(row =>
                    ["blocked", "in process", "in-process", "need to start"].some(status =>
                        row.status.toLowerCase().includes(status)
                    )
                );
            case "Reviewed":
                return data.filter(row =>
                    ["in process", "in-process", "complete"].some(status =>
                        row.status.toLowerCase().includes(status)
                    )
                );
            case "Arrived":
                return data.filter(row =>
                    row.status.toLowerCase().includes("complete")
                );
            default:
                return data;
        }
    };

    const filteredData = filterData(data);

    return (
        <div className="flex flex-col h-screen ml-0 spreadsheet" onKeyDown={handleKeyDown} ref={spreadsheetRef}>
            <div className="gap-0.5 m-4 border border-gray-300 flex-1 flex flex-col overflow-hidden ml-0 mt-0">
                <div
                    className="section-cells gap-0.5 grid grid-cols-[32px_minmax(297px,1fr)_repeat(9,minmax(80px,1fr))] bg-gray-100 font-semibold text-sm">
                    <div className="p-2 text-center" tabIndex={0}></div>
                    <div className="financial-overview-cell col-span-4" tabIndex={0}>
                        <div className="financial-overview-text">
                            <Link2 className="link-icon" size={16}/> Q3 Financial overview
                        </div>
                        <RefreshCcw size={16} className="refresh-icon"/>
                    </div>
                    <div className="col-span-1" tabIndex={0}></div>
                    <div className="abc-cell" tabIndex={0}>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.50001 2C8.77616 2 9.00001 2.22386 9.00001 2.5V6.33333H10.6636C11.6762 6.33333 12.497 7.15414 12.497 8.16667V12.2944L13.6467 11.1462C13.8421 10.9511 14.1587 10.9513 14.3538 11.1467C14.5489 11.3421 14.5487 11.6587 14.3533 11.8538L12.3503 13.8541C12.155 14.0492 11.8386 14.0491 11.6434 13.8539L9.64308 11.8536C9.44782 11.6583 9.44782 11.3417 9.64308 11.1464C9.83834 10.9512 10.1549 10.9512 10.3502 11.1464L11.497 12.2932V8.16667C11.497 7.70643 11.1239 7.33333 10.6636 7.33333H6.33328C5.87304 7.33333 5.49995 7.70643 5.49995 8.16667V12.2932L6.64673 11.1464C6.84199 10.9512 7.15858 10.9512 7.35384 11.1464C7.5491 11.3417 7.5491 11.6583 7.35384 11.8536L5.3535 13.8539C5.15824 14.0492 4.84166 14.0492 4.6464 13.8539L2.64602 11.8536C2.45076 11.6583 2.45076 11.3417 2.64602 11.1465C2.84128 10.9512 3.15786 10.9512 3.35312 11.1464L4.49995 12.2932V8.16667C4.49995 7.15414 5.32076 6.33333 6.33328 6.33333H8.00001V2.5C8.00001 2.22386 8.22387 2 8.50001 2Z"
                                fill="#A3ACA3"/>
                        </svg>
                        <p>ABC</p>
                        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.16671 2C3.16671 2.64433 2.64437 3.16667 2.00004 3.16667C1.35571 3.16667 0.833374 2.64433 0.833374 2C0.833374 1.35567 1.35571 0.833336 2.00004 0.833336C2.64437 0.833336 3.16671 1.35567 3.16671 2ZM7.16671 2C7.16671 2.64433 6.64437 3.16667 6.00004 3.16667C5.35571 3.16667 4.83337 2.64433 4.83337 2C4.83337 1.35567 5.35571 0.833336 6.00004 0.833336C6.64437 0.833336 7.16671 1.35567 7.16671 2ZM10 3.16667C10.6444 3.16667 11.1667 2.64433 11.1667 2C11.1667 1.35567 10.6444 0.833336 10 0.833336C9.35571 0.833336 8.83337 1.35567 8.83337 2C8.83337 2.64433 9.35571 3.16667 10 3.16667Z"
                                fill="#AFAFAF"/>
                        </svg>

                    </div>
                    <div className="ans-cell p-2 col-span-2" tabIndex={0}>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.50001 2C8.77616 2 9.00001 2.22386 9.00001 2.5V6.33333H10.6636C11.6762 6.33333 12.497 7.15414 12.497 8.16667V12.2944L13.6467 11.1462C13.8421 10.9511 14.1587 10.9513 14.3538 11.1467C14.5489 11.3421 14.5487 11.6587 14.3533 11.8538L12.3503 13.8541C12.155 14.0492 11.8386 14.0491 11.6434 13.8539L9.64308 11.8536C9.44782 11.6583 9.44782 11.3417 9.64308 11.1464C9.83834 10.9512 10.1549 10.9512 10.3502 11.1464L11.497 12.2932V8.16667C11.497 7.70643 11.1239 7.33333 10.6636 7.33333H6.33328C5.87304 7.33333 5.49995 7.70643 5.49995 8.16667V12.2932L6.64673 11.1464C6.84199 10.9512 7.15858 10.9512 7.35384 11.1464C7.5491 11.3417 7.5491 11.6583 7.35384 11.8536L5.3535 13.8539C5.15824 14.0492 4.84166 14.0492 4.6464 13.8539L2.64602 11.8536C2.45076 11.6583 2.45076 11.3417 2.64602 11.1465C2.84128 10.9512 3.15786 10.9512 3.35312 11.1464L4.49995 12.2932V8.16667C4.49995 7.15414 5.32076 6.33333 6.33328 6.33333H8.00001V2.5C8.00001 2.22386 8.22387 2 8.50001 2Z"
                                fill="#A3ACA3"/>
                        </svg>
                        <p>Answer a question</p>
                        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.16671 2C3.16671 2.64433 2.64437 3.16667 2.00004 3.16667C1.35571 3.16667 0.833374 2.64433 0.833374 2C0.833374 1.35567 1.35571 0.833336 2.00004 0.833336C2.64437 0.833336 3.16671 1.35567 3.16671 2ZM7.16671 2C7.16671 2.64433 6.64437 3.16667 6.00004 3.16667C5.35571 3.16667 4.83337 2.64433 4.83337 2C4.83337 1.35567 5.35571 0.833336 6.00004 0.833336C6.64437 0.833336 7.16671 1.35567 7.16671 2ZM10 3.16667C10.6444 3.16667 11.1667 2.64433 11.1667 2C11.1667 1.35567 10.6444 0.833336 10 0.833336C9.35571 0.833336 8.83337 1.35567 8.83337 2C8.83337 2.64433 9.35571 3.16667 10 3.16667Z"
                                fill="#AFAFAF"/>
                        </svg>

                    </div>
                    <div className="extract-cell p-2" tabIndex={0}>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.50001 2C8.77616 2 9.00001 2.22386 9.00001 2.5V6.33333H10.6636C11.6762 6.33333 12.497 7.15414 12.497 8.16667V12.2944L13.6467 11.1462C13.8421 10.9511 14.1587 10.9513 14.3538 11.1467C14.5489 11.3421 14.5487 11.6587 14.3533 11.8538L12.3503 13.8541C12.155 14.0492 11.8386 14.0491 11.6434 13.8539L9.64308 11.8536C9.44782 11.6583 9.44782 11.3417 9.64308 11.1464C9.83834 10.9512 10.1549 10.9512 10.3502 11.1464L11.497 12.2932V8.16667C11.497 7.70643 11.1239 7.33333 10.6636 7.33333H6.33328C5.87304 7.33333 5.49995 7.70643 5.49995 8.16667V12.2932L6.64673 11.1464C6.84199 10.9512 7.15858 10.9512 7.35384 11.1464C7.5491 11.3417 7.5491 11.6583 7.35384 11.8536L5.3535 13.8539C5.15824 14.0492 4.84166 14.0492 4.6464 13.8539L2.64602 11.8536C2.45076 11.6583 2.45076 11.3417 2.64602 11.1465C2.84128 10.9512 3.15786 10.9512 3.35312 11.1464L4.49995 12.2932V8.16667C4.49995 7.15414 5.32076 6.33333 6.33328 6.33333H8.00001V2.5C8.00001 2.22386 8.22387 2 8.50001 2Z"
                                fill="#A3ACA3"/>
                        </svg>
                        <p>Extract</p>
                        <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3.16671 2C3.16671 2.64433 2.64437 3.16667 2.00004 3.16667C1.35571 3.16667 0.833374 2.64433 0.833374 2C0.833374 1.35567 1.35571 0.833336 2.00004 0.833336C2.64437 0.833336 3.16671 1.35567 3.16671 2ZM7.16671 2C7.16671 2.64433 6.64437 3.16667 6.00004 3.16667C5.35571 3.16667 4.83337 2.64433 4.83337 2C4.83337 1.35567 5.35571 0.833336 6.00004 0.833336C6.64437 0.833336 7.16671 1.35567 7.16671 2ZM10 3.16667C10.6444 3.16667 11.1667 2.64433 11.1667 2C11.1667 1.35567 10.6444 0.833336 10 0.833336C9.35571 0.833336 8.83337 1.35567 8.83337 2C8.83337 2.64433 9.35571 3.16667 10 3.16667Z"
                                fill="#AFAFAF"/>
                        </svg>

                    </div>
                    <div
                        className="p-2 text-center border-l border-dashed border-gray-400 text-gray-400 add-cell col-span-1" tabIndex={0}>
                        <Plus size={20}/>
                    </div>
                </div>
                <div
                    className="gap-0.5 grid grid-cols-[32px_minmax(297px,1fr)_repeat(9,minmax(80px,1fr))] font-semibold text-sm">
                    <div className={`title-cell cell-color bg-gray-100 p-2 text-center ${
                        selectedCell?.col === 'index' ? 'bg-green-50 border-b-2 border-b-green-500' : ''
                    }`} tabIndex={0}>
                        <Hash size={16}/>
                    </div>

                    <div className={`title-cell cell-color bg-gray-100 p-2 ${
                        selectedCell?.col === 'jobRequest' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        <FaBriefcase size={12}/>
                        <p>Job Request</p>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z"
                                fill="#AFAFAF"/>
                        </svg>
                    </div>

                    <div className={`title-cell cell-color bg-gray-100 p-2 ${
                        selectedCell?.col === 'submitted' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        <CalendarDays size={16}/>
                        <p>Submitted</p>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z"
                                fill="#AFAFAF"/>
                        </svg>
                    </div>

                    <div className={`title-cell cell-color bg-gray-100 p-2 ${
                        selectedCell?.col === 'status' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        <AiOutlineDownCircle size={16}/>
                        <p>Status</p>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z"
                                fill="#AFAFAF"/>
                        </svg>
                    </div>

                    <div className={`title-cell cell-color bg-gray-100 p-2 ${
                        selectedCell?.col === 'submitter' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        <HiMiniUser size={16}/>
                        <p>Submitter</p>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z"
                                fill="#AFAFAF"/>
                        </svg>
                    </div>

                    <div className={`title-cell cell-color bg-gray-100 p-2 ${
                        selectedCell?.col === 'url' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        <FaGlobe size={16}/>
                        <p>URL</p>
                        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.146447 0.146447C0.341709 -0.0488155 0.658291 -0.0488155 0.853553 0.146447L4 3.29289L7.14645 0.146447C7.34171 -0.0488155 7.65829 -0.0488155 7.85355 0.146447C8.04882 0.341709 8.04882 0.658291 7.85355 0.853553L4.35355 4.35355C4.15829 4.54882 3.84171 4.54882 3.64645 4.35355L0.146447 0.853553C-0.0488155 0.658291 -0.0488155 0.341709 0.146447 0.146447Z"
                                fill="#AFAFAF"/>
                        </svg>
                    </div>

                    <div className={`title-cell p-2 bg-ls-green ${
                        selectedCell?.col === 'assigned' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.00002 5.00017V1.16667C4.00002 0.890529 4.22388 0.666672 4.50002 0.666672C4.77616 0.666672 5.00002 0.890529 5.00002 1.16667V5.00017C5.00002 5.18426 5.14926 5.3335 5.33335 5.3335C5.51745 5.3335 5.66669 5.18426 5.66669 5.00017V1.66667C5.66669 1.39053 5.89054 1.16667 6.16669 1.16667C6.44283 1.16667 6.66669 1.39053 6.66669 1.66667V5.50001C6.66669 5.51415 6.6661 5.52815 6.66495 5.542C6.95311 5.43312 7.31394 5.3308 7.66669 5.3308C7.99991 5.3308 8.28491 5.41403 8.49617 5.52043C8.60046 5.57296 8.69747 5.63652 8.77672 5.7086C8.81567 5.74403 8.86063 5.79083 8.89973 5.84899C8.93045 5.8947 9.00002 6.00874 9.00002 6.16667C9.00002 6.33907 8.91121 6.4993 8.76502 6.59067L7.49412 7.38498L6.3889 8.64564L5.47071 9.91038C5.1258 10.3855 4.57422 10.6666 3.98713 10.6666H3.22811C2.60746 10.6666 2.01235 10.3514 1.69151 9.79257C1.49008 9.44174 1.24072 8.98076 1.04023 8.52452C0.849508 8.09048 0.666687 7.58261 0.666687 7.16664V2.50001C0.666687 2.22386 0.890545 2.00001 1.16669 2.00001C1.44283 2.00001 1.66669 2.22386 1.66669 2.50001V5.33196C1.66669 5.51605 1.81593 5.66529 2.00002 5.66529C2.18412 5.66529 2.33335 5.51605 2.33335 5.33196V1.66667C2.33335 1.39053 2.55721 1.16667 2.83335 1.16667C3.1095 1.16667 3.33335 1.39053 3.33335 1.66667V5.00017C3.33335 5.18426 3.48259 5.3335 3.66669 5.3335C3.85078 5.3335 4.00002 5.18426 4.00002 5.00017ZM8.99996 14.6667C6.86575 14.6667 5.06615 13.234 4.51044 11.278C5.10765 11.1501 5.6442 10.8061 6.01014 10.3021L6.91033 9.06211L7.93064 7.8983L9.11829 7.15602C9.45941 6.94282 9.66663 6.56894 9.66663 6.16669C9.66663 5.81248 9.51141 5.56406 9.45295 5.47709C9.42029 5.42851 9.38637 5.38501 9.35319 5.34652C11.7655 5.52706 13.6666 7.54152 13.6666 10C13.6666 12.5773 11.5773 14.6667 8.99996 14.6667ZM11 9.33335C11 8.96516 10.7015 8.66669 10.3333 8.66669C9.96511 8.66669 9.66663 8.96516 9.66663 9.33335C9.66663 9.70154 9.96511 10 10.3333 10C10.7015 10 11 9.70154 11 9.33335ZM7.0915 11.1415C6.89248 11.3329 6.88633 11.6494 7.07776 11.8484C7.56232 12.3522 8.24478 12.6667 8.99983 12.6667C9.75489 12.6667 10.4374 12.3522 10.9219 11.8484C11.1133 11.6494 11.1072 11.3329 10.9082 11.1415C10.7092 10.95 10.3926 10.9562 10.2012 11.1552C9.89736 11.4711 9.47186 11.6667 8.99983 11.6667C8.52781 11.6667 8.10231 11.4711 7.79847 11.1552C7.60704 10.9562 7.29051 10.95 7.0915 11.1415ZM8.3333 9.33335C8.3333 8.96516 8.03482 8.66669 7.66663 8.66669C7.29844 8.66669 6.99996 8.96516 6.99996 9.33335C6.99996 9.70154 7.29844 10 7.66663 10C8.03482 10 8.3333 9.70154 8.3333 9.33335Z"
                                fill="#83A588"/>
                            <path
                                d="M4.00002 5.00017V1.16667C4.00002 0.890529 4.22388 0.666672 4.50002 0.666672C4.77616 0.666672 5.00002 0.890529 5.00002 1.16667V5.00017C5.00002 5.18426 5.14926 5.3335 5.33335 5.3335C5.51745 5.3335 5.66669 5.18426 5.66669 5.00017V1.66667C5.66669 1.39053 5.89054 1.16667 6.16669 1.16667C6.44283 1.16667 6.66669 1.39053 6.66669 1.66667V5.50001C6.66669 5.51415 6.6661 5.52815 6.66495 5.542C6.95311 5.43312 7.31394 5.3308 7.66669 5.3308C7.99991 5.3308 8.28491 5.41403 8.49617 5.52043C8.60046 5.57296 8.69747 5.63652 8.77672 5.7086C8.81567 5.74403 8.86063 5.79083 8.89973 5.84899C8.93045 5.8947 9.00002 6.00874 9.00002 6.16667C9.00002 6.33907 8.91121 6.4993 8.76502 6.59067L7.49412 7.38498L6.3889 8.64564L5.47071 9.91038C5.1258 10.3855 4.57422 10.6666 3.98713 10.6666H3.22811C2.60746 10.6666 2.01235 10.3514 1.69151 9.79257C1.49008 9.44174 1.24072 8.98076 1.04023 8.52452C0.849508 8.09048 0.666687 7.58261 0.666687 7.16664V2.50001C0.666687 2.22386 0.890545 2.00001 1.16669 2.00001C1.44283 2.00001 1.66669 2.22386 1.66669 2.50001V5.33196C1.66669 5.51605 1.81593 5.66529 2.00002 5.66529C2.18412 5.66529 2.33335 5.51605 2.33335 5.33196V1.66667C2.33335 1.39053 2.55721 1.16667 2.83335 1.16667C3.1095 1.16667 3.33335 1.39053 3.33335 1.66667V5.00017C3.33335 5.18426 3.48259 5.3335 3.66669 5.3335C3.85078 5.3335 4.00002 5.18426 4.00002 5.00017ZM8.99996 14.6667C6.86575 14.6667 5.06615 13.234 4.51044 11.278C5.10765 11.1501 5.6442 10.8061 6.01014 10.3021L6.91033 9.06211L7.93064 7.8983L9.11829 7.15602C9.45941 6.94282 9.66663 6.56894 9.66663 6.16669C9.66663 5.81248 9.51141 5.56406 9.45295 5.47709C9.42029 5.42851 9.38637 5.38501 9.35319 5.34652C11.7655 5.52706 13.6666 7.54152 13.6666 10C13.6666 12.5773 11.5773 14.6667 8.99996 14.6667ZM11 9.33335C11 8.96516 10.7015 8.66669 10.3333 8.66669C9.96511 8.66669 9.66663 8.96516 9.66663 9.33335C9.66663 9.70154 9.96511 10 10.3333 10C10.7015 10 11 9.70154 11 9.33335ZM7.0915 11.1415C6.89248 11.3329 6.88633 11.6494 7.07776 11.8484C7.56232 12.3522 8.24478 12.6667 8.99983 12.6667C9.75489 12.6667 10.4374 12.3522 10.9219 11.8484C11.1133 11.6494 11.1072 11.3329 10.9082 11.1415C10.7092 10.95 10.3926 10.9562 10.2012 11.1552C9.89736 11.4711 9.47186 11.6667 8.99983 11.6667C8.52781 11.6667 8.10231 11.4711 7.79847 11.1552C7.60704 10.9562 7.29051 10.95 7.0915 11.1415ZM8.3333 9.33335C8.3333 8.96516 8.03482 8.66669 7.66663 8.66669C7.29844 8.66669 6.99996 8.96516 6.99996 9.33335C6.99996 9.70154 7.29844 10 7.66663 10C8.03482 10 8.3333 9.70154 8.3333 9.33335Z"
                                fill="white" fill-opacity="0.16"/>
                        </svg>
                        <p>Assigned</p>
                    </div>

                    <div className={`title-cell p-2 bg-f-purple ${
                        selectedCell?.col === 'priority' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        Priority
                    </div>

                    <div className={`title-cell p-2 bg-f-purple ${
                        selectedCell?.col === 'dueDate' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        Due Date
                    </div>

                    <div className={`title-cell p-2 bg-l-skin ${
                        selectedCell?.col === 'estValue' ? 'highlighted-column-title' : ''
                    }`} tabIndex={0}>
                        Est. Value
                    </div>

                    <div className="title-cell empty-cell p-2" tabIndex={0}></div>
                </div>

                <div className="spreadsheet">
                    {filteredData.map((row, index) => (
                        <SpreadsheetRow
                            key={index}
                            row={row}
                            rowIndex={index + 1}
                            onCellChange={handleCellChange}
                            selectedCell={selectedCell}
                            onCellSelect={handleCellSelect}

                        />
                    ))}
                </div>
            </div>
            <Tabs onFilterChange={setActiveFilter}/>
        </div>
    );
};

export default Spreadsheet;