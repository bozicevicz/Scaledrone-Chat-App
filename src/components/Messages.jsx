import React from 'react';
import { useEffect, useRef } from 'react';

function Message(i, me) {
  const { user, text, id } = i;
  const { color, name } = user.userData;
  const myMessage = user.id === me.id;
  const className = myMessage ? `` : ``;

  return (
    <li key={id} className={className}>
      <span className={`styles.avatar`}>
        <div className={`styles.messageContent`}>
          <div className={`styles.username`} style={{ backgroundColor: color }}>
            {color + name}
          </div>
          <div className={`styles.text`}>{text}</div>
        </div>
      </span>
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
