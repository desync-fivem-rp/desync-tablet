import React from 'react';
import './StartMenu.css';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const apps = [
        { id: 1, name: 'Messages', icon: '💬' },
        { id: 2, name: 'Browser', icon: '🌐' },
        { id: 3, name: 'Notes', icon: '📝' },
        { id: 4, name: 'Calculator', icon: '🧮' },
        { id: 5, name: 'Calendar', icon: '📅' },
        { id: 6, name: 'Photos', icon: '🖼️' },
    ];

    const handleClickOutside = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains('start-menu-overlay')) {
            onClose();
        }
    };

    return (
        <div className="start-menu-overlay" onClick={handleClickOutside}>
            <div className="start-menu">
                <div className="start-menu-grid">
                    {apps.map(app => (
                        <div key={app.id} className="app-icon">
                            <span className="app-emoji">{app.icon}</span>
                            <span className="app-name">{app.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
