import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  audioUrl: string;
}

interface MusicPlayerProps {
  currentTrack: Track | null;
  onNext: () => void;
  onPrevious: () => void;
  onToggleLike: (trackId: string) => void;
  likedTracks: Set<string>;
}

export function MusicPlayer({ currentTrack, onNext, onPrevious, onToggleLike, likedTracks }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', updateTime);
    
    return () => audio.removeEventListener('timeupdate', updateTime);
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-player-bg border-t border-border flex items-center justify-center">
        <p className="text-muted-foreground">Select a track to play</p>
      </div>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onEnded={onNext}
        onLoadedData={() => setCurrentTime(0)}
      />
      
      <Card className="fixed bottom-0 left-0 right-0 bg-player-surface/95 backdrop-blur-xl border-t border-border/50 p-4 animate-slide-up">
        <div className="flex items-center gap-4">
          {/* Album artwork and track info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative">
              <img
                src={currentTrack.artwork}
                alt={currentTrack.album}
                className="w-12 h-12 rounded-lg object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 rounded-lg animate-pulse-glow" />
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate">{currentTrack.title}</h3>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleLike(currentTrack.id)}
              className="shrink-0"
            >
              <Heart 
                className={`h-4 w-4 ${likedTracks.has(currentTrack.id) ? 'fill-accent text-accent' : ''}`} 
              />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={togglePlayPause}
              className="player-gradient hover-glow"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume control */}
          <div className="relative hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            
            {showVolumeSlider && (
              <div className="absolute bottom-full right-0 mb-2 p-2 bg-card rounded-lg shadow-lg">
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-20 h-2"
                />
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            value={[currentTime]}
            onValueChange={handleProgressChange}
            max={currentTrack.duration}
            step={1}
            className="flex-1"
          />
          <span className="w-10">{formatTime(currentTrack.duration)}</span>
        </div>
      </Card>
    </>
  );
}