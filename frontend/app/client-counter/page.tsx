'use client';

import './style.css'
import React from 'react'

export default function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <button className="btn" onClick={() => setCount(count + 1)}>
      Current value: {count}
    </button>
  );
}