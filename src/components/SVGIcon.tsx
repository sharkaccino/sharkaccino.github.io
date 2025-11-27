import { type Component } from "solid-js";
import style from "./SVGIcon.module.scss";

const SVGIcon: Component<{ src: string, class?: string, alt?: string }> = (props) => {
  const classList = [style.svg];

  if (props.class != null) {
    classList.push(props.class);
  }

  return (
    <div 
      aria-label={props.alt} 
      class={classList.join(` `)}
      style={`mask-image: url(${props.src})`}
    ></div>
  )
}

export default SVGIcon;