import React from 'react';
import { useEffect, useRef } from 'react';

function Message({ member, data, id }, me) {
  const { username, color } = member.clientData;
  const myMessage = member.id === me.id;
  const className = myMessage ? `mine` : ``;

  return (
    <li key={id} style={{ backgroundColor: color }} className={className}>
      <div className={`poster`}>{username} :</div>
      <p className={`poster`}>{data}</p>
    </li>
  );
}

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
