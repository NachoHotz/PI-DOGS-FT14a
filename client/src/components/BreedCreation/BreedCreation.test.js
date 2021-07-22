import React from 'react';
import { render } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import Create from './BreedCreation';
import store from '../../store/index';

const ReduxWrapper = ({ children }) => {
  <Provider store={store}>
    {children}
  </Provider>;
};

configure({ adapter: new Adapter() });

describe('<Create /> Mounted', () => {
  it('The form must have a label called "name"', () => {
    const { container } = render(<Create />,
      { wrapper: ReduxWrapper });
    const element = container.querySelector('label')[0];
    expect(element.inerHTML).toBe('name');
  });
});
