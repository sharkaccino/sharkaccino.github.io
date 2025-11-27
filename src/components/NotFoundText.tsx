import { type Component } from "solid-js";
import { RandomStringinator } from "../util/randomString";

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

  const stringinator = new RandomStringinator(stringOpts);

  return (
    <span>{stringinator.getCurrentString()}</span>
  )
}

export default NotFoundText;