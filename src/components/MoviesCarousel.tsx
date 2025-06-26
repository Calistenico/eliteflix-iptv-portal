
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const MoviesCarousel = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaApi, setEmblaApi] = useState<any>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Buscando filmes...');
        
        // Buscar várias páginas para ter pelo menos 40 filmes
        const requests = [1, 2, 3].map(page =>
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9049a1d821f51ef88e70e430d10298c5&language=pt-BR&page=${page}`)
            .then(response => response.json())
        );
        
        const responses = await Promise.all(requests);
        const allMovies = responses.flatMap(data => data.results || []);
        
        console.log('Filmes carregados:', allMovies.length);
        setMovies(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        setLoading(false);
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

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex space-x-4 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="w-32 h-48 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400">Erro ao carregar filmes</p>
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
            <CarouselItem key={`movie-${movie.id}`} className="pl-2 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-1/8">
              <div className="relative group cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', movie.poster_path);
                    e.currentTarget.src = 'https://via.placeholder.com/342x513/1a1a1a/ffffff?text=Sem+Imagem';
                  }}
                  onLoad={() => console.log('Imagem carregada:', movie.title)}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 rounded-b-lg">
                  <p className="text-white text-xs font-medium truncate">{movie.title}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MoviesCarousel;
