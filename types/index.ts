export interface Movie {
	slug: string;
	title: string;
	episodeId: number;
	director: string;
	releaseDate: string;
	averageRating: number | null;
	ratings: Rating[] | null;
	boxOffice: string | null;
	runtime: string | null;
	openingCrawl: string;
	poster: string | null;
	genre: string | null;
}

interface Rating {
	source: string;
	value: string;
}

export interface SwapiFilmResponse {
	count: number;
	next?: any;
	previous?: any;
	results: SwapiFilm[];
}

interface SwapiFilm {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
	created: string;
	edited: string;
	url: string;
}

export interface OMDBResponse {
	Title: string;
	Year: string;
	Rated: string;
	Released: string;
	Runtime: string;
	Genre: string;
	Director: string;
	Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: OMDBRating[];
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

interface OMDBRating {
	Source: string;
	Value: string;
}
