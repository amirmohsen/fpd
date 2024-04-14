import { createSlice } from '@reduxjs/toolkit';

export const { reducer: counterReducer, actions: counterActions } = createSlice(
  {
    name: 'counter',
    initialState: {
      value: 0,
    },
    reducers: {
      incremented: (state) => {
        state.value += 1;
      },
      decremented: (state) => {
        state.value -= 1;
      },
    },
  },
);

export type CounterActions =
  | ReturnType<typeof counterActions.incremented>
  | ReturnType<typeof counterActions.decremented>;
