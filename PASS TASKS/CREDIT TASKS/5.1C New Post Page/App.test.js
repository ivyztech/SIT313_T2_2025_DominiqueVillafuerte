import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the PostPage', () => {
  render(<App />);
  const linkElement = screen.getByText(/New Post/i);
  expect(linkElement).toBeInTheDocument();
});