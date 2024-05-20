import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  counter: number;
}

const initialState: CounterState = {
  counter: 0,
};

export const CounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCounter: (state) => {
      state.counter++;
      console.log(state.counter)
    },
    decrementCounter: (state) => {
      state.counter--;
    },
  },
});

export const {incrementCounter, decrementCounter} = CounterSlice.actions;
export default CounterSlice.reducer;