import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from "../api/API";

export const book = createAsyncThunk(
    'data/book',
    async function (data, {rejectWithValue, dispatch}) {
        try {
            // Отправляем на сервер данные о бронировании
            let response = await fetch(API.BOOK_URL, {
                method: 'post',
                body: JSON.stringify(data)
            });

            response = await response.json();
            dispatch(getData(data.week)); // Запрашиваем с сервера актуальные данные

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getData = createAsyncThunk(
    'data/getInfo',
    async function (currentWeek, {rejectWithValue, dispatch}) {
        try {
            // Получаем с сервера данные о свободных дорожках на конкретную неделю
            let response = await fetch(API.GET_INFO_URL + '?week=' + currentWeek, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            response = await response.json();

            dispatch(setData(response)); // Сохраняем полученные данные в глобальный state

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    data: null, // Свободные дорожки по дням неделям для каждого времени (7:15 -> ПН, ВТ, СР... -> 6, 5, 6...)
    currentWeek: 5, // Выбранная неделя
};

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        setCurrentWeek(state, action) {
            state.currentWeek = action.payload;
        },
    },
    extraReducers: {
    },
});

export const {setData, setCurrentWeek} = dataSlice.actions;

export default dataSlice.reducer;












