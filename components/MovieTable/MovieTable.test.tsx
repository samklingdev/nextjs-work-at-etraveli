import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieTable from './MovieTable';
import '@testing-library/jest-dom';
import { Movie } from '../../types';

const movies = [
	{
		title: 'Star Wars: Episode IV - A New Hope',
		episodeId: 4,
		releaseDate: '1977-05-25',
		averageRating: 90,
	},
	{
		title: 'Star Wars: Episode V - The Empire Strikes Back',
		episodeId: 5,
		releaseDate: '1980-05-17',
		averageRating: 88,
	},
	{
		title: 'Star Wars: Episode VI - Return of the Jedi',
		episodeId: 6,
		releaseDate: '1983-05-25',
		averageRating: 75,
	},
] as Movie[];

describe('MovieTable', () => {
	it('should render', () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		expect(screen.getByRole('table')).toBeVisible();
	});
	it('should show no movies found message if we pass in no movies', () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={[]} onSelectionchange={mockOnSelectionChange} />);
		expect(screen.getAllByRole('row')).toHaveLength(2);
		expect(screen.getByText('No movies found')).toBeVisible();
	});
	it('should have 4 rows, header + 3 movie rows', () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		expect(screen.getAllByRole('row')).toHaveLength(4);
	});

	it('should show episode, title, avg rating and released', () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		const row = screen.getByRole('row', { name: /4 star wars: episode iv \- a new hope 90 1977\-05\-25/i });
		expect(row).toBeInTheDocument();
	});

	it('should visually show selected movie', () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		const rows = screen.getAllByRole('row');
		expect(rows[1]).toHaveClass('bg-neutral-100');
	});

	it('should change aria-select on click', async () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		const rows = screen.getAllByRole('row');
		await userEvent.click(rows[2]);
		expect(rows[2]).toHaveAttribute('aria-selected', 'true');
	});

	it('should trigger onSelectionChange on click', async () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		const rows = screen.getAllByRole('row');
		await userEvent.click(rows[2]);
		expect(mockOnSelectionChange).toHaveBeenCalledWith(movies[1]);
	});

	it('should focus rows with tab, shift+tab', async () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		const rows = screen.getAllByRole('row');
		rows[1].focus();
		await userEvent.tab();
		expect(rows[2]).toHaveFocus();
		await userEvent.tab({ shift: true });
		expect(rows[1]).toHaveFocus();
	});

	it('should fire onSelectionChange on space and enter', async () => {
		const mockOnSelectionChange = jest.fn();
		render(<MovieTable movies={movies} selectedMovie={movies[0]} onSelectionchange={mockOnSelectionChange} />);
		const rows = screen.getAllByRole('row');
		rows[1].focus();
		await userEvent.keyboard('{enter}');
		expect(mockOnSelectionChange).toHaveBeenCalledWith(movies[0]);
		await userEvent.tab();
		await userEvent.keyboard(' ');
		expect(mockOnSelectionChange).toHaveBeenCalledWith(movies[1]);
	});
});
