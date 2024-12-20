import React, { useState } from 'react';
import { PiGearSixThin } from "react-icons/pi";
import { BsFillGridFill } from "react-icons/bs";
import Settings from './Settings';
import StartMenu from './StartMenu';
import Window from './Window';
import Notes from './Notes';
import './App.css';

interface OpenWindow {
    id: string;
    type: string;
    title: string;
    isMinimized: boolean;
    noteId?: string;
}

const Tablet: React.FC = () => {
    const [backgroundUrl, setBackgroundUrl] = useState('');
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const createNewNote = () => {
        const windowId = `notes-${Date.now()}`;
        setOpenWindows(windows => [...windows, {
            id: windowId,
            type: 'notes',
            title: 'Untitled Note',
            isMinimized: false
        }]);
        setIsStartMenuOpen(false);
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

    const handleNoteSave = (note: { title: string }, windowId: string) => {
        setOpenWindows(windows => 
            windows.map(w => 
                w.id === windowId 
                    ? { ...w, title: note.title || 'Untitled Note' }
                    : w
            )
        );
    };

    const handleSaveBackground = (url: string) => {
        setBackgroundUrl(url);
        setIsSettingsOpen(false);
    };

    const handleNoteTitleChange = (windowId: string, newTitle: string) => {
        setOpenWindows(windows =>
            windows.map(w =>
                w.id === windowId
                    ? { ...w, title: newTitle }
                    : w
            )
        );
    };

    return (
        <div className="tablet-container">
            <div className="tablet-screen" style={{ backgroundImage: `url(${backgroundUrl})` }}>
                {openWindows.map(window => (
                    <Window
                        key={window.id}
                        id={window.id}
                        title={window.title}
                        isMinimized={window.isMinimized}
                        onClose={() => closeWindow(window.id)}
                        onMinimize={() => minimizeWindow(window.id)}
                    >
                        {window.type === 'notes' && (
                            <Notes
                                id={window.id}
                                noteId={window.noteId}
                                onClose={() => closeWindow(window.id)}
                                onSave={(note) => handleNoteSave(note, window.id)}
                                onTitleChange={(title) => handleNoteTitleChange(window.id, title)}
                            />
                        )}
                    </Window>
                ))}

                {isSettingsOpen && (
                    <Window
                        id="settings"
                        title="Settings"
                        onClose={() => setIsSettingsOpen(false)}
                    >
                        <Settings
                            backgroundUrl={backgroundUrl}
                            onSave={handleSaveBackground}
                        />
                    </Window>
                )}

                <StartMenu 
                    isOpen={isStartMenuOpen}
                    onClose={() => setIsStartMenuOpen(false)}
                    onCreateNote={createNewNote}
                />

                <div className="taskbar">
                    <div className="taskbar-left">
                        <div 
                            className="taskbar-icon"
                            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
                        >
                            <BsFillGridFill className='start-icon' />
                        </div>
                    </div>

                    <div className="taskbar-center">
                        {openWindows.map(window => (
                            <div 
                                key={window.id}
                                className={`taskbar-icon ${window.isMinimized ? 'minimized' : 'active'}`}
                                onClick={() => {
                                    setOpenWindows(windows => 
                                        windows.map(w => 
                                            w.id === window.id ? { ...w, isMinimized: false } : w
                                        )
                                    );
                                }}
                            >
                                <span>{window.title}</span>
                            </div>
                        ))}
                    </div>

                    <div className="taskbar-right">
                        <div 
                            className="taskbar-icon"
                            onClick={() => setIsSettingsOpen(true)}
                        >
                            <PiGearSixThin className='settings-icon' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tablet;