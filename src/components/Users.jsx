import React from 'react';

export default function Users({ users, me }) {
  console.log(users.length);
  return (
    <div className={`styles.members`}>
      <div className={`styles.membersCount`}>Number of users online: {users.length}</div>
      <div className={`styles.membersList`}>{users.map(i => User(i, i.id === me.id))}</div>
    </div>
  );
}

function User({ id, userData }, meOnline) {
  const { name, color } = userData;
  return (
    <div key={id} className={`styles.member`}>
      <div className={`styles.avatar`} style={{ backgroundColor: color }} />
      <div className={`styles.username`}>
        {name} {meOnline ? ' me' : ''}
      </div>
    </div>
  );
}
