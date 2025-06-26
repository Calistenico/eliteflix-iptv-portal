
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Channel {
  name: string;
  url: string;
  thumbnail: string;
}

interface VideoPlayerProps {
  channel: Channel;
  onClose: () => void;
}

const VideoPlayer = ({ channel, onClose }: VideoPlayerProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Verificar se o IP já assistiu este canal
    const blockedChannels = JSON.parse(localStorage.getItem('blockedChannels') || '[]');
    if (blockedChannels.includes(channel.name)) {
      setIsBlocked(true);
      setShowMessage(true);
      return;
    }

    // Iniciar contador
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Tempo esgotado
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setShowMessage(true);
          
          // Bloquear canal para este IP
          const newBlockedChannels = [...blockedChannels, channel.name];
          localStorage.setItem('blockedChannels', JSON.stringify(newBlockedChannels));
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [channel.name]);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5544991082160?text=Olá! Gostaria de assinar um plano EliteFlix para assistir aos canais completos.', '_blank');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isBlocked && showMessage) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full bg-card border-border">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Canal Bloqueado
            </h3>
            <p className="text-gray-300 mb-6">
              Você já assistiu este canal. Assine um plano EliteFlix e assista esse e outros +850 canais, filmes e séries sem limite!
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                📱 Assinar via WhatsApp
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full">
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[70vh] bg-black rounded-lg"
            controls
            autoPlay
            playsInline
          >
            <source src={channel.url} type="application/x-mpegURL" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
          
          {/* Timer */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg">
            Tempo restante: {formatTime(timeLeft)}
          </div>
          
          {/* Close button */}
          <Button
            onClick={onClose}
            className="absolute top-4 left-4 bg-black/70 hover:bg-black/90"
            size="sm"
          >
            ✕ Fechar
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold text-white mb-2">{channel.name}</h3>
          <p className="text-gray-300">
            Gostando? Assine um plano e tenha acesso completo!
          </p>
        </div>
      </div>

      {/* Modal de tempo esgotado */}
      {showMessage && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <Card className="max-w-md w-full bg-card border-border">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-4">
                Tempo Esgotado!
              </h3>
              <p className="text-gray-300 mb-6">
                Assine um plano EliteFlix e assista esse e outros +850 canais, filmes e séries sem limite!
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  📱 Assinar via WhatsApp
                </Button>
                <Button 
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  Tentar Outro Canal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
