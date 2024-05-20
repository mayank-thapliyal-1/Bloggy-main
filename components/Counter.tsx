import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { decrementCounter, incrementCounter } from "@/store/features/CountReducer";

const Counter = () => {
  const count = useAppSelector((state)=>state.count.counter);
  const dispach = useAppDispatch();

  return (
    <div className="p-10 bg-slate-300 w-fit mx-auto mt-20 rounded-xl shadow-md flex flex-col gap-10">
      <div className="text-lg mx-auto w-fit">Counter</div>
      <div className="flex gap-5 justify-between items-center">
        <button onClick={()=>dispach(decrementCounter())} className="px-10 py-5 active:bg-slate-200 text-lg bg-white shadow-md rounded-lg">-</button>
        <span className="px-10">{count}</span>
        <button onClick={()=>dispach(incrementCounter())} className="px-10 py-5 active:bg-slate-200 text-lg bg-white shadow-md rounded-lg">+</button>
      </div>
    </div>
  );
};

export default Counter;
