import { ArrowUpDown, ListFilter } from 'lucide-react';
import  { useState } from 'react';
import '../styles/row-bar.css';

function RowBar() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');

    const handleComingSoonClick = () => {
        setNotificationMessage('Feature Coming Soon!');
        setNotificationType('info');
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleShareClick = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                setNotificationMessage('Link copied to clipboard!');
                setNotificationType('success');
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            })
            .catch(err => {
                console.log(err);
                setNotificationMessage('Failed to copy link.');
                setNotificationType('error');
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            });
    };

    return (
        <div className="
            flex items-center justify-between
            px-4 py-2
            bg-white
            font-inter
            text-gray-800
            mt-0.5
            border-b border-gray-200
        ">
            {showNotification && (
                <div className={`notification-container ${notificationType}`}>
                    <div className="notification-content">
                        {notificationMessage}
                    </div>
                </div>
            )}
            <div className="flex items-center space-x-4">
                <div className="flex items-center row-left-items space-x-1">
                    <p className="text-sm font-medium text-gray-700">Toolbar</p>
                    <p className="text-sm font-medium text-gray-500">&gt;&gt;</p>
                </div>
                <div className="h-6 border-l border-gray-300 row-left-items"></div>

                <div
                    className="flex items-center row-left-items space-x-1 cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={handleComingSoonClick}
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.849718 0.849722C0.627831 1.07161 0.607658 1.41883 0.789204 1.66351L0.849718 1.73361L4.21186 5.09575C2.6102 6.2203 1.41314 7.89993 0.91573 9.88699C0.831909 10.2218 1.03541 10.5612 1.37025 10.645C1.7051 10.7289 2.0445 10.5254 2.12832 10.1905C2.56955 8.42789 3.65926 6.94956 5.1118 5.99543L6.61982 7.50354C6.03023 8.10482 5.66666 8.92854 5.66666 9.83718C5.66666 11.6781 7.15905 13.1705 8.99999 13.1705C9.90864 13.1705 10.7324 12.807 11.3336 12.2174L16.2664 17.1503C16.5105 17.3944 16.9062 17.3944 17.1503 17.1503C17.3722 16.9284 17.3923 16.5812 17.2108 16.3365L17.1503 16.2664L12.0557 11.1712L12.0567 11.17L11.0566 10.1718L8.66497 7.78065L8.66666 7.78L6.26564 5.38152L6.26666 5.38L5.32226 4.4379L1.7336 0.849722C1.48953 0.605645 1.0938 0.605645 0.849718 0.849722ZM7.50339 8.38789L10.4493 11.3338C10.0743 11.697 9.56326 11.9205 8.99999 11.9205C7.8494 11.9205 6.91666 10.9878 6.91666 9.83718C6.91666 9.27392 7.14019 8.76287 7.50339 8.38789ZM8.99999 3.58333C8.16644 3.58333 7.35761 3.70672 6.59257 3.9375L7.62338 4.96766C8.06988 4.87943 8.53033 4.83333 8.99999 4.83333C12.2692 4.83333 15.0916 7.06688 15.8726 10.1943C15.9562 10.5292 16.2955 10.7329 16.6304 10.6492C16.9653 10.5656 17.169 10.2263 17.0854 9.89142C16.1661 6.2106 12.8463 3.58333 8.99999 3.58333ZM9.16223 6.50773L12.33 9.675C12.2452 7.9609 10.8727 6.5897 9.16223 6.50773Z"
                            fill="#121212"/>
                    </svg>

                    <p className="text-sm font-medium">Hide fields</p>
                </div>

                <div
                    className="flex items-center row-left-items space-x-1 cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={handleComingSoonClick}
                >
                    <ArrowUpDown size={18}/>
                    <p className="text-sm font-medium">Sort</p>
                </div>

                <div
                    className="flex items-center space-x-1 row-left-items cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={handleComingSoonClick}
                >
                    <ListFilter size={18}/>
                    <p className="text-sm font-medium">Filter</p>
                </div>

                <div
                    className="flex items-center row-left-items space-x-1 cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={handleComingSoonClick}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{width: '18px', height: '18px'}}

                        className="text-gray-700"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                    >
                        <g>
                            <path
                                d="M243.2,435.2H89.6c-14.13-0.03-25.57-11.47-25.6-25.6V102.4c0.03-14.13,11.47-25.57,25.6-25.6h153.6 c14.14,0,25.6-11.46,25.6-25.6c0-14.14-11.46-25.6-25.6-25.6l-153.6,0c-42.43,0.02-76.78,34.37-76.8,76.8v307.2 c0.02,42.43,34.37,76.78,76.8,76.8h153.6c14.14,0,25.6-11.46,25.6-25.6C268.8,446.66,257.34,435.2,243.2,435.2z"/>
                            <path
                                d="M371.2,307.2v179.2c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6V307.2c0-14.14-11.46-25.6-25.6-25.6 C382.66,281.6,371.2,293.06,371.2,307.2"/>
                            <path
                                d="M371.2,25.6v179.2c0,14.14,11.46,25.6,25.6,25.6c14.14,0,25.6-11.46,25.6-25.6V25.6c0-14.14-11.46-25.6-25.6-25.6 C382.66,0,371.2,11.46,371.2,25.6"/>
                            <path
                                d="M301.9,427.7l76.8,76.8c4.77,4.77,11.36,7.5,18.1,7.5c6.74,0,13.34-2.73,18.1-7.5l76.8-76.8c10-10,10-26.21,0-36.2 c-10-10-26.21-10-36.2,0l-58.7,58.7l-58.7-58.7c-10-10-26.21-10-36.2,0C291.9,401.5,291.9,417.7,301.9,427.7L301.9,427.7z"/>
                            <path
                                d="M338.1,120.5l58.7-58.7l58.7,58.7c10,10,26.21,10,36.2,0c10-10,10-26.21,0-36.2L414.9,7.5c-10-10-26.21-10-36.2,0 l-76.8,76.8c-10,10-10,26.21,0,36.2C311.9,130.5,328.1,130.5,338.1,120.5L338.1,120.5z"/>
                        </g>
                    </svg>

                    <p className="text-sm font-medium">Cell view</p>
                </div>
            </div>

            <div className="flex items-center space-x-3">

                <button className="
                    flex items-center space-x-1
                    px-3 py-1.5
                    border border-gray-300 rounded-md
                    text-sm font-medium text-gray-700
                    bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                        onClick={handleComingSoonClick}
                >
                    <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.2082 16.0833C12.5533 16.0832 12.8333 16.363 12.8333 16.7082C12.8333 17.0533 12.5537 17.3332 12.2085 17.3333L1.37518 17.3365C1.03 17.3366 0.75 17.0568 0.75 16.7117C0.75 16.3665 1.02964 16.0866 1.37482 16.0865L12.2082 16.0833ZM6.70686 0.676497L6.79167 0.670792C7.10808 0.670792 7.36958 0.90592 7.41096 1.21098L7.41667 1.29579L7.41583 12.7L10.5173 9.59968C10.7393 9.37782 11.0865 9.35768 11.3311 9.53925L11.4012 9.59977C11.6231 9.82169 11.6432 10.1689 11.4617 10.4136L11.4011 10.4837L7.23643 14.6475C7.01465 14.8692 6.66766 14.8895 6.423 14.7082L6.3529 14.6478L2.18336 10.4839C1.93912 10.24 1.93885 9.84428 2.18276 9.60003C2.40449 9.37799 2.7517 9.35758 2.9965 9.53896L3.06664 9.59943L6.16583 12.6941L6.16667 1.29579C6.16667 0.979378 6.40179 0.717883 6.70686 0.676497L6.79167 0.670792L6.70686 0.676497Z"
                            fill="#545454"/>
                    </svg>
                    <span>Import</span>
                </button>
                <button className="
                    flex items-center space-x-1
                    px-3 py-1.5
                    border border-gray-300 rounded-md
                    text-sm font-medium text-gray-700
                    bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                        onClick={handleComingSoonClick}
                >
                    <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.2082 1.92392C12.5533 1.92402 12.8333 1.64428 12.8333 1.2991C12.8333 0.953924 12.5537 0.67402 12.2085 0.67392L1.37518 0.670784C1.03 0.670684 0.75 0.950425 0.75 1.2956C0.75 1.64078 1.02964 1.92068 1.37482 1.92078L12.2082 1.92392ZM6.70686 17.3308L6.79167 17.3365C7.10808 17.3365 7.36958 17.1013 7.41096 16.7963L7.41667 16.7115L7.41583 5.3073L10.5173 8.40757C10.7393 8.62944 11.0865 8.64958 11.3311 8.46801L11.4012 8.40748C11.6231 8.18557 11.6432 7.83835 11.4617 7.59369L11.4011 7.5236L7.23643 3.35975C7.01465 3.13801 6.66766 3.11776 6.423 3.29906L6.3529 3.3595L2.18336 7.52334C1.93912 7.76725 1.93885 8.16298 2.18276 8.40723C2.40449 8.62927 2.7517 8.64968 2.9965 8.4683L3.06664 8.40783L6.16583 5.31313L6.16667 16.7115C6.16667 17.0279 6.40179 17.2894 6.70686 17.3308Z"
                            fill="#545454"/>
                    </svg>
                    <span>Export</span>
                </button>


                <button className="
                row-bar-btn
                    flex items-center space-x-1
                    px-3 py-1.5
                    border border-gray-300 rounded-md
                    text-sm font-medium text-gray-700
                    bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
                "
                        onClick={handleShareClick}
                >
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.62231 1.33333H6.50915C6.85433 1.33333 7.13415 1.61316 7.13415 1.95833C7.13415 2.27475 6.89902 2.53624 6.59396 2.57763L6.50915 2.58333H3.62231C2.62993 2.58333 1.81761 3.3543 1.75164 4.32996L1.74731 4.45833V12.375C1.74731 13.3674 2.51828 14.1797 3.49394 14.2457L3.62231 14.25H11.5396C12.532 14.25 13.3443 13.479 13.4103 12.5034L13.4146 12.375V11.9602C13.4146 11.615 13.6944 11.3352 14.0396 11.3352C14.356 11.3352 14.6175 11.5703 14.6589 11.8754L14.6646 11.9602V12.375C14.6646 14.0452 13.3543 15.4094 11.7056 15.4957L11.5396 15.5H3.62231C1.9521 15.5 0.58792 14.1897 0.501646 12.541L0.497314 12.375V4.45833C0.497314 2.78812 1.80762 1.42394 3.45635 1.33767L3.62231 1.33333H6.50915H3.62231ZM10.084 3.43321V1.125C10.084 0.605026 10.673 0.324957 11.0731 0.616503L11.1416 0.673953L16.1371 5.46562C16.3703 5.68924 16.3915 6.04843 16.2008 6.29673L16.1372 6.36765L11.1417 11.1609C10.7665 11.5209 10.1565 11.2897 10.0899 10.7991L10.084 10.7099V8.43878L9.79773 8.46387C7.79799 8.67247 5.88129 9.57321 4.0356 11.1811C3.60301 11.558 2.93374 11.2017 3.00488 10.6324C3.55888 6.19942 5.8771 3.75608 9.8345 3.44959L10.084 3.43321V1.125V3.43321ZM11.334 2.59054V4.04167C11.334 4.38685 11.0542 4.66667 10.709 4.66667C7.48114 4.66667 5.48062 6.06344 4.61625 8.96432L4.55037 9.19646L4.84386 8.99911C6.7076 7.781 8.66544 7.16667 10.709 7.16667C11.0254 7.16667 11.2869 7.4018 11.3283 7.70686L11.334 7.79167V9.24402L14.8017 5.91674L11.334 2.59054Z"
                            fill="#545454"/>
                    </svg>

                    <span>Share</span>
                </button>
                <button className="
                    new-action-btn

                    bg-green-700 bg-opacity-80 text-white
                    rounded-md
                    text-sm font-medium
                    hover:bg-green-800 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500
                "
                        onClick={handleComingSoonClick}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00006 0.5C8.34524 0.5 8.62506 0.779822 8.62506 1.125V5.91667H10.7046C11.9702 5.91667 12.9963 6.94268 12.9963 8.20833V13.368L14.4334 11.9328C14.6777 11.6888 15.0734 11.6891 15.3173 11.9334C15.5612 12.1776 15.5609 12.5733 15.3167 12.8172L12.8129 15.3177C12.5688 15.5615 12.1733 15.5613 11.9293 15.3174L9.42889 12.8169C9.18482 12.5729 9.18482 12.1771 9.42889 11.9331C9.67297 11.689 10.0687 11.689 10.3128 11.9331L11.7463 13.3665V8.20833C11.7463 7.63304 11.2799 7.16667 10.7046 7.16667H5.29165C4.71635 7.16667 4.24998 7.63304 4.24998 8.20833V13.3665L5.68346 11.9331C5.92754 11.689 6.32327 11.689 6.56734 12.8169C6.81142 12.1771 6.81142 12.5729 6.56734 12.8169L4.06692 15.3174C3.82285 15.5614 3.42712 15.5614 3.18304 15.3174L0.682574 12.8169C0.438494 12.5729 0.43849 12.1771 0.682566 11.9331C0.926641 11.689 1.32237 11.689 1.56645 11.9331L2.99998 13.3666V8.20833C2.99998 6.94268 4.026 5.91667 5.29165 5.91667H7.37506V1.125C7.37506 0.779822 7.65488 0.5 8.00006 0.5Z"
                            fill="white"/>
                    </svg>
                    <span className="ml-1"> New Action </span>
                </button>
            </div>
        </div>
    );
}

export default RowBar;