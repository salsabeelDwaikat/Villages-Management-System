import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat app header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Chat with Admins/i);
  expect(headerElement).toBeInTheDocument();
});