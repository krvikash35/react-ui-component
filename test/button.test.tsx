import React from 'react';
import * as ReactDOM from 'react-dom';
import { PrimaryButton } from '../stories/button.stories';

describe('Primary Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PrimaryButton />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
