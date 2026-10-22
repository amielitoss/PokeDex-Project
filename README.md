# PokeGrid

PokeGrid is a responsive Pokédex web application built with React and TypeScript using the PokeAPI.

Users can browse Pokémon, search by name or ID, filter by generation and type, sort results, explore Pokémon details, view stats and evolution chains, and browse Pokémon moves, abilities, types, and items.

## Live Demo

[View PokeGrid Live](https://pokegrid.netlify.app)

## Features

- Browse Pokémon with pagination
- Search Pokémon by name or ID
- Filter Pokémon by generation
- Filter Pokémon by type
- Combine generation and type filters
- Sort Pokémon by Pokédex number or name
- Detailed Pokémon pages
- Pokémon base stats
- Pokémon abilities
- Pokémon types
- Weaknesses
- Resistances
- Immunities
- Evolution chains
- Pokémon cries
- Moves page
- Abilities page
- Types page
- Items page
- Reusable pagination
- Loading and error states
- Light and dark mode
- Responsive design
- Accessible controls and navigation
- SEO improvements
- Performance optimizations
- Netlify SPA routing support

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Axios
- CSS
- React Icons
- PokeAPI
- Netlify

## Project Structure

```text
src/
├── components/
│   ├── ErrorMessage.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Loading.tsx
│   ├── Navbar.tsx
│   ├── Pagination.tsx
│   ├── PokemonCard.tsx
│   ├── PokemonControls.tsx
│   ├── PokemonDetailsCard.tsx
│   └── PokemonDetailsInfo.tsx
│
├── hooks/
│   ├── usePokemonDetails.ts
│   └── usePokemonList.ts
│
├── pages/
│   ├── Ability.tsx
│   ├── Home.tsx
│   ├── Items.tsx
│   ├── Moves.tsx
│   ├── PokemonDetails.tsx
│   └── Types.tsx
│
├── services/
│   └── pokemonApi.ts
│
├── types/
│   └── pokemon.ts
│
├── utils/
│   └── sortPokemon.ts
│
├── App.tsx
└── main.tsx
```

## API

PokeGrid uses the [PokeAPI](https://pokeapi.co/) to retrieve data for:

- Pokémon
- Species
- Types
- Abilities
- Moves
- Items
- Evolution chains

## Getting Started

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project:

```bash
cd pokegrid
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Lighthouse

PokeGrid was tested with Lighthouse before deployment.

### Desktop

- Performance: 84
- Accessibility: 96
- Best Practices: 100
- SEO: 100

### Mobile

- Performance: 67
- Accessibility: 96
- Best Practices: 100
- SEO: 100

Performance improvements included:

- Smaller Pokémon grid images
- Lazy loading non-critical images
- Explicit image dimensions
- Prioritized Hero image loading
- Reduced oversized local image assets
- Production build testing

Accessibility improvements included:

- Accessible labels for filters and sorting controls
- Image alt text
- Keyboard-accessible buttons and links
- Improved color contrast
- Accessible external profile links

## Refactoring

During development, several parts of the application were refactored to improve maintainability and reduce duplication.

Reusable components were created for:

- Pagination
- Loading states
- Error messages
- Pokémon filters
- Pokémon detail sections

Custom hooks were introduced to separate API logic from UI components:

```text
usePokemonList
usePokemonDetails
```

Sorting logic was also extracted into a reusable utility.

This reduced the size of major page components significantly:

```text
Home.tsx
~350 lines → ~177 lines

PokemonDetails.tsx
~308 lines → ~84 lines
```

## Deployment

PokeGrid is deployed with Netlify.

A SPA redirect rule is included so React Router routes such as:

```text
/pokemon/25
/moves
/abilities
```

continue to work when opened or refreshed directly.


## Author

Created by **Carl Balita**

- LinkedIn: https://www.linkedin.com/in/carl-amiel-balita-470b562bb/
- GitHub: https://github.com/amielitoss

## Acknowledgements

Pokémon data is provided by [PokeAPI](https://pokeapi.co/).

Pokémon and Pokémon character names are trademarks of Nintendo, Game Freak, and The Pokémon Company.