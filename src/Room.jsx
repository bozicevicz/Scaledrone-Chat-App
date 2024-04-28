import React, { useState, useRef } from 'react';
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
    `Black`,
    `Blue`,
    `Brown`,
    `Chocolate`,
    `Coral`,
    `Crimson`,
    `Cyan`,
    `Fuchsia`,
    `Gold`,
    `Gray`,
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
    `Silver`,
    `Snow`,
    `Tan`,
    `Teal`,
    `Thistle`,
    `Tomato`,
    `Turquoise`,
    `Violet`,
    `Wheat`,
    `White`,
    `Yellow`,
  ];

  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}

let drone = null;

export default function Room() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'This is a test message!',
      user: {
        id: '1',
        userData: {
          color: 'blue',
          name: 'bluemoon',
        },
      },
    },
  ]);

  const [me, setMe] = useState({
    userData: {
      color: randomColor(),
      name: randomName(),
    },
  });

  const [users, setUsers] = useState([
    {
      id: '1',
      userData: {
        color: 'blue',
        name: 'bluemoon',
      },
    },
  ]);

  const messagesRef = useRef();
  messagesRef.current = messages;
  const meRef = useRef();
  meRef.current = me;
  const usersRef = useRef();
  usersRef.current = users;

  function scaledroneConnect() {
    drone = new window.Scaledrone('YOUR-CHANNEL-ID', {
      data: meRef.current,
    });

    drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      meRef.current.id = drone.clientId;
      setMe(meRef.current);
    });
  }

  function onSend(text) {
    console.log(text);
    const message = {
      id: '3',
      text: text,
      user: me,
    };
    const newMessages = [...messages];
    newMessages.push(message);
    setMessages(newMessages);
    console.log(newMessages);
  }

  return (
    <>
      <Users users={users} me={me} />
      <Messages messages={messages} me={me} />
      <Input onSend={onSend} />
    </>
  );
}
