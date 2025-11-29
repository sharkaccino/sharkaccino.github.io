import { type Component } from "solid-js";
import { query, searchState, searchDelayActive } from "../../state/blogBrowserStateManager";
import SVGIcon from "../SVGIcon";
import style from "./SearchBar.module.scss";

// TODO: ability to input search queries via url parameters (needed for tags)

const SortMode: Component = () => {
  const [ getSearchState, setSearchState ] = searchState;
  const [ getSearchDelayActive, setSearchDelayActive ] = searchDelayActive;
  const [ getQuery, setQuery ] = query;

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

  return (
    <div class={style.searchBar}>
			<input oninput={handleInput} type="search" placeholder="search" autocomplete="off"/>
			<SVGIcon src="/icons/search.svg" class={style.searchIcon}/>
		</div>
  )
}

export default SortMode;