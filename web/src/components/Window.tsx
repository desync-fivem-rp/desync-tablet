import React, { useState, useRef } from 'react';
import './Window.css';

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isMinimized?: boolean;
    onClose: () => void;
    onMinimize?: () => void;
}

const Window: React.FC<WindowProps> = ({ 
    id, 
    title, 
    children, 
    isMinimized = false,
    onClose,
    onMinimize 
}) => {
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [size, setSize] = useState({ width: 800, height: 600 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeDirection, setResizeDirection] = useState<string>('');
    const windowRef = useRef<HTMLDivElement>(null);
    const [zIndex, setZIndex] = useState(0);

    const bringToFront = () => {
        setZIndex(prev => prev + 1);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        bringToFront();
        if ((e.target as HTMLElement).closest('.window-controls-left')) return;
        
        const target = e.target as HTMLElement;
        if (target.classList.contains('resize-handle')) {
            setIsResizing(true);
            setResizeDirection(target.dataset.direction || '');
        } else {
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

    const handleMouseMove = (e: React.MouseEvent) => {
        const tablet = document.querySelector('.tablet-screen');
        if (!tablet || !windowRef.current) return;

        const tabletRect = tablet.getBoundingClientRect();
        const windowRect = windowRef.current.getBoundingClientRect();

        if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            const maxX = tabletRect.width - windowRect.width;
            const maxY = tabletRect.height - windowRect.height;

            setPosition({
                x: Math.max(0, Math.min(maxX, newX - tabletRect.left)),
                y: Math.max(0, Math.min(maxY, newY - tabletRect.top))
            });
        }

        if (isResizing) {
            e.preventDefault();
            const minWidth = 400;
            const minHeight = 300;

            switch (resizeDirection) {
                case 'e':
                    const newWidth = e.clientX - windowRect.left;
                    setSize(prev => ({
                        ...prev,
                        width: Math.max(minWidth, newWidth)
                    }));
                    break;
                case 's':
                    const newHeight = e.clientY - windowRect.top;
                    setSize(prev => ({
                        ...prev,
                        height: Math.max(minHeight, newHeight)
                    }));
                    break;
                case 'se':
                    setSize({
                        width: Math.max(minWidth, e.clientX - windowRect.left),
                        height: Math.max(minHeight, e.clientY - windowRect.top)
                    });
                    break;
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeDirection('');
    };

    if (isMinimized) return null;

    return (
        <div 
            ref={windowRef}
            className={`window ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''}`}
            style={{ 
                left: position.x,
                top: position.y,
                width: size.width,
                height: size.height,
                cursor: isDragging ? 'grabbing' : 'default',
                zIndex: zIndex
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="window-titlebar">
                <div className="window-controls-left">
                    <button className="window-control close" onClick={onClose}>
                        <span className="control-icon">×</span>
                    </button>
                    {onMinimize && (
                        <button className="window-control minimize" onClick={onMinimize}>
                            <span className="control-icon">−</span>
                        </button>
                    )}
                </div>
                <div className="window-title">{title}</div>
            </div>
            <div className="window-content">
                {children}
            </div>
            <div className="resize-handle e" data-direction="e" />
            <div className="resize-handle s" data-direction="s" />
            <div className="resize-handle se" data-direction="se" />
        </div>
    );
};

export default Window;
