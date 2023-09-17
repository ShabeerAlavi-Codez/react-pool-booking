import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form';
import Card from "./Card";
import {useSelector} from "react-redux";


// Первое модальное окно для бронирования дорожки (ФИО, номер и тд)
export default function MyModal(props) {
    const [checked, setChecked] = useState(false); // Локальный state для чекбокса "Всё верно"
    const [time, setTime] = useState(45); // Локальный state количества выбранного времени
    const [cardModalIsOpen, setCardModalIsOpen] = useState(false); // Открыто ли второе модальное окно для ввода карты
    const [inputData, setInputData] = useState(); // Сохранённые данные, которые передаются дальше для бронирования
    const week = useSelector((state) => state.data.currentWeek); // Получаем номер недели из глобального state


    // Переменные управления формой с начальным значением полей
    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            phone_number: '', seats_count: 0,
        }, mode: "onBlur"
    });

    const closeCard = () => {
        setCardModalIsOpen(!cardModalIsOpen);
    }

    // Закрываем первое модальное окно и ставим значение в форме на начальные
    const onHide = () => {
        setChecked(false);
        setTime(45);
        reset({phone_number: '', seats_count: 0})
        props.onHide();
        setCardModalIsOpen(false);
    };

    const onSubmit = (payload) => {
        const data = {
            week: week,
            day: props.data.day,
            startTime: props.data.time,
            durationCount: time / 45,
            seatsCount: Number(payload.seats_count),
            phone: payload.phone_number
        };
        setInputData(data); // Сохраняем данные для следующего этапа
        setCardModalIsOpen(true); // Открываем второе модальное окно с картой
    };


    // Модальное окно, если нет свободных дорожек
    if (props.data?.seats === 0) return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Бронирование дорожки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Извините, на данное время нет доступных дорожек</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onHide}>
                    Отмена
                </Button>
            </Modal.Footer>
        </Modal>
    );

    // Модальное окно с формой
    return (
        <Modal {...props} size="lg" centered>
        <Modal.Header>
            <Modal.Title>Бронирование дорожки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {<Card close={closeCard} show={cardModalIsOpen} data={inputData} hideModal={onHide}/>}
            <h4>Введите данные</h4>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Ваш номер телефона</Form.Label>
                    <Form.Control
                        {...register('phone_number', {
                            required: true, pattern: {
                                value: /^[0-9]{11}$/, message: "Введите номер телефона"
                            }
                        })}
                        disabled={cardModalIsOpen}
                        type="tel"
                        placeholder="89000000000"
                        className={errors?.phone_number && "is-invalid"}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Количество дорожек</Form.Label>
                    <Form.Control
                        {...register('seats_count', {
                            required: true, min: {
                                value: 1, message: "Минимум 1 дорожка"
                            }, max: {
                                value: props.data?.seats, message: "Максимум" + props.data?.seats
                            }
                        })}
                        type="number"
                        disabled={cardModalIsOpen}
                        placeholder={`Максимум ${props.data?.seats}`}
                        className={errors?.seats_count && "is-invalid"}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>На какое время?</Form.Label>
                    <div className="d-flex">
                        <Form.Control
                            style={{maxWidth: "300px"}}
                            readOnly
                            disabled
                            value={time + " мин"}
                        />
                        <Button
                            className="ms-2"
                            variant="outline-secondary"
                            disabled={time === 45 || cardModalIsOpen}
                            onClick={() => setTime((prev) => prev - 45)} // Уменьшаем количество времени на 45
                        >
                            -
                        </Button>
                        <Button
                            className="ms-2"
                            variant="outline-success"
                            disabled={time === 360 || cardModalIsOpen}
                            onClick={() => setTime((prev) => prev + 45)} // Увеличиваем количество времени на 45
                        >
                            +
                        </Button>
                    </div>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Время и день</Form.Label>
                    <Form.Control
                        disabled
                        value={days[props.data?.day] + " " + props.data?.time}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        disabled={cardModalIsOpen}
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        type="checkbox"
                        label="Всё верно"
                    />
                </Form.Group>
                <Button
                    disabled={!checked || cardModalIsOpen} // Отключаем кнопку, если открыто второе модльное окно или не нажат чаекбокс
                    variant="success"
                    type="submit"
                >
                    Забронировать
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-primary" onClick={onHide} disabled={cardModalIsOpen}>
                Закрыть
            </Button>
        </Modal.Footer>
    </Modal>);
}

// Название дней по их номеру в недели
const days = {
    0: "Понедельник", 1: "Вторник", 2: "Среда", 3: "Четверг", 4: "Пятница", 5: "Суббота", 6: "Воскресение",
};
