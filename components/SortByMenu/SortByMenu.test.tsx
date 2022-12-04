import { fireEvent, render, screen } from '@testing-library/react';
import SortByMenu from './SortByMenu';
import '@testing-library/jest-dom';

const mockOnChange = jest.fn();

describe('SortByMenu', () => {
	const options = [
		{ value: 'episode', content: 'Episode' },
		{ value: 'releaseDate', content: 'Release Date' },
		{ value: 'averageRating', content: 'Average Rating' },
	];

	it('should render', () => {
		render(<SortByMenu options={options} value={'episode'} onChange={mockOnChange} />);
		expect(screen.getByRole('button', { name: /sort by/i })).toBeVisible();
	});
	it('should show options on click with current value selected', () => {
		render(<SortByMenu options={options} value={'episode'} onChange={mockOnChange} />);
		const button = screen.getByRole('button', { name: /sort by/i });
		fireEvent.click(button);

		const selectedOption = screen.getByRole('option', { name: /episode/i });
		const svg = selectedOption.querySelector('svg');
		expect(svg).toBeVisible();
	});
	it('should fire onChange if we click option', () => {
		render(<SortByMenu options={options} value={'episode'} onChange={mockOnChange} />);
		const button = screen.getByRole('button', { name: /sort by/i });
		fireEvent.click(button);

		const releaseDateOption = screen.getByText(/release date/i);
		fireEvent.click(releaseDateOption);
		expect(mockOnChange).toBeCalledTimes(1);
	});
});
