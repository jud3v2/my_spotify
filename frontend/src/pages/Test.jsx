import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/error', { state: { statusCode: 500, errorMessage: 'Internal Server Error' } });
    };

    return (
        <button onClick={handleClick}>
            Go to error page
        </button>
    );
};

export default TestButton;