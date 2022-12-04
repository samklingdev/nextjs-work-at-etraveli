import { render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import '@testing-library/jest-dom';

describe('ThemeToggle', () => {
	it('should render', () => {
		render(<ThemeToggle />);
		expect(screen.getByRole('button', { name: /Change between light and dark theme/i })).toBeVisible();
	});
});
