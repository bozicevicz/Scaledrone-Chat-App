import React from 'react';
import { useState } from 'react';

export default function Input({ onSend }) {
  const [text, setText] = useState('');

  function onChange(event) {
    const value = event.target.value;
    setText(value);
  }

  function onSubmit(event) {
    event.preventDefault();
    setText('');
    onSend(text);
  }

  return (
    <div className={`styles.input`}>
      <form onSubmit={e => onSubmit(e)}>
        <input onChange={e => onChange(e)} value={text} type="text" placeholder="Send Your Message..." />
        <button>Send</button>
      </form>
    </div>
  );
}
