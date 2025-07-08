import  { useState } from 'react';
import '../styles/top-bar.css';
import { Bell } from 'lucide-react';
import { FiSearch } from 'react-icons/fi';
import { Ellipsis } from 'lucide-react';
import John from '../assets/John.png';

function TopBar() {
    const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);

    const notifications = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.'
    ];

    const getRandomNotifications = () => {
        const shuffled = [...notifications].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
    };

    const handleBellClick = () => {
        setShowNotificationsMenu(!showNotificationsMenu);
    };

    return (
        <div className="
            flex items-center justify-between
            px-4 py-2
            top-bar
            font-inter
            text-gray-800
        ">
            <div className="flex items-center space-x-2">
                <div className="pane-icon"></div>

                <p className="path-element text-sm font-medium text-gray-500">Workspace</p>
                <p className="path-element text-sm font-medium text-gray-500">&gt;</p>

                <p className="path-element text-sm font-medium text-gray-500">Folder 2</p>
                <p className="path-element text-sm font-medium text-gray-500">&gt;</p>
                <p className="path-element text-sm font-medium text-gray-700">Spreadsheet 3</p>
                <p className="path-element text-sm font-medium text-gray-500"><Ellipsis size={22} /> </p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative h-10 w-145px">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg"/>
                    <input
                        type="text"
                        placeholder="Search within sheet"
                        className="
                            top-search-input
                            h-full w-full
                            pl-10 pr-3 py-2
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            text-sm text-gray-700
                            placeholder-gray-400
                            bg-white
                        "
                    />
                </div>
                <div className="relative">
                    <Bell size={24} className="text-gray-600 cursor-pointer" onClick={handleBellClick}/>
                    <div
                        className="absolute bg-dark-f-green top-0 right-0 -mt-1 -mr-1 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        2
                    </div>
                    {showNotificationsMenu && (
                        <div className="notification-menu">
                            <h3 className="notification-menu-title">Notifications</h3>
                            {getRandomNotifications().map((notification, index) => (
                                <div key={index} className="notification-item">
                                    {notification}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 font-bold text-sm">
                    <img src={John} alt="John Doe" className="w-full h-full object-cover rounded-full"/>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-600">John Doe</span>
                    <span className="text-xs text-gray-400">john.doe....</span>
                </div>
            </div>
        </div>
    );
}

export default TopBar;