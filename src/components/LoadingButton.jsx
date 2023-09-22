import React from 'react';
import Button from 'react-bootstrap/Button';

// A button component that displays "Loading" while waiting for a server response
function LoadingButton({ isLoading, setLoading, ...props }) {
    const handleClick = () => setLoading(true);

    return (
        <Button {...props}
            variant="primary"
            disabled={isLoading}
            onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Loading...' : 'Pay'}
        </Button>
    );
}

export default LoadingButton;
