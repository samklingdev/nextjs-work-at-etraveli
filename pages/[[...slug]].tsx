import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';

import MovieDetails from '../components/MovieDetails/MovieDetails';
import MovieTable from '../components/MovieTable/MovieTable';
import SearchBar from '../components/SearchBar/SearchBar';
import SortByMenu from '../components/SortByMenu/SortByMenu';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import { Movie, OMDBResponse, SwapiFilmResponse } from '../types';
import { normalizeRating, toRomanNumerals } from '../utils';

import slugify from 'slugify';
import { useRouter } from 'next/router';

interface IHomeProps {
	movies: Movie[];
}

export const sortFunctions = {
	episode: (a: Movie, b: Movie) => (a.episodeId > b.episodeId ? 1 : -1),
	releaseDate: (a: Movie, b: Movie) => (a.releaseDate > b.releaseDate ? 1 : -1),
	averageRating: (a: Movie, b: Movie) => ((a.averageRating ?? 0) < (b.averageRating ?? 0) ? 1 : -1),
};

type SortBy = keyof typeof sortFunctions;

const sortByOptions: { value: SortBy; content: string }[] = [
	{ value: 'episode', content: 'Episode' },
	{ value: 'releaseDate', content: 'Release Date' },
	{ value: 'averageRating', content: 'Average Rating' },
];

export function filterAndSortMovies(movies: Movie[], searchTerm: string, sortFn: (a: Movie, b: Movie) => number) {
	return movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase())).sort(sortFn);
}

export default function Home({ movies }: IHomeProps) {
	const router = useRouter();
	const [sortBy, setSortBy] = useState<SortBy>('episode');
	const [search, setSearch] = useState('');
	const slug = router.query.slug?.[0] ?? '';
	const selectedMovie = movies.find((movie) => movie.slug === slug);

	const sortFn = sortFunctions[sortBy];
	const filteredSortedMovies = useMemo(() => filterAndSortMovies(movies, search, sortFn), [movies, search, sortFn]);

	function handleSortChange(value: string) {
		if (sortFunctions.hasOwnProperty(value)) {
			setSortBy(value as SortBy);
		}
	}

	function handleSearchChange(searchTerm: string) {
		setSearch(searchTerm);
	}

	function handleSelectionChange(movie: Movie) {
		router.push(`/${movie.slug}`, undefined, { shallow: true });
	}

	return (
		<div className="flex flex-col w-full h-full">
			<Head>
				<title>Star Wars Movies</title>
				<meta name="description" content="Star Wars Movies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<header className="text-gray-100 bg-orange-600">
				<nav className="flex flex-row items-center max-w-4xl px-4 py-4 mx-auto xl:max-w-6xl lg:px-0 gap-x-2 md:gap-x-6">
					<SortByMenu options={sortByOptions} value={sortBy} onChange={handleSortChange} />
					<SearchBar onChange={handleSearchChange} />
					<ThemeToggle />
				</nav>
			</header>

			<main className="flex flex-col w-full max-w-4xl gap-4 mx-auto xl:max-w-6xl xl:h-full xl:flex-row">
				<div className="w-full overflow-x-auto border-b xl:border-b-0 xl:border-r xl:w-1/2 xl:h-full">
					<MovieTable movies={filteredSortedMovies} selectedMovie={selectedMovie} onSelectionchange={handleSelectionChange} />
				</div>
				<div className="w-full xl:w-1/2">{selectedMovie ? <MovieDetails movie={selectedMovie} /> : <div className="w-full py-20 text-center">No movie selected</div>}</div>
			</main>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async ({ req, res }) => {
	// This is not the right way of doing it!, https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#getserversideprops-or-api-routes
	// We should call the external API directly from getServerSiteProps, but since the swapi.dev external api was down, I'm using this workaround.

	// lets cache the response for 1 hour. No need to fetch the data every time when the only thing that changes is the ratings.
	res.setHeader('Cache-Control', 'public, s-maxage=3600');

	// real api call
	const swapiRes = await fetch(`https://swapi.dev/api/films`);
	const swapi: SwapiFilmResponse = await swapiRes.json();
	// const swapi: SwapiFilmResponse = require('./api/swapi.json');

	const omdb = await Promise.all(
		swapi.results.map(async (swapiMovie) => {
			const swapiMovieYear = new Date(swapiMovie.release_date).getFullYear();
			const res = await fetch(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${swapiMovie.title}&y=${swapiMovieYear}`);
			const omdb: OMDBResponse = await res.json();
			return omdb;
		})
	);

	// const omdb: OMDBResponse[] = require('./api/omdb.json');

	const combined = swapi.results.map((swapiMovie) => {
		const title = `Star Wars: Episode ${toRomanNumerals(swapiMovie.episode_id)} - ${swapiMovie.title}`;
		const omdbData = omdb.find((omdbMovie) => omdbMovie.Title === title);
		const averageRating = omdbData ? Math.round(omdbData.Ratings.reduce((prev, curr) => normalizeRating(curr.Value) + prev, 0) / omdbData.Ratings.length) : undefined;
		const ratings = omdbData ? omdbData.Ratings.map((r) => ({ source: r.Source, value: r.Value })) : undefined;
		const slug = slugify(title, { lower: true, strict: true });

		return {
			slug: slug,
			title: title,
			episodeId: swapiMovie.episode_id,
			director: swapiMovie.director,
			releaseDate: swapiMovie.release_date,
			averageRating: averageRating,
			ratings: ratings,
			boxOffice: omdbData?.BoxOffice,
			runtime: omdbData?.Runtime,
			openingCrawl: swapiMovie.opening_crawl,
			poster: omdbData?.Poster,
			genre: omdbData?.Genre,
		};
	});

	return { props: { movies: combined } };
};
