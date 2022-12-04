import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';
import '@testing-library/jest-dom';

describe('StarRating', () => {
	it('should render and set correct title', () => {
		render(<StarRating rating={78} totalStars={10} />);
		const div = screen.getByTestId('star-rating');
		expect(div).toBeInTheDocument();
		expect(div.title).toBe('78%');
	});
	it('should render correct amount of filled vs empty stars', () => {
		render(<StarRating rating={38} totalStars={5} />);
		const filledStars = screen.getAllByTestId('star-1');
		const emptyStars = screen.getAllByTestId('star-0');
		expect(filledStars).toHaveLength(2);
		expect(emptyStars).toHaveLength(3);
	});
	it('should render correct amount of filled vs empty stars', () => {
		render(<StarRating rating={65} totalStars={10} />);
		const filledStars = screen.getAllByTestId('star-1');
		const emptyStars = screen.getAllByTestId('star-0');
		expect(filledStars).toHaveLength(7);
		expect(emptyStars).toHaveLength(3);
	});
});
