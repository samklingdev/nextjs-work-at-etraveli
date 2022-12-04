import { render, screen } from '@testing-library/react';
import MovieDetails from './MovieDetails';
import '@testing-library/jest-dom';

const movie = {
	slug: 'star-wars-episode-iv-a-new-hope',
	title: 'Star Wars: Episode IV - A New Hope',
	episodeId: 4,
	director: 'George Lucas',
	releaseDate: '1977-05-25',
	averageRating: 90,
	ratings: [
		{
			source: 'Internet Movie Database',
			value: '8.6/10',
		},
		{
			source: 'Rotten Tomatoes',
			value: '93%',
		},
		{
			source: 'Metacritic',
			value: '90/100',
		},
	],
	boxOffice: '$460,998,507',
	runtime: '121 min',
	openingCrawl:
		"It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
	poster: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_SX300.jpg',
	genre: 'Action, Adventure, Fantasy',
};

describe('MovieDetails', () => {
	it('should render title, img, rating', () => {
		render(<MovieDetails movie={movie} />);
		expect(screen.getByRole('heading')).toHaveTextContent(movie.title);
		expect(screen.getByRole('img')).toHaveAttribute('src', movie.poster);
		expect(screen.getByTestId('star-rating')).toBeInTheDocument();
		expect(screen.getAllByTestId('star-1')).toHaveLength(9);
		expect(screen.getAllByTestId('star-0')).toHaveLength(1);
		expect(screen.getByText(movie.ratings[0].value, { exact: false })).toBeInTheDocument();
		expect(screen.getByText(movie.ratings[1].value, { exact: false })).toBeInTheDocument();
		expect(screen.getByText(movie.ratings[2].value, { exact: false })).toBeInTheDocument();
	});
});
