import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

	// useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	function handleClick() {
		setTheme(theme === 'light' ? 'dark' : 'light');
	}

	if (!mounted) {
		return null;
	}
	return (
		<>
			<label htmlFor="theme-toggle" className="sr-only">
				Change between light and dark theme
			</label>
			<button onClick={handleClick} id="theme-toggle" className="flex items-center h-full px-2 py-2 text-gray-100" title={title}>
				{theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
			</button>
		</>
	);
}
