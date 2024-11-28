
const Sidebar = (props) => {
    const { isSidebarOpen } = props;

    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 lg:translate-x-0`}
        >
            <div className="flex flex-col h-full">
                <div className="p-4 text-lg font-bold border-b border-gray-700">
                    Dashboard
                </div>
                <ul className="flex-grow space-y-2 p-4">
                    <li className="bg-gray-700 rounded-md px-4 py-2 cursor-pointer">
                        Tickets
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar