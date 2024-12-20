import React from 'react';
import './Modal.css';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">{title}</h2>
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <button className="modal-button confirm" onClick={onConfirm}>Continue</button>
                    <button className="modal-button cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;