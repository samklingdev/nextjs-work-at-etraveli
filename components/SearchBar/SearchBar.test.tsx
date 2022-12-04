import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
	it('should render', () => {
		const mockOnChange = jest.fn();
		render(<SearchBar onChange={mockOnChange} />);
		expect(screen.getByRole('searchbox')).toBeVisible();
	});
	it('should be able to enter text into input', async () => {
		const mockOnChange = jest.fn();
		render(<SearchBar onChange={mockOnChange} />);
		const inputElement = screen.getByRole('searchbox');
		await userEvent.type(inputElement, 'Hi mom!');
		expect(inputElement).toHaveValue('Hi mom!');
	});
	it('should trigger onChange on input change', async () => {
		const mockOnChange = jest.fn();
		render(<SearchBar onChange={mockOnChange} />);
		const inputElement = screen.getByRole('searchbox');
		await userEvent.type(inputElement, 'hello');
		expect(mockOnChange).toHaveBeenCalledTimes(5);
		await userEvent.type(inputElement, 'there');
		expect(mockOnChange).toHaveBeenCalledTimes(10);
	});
});
