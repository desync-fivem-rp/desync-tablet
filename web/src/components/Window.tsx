import React, { useState, useRef, useEffect } from 'react';
import './Window.css';
import { IoCloseOutline } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";

interface WindowProps {
    id: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
    onMinimize: () => void;
    children: React.ReactNode;
    defaultPosition?: { x: number; y: number };
}

const Window: React.FC<WindowProps> = ({ 
    id, 
    title, 
    isOpen, 
    onClose, 
    onMinimize, 
    children,
    defaultPosition = { x: 50, y: 50 }
}) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    
    // Initialize position after the window is mounted to ensure proper positioning
    const [position, setPosition] = useState(defaultPosition);
    useEffect(() => {
        if (windowRef.current && windowRef.current.parentElement) {
            const parentRect = windowRef.current.parentElement.getBoundingClientRect();
            const windowRect = windowRef.current.getBoundingClientRect();
            
            const maxX = parentRect.width - windowRect.width - 20;
            const maxY = parentRect.height - windowRect.height - 20;
            
            setPosition({
                x: Math.max(20, Math.min(defaultPosition.x, maxX)),
                y: Math.max(20, Math.min(defaultPosition.y, maxY))
            });
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target instanceof HTMLElement && 
            !e.target.closest('.window-controls')) {
            setIsDragging(true);
            const rect = windowRef.current?.getBoundingClientRect();
            if (rect) {
                setDragOffset({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                });
            }
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && windowRef.current) {
            const parentRect = windowRef.current.parentElement?.getBoundingClientRect();
            if (parentRect) {
                const newX = e.clientX - parentRect.left - dragOffset.x;
                const newY = e.clientY - parentRect.top - dragOffset.y;
                
                // Ensure window stays within parent bounds
                const maxX = parentRect.width - windowRef.current.offsetWidth;
                const maxY = parentRect.height - windowRef.current.offsetHeight;
                
                setPosition({
                    x: Math.max(0, Math.min(newX, maxX)),
                    y: Math.max(0, Math.min(newY, maxY))
                });
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    if (!isOpen) return null;

    return (
        <div
            ref={windowRef}
            className="window"
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'default'
            }}
        >
            <div 
                className="window-titlebar" 
                onMouseDown={handleMouseDown}
            >
                <div className="window-title">{title}</div>
                <div className="window-controls">
                    <button 
                        className="window-control minimize"
                        onClick={onMinimize}
                    >
                        <VscChromeMinimize />
                    </button>
                    <button 
                        className="window-control close"
                        onClick={onClose}
                    >
                        <IoCloseOutline />
                    </button>
                </div>
            </div>
            <div className="window-content">
                {children}
            </div>
        </div>
    );
};

export default Window;
