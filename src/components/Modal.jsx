import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useForm } from 'react-hook-form';
import Card from "./Card";
import { useSelector } from "react-redux";

// First modal window for lane booking (Full Name, Phone Number, etc.)
export default function MyModal(props) {
    const [checked, setChecked] = useState(false); // Local state for the "All correct" checkbox
    const [time, setTime] = useState(45); // Local state for the selected time duration
    const [cardModalIsOpen, setCardModalIsOpen] = useState(false); // Is the second modal window for entering card information open?
    const [inputData, setInputData] = useState(); // Saved data to be passed on for booking
    const week = useSelector((state) => state.data.currentWeek); // Get the week number from global state

    // Form control variables with initial field values
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            phone_number: '',
            seats_count: 0,
        },
        mode: "onBlur"
    });

    const closeCard = () => {
        setCardModalIsOpen(!cardModalIsOpen);
    }

    // Close the first modal window and reset the form fields
    const onHide = () => {
        setChecked(false);
        setTime(45);
        reset({ phone_number: '', seats_count: 0 });
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
        setInputData(data); // Save data for the next step
        setCardModalIsOpen(true); // Open the second modal window with card information
    };

    // Modal window if there are no available lanes
    if (props.data?.seats === 0) return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Lane reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Sorry, there are no lanes available at this time</h4>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onHide}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );

    // Modal window with the form
    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header>
                <Modal.Title>Lane reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {<Card close={closeCard} show={cardModalIsOpen} data={inputData} hideModal={onHide} />}
                <h4>Enter your information</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Your phone number</Form.Label>
                        <Form.Control
                            {...register('phone_number', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]{11}$/,
                                    message: "Enter your phone number"
                                }
                            })}
                            disabled={cardModalIsOpen}
                            type="tel"
                            placeholder="89000000000"
                            className={errors?.phone_number && "is-invalid"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Number of lanes</Form.Label>
                        <Form.Control
                            {...register('seats_count', {
                                required: true,
                                min: {
                                    value: 1,
                                    message: "Minimum 1 lane"
                                },
                                max: {
                                    value: props.data?.seats,
                                    message: "Maximum " + props.data?.seats
                                }
                            })}
                            type="number"
                            disabled={cardModalIsOpen}
                            placeholder={`Maximum ${props.data?.seats}`}
                            className={errors?.seats_count && "is-invalid"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Duration and Day</Form.Label>
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
                            label="All correct"
                        />
                    </Form.Group>
                    <Button
                        disabled={!checked || cardModalIsOpen} // Disable the button if the second modal is open or the checkbox is not checked
                        variant="success"
                        type="submit"
                    >
                        Reserve
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onHide} disabled={cardModalIsOpen}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

// English day names by their number in the week
const days = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
};
