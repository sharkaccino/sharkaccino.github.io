import { type Component } from "solid-js";

const NotFoundText: Component = () => {
  const stringOpts = [
    `"it ain't here"`,
    `"idk what you're looking for"`,
    `"i'll make it later, maybe"`,
    `"drake, where's the webpage?"`,
    `"sorry i was hungry and i ate it :("`,
    `"did you try turning ur browser off and on again"`,
    `"maybe if you hit refresh 700,000 times it'll work again"`,
    `"aw dangit"`,
    `"oops"`,
    `*SMASHES KEYBOARD*`
  ];

  const getRandomString = (): string => {
    return stringOpts[Math.floor(Math.random() * stringOpts.length)];
  }

  return (
    <span>{getRandomString()}</span>
  )
}

export default NotFoundText;