
import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';

interface Channel {
  name: string;
  url: string;
  thumbnail: string;
  category: string;
}

const RandomChannelsCarousel = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomChannels();
  }, []);

  const fetchRandomChannels = async () => {
    try {
      setLoading(true);
      console.log('Buscando canais da lista M3U...');
      
      // Usando proxy CORS para buscar a lista M3U
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = encodeURIComponent('http://bkgpt.xyz/get.php?username=929035077&password=246113893&type=m3u_plus&output=mpegts');
      
      const response = await fetch(proxyUrl + targetUrl);
      const data = await response.json();
      const m3uContent = data.contents;
      
      console.log('Conteúdo M3U recebido');
      
      // Parse do conteúdo M3U
      const parsedChannels = parseM3U(m3uContent);
      
      // Filtrar apenas canais de filmes 24h e esportes
      const filteredChannels = parsedChannels.filter(channel => 
        channel.category.toLowerCase().includes('24h') ||
        channel.category.toLowerCase().includes('filme') ||
        channel.category.toLowerCase().includes('esporte') ||
        channel.category.toLowerCase().includes('sport')
      );
      
      // Selecionar 3 canais aleatórios
      const randomChannels = getRandomChannels(filteredChannels, 3);
      
      console.log('Canais selecionados:', randomChannels);
      setChannels(randomChannels);
      
    } catch (error) {
      console.error('Erro ao buscar canais:', error);
      // Fallback para canais estáticos
      setChannels([
        {
          name: "Cinema 24H",
          url: "http://sample-url-1.m3u8",
          thumbnail: "https://images.unsplash.com/photo-1489599736821-b8b6c2e3e9da?w=400&h=300&fit=crop",
          category: "Filmes 24H"
        },
        {
          name: "Esportes HD",
          url: "http://sample-url-2.m3u8", 
          thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
          category: "Esportes"
        },
        {
          name: "Filmes Ação",
          url: "http://sample-url-3.m3u8",
          thumbnail: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=300&fit=crop",
          category: "Filmes 24H"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const parseM3U = (content: string): Channel[] => {
    const lines = content.split('\n');
    const channels: Channel[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('#EXTINF:')) {
        // Extrair informações do canal
        const nameMatch = line.match(/,(.+)$/);
        const groupMatch = line.match(/group-title="([^"]+)"/);
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        
        const name = nameMatch ? nameMatch[1].trim() : 'Canal Desconhecido';
        const category = groupMatch ? groupMatch[1] : 'Geral';
        const logo = logoMatch ? logoMatch[1] : `https://via.placeholder.com/400x300/1a1a1a/ffffff?text=${encodeURIComponent(name)}`;
        
        // Próxima linha deve ser a URL
        const nextLine = lines[i + 1]?.trim();
        if (nextLine && nextLine.startsWith('http')) {
          channels.push({
            name,
            url: nextLine,
            thumbnail: logo,
            category
          });
        }
      }
    }
    
    return channels;
  };

  const getRandomChannels = (allChannels: Channel[], count: number): Channel[] => {
    const shuffled = [...allChannels].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleChannelClick = (channel: Channel) => {
    console.log('Iniciando reprodução do canal:', channel.name);
    console.log('URL do canal:', channel.url);
    setSelectedChannel(channel);
  };

  const handleClosePlayer = () => {
    console.log('Fechando player');
    setSelectedChannel(null);
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Carregando Canais...
          </h3>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Experimente Nossos Canais
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Assista gratuitamente por 60 segundos e descubra a qualidade EliteFlix
        </p>
        <Button 
          onClick={fetchRandomChannels}
          className="mt-4 bg-primary hover:bg-primary/90"
        >
          🔄 Carregar Outros Canais
        </Button>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {channels.map((channel, index) => (
              <CarouselItem key={`channel-${index}-${channel.name}`} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                <Card 
                  className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer group" 
                  onClick={() => handleChannelClick(channel)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={channel.thumbnail}
                        alt={channel.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300/1a1a1a/ffffff?text=' + encodeURIComponent(channel.name);
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                        <Button className="bg-primary hover:bg-primary/90">
                          ▶ Assistir
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold text-lg">{channel.name}</h4>
                      <p className="text-gray-400 text-sm mb-1">{channel.category}</p>
                      <p className="text-gray-400 text-xs">Clique para assistir por 60 segundos</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>
      </div>

      {selectedChannel && (
        <VideoPlayer
          channel={selectedChannel}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default RandomChannelsCarousel;
