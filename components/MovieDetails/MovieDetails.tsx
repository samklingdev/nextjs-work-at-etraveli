/* eslint-disable @next/next/no-img-element */
import type { Movie } from '../../types';
import StarRating from './StarRating';

interface IMovieDetailsProps {
	movie: Movie;
}

const TOTAL_STARS = 10;

export default function MovieDetails({ movie }: IMovieDetailsProps) {
	return (
		<article className="flex flex-col w-full gap-4 p-3">
			<header>
				<h1 className="text-2xl font-semibold">{movie.title}</h1>
			</header>
			<section className="flex flex-row items-start justify-start w-full gap-4">
				<img className="max-w-[50%] max-h-[20rem]" src={movie.poster || '/no-image.svg'} alt={`poster for ${movie.title}`} />
				<ul className="flex flex-col gap-2 text-sm sm:text-base sm:gap-4">
					<li>
						<strong className="block font-semibold">Released</strong>
						<p>{movie.releaseDate}</p>
					</li>
					<li>
						<strong className="block font-semibold">Runtime</strong>
						<p>{movie.runtime}</p>
					</li>
					<li>
						<strong className="block font-semibold">Genre</strong>
						<p>{movie.genre}</p>
					</li>
					<li>
						<strong className="block font-semibold">Director</strong>
						<p>{movie.director}</p>
					</li>
					<li>
						<strong className="block font-semibold">BoxOffice</strong>
						<p>{movie.boxOffice}</p>
					</li>
				</ul>
			</section>
			<p>{movie.openingCrawl}</p>
			{movie.averageRating && movie.ratings && movie.ratings.length > 0 && (
				<>
					<div className="flex flex-col gap-2 sm:flex-row">
						<p className="font-semibold">Average rating:</p>
						<StarRating rating={movie.averageRating} totalStars={TOTAL_STARS} />
					</div>
					<ul className="flex flex-col gap-2 text-sm sm:flex-row md:text-base w-fit">
						{movie.ratings?.map((rating) => (
							<li key={rating.source}>
								<div className="w-full p-2 text-blue-600 border border-blue-600 rounded-md sm:text-center dark:text-blue-400 dark:border-blue-400">
									{rating.source} {rating.value}
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</article>
	);
}
