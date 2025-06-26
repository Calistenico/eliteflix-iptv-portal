
import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoPlayer from './VideoPlayer';

interface Channel {
  name: string;
  url: string;
  thumbnail: string;
}

const ChannelsCarousel = () => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const channels: Channel[] = [
    {
      name: "DBZ-24H",
      url: "http://24hrs.homelinux.com:8080/24H-dragon.ball/tracks-v1a1/mono.m3u8",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      name: "Pluto Comédia",
      url: "http://177.155.199.154:8484/stream/plutotvfilmes/plutotvcomedymovies/master.m3u8?u=pirataofc&p=8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
      thumbnail: "https://images.unsplash.com/photo-1594736797933-d0d3dc2d5d4c?w=400&h=300&fit=crop"
    },
    {
      name: "Telecine Fun",
      url: "http://187.120.222.12:8000/play/TCFunLEG/index.m3u8",
      thumbnail: "https://images.unsplash.com/photo-1489599736821-b8b6c2e3e9da?w=400&h=300&fit=crop"
    },
    {
      name: "Mega Pix",
      url: "http://187.120.222.12:8000/play/MegapixLEG/index.m3u8",
      thumbnail: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=400&h=300&fit=crop"
    }
  ];

  const handleChannelClick = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  const handleClosePlayer = () => {
    setSelectedChannel(null);
  };

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Experimente Nossos Canais
        </h3>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Assista gratuitamente por 60 segundos e descubra a qualidade EliteFlix
        </p>
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
              <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                <Card className="bg-card border-border hover:border-primary transition-all duration-300 cursor-pointer" onClick={() => handleChannelClick(channel)}>
                  <CardContent className="p-0">
                    <div className="relative group">
                      <img
                        src={channel.thumbnail}
                        alt={channel.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg flex items-center justify-center">
                        <Button className="bg-primary hover:bg-primary/90">
                          ▶ Assistir
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold text-lg">{channel.name}</h4>
                      <p className="text-gray-400 text-sm">Clique para assistir</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
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

export default ChannelsCarousel;
