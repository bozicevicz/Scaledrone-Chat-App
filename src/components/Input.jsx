import React from 'react';
import { useState } from 'react';

export default function Input({ onSend }) {
  const [text, setText] = useState('');

  const handleChange = event => {
    const value = event.target.value;
    setText(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    text && onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={text} type="text" placeholder="Type Your Message..." />
      <button type="submit">Send</button>
    </form>
  );
}
