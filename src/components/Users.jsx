import React from 'react';

export default function Users({ users, me }) {
  return (
    <div className={`styles.members`}>
      <div className={`styles.membersCount`}>
        {users.length} user{users.length === 1 ? '' : 's'} online
      </div>
      <div className={`styles.membersList`}>{users.map(i => User(i, i.id === me.id))}</div>
    </div>
  );
}

function User({ id, userData }, isMe) {
  const { name, color } = userData;
  return (
    <div key={id} className={`styles.member`}>
      <div className={`styles.avatar`} style={{ backgroundColor: color }} />
      <div className={`styles.username`}>
        {name} {isMe ? ' (you)' : ''}
      </div>
    </div>
  );
}
