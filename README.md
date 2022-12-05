# Front-end assignment at Etraveli Group
https://github.com/kaybert/work.at.etraveli

## Installation

Clone repo
```bash
git clone https://github.com/samklingdev/nextjs-work-at-etraveli.git
```
Install dependencies
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Also hosted on vercel https://nextjs-work-at-etraveli.vercel.app/

## Notes

### Tech used
* [Next.js](https://nextjs.org/)
* [Tailwindcss](https://tailwindcss.com/)
    A utility-first CSS framework. Make dark/light mode really easy to implement, and makes me more productive as I can write css directly in the component.
* [HeadlessUI](https://headlessui.com/)
    For accessability reasons on SortByMenu, handles ARIA labels and keyboard shortcuts.
* [Heroicons](https://heroicons.com/)
    Icon library
* [next-themes](https://github.com/pacocoursey/next-themes)
    Handles dark/light theme switching in Next.js

### Design decisions
Mobile first!
Since no design for mobile were included I took the liberty to make some changes to make the information fit a mobile first approach.
* The poster images have an aspect ration of 2:3 and thus they become to high if we let them fill the entire width so instead I added some more information on the page so that I could have a smaller image on 50% of the page and fill the remaining space with this info.
* Stacking blocks for mobile view that turns into columns for large screens.
* In 2022 we do dark mode.
* saving selected movie in the URL so you can copy paste the url and go directly to the selected movie.

### API decisions
* I desided to let getServerSiteProps in next do all normalization and/or formating or the data from swapi and omdb so the components will be passed just the data they need in the correct format.

### Accessability
* Using alt-tags on images
* Semantic HTML
* Headlessui for handling aria labels and keyboard shortcuts for menu.
* Added sr-only or labels where it could be hard for visual impairments or learning disabilities to understand otherwise.
* MovieTable added keyboard shortcuts space and enter to select movie and setting aria-selected on select.

### Testing
Unit testing with jest, react testing library
e2e with playwright
In isolation, just e2e testing would probably have been enough.
