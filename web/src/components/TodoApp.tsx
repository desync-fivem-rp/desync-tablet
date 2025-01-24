import React from 'react';

const TodoApp: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src="https://docs.google.com/document/d/18kB6KOjgQxbfmdn1f4X4-be5ydZWxqzaM3uXyPC6ggU/edit?usp=sharing" // Replace with your web document URL
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Todo List"
            />
        </div>
    );
};

export default TodoApp;
