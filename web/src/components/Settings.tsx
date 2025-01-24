import React, { useEffect, useState } from 'react';
import { fetchNui } from '../utils/fetchNui';
import './Settings.css';

interface SettingsProps {
    backgroundUrl: string;
    // userScale: number;
    // onSave: (url: string, scale: number) => void;
    onSave: (url: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ backgroundUrl = '', onSave }) => {
    const [url, setUrl] = useState<string>(backgroundUrl);
    // const [scale, setScale] = useState<number>(userScale);

    useEffect(() => {
        const fetchSettings = async () => {
            // const { backgroundUrl, scale } = await fetchNui<{ backgroundUrl: string, scale: number }>('getSettings');
            const backgroundUrl = await fetchNui<string>('getSettings');
            setUrl(backgroundUrl || ''); // Ensure a string is always set
            // setScale(scale || 1); // Ensure a number is always set
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // onSave(url, scale);
        onSave(url);
        // await fetchNui<void>('saveSettings', { url, scale });
        await fetchNui<void>('saveSettings', { url});
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
                {/* <div className="setting-group">
                    <label>Tablet Scale:</label>
                    <input
                        type="number"
                        value={scale}
                        onChange={(e) => setScale(parseFloat(e.target.value))}
                        min="0.5"
                        max="2"
                        step="0.1"
                    />
                </div> */}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default Settings;
