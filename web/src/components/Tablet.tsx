import React, { useState } from 'react';
import './App.css';
import './Settings.css';
import './StartMenu.css';
import './Window.css';
import { PiGearSixThin } from "react-icons/pi";
import { BsFillGridFill } from "react-icons/bs";
import Settings from './Settings';
import StartMenu from './StartMenu';
import Window from './Window';

interface OpenWindow {
    id: string;
    title: string;
    isMinimized: boolean;
}

const Tablet: React.FC = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const openWindow = (id: string, title: string) => {
        if (!openWindows.some(w => w.id === id)) {
            setOpenWindows([...openWindows, { id, title, isMinimized: false }]);
        } else {
            // If window exists, unminimize it
            setOpenWindows(openWindows.map(w => 
                w.id === id ? { ...w, isMinimized: false } : w
            ));
        }
    };

    const closeWindow = (id: string) => {
        setOpenWindows(openWindows.filter(w => w.id !== id));
        if (id === 'settings') setIsSettingsOpen(false);
    };

    const minimizeWindow = (id: string) => {
        setOpenWindows(openWindows.map(w => 
            w.id === id ? { ...w, isMinimized: true } : w
        ));
    };

    const handleSettingsClick = () => {
        setIsSettingsOpen(true);
        openWindow('settings', 'Settings');
    };

    return (
        <div className="tablet-background">
            <div className="tablet-content">
                <div 
                    className="desktop"
                    style={{
                        backgroundImage: backgroundUrl ? `url('${backgroundUrl}')` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Windows */}
                    {openWindows.map(({ id, title, isMinimized }) => {
                        if (isMinimized) return null;
                        
                        if (id === 'settings') {
                            return (
                                <Window
                                    key={id}
                                    id={id}
                                    title={title}
                                    isOpen={isSettingsOpen}
                                    onClose={() => closeWindow(id)}
                                    onMinimize={() => minimizeWindow(id)}
                                >
                                    <Settings 
                                        isOpen={true}
                                        onClose={() => closeWindow(id)}
                                        onBackgroundChange={setBackgroundUrl}
                                        currentBackground={backgroundUrl}
                                    />
                                </Window>
                            );
                        }
                        return null; // Add other window types here
                    })}
                </div>

                {/* Taskbar */}
                <div className="taskbar">
                    <div className="taskbar-left">
                        <div 
                            className="taskbar-icon"
                            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                        >
                            <BsFillGridFill className='start-icon' />
                            {/* <span>Start</span> */}
                        </div>
                    </div>

                    <div className="taskbar-center">
                        {openWindows.map(window => (
                            <div 
                                key={window.id}
                                className={`taskbar-icon ${window.isMinimized ? 'minimized' : 'active'}`}
                                onClick={() => {
                                    if (window.isMinimized) {
                                        setOpenWindows(windows => 
                                            windows.map(w => 
                                                w.id === window.id ? { ...w, isMinimized: false } : w
                                            )
                                        );
                                    }
                                }}
                            >
                                <span>{window.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="taskbar-right">
                        <div 
                            className="taskbar-icon"
                            onClick={handleSettingsClick}
                        >
                            <PiGearSixThin className='settings-icon' />
                            {/* <span>Settings</span> */}
                        </div>
                    </div>
                </div>

                {/* Start Menu */}
                <StartMenu 
                    isOpen={isStartMenuOpen}
                    onClose={() => setIsStartMenuOpen(false)}
                />
            </div>
        </div>
    );
};

export default Tablet;