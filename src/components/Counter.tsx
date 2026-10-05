import { useState } from 'react';

type Props = { initial?: number; min?: number; max?: number };

export default function Counter({ initial = 0, min = 0, max = 10 }: Props) {
  const [count, setCount] = useState(initial);
  return (
    <div className="counter">
      <button onClick={() => setCount((c) => c - 1)} disabled={count <= min} aria-label="decrement">
        -
      </button>
      <output aria-label="count">{count}</output>
      <button onClick={() => setCount((c) => c + 1)} disabled={count >= max} aria-label="increment">
        +
      </button>
      <button onClick={() => setCount(initial)}>Reset</button>
    </div>
  );
}
