import * as React from "react";

interface DeleteButtonProps {
    onClick: () => void
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
    {
        return (
            <button onClick={onClick}>Delete</button>
        );
    }
}