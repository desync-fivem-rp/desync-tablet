import React, { useState, useEffect } from 'react';
import './Settings.css';

interface SettingsProps {
    isOpen: boolean;
    onClose: () => void;
    onBackgroundChange: (url: string) => void;
    currentBackground: string;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, onBackgroundChange, currentBackground }) => {
    const [backgroundUrl, setBackgroundUrl] = useState(currentBackground);
    const [error, setError] = useState('');

    const validateAndUpdateBackground = (url: string) => {
        if (!url) {
            onBackgroundChange('');
            setError('');
            return;
        }

        // Basic URL validation
        try {
            new URL(url);
            setError('');
            onBackgroundChange(url);
        } catch {
            setError('Please enter a valid URL');
        }
    };

    // Update background in real-time as user types
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            validateAndUpdateBackground(backgroundUrl);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [backgroundUrl, onBackgroundChange]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!error) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="settings-modal">
            <div className="settings-content">
                <form onSubmit={handleSubmit}>
                    <div className="setting-item">
                        <label>Desktop Background URL:</label>
                        <input
                            type="url"
                            value={backgroundUrl}
                            onChange={(e) => setBackgroundUrl(e.target.value)}
                            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                        />
                        {error && <div className="error-message">{error}</div>}
                        <div className="setting-help">
                            Enter a direct link to an image. The URL should end with an image extension like .jpg, .png, or .gif
                        </div>
                    </div>
                    <div className="setting-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
