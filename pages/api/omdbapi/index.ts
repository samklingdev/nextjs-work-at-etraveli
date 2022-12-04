// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import omdb from '../omdb.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const t = req.query.t;
	const y = req.query.y;
	if (Array.isArray(t) || Array.isArray(y)) {
		res.status(400).json({ error: 'Invalid query' });
		return;
	}
	if (!t || !y) {
		res.status(400).json({ error: 'Missing required query parameters' });
		return;
	}
	// lets just return the first movie instead of an array of all matching movies.
	const movie = omdb.find((movie) => {
		const filterTitle = t ? movie.Title.toLowerCase().includes(t.toLowerCase()) : true;
		const filterYear = y ? movie.Year.toLowerCase() === y.toLowerCase() : true;
		return filterTitle && filterYear;
	});

	if (!movie) {
		res.status(404).json({ error: 'Movie not found' });
		return;
	}
	res.status(200).json(movie);
}
