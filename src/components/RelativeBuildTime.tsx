import { type Component, createSignal } from "solid-js";

interface UnitList {
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
  [key: string]: number
}

const RelativeBuildTime: Component<{ buildTime: Date }> = (props) => {
  const [buildDateRelative, setBuildDateRelative] = createSignal(``);

  const units: UnitList = {
    year: 1000 * 60 * 60 * 24 * 365,
    month: (1000 * 60 * 60 * 24 * 365) / 12,
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000
  }

  const rtf = new Intl.RelativeTimeFormat(`en`, { numeric: `auto` });

  const updateRelativeDate = () => {
    const now = new Date();

    const elapsed = props.buildTime.getTime() - now.getTime();

    let selectedUnit = `second`;

    for (const unit in units) {
      if (Math.abs(elapsed) > units[unit]) {
        selectedUnit = unit;
        break;
      }
    }

    const formatted = rtf.format(
      Math.round(elapsed/units[selectedUnit]), 
      selectedUnit as Intl.RelativeTimeFormatUnit
    );

    setBuildDateRelative(formatted);
  }

  updateRelativeDate();

  setInterval(() => {
    updateRelativeDate();
  }, 1000);

  return (
    <span>({buildDateRelative()})</span>
  )
}

export default RelativeBuildTime;