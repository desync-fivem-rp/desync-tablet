import React from 'react';
import './StartMenu.css';

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateNote: () => void;
    onCreateTodo: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose, onCreateNote, onCreateTodo }) => {
    if (!isOpen) return null;

    const apps = [
        { id: 'notes', name: 'Notes', icon: '📝', onClick: onCreateNote },
        { id: 'todo', name: 'Todo', icon: '📝', onClick: onCreateTodo },
        // Add more apps here as needed
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
                        <div 
                            key={app.id} 
                            className="app-icon"
                            onClick={() => {
                                app.onClick();
                                onClose();
                            }}
                        >
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
