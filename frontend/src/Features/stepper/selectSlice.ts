/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SelectionState } from '../../types/type';
import sendChatGPTRequest, * as api from './api';
import { Array_selectors } from '../../types/type';

const steps_array: Array_selectors = [
  {
    question: 'Кому выбираем подарок?',
    answers: ['Мужчине', 'Женщине'],
    answers_to_api: ['man', 'woman'],
  },

  {
    question: 'Какого возраста этот человек?',
    answers: [''],
    answers_to_api: [''],
  },

  {
    question: 'Укажите хобби и интересы, применимые к этому человеку',
    answers: [
      'Спорт',
      'Компьютеры и техника',
      'Книги',
      'Уход за собой',
      'Искусство и рукоделие',
      'Музыка',
      'Фотография',
      'Кулинария',
      'Автолюбитель',
      'Развивающие игры',
      'Рыбалка',
    ],
    answers_to_api: [
      'sporty',
      'computer-geek',
      'book-lover',
      'self-care',
      'art',
      'music',
      'photo',
      'cooking',
      'have an auto',
      'games for brain',
      'fishing & camping',
    ],
  },
  {
    question: 'Тут детские хобби:',
    answers: [
      'Спорт',
      'Компьютеры и техника',
      'Книги',
      'Творчество',
      'Одежда',
      'Развивающие игры',
      'Рыбалка',
    ],
    answers_to_api: [
      'sporty',
      'computer-geek',
      'book-lover',
      'art',
      'clothes',
      'games for brain',
      'fishing & camping',
    ],
  },
  {
    question: 'На какой бюджет рассчитываете?',
    answers: [''],
    answers_to_api: [''],
  },
];

const initialState: SelectionState = {
  steps: steps_array,
  current_step: 0,
  selectedToApi: [],
  current_request: '',
  result: [],
  error: undefined,
};

export const sendRequestFetch = createAsyncThunk('request__send', () => {
  const request = api.getRequestFromStorage();
  return sendChatGPTRequest(request!);
});

const selectSlice = createSlice({
  name: 'selectors',
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
     state.current_step += action.payload + 1;
      window.localStorage.setItem('step', state.current_step.toString());
    },
    setRequest: (state, action: PayloadAction<string>) => {
      state.current_request += action.payload + '&';
      console.log(state.current_request);
      window.localStorage.setItem('request', state.current_request);
    },
    setSelect: (state, action: PayloadAction<number>) => {
      const check = state.steps[state.current_step].answers_to_api[action.payload];
      if (state.selectedToApi.includes(check)) {
        state.selectedToApi = state.selectedToApi.filter((el) => el !== check);
      } else {
        state.selectedToApi.push(check);
      }
      console.log(state.current_request);
    },
    setParse: (state) => {
      const addingToApi = state.selectedToApi.join('&') + '&';
      console.log(addingToApi, 'adding to api');
      state.current_request = state.current_request + addingToApi;
      console.log(state.current_request, 'current_request');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendRequestFetch.fulfilled, (state, action) => {
      console.log(action.payload);
      state.result = action.payload;
    });
  },
});

export const { setStep, setRequest, setSelect, setParse } = selectSlice.actions;
export default selectSlice.reducer;
