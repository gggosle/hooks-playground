import React from 'react';

interface DeleteButtonProps {
    onClick: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = React.memo(({ onClick }) => {
    return (
        <button onClick={onClick} style={{ padding: '2px 8px', cursor: 'pointer' }}>
            Delete
        </button>
    );
});