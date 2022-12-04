import { test, expect } from '@playwright/test';

test('should show No movie selected if no slug', async ({ page }) => {
	await page.goto('/');
	const text = page.getByText('No movie selected');
	expect(text).toBeTruthy();
});

test('should show movie with slug', async ({ page }) => {
	await page.goto('/star-wars-episode-i-the-phantom-menace');
	await page.waitForSelector('text=Star Wars: Episode I - The Phantom Menace');
	const heading = page.getByRole('heading', { name: 'Star Wars: Episode I - The Phantom Menace' });
	expect(heading).toBeTruthy();
});

test('sort by episode should work', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Sort by' }).click();
	await page.getByRole('option', { name: 'Episode' }).click();

	const tableRows = page.getByRole('row');
	await expect(tableRows).toHaveCount(7);
	expect(await tableRows.nth(1).textContent()).toContain('Star Wars: Episode I - The Phantom Menace');
	expect(await tableRows.nth(6).textContent()).toContain('Star Wars: Episode VI - Return of the Jedi');
});

test('sort by Release Date should work', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Sort by' }).click();
	await page.getByRole('option', { name: 'Release Date' }).click();

	const tableRows = page.getByRole('row');
	await expect(tableRows).toHaveCount(7);
	expect(await tableRows.nth(1).textContent()).toContain('Star Wars: Episode IV - A New Hope');
	expect(await tableRows.nth(6).textContent()).toContain('Star Wars: Episode III - Revenge of the Sith');
});

test('sort by Rating should work', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: 'Sort by' }).click();
	await page.getByRole('option', { name: 'Average Rating' }).click();

	const tableRows = page.getByRole('row');
	await expect(tableRows).toHaveCount(7);
	expect(await tableRows.nth(1).textContent()).toContain('Star Wars: Episode IV - A New Hope');
	expect(await tableRows.nth(6).textContent()).toContain('Star Wars: Episode I - The Phantom Menace');
});

test('filter should work', async ({ page }) => {
	await page.goto('/');
	await page.getByPlaceholder('Type to filter...').fill('the');

	await expect(page.getByRole('row')).toHaveCount(6);

	await page.getByPlaceholder('Type to filter...').fill('new');
	await expect(page.getByRole('row')).toHaveCount(2);
});

test('should show no movies found if filtered search returns no movies.', async ({ page }) => {
	await page.goto('/');
	await page.getByPlaceholder('Type to filter...').fill('Giana Sisters Return');
	await expect(page.getByRole('row', { name: 'No movies found' })).toBeVisible();
});

test('should display movie details on selecting movie', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('cell', { name: 'Star Wars: Episode I - The Phantom Menace' }).click();

	expect(page.getByRole('heading', { name: 'Star Wars: Episode I - The Phantom Menace' })).toBeTruthy();
	expect(page.getByRole('img', { name: 'poster for Star Wars: Episode I - The Phantom Menace' })).toBeTruthy();
	expect(page.getByText('Internet Movie Database 6.5/10')).toBeTruthy();
	expect(page.getByText('Rotten Tomatoes 51%')).toBeTruthy();
	expect(page.getByText('Metacritic 51/100')).toBeTruthy();

	await expect(page.getByTestId('star-1')).toHaveCount(6);
	await expect(page.getByTestId('star-0')).toHaveCount(4);

	await page.getByRole('cell', { name: 'Star Wars: Episode V - The Empire Strikes Back' }).click();
	expect(page.getByRole('heading', { name: 'Star Wars: Episode V - The Empire Strikes Back' })).toBeTruthy();
	expect(page.getByRole('img', { name: 'poster for Star Wars: Episode V - The Empire Strikes Back' })).toBeTruthy();
	expect(page.getByText('Internet Movie Database 8.7/10')).toBeTruthy();
	expect(page.getByText('Rotten Tomatoes 94%')).toBeTruthy();
	expect(page.getByText('Metacritic 82/100')).toBeTruthy();

	await expect(page.getByTestId('star-1')).toHaveCount(9);
	await expect(page.getByTestId('star-0')).toHaveCount(1);
});
