import { Movie } from '../../types';

interface IMovieDetailsProps {
	movies: Movie[];
	selectedMovie?: Movie;
	onSelectionchange: (movie: Movie) => void;
}

/** reset aria-selected to false for all siblingnodes and set aria-selected="true" to node */
export function setAriaSelected(node: Node) {
	if (node instanceof HTMLElement === false) {
		return;
	}
	const children = node.parentElement?.children;
	if (children) {
		const siblings = [...children].filter((child) => child !== node);
		siblings.forEach((sibling) => {
			(sibling as HTMLElement).ariaSelected = 'false';
		});
	}
	(node as HTMLElement).setAttribute('aria-selected', 'true');
}

export default function MovieTable({ movies, selectedMovie, onSelectionchange }: IMovieDetailsProps) {
	function handleKeyDown(event: React.KeyboardEvent<HTMLTableRowElement>, movie: Movie) {
		switch (event.key) {
			case ' ':
			case 'Enter':
				handleSelectionChange(event, movie);
				break;

			// Removed this. Its great to be able to arrow through the list, but it also makes it not possible to scroll the page with arrow keys.
			// Without preventdefault, selecting AND scrolling with arrow keys was even worse :)
			// Tabbing through the list and leaving arrow keys for scrolling is a better experience.

			// case 'ArrowUp':
			// 	event.preventDefault();
			// 	const prevRow = event.currentTarget.previousElementSibling;
			// 	if (prevRow instanceof HTMLElement) {
			// 		prevRow.focus();
			// 	}
			// 	break;
			// case 'ArrowDown':
			// 	event.preventDefault();
			// 	const nextRow = event.currentTarget.nextElementSibling;
			// 	if (nextRow instanceof HTMLElement) {
			// 		nextRow.focus();
			// 	}
			// 	break;
		}
	}

	function handleSelectionChange(event: React.MouseEvent<HTMLTableRowElement> | React.KeyboardEvent<HTMLTableRowElement>, movie: Movie) {
		setAriaSelected(event.currentTarget);
		onSelectionchange(movie);
	}

	return (
		<table className="w-full">
			<thead>
				<tr>
					<th scope="col" className="px-3 py-4 text-sm font-semibold text-left" aria-label="Episode" title="Episode">
						EP
					</th>
					<th scope="col" className="px-3 py-4 text-sm font-semibold text-left">
						Title
					</th>
					<th scope="col" className="px-3 py-4 text-sm font-semibold text-left">
						Avg. rating
					</th>
					<th scope="col" className="px-3 py-4 text-sm font-semibold text-left">
						Released
					</th>
				</tr>
			</thead>
			<tbody className="">
				{movies.length === 0 && (
					<tr className="border-y">
						<td className="px-3 py-4 text-sm whitespace-nowrap"></td>
						<td className="px-3 py-4 text-sm whitespace-nowrap">No movies found</td>
						<td className="px-3 py-4 text-sm whitespace-nowrap"></td>
						<td className="px-3 py-4 text-sm whitespace-nowrap"></td>
					</tr>
				)}
				{movies.map((movie) => (
					<tr
						tabIndex={0}
						key={movie.title}
						onKeyDown={(e) => handleKeyDown(e, movie)}
						onClick={(e) => handleSelectionChange(e, movie)}
						className={`${selectedMovie?.title === movie.title ? 'font-semibold bg-neutral-100 dark:bg-neutral-800' : ''} cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 border-y`}
					>
						<td className="px-3 py-4 text-sm whitespace-nowrap">{movie.episodeId}</td>
						<td className="px-3 py-4 text-sm whitespace-nowrap">{movie.title}</td>
						<td className="px-3 py-4 text-sm whitespace-nowrap">{movie.averageRating}</td>
						<td className="px-3 py-4 text-sm whitespace-nowrap">{movie.releaseDate}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
