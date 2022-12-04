import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface ISearchBarProps {
	onChange(s: string): void;
}

export default function SearchBar({ onChange }: ISearchBarProps) {
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange(e.target.value);
	}

	return (
		<div className="relative w-full text-gray-400 focus-within:text-gray-600">
			<div className="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
				<MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
			</div>
			<label htmlFor="search-field" className="sr-only">
				Type to filter...
			</label>
			<input
				autoComplete="off"
				id="search-field"
				className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 bg-white border-transparent rounded-md focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 "
				placeholder="Type to filter..."
				type="search"
				name="search"
				onChange={handleChange}
			/>
		</div>
	);
}
