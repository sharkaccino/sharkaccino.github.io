import { type Component, type JSX, onMount, Show } from "solid-js";
import { sortMode } from "../../state/blogBrowserStateManager";
import SVGIcon from "../SVGIcon";
import style from "./SortMode.module.scss";

const SortMode: Component = () => {
  const [ getSortMode, setSortMode ] = sortMode;

  const updateValue = (ev: InputEvent) => {
    if (ev.target instanceof HTMLSelectElement == false) return;
    const value = ev.target.value;
    // console.debug(value);
    setSortMode(value as (`relevance`|`newFirst`|`oldFirst`));
  }

  return (
    <div class={style.sortMode}>
			<label>
				<span>sort by:</span>
				<select oninput={updateValue} autocomplete="off">
					<option value="relevance">relevance</option>
					<option value="newFirst">newest first</option>
					<option value="oldFirst">oldest first</option>
				</select>
        <SVGIcon src="/icons/chevron-down.svg" class={style.arrow}/>
			</label>
		</div>
  )
}

export default SortMode;