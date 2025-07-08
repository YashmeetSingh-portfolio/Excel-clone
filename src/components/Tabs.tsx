import React, { useState } from "react";
import { Plus } from 'lucide-react';

interface TabsProps {
    onFilterChange: (filter: string) => void;
}

const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

const Tabs: React.FC<TabsProps> = ({ onFilterChange }) => {
    const [activeTab, setActiveTab] = useState("All Orders");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        onFilterChange(tab);
    };

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex space-x-4 py-2 shadow">
            <span className="ml-5"></span>
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === tab
                            ? "bg-green-50 text-green-900 border-t-2 border-green-800"
                            : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                    {tab}
                </button>
            ))}
            <button className="px-4 py-2 text-sm font-medium">
                <Plus size={20} />
            </button>
        </div>
    );
};

export default Tabs;