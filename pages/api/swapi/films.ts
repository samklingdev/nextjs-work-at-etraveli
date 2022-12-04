// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { SwapiFilmResponse } from '../../../types';
import movies from '../movies.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<SwapiFilmResponse>) {
	res.status(200).json(movies);
}
