import { onMount, type Component } from "solid-js";
import { query, searchState, searchDelayActive } from "../../state/blogBrowserStateManager";
import SVGIcon from "../SVGIcon";
import style from "./SearchBar.module.scss";

// TODO: show suggestions when inputting keywords

// TODO: replace input with contentEditable element to allow for text highlighting
// this can be used to highlight invalid keywords

// references:
// https://stackoverflow.com/a/55950530
// https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/contenteditable

const SortMode: Component = () => {
  const [ getSearchState, setSearchState ] = searchState;
  const [ getSearchDelayActive, setSearchDelayActive ] = searchDelayActive;
  const [ getQuery, setQuery ] = query;

  let textbox!: HTMLInputElement;

  const delay = 333;
  let timeout: NodeJS.Timeout;

  const updateValue = (newValue: string) => {
    setQuery(newValue);
    setSearchDelayActive(false);
  }

  const handleInput = (ev: InputEvent) => {
    if (ev.target instanceof HTMLInputElement == false) return;
    const value = ev.target.value.trim();
    // console.debug(value);

    setSearchState(value.length > 0);

    setSearchDelayActive(true);

    clearTimeout(timeout);

    if (value.length > 0) {
      // artificial delay to reduce flashing
      timeout = setTimeout(() => {
        updateValue(value);
      }, delay);
    } else {
      // update instantly if textbox is empty
      updateValue(value);
    }
  }

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParams = urlParams.get(`search`);

    if (searchParams != null && searchParams.trim().length > 0) {
      textbox.value = searchParams;
      updateValue(searchParams);
      setSearchState(true);
    }
  });

  return (
    <div class={style.searchBar}>
			<input 
        ref={textbox} 
        oninput={handleInput} 
        type="search" 
        placeholder="search" 
        autocomplete="off"
      />
			<SVGIcon src="/icons/search.svg" class={style.searchIcon}/>
		</div>
  )
}

export default SortMode;