import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/population per country and year/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders wrapper', () => {
  const { getByTestId } = render(<App />);
  const wrapperElement = getByTestId('svgWrapper');
  expect(wrapperElement).toBeInTheDocument();
});

test('renders chart', async () => {
  const { getByTestId } = render(<App />);
  const chartElement = await getByTestId('svgChart');
  expect(chartElement).toBeInTheDocument();
});
