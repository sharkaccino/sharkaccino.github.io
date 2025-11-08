import { type JSXElement, type Component } from 'solid-js';

import './global.css';

const App: Component<{ children?: string|JSXElement }> = (props) => {
  return (
    <div class="contentWrapper">
      {props.children}
    </div>
  );
};

export default App;
