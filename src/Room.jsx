import React, { useState } from 'react';
import Messages from './components/Messages';
import Input from './components/Input';

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

  const animal = animals[Math.floor(Math.random() * animals.length)];
  return animal;
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

export default function Room() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'This is a test message!',
      user: {
        id: '1',
        userData: {
          color: randomColor(),
          name: randomName(),
        },
      },
    },
  ]);
  const [me, setMe] = useState({
    name: randomName(),
    color: randomColor(),
  });

  function onSend(text) {
    const message = {
      text: text,
      user: me,
    };
    setMessages([...messages, message]);
  }

  return (
    <>
      <Messages messages={messages} me={me} />
      <Input onSend={onSend} />
    </>
  );
}
