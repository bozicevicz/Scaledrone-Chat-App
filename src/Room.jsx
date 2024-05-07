import React, { useState, useRef, useEffect } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';
import Users from './components/Users';

function randomName() {
  const animals = [
    ' 🐷 Pig',
    ' 👹 Devil',
    ' 👻 Ghost',
    ' 👽 Alien',
    ' 😺 Cat',
    ' 🐵 Monkey',
    ' 🐶 Dog',
    ' 🐺 Wolf',
    ' 🦁 Lion',
    ' 🐯 Tiger',
    ' 🦊 Fox',
    ' 🦝 Racoon',
    ' 🐮 Cow',
    ' 🐭 Mouse',
    ' 🐹 Hamster',
    ' 🐰 Rabbit',
    ' 🐻 Bear',
    ' 🐨 Koala',
    ' 🐼 Panda',
    ' 🐸 Frog',
    ' 🦄 Unicorn',
    ' 🐔 Chicken',
    ' 🐲 Dragon',
  ];

  const moods = [
    'Happy',
    'Angry',
    'Sad',
    'Anxious',
    'Confident',
    'Peaceful',
    'Hopeful',
    'Jealous',
    'Excited',
    'Frustrated',
    'Nervous',
    'Calm',
    'Optimistic',
    'Content',
    'Irritated',
    'Worried',
    'Relaxed',
    'Joyful',
    'Surprised',
    'Mad',
    'Thankful',
  ];

  const animal = animals[Math.floor(Math.random() * animals.length)];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  return animal + '-is-' + mood;
}

function randomColor() {
  const colors = [
    `Aqua`,
    `Azure`,
    `Beige`,
    `Bisque`,
    `Blue`,
    `Brown`,
    `Chocolate`,
    `Coral`,
    `Crimson`,
    `Cyan`,
    `Fuchsia`,
    `Gold`,
    `Green`,
    `Indigo`,
    `Ivory`,
    `Khaki`,
    `Lavender`,
    `Lime`,
    `Linen`,
    `Magenta`,
    `Maroon`,
    `Moccasin`,
    `Navy`,
    `Olive`,
    `Orange`,
    `Orchid`,
    `Peru`,
    `Pink`,
    `Plum`,
    `Purple`,
    `Red`,
    `Salmon`,
    `Sienna`,
    `Tan`,
    `Teal`,
    `Thistle`,
    `Tomato`,
    `Turquoise`,
    `Violet`,
    `Wheat`,
    `Yellow`,
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

let drone = null;

export default function Room() {
  const [messages, setMessages] = useState([]);
  const [me, setMe] = useState({
    color: randomColor(),
    name: randomName(),
  });
  const [members, setMembers] = useState([]);

  const messagesRef = useRef();
  messagesRef.current = messages;
  const meRef = useRef();
  meRef.current = me;
  const membersRef = useRef();
  membersRef.current = members;

  function scaledroneConnect() {
    drone = new window.Scaledrone('YOUR_ID', {
      data: meRef.current,
    });

    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      meRef.current.id = drone.clientId;
      setMe(meRef.current);
    });

    const room = drone.subscribe('observable-room');

    room.on('message', message => {
      const { data } = message;
      if (typeof data === 'object') {
        const newMembers = [...membersRef.current];
        setMembers(newMembers);
      } else {
        setMessages([...messagesRef.current, message]);
      }
    });

    room.on('members', members => {
      setMembers(members);
    });

    room.on('member_join', member => {
      setMembers([...membersRef.current, member]);
    });

    room.on('member_leave', ({ id }) => {
      const index = membersRef.current.findIndex(i => i.id === id);
      const newUsers = [...membersRef.current];
      newUsers.splice(index, 1);
      setMembers(newUsers);
    });
  }

  useEffect(() => {
    if (drone === null) {
      scaledroneConnect();
    }
  }, []);

  function onSend(message) {
    drone.publish({
      room: 'observable-room',
      message: message,
    });
  }

  return (
    <>
      <Users members={members} me={me} />
      <Messages messages={messages} me={me} />
      <Input onSend={onSend} />
    </>
  );
}
