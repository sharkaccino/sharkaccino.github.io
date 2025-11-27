import { type Component } from "solid-js";
import { RandomStringinator } from "../util/randomString";

const FlavorText: Component = () => {
  const stringOpts = [
    `one of the websites of all time`,
    `windows? more like winBLOWS haha lol`,
    `rock005.mdl`,
    `my fumking fromsting`,
    `cabbage`,
    `HUH???`,
    `:3`,
    `severe thunderstorm warning`,
    `CLEARLY you don't own an airfryer`,
    `THEN WHO WAS PHONE?`,
    `\${flavorText}`,
    `drink some water`,
    `stay hydrated!`,
    `*yru'oe`,
    `nights at five freddies`,
    `five fredies at night`,
    `friday night fredies`,
    `fuck`,
    `don't care mate`,
    `no`,
    `ajdfhdklfghj`,
    `ow`,
    `ouch`,
    `omg hiii!!!!!!`,
    `buals`,
    `sharkaccino (real)`,
    `lead poisoning enthusiast`,
    `now with 50% more lead!`,
    `mmmmmmmmmmm`,
    `batteries not included`,
    `can i get uhhhhh`,
    `MAX_CALL_STACK_EXCEEDED`,
    `STATUS: eating chair foam`,
    `#1 tire rubber consumer`,
    `screen space ambient occlusion`,
    `3 dollars`,
    `ROCK AND STONE`,
    `new york times bestseller`,
    `OH GREAT HEAVENS`,
    `this will be graphics in 2013`,
    `OHH MY PKCELLS`,
    `trans rights are human rights`,
    `HAVE A FUNGUS`,
    `a dink hard donk`,
    `really large solvent`,
    `evil hay sludge`,
    `sentenced to 10 minutes of twitter`,
    `i to am in this episode`,
    `this vexes me`,
    `THE MONEY`,
    `baja blastrogen`,
    `real`,
    `free money (download now)`,
    `girl bye`,
    `wahoo!`,
    `extremely normal`,
    `financial crisis`,
    `LIVE SHARK REACTION:`,
    `uuhguahg? ? sjidj efu :(`,
    `lumbago`,
    `cave3.ogg`,
    `who cares`,
    `hold shark gentle like hamburger`,
    `sharg`,
    `shork`,
    `the sharp`,
    `jeff jeeff 21 bruh *vine thud sound effec`,
    `wAUGH`,
    `NEW OBJECTIVE: open vscode without crying`,
    `DON'T MIND IF I DO`,
    `nuh uh`,
    `blunder artist`,
    `girl with computer`, 
    `NO WAY`
  ];

  const stringinator = new RandomStringinator(stringOpts);

  return (
    <a 
      href="javascript:void(0)" 
      onclick={stringinator.refresh}
    >{stringinator.getCurrentString()}</a>
  )
}

export default FlavorText;