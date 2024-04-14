import React from 'react';
import { CameraSource } from './CameraSource';
import { dispatch, useStore } from './store';
import { counterActions } from '../../shared/store/counter';
import { State } from '../../shared/store';

export function App() {
  const counter = useStore((x: State) => x.counter.value);
  const decrement = () => dispatch(counterActions.decremented());
  const increment = () => dispatch(counterActions.incremented());

  return (
    <div>
      <CameraSource />
      <button onClick={decrement}>decrement</button>
      {counter || 0}
      <button onClick={increment}>increment</button>
    </div>
  );
}
