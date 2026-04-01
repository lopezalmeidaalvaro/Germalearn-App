import React, { type ReactNode, useContext } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { GameContext } from '../../context/GameContext';
import { Heart, Zap } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const context = useContext(GameContext);

    // Safety check just in case, though usually this will be used inside proper context
    const user = context?.state.user;
    const isAdminMode = context?.state.isAdminMode;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="md:ml-64 pb-20 md:pb-0 min-h-screen transition-all">

                {/* Mobile Header (Only visible on mobile) */}
                <header className="md:hidden sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                            {user?.username?.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-bold text-indigo-900 dark:text-indigo-100">{user?.username}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-red-500 font-bold text-sm">
                            <Heart size={18} fill={isAdminMode ? "currentColor" : "none"} />
                            <span>{isAdminMode ? '∞' : user?.hearts}</span>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm">
                            <Zap size={18} fill="currentColor" />
                            <span>{user?.xp}</span>
                        </div>
                    </div>
                </header>

                <div className="h-full">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
        </div>
    );
};

export default Layout;
