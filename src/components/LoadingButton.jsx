import React from 'react';
import Button from 'react-bootstrap/Button';

// Компонент кнопки, которая "Загружается" (Ждёт ответ с сервера)
function LoadingButton({isLoading, setLoading, ...props}) {
    const handleClick = () => setLoading(true);

    return (
        <Button {...props}
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
        >
            {isLoading ? 'Загрузка…' : 'Оплатить'}
        </Button>
    );
}

export default LoadingButton;
