import { render, screen } from '@testing-library/react';
import MovieDetail from './MovieDetail';
import { Film } from '../../types/movieTypes';

describe('MovieDetails Component', () => {
  const mockMovie: Film = {
    title: 'A New Hope',
    episode_id: 4,
    episode: 'Episode 4',
    id: 4,
    opening_crawl:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
    planets: ['https://swapi.dev/api/planets/1/'],
    starships: [
      'https://swapi.dev/api/starships/2/',
      'https://swapi.dev/api/starships/3/',
    ],
    vehicles: [
      'https://swapi.dev/api/vehicles/4/',
      'https://swapi.dev/api/vehicles/6/',
    ],
    species: [
      'https://swapi.dev/api/species/1/',
      'https://swapi.dev/api/species/2/',
    ],
    created: '2014-12-10T14:23:31.880000Z',
    edited: '2014-12-20T19:49:45.256000Z',
    url: 'https://swapi.dev/api/films/1/',
  };

  it('Should render title of the movie', () => {
    render(<MovieDetail movie={mockMovie} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  it('Should render director of the movie', () => {
    render(<MovieDetail movie={mockMovie} />);
    expect(
      screen.getByText(`Directed by: ${mockMovie.director}`)
    ).toBeInTheDocument();
  });

  it('Should not render anything if movie is null', () => {
    render(<MovieDetail movie={null} />);
    expect(screen.queryByText('A New Hope')).not.toBeInTheDocument();
  });
});
