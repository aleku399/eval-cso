import { configure } from '@storybook/react';
import "../style/index.css";

const req = require.context('../src', true, /\.stories\.(ts|tsx|js|jsx)$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
