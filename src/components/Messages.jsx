import React from 'react';
import { useEffect, useRef } from 'react';

export default function Messages({ messages, me }) {
  const latestRef = useRef(null);
  useEffect(() => {
    if (latestRef && latestRef.current) {
      latestRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return (
    <ul>
      {messages.map(i => Message(i, me))}
      <div ref={latestRef}></div>
    </ul>
  );
}

function Message({ user, data, id }, me) {
  const { name, color } = user.clientData;
  const myMessage = user.id === me.id;
}
