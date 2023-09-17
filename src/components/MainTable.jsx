import Table from "react-bootstrap/Table";
import {useEffect} from "react";
import {getData} from "../store/DataSlice";
import {useDispatch, useSelector} from "react-redux";

// Основная страница
export default function MainTable({setID}) {
    // Получаем и глобального state
    const data = useSelector((state) => state.data.data); // Количество дорожек для каждого дня
    const week = useSelector((state) => state.data.currentWeek); // Номер текущей недели

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

    // Получаем свободные дорожки в зависимости от недели
    useEffect(() => {
        dispatch(getData(week));
    }, [week]);

    // Ждём, пока данные загрузятся с сервера
    if (!data)
        return;

    return (
        <Table striped bordered hover responsive size="md">
            <thead>
            <tr>
                <th></th>
                <th>Пн.</th>
                <th>Вт.</th>
                <th>Ср.</th>
                <th>Чт.</th>
                <th>Пт.</th>
                <th>Сб.</th>
                <th>Вс.</th>
            </tr>
            </thead>
            <tbody>
            {time.map((time, i) => ( // Проходимся по каждому времени из массива
                <tr key={i}>
                    <td>{time}</td>
                    {data[time]?.map((e, i) => ( // Для каждого времени проходимся по дням недели и отрисовываем свободное количество дорожек
                        <td
                            className="dataCell"
                            key={i}
                            style={{cursor: "pointer"}}
                            // При нажатии на ячейку сохраняем время, день недели и количество свободных мест
                            // в переменную в компоненте App, чтобы понять на какой день и время мы бронируем дорожки
                            onClick={() => setID({time: time, day: i, seats: e})}
                        >
                            {e + " дор."}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

