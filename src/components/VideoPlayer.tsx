import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Channel {
  name: string;
  url: string;
  thumbnail: string;
  category?: string;
}

interface VideoPlayerProps {
  channel: Channel;
  onClose: () => void;
}

const VideoPlayer = ({ channel, onClose }: VideoPlayerProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isBlocked, setIsBlocked] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hlsRef = useRef<any>(null);

  useEffect(() => {
    // Verificar se o IP já assistiu este canal
    const blockedChannels = JSON.parse(localStorage.getItem('blockedChannels') || '[]');
    if (blockedChannels.includes(channel.name)) {
      setIsBlocked(true);
      setShowMessage(true);
      setIsLoading(false);
      return;
    }

    // Carregar o player
    loadVideo();

    // Iniciar contador apenas se não estiver bloqueado
    if (!isBlocked) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Tempo esgotado
            if (videoRef.current) {
              videoRef.current.pause();
            }
            if (hlsRef.current) {
              hlsRef.current.destroy();
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
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [channel.name, channel.url, isBlocked]);

  const loadVideo = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    
    try {
      console.log('Carregando canal:', channel.name, channel.url);
      
      // Verificar se é um stream HLS
      if (channel.url.includes('.m3u8')) {
        try {
          // Tentar carregar HLS.js
          const Hls = (await import('hls.js')).default;
          
          if (Hls.isSupported()) {
            console.log('Usando HLS.js para:', channel.name);
            const hls = new Hls({
              enableWorker: false,
              debug: false,
              maxBufferLength: 30,
              maxMaxBufferLength: 600,
              maxBufferSize: 60 * 1000 * 1000,
              maxBufferHole: 0.5,
              lowLatencyMode: true,
              backBufferLength: 90,
              manifestLoadingTimeOut: 10000,
              manifestLoadingMaxRetry: 4,
              manifestLoadingRetryDelay: 1000,
              levelLoadingTimeOut: 10000,
              levelLoadingMaxRetry: 4,
              levelLoadingRetryDelay: 1000,
              fragLoadingTimeOut: 20000,
              fragLoadingMaxRetry: 6,
              fragLoadingRetryDelay: 1000,
            });
            
            hlsRef.current = hls;
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log('Manifest carregado para:', channel.name);
              setIsLoading(false);
              setVideoError(false);
              video.play().catch(error => {
                console.log('Tentando reprodução sem áudio...');
                video.muted = true;
                video.play().catch(() => {
                  console.error('Erro na reprodução:', error);
                  setVideoError(true);
                  setIsLoading(false);
                });
              });
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error('Erro HLS:', data);
              if (data.fatal) {
                console.log('Erro fatal detectado');
                setVideoError(true);
                setIsLoading(false);
              }
            });
            
            hls.attachMedia(video);
            hls.loadSource(channel.url);
            
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            console.log('Usando HLS nativo para:', channel.name);
            video.src = channel.url;
            video.addEventListener('loadedmetadata', () => {
              setIsLoading(false);
              setVideoError(false);
            });
            video.addEventListener('error', () => {
              setVideoError(true);
              setIsLoading(false);
            });
          } else {
            console.error('HLS não suportado');
            setVideoError(true);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Erro ao carregar HLS.js:', error);
          setVideoError(true);
          setIsLoading(false);
        }
      } else {
        // Para outros tipos de vídeo
        video.src = channel.url;
        video.addEventListener('loadedmetadata', () => {
          setIsLoading(false);
          setVideoError(false);
        });
        video.addEventListener('error', () => {
          setVideoError(true);
          setIsLoading(false);
        });
      }
    } catch (error) {
      console.error('Erro geral:', error);
      setVideoError(true);
      setIsLoading(false);
    }
  };

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

  if (videoError) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <Card className="max-w-md w-full bg-card border-border">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              Erro ao Carregar Canal
            </h3>
            <p className="text-gray-300 mb-6">
              Não foi possível reproduzir este canal no momento. Tente outro canal ou assine um plano EliteFlix.
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
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg z-10">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Carregando canal...</p>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[70vh] bg-black rounded-lg"
            controls
            autoPlay
            playsInline
            muted
            crossOrigin="anonymous"
          />
          
          {!isLoading && (
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg">
              Tempo restante: {formatTime(timeLeft)}
            </div>
          )}
          
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
