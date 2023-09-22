import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import { getData } from "../store/DataSlice";
import { useDispatch, useSelector } from "react-redux";

// Main page
export default function MainTable({ setID }) {
    // Get data from global state
    const data = useSelector((state) => state.data.data); // Number of lanes for each day
    const week = useSelector((state) => state.data.currentWeek); // Current week number

    const dispatch = useDispatch();

    const time = [
        "6:30",
        "7:15",
        "8:00",
        "8:45",
        "9:30",
        "10:15",
        "11:00",
        "11:45",
        "12:30",
        "13:15",
        "14:00",
        "14:45",
        "15:30",
        "16:15",
        "17:00",
        "17:45",
        "18:30",
        "19:15",
        "20:00",
        "20:45",
        "21:30",
    ];

    // Get available lanes depending on the week
    useEffect(() => {
        dispatch(getData(week));
    }, [week]);

    // Wait for data to load from the server
    if (!data)
        return null;

    return (
        <Table striped bordered hover responsive size="md">
            <thead>
            <tr>
                <th></th>
                <th>Mon.</th>
                <th>Tue.</th>
                <th>Wed.</th>
                <th>Thu.</th>
                <th>Fri.</th>
                <th>Sat.</th>
                <th>Sun.</th>
            </tr>
            </thead>
            <tbody>
            {time.map((time, i) => ( // Iterate through each time slot from the array
                <tr key={i}>
                    <td>{time}</td>
                    {data[time]?.map((e, i) => ( // For each time slot, iterate through the days of the week and render the available number of lanes
                        <td
                            className="dataCell"
                            key={i}
                            style={{ cursor: "pointer" }}
                            // When clicking on a cell, store the time, day of the week, and the number of available seats
                            // in a variable in the App component to determine which day and time we are booking lanes for
                            onClick={() => setID({ time: time, day: i, seats: e })}
                        >
                            {e + " available"}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}
