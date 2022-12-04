import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, BarsArrowDownIcon } from '@heroicons/react/20/solid';

interface ISortByMenuProps {
	options: { value: string; content: string }[];
	value: string;
	onChange: (s: string) => void;
}

export default function SortByMenu({ options, value, onChange }: ISortByMenuProps) {
	return (
		<Listbox value={value} onChange={onChange}>
			<div className="text-gray-700">
				<Listbox.Button className="relative w-full px-2 py-1.5 text-left text-gray-100 rounded-md md:text-gray-700 md:bg-white ">
					<span className="hidden md:block whitespace-nowrap">Sort by</span>
					<BarsArrowDownIcon className="w-6 h-6 md:hidden" title="Sort by" />
				</Listbox.Button>
				<Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
					<Listbox.Options className="absolute py-1 mt-1 text-base bg-white rounded-sm shadow-lg max-h-60 focus:outline-none ">
						<div className="py-2 pl-10 pr-4 border-b border-gray-200">Sort by</div>
						{options.map((option) => (
							<Listbox.Option key={option.value} className={({ active }) => `relative select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-300' : ''}`} value={option.value}>
								{({ selected }) => (
									<>
										<span className={`block ${selected ? 'font-medium' : 'font-normal'}`}>{option.content}</span>
										{selected ? (
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
												<CheckIcon className="w-5 h-5" aria-hidden="true" />
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
