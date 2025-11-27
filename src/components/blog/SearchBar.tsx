import { type Component, type JSX, onMount, Show } from "solid-js";
import { query } from "../../state/blogPostListSharedData";
import SVGIcon from "../SVGIcon";
import style from "./SearchBar.module.scss";

const SortMode: Component = () => {
  const [ getQuery, setQuery ] = query;

  const delay = 250;
  let timeout: NodeJS.Timeout;

  const updateValue = (ev: InputEvent) => {
    if (ev.target instanceof HTMLInputElement == false) return;
    const value = ev.target.value.trim();
    // console.debug(value);

    // artificial delay to reduce flashing
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setQuery(value);
    }, delay);
  }

  return (
    <div class={style.searchBar}>
			<input oninput={updateValue} type="search" placeholder="search" autocomplete="off"/>
			<SVGIcon src="/icons/search.svg" class={style.searchIcon}/>
		</div>
  )
}

export default SortMode;