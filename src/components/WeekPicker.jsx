import React, {useState} from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {PickersDay} from "@mui/x-date-pickers/PickersDay";
import {useDispatch} from "react-redux";
import {setCurrentWeek} from "../store/DataSlice";

// Подключение плагинов для календаря
dayjs.extend(isBetweenPlugin); // Позволяет выбрать промежуток
dayjs.extend(weekOfYear); // Получить по дню номер недели в году

// Стили одного дня для календаря
const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({theme, dayIsBetween, isFirstDay, isLastDay}) => ({
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.dark,
        },
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    }),
    ...(isLastDay && {
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    }),
}));

export default function CustomDay() {
    const dispatch = useDispatch();
    const [value, setValue] = useState(dayjs());

    // Функция рендера одного дня
    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!value) {
            return <PickersDay {...pickersDayProps}/>;
        }

        const start = value.startOf("week");
        const end = value.endOf("week");

        // Переменные для стилей
        const dayIsBetween = date.isBetween(start, end, null, "[]"); // День внутри промежутка
        const isFirstDay = date.isSame(start, "day"); // День первый в промежутке
        const isLastDay = date.isSame(end, "day"); // День последний в промежутке

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
            />
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                label="Week picker"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue); // Сохраняем в локальный state номер недели
                    dispatch(setCurrentWeek(newValue.week())); // Сохраняем в глобальный state номер недели
                }}
                renderDay={renderWeekPickerDay}
                renderInput={(params) => <TextField {...params} />}
                inputFormat="'Week of' MMM d"
                views={['day']}
                disablePast={true}
                maxDate={dayjs("2023-12-30")}
                minDate={dayjs("2023-01-01")}
                className="week"
            />
        </LocalizationProvider>
    );
}
