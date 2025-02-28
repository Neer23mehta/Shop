import { render, screen } from '@testing-library/react';
import App from './App';
import New from './new';


test('renders learn react link', () => {
  render(<App />,<New />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
