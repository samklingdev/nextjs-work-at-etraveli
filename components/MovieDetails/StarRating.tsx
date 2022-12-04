import { StarIcon } from '@heroicons/react/20/solid';

interface IStarRatingProps {
	rating: number;
	totalStars: number;
}

export default function StarRating({ rating, totalStars }: IStarRatingProps) {
	const filledStars = Math.round((rating / 100) * totalStars);
	const yellowStars = Array(filledStars).fill(1);
	const greyStars = Array(totalStars - filledStars).fill(0);
	const starArray = yellowStars.concat(greyStars);

	return (
		<div className="flex flex-row" title={`${rating}%`} data-testid="star-rating">
			{starArray.map((r, index) => (
				<StarIcon key={index} data-testid={`star-${r}`} className={`${r ? 'text-yellow-400' : 'text-gray-300'} w-6 h-6`} />
			))}
		</div>
	);
}
