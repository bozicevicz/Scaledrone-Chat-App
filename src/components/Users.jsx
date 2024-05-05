import React from 'react';

export default function Users({ members, me }) {
  return (
    <div className={`users`}>
      <div>Number of users online: {members.length}</div>
      <div>{members.map(i => User(i, i.id === me.id))}</div>
    </div>
  );
}

function User({ id, clientData }, meOnline) {
  const { name } = clientData;
  return (
    <div key={id}>
      {meOnline ? 'ME → ' : ''}
      {name}
    </div>
  );
}
