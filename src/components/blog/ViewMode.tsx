import { type Component } from "solid-js";
import { viewMode } from "../../state/blogPostListSharedData";
import SVGIcon from "../SVGIcon";
import style from "./ViewMode.module.scss";

const ViewMode: Component = () => {
  const [ getViewMode, setViewMode ] = viewMode;

  const updateValue = (ev: InputEvent) => {
    if (ev.target instanceof HTMLInputElement == false) return;
    const value = ev.target.value;
    console.debug(`new radio value`, value);
    setViewMode(value as (`grid`|`list`|`dash`));
  }

  return (
    <div class={style.viewModes}>
			<label>
				<SVGIcon src="/icons/layout-grid.svg" />
				<input 
          oninput={updateValue}
          type="radio" 
          name="viewMode"
          value="grid" 
          autocomplete="off"
          checked
        />
			</label>
			<label>
				<SVGIcon src="/icons/layout-list.svg" />
				<input 
          oninput={updateValue}
          type="radio" 
          name="viewMode" 
          value="list"
          autocomplete="off"
        />
			</label>
			<label>
				<SVGIcon src="/icons/layout-dashboard.svg" />
				<input 
          oninput={updateValue}
          type="radio" 
          name="viewMode" 
          value="dash"
          autocomplete="off"
        />
			</label>
		</div>
  )
}

export default ViewMode;