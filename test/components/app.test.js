import { renderComponent, expect } from '../test-helper';
import App from '../../src/components/app';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.have.class('home');
    expect(component.find('home').length).to.equal(0);
    expect(component).to.contain('Home route');
  });
});