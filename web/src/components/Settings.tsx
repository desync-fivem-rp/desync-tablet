import React, { useState } from 'react';
import './Settings.css';

interface SettingsProps {
    backgroundUrl: string;
    onSave: (url: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ backgroundUrl, onSave }) => {
    const [url, setUrl] = useState(backgroundUrl);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(url);
    };

    return (
        <div className="settings-container">
            <form onSubmit={handleSubmit}>
                <div className="setting-group">
                    <label>Background URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter image URL"
                    />
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;
