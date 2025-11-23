import { type Component } from "solid-js";

const NotFoundText: Component = () => {
  const stringOpts = [
    `"it ain't here"`,
    `"idk what ur looking for"`,
    `"i'll make it later, maybe"`,
    `"sorry i ate it :("`,
    `"did you try turning ur browser off and on again"`,
    `"aw dangit"`,
    `"oops"`,
    `"shoot"`,
    `"aaaand it's gone"`
  ];

  const getRandomString = (): string => {
    return stringOpts[Math.floor(Math.random() * stringOpts.length)];
  }

  return (
    <span>{getRandomString()}</span>
  )
}

export default NotFoundText;