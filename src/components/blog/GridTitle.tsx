import { type Component, type JSX, onMount } from "solid-js";

const GridTitle: Component<{ children: JSX.Element }> = (props) => {
  let wrapper!: HTMLDivElement
  let h2!: HTMLHeadingElement

  const checkOverflow = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const h2Rect = h2.getBoundingClientRect();

      console.debug(
        h2Rect.height, 
        wrapperRect.height, 
        h2Rect.height > wrapperRect.height
      );

      if (h2Rect.height > wrapperRect.height) {
        wrapper.classList.add(`overflowing`);
      } else {
        wrapper.classList.remove(`overflowing`);
      }
    }

  onMount(() => {
    const observer = new ResizeObserver(checkOverflow);

    observer.observe(wrapper);
    observer.observe(h2);

    checkOverflow();
  });

  return (
    <div ref={wrapper} class="titleWrapper">
			<h2 ref={h2}>{props.children}</h2>
		</div>
  )
}

export default GridTitle;