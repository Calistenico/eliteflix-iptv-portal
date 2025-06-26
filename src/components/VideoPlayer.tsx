
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
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('VideoPlayer iniciado para canal:', channel.name);
    
    // Verificar se o IP já assistiu este canal
    const blockedChannels = JSON.parse(localStorage.getItem('blockedChannels') || '[]');
    if (blockedChannels.includes(channel.name)) {
      console.log('Canal bloqueado:', channel.name);
      setIsBlocked(true);
      setShowMessage(true);
      setIsLoading(false);
      return;
    }

    // Timeout de 10 segundos para loading
    loadingTimeoutRef.current = setTimeout(() => {
      console.log('Timeout de loading atingido');
      setVideoError(true);
      setIsLoading(false);
    }, 10000);

    // Carregar o player
    loadVideo();

    // Iniciar contador apenas se não estiver bloqueado
    if (!isBlocked) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            console.log('Tempo esgotado para canal:', channel.name);
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
      console.log('Limpando VideoPlayer para canal:', channel.name);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
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
              manifestLoadingTimeOut: 8000,
              manifestLoadingMaxRetry: 2,
              manifestLoadingRetryDelay: 1000,
              levelLoadingTimeOut: 8000,
              levelLoadingMaxRetry: 2,
              levelLoadingRetryDelay: 1000,
              fragLoadingTimeOut: 15000,
              fragLoadingMaxRetry: 3,
              fragLoadingRetryDelay: 1000,
            });
            
            hlsRef.current = hls;
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log('Manifest carregado com sucesso para:', channel.name);
              if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
              }
              setIsLoading(false);
              setVideoError(false);
              
              // Tentar reproduzir
              video.play().catch(error => {
                console.log('Tentando reprodução sem áudio para:', channel.name);
                video.muted = true;
                video.play().catch(playError => {
                  console.error('Erro na reprodução:', playError);
                  setVideoError(true);
                  setIsLoading(false);
                });
              });
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error('Erro HLS para', channel.name, ':', data);
              if (data.fatal) {
                console.log('Erro fatal HLS detectado');
                setVideoError(true);
                setIsLoading(false);
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                }
              }
            });
            
            hls.attachMedia(video);
            hls.loadSource(channel.url);
            
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            console.log('Usando HLS nativo para:', channel.name);
            video.src = channel.url;
            
            const handleLoad = () => {
              console.log('Vídeo carregado com HLS nativo:', channel.name);
              if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
              }
              setIsLoading(false);
              setVideoError(false);
            };
            
            const handleError = () => {
              console.error('Erro no HLS nativo:', channel.name);
              setVideoError(true);
              setIsLoading(false);
              if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
              }
            };
            
            video.addEventListener('loadedmetadata', handleLoad);
            video.addEventListener('error', handleError);
          } else {
            console.error('HLS não suportado para:', channel.name);
            setVideoError(true);
            setIsLoading(false);
            if (loadingTimeoutRef.current) {
              clearTimeout(loadingTimeoutRef.current);
            }
          }
        } catch (error) {
          console.error('Erro ao carregar HLS.js:', error);
          setVideoError(true);
          setIsLoading(false);
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
          }
        }
      } else {
        console.log('Carregando vídeo não-HLS:', channel.name);
        // Para outros tipos de vídeo
        video.src = channel.url;
        
        const handleLoad = () => {
          console.log('Vídeo não-HLS carregado:', channel.name);
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
          }
          setIsLoading(false);
          setVideoError(false);
        };
        
        const handleError = () => {
          console.error('Erro no vídeo não-HLS:', channel.name);
          setVideoError(true);
          setIsLoading(false);
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
          }
        };
        
        video.addEventListener('loadedmetadata', handleLoad);
        video.addEventListener('error', handleError);
      }
    } catch (error) {
      console.error('Erro geral ao carregar vídeo:', error);
      setVideoError(true);
      setIsLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    }
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5544991082160?text=Olá! Gostaria de assinar um plano EliteFlix para assistir aos canais completos.', '_blank');
  };

  const handleClose = () => {
    console.log('Fechando player para canal:', channel.name);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isBlocked && showMessage) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
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
                onClick={handleClose}
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
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
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
                onClick={handleClose}
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
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4">
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
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg z-20">
              Tempo restante: {formatTime(timeLeft)}
            </div>
          )}
          
          <Button
            onClick={handleClose}
            className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white z-30"
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
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40">
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
                  onClick={handleClose}
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
