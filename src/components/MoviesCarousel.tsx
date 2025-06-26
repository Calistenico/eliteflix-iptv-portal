
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MoviesCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [emblaApi, setEmblaApi] = useState<any>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=9049a1d821f51ef88e70e430d10298c5&language=pt-BR&page=1`
        );
        const data = await response.json();
        
        // Buscar mais páginas para ter pelo menos 40 filmes
        const response2 = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=9049a1d821f51ef88e70e430d10298c5&language=pt-BR&page=2`
        );
        const data2 = await response2.json();
        
        setMovies([...data.results, ...data2.results]);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (emblaApi && movies.length > 0) {
      const autoScroll = () => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      };

      const interval = setInterval(autoScroll, 3000);
      return () => clearInterval(interval);
    }
  }, [emblaApi, movies]);

  if (movies.length === 0) {
    return (
      <div className="py-8">
        <div className="flex space-x-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-32 h-48 bg-gray-800 rounded-lg flex-shrink-0"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
          dragFree: true,
        }}
        setApi={setEmblaApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8">
              <div className="relative group cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/v/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
