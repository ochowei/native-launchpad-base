import { Play, Pause, Heart, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  audioUrl: string;
}

interface TrackListProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onToggleLike: (trackId: string) => void;
  likedTracks: Set<string>;
}

export function TrackList({ 
  tracks, 
  currentTrack, 
  isPlaying, 
  onTrackSelect, 
  onToggleLike, 
  likedTracks 
}: TrackListProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-card/50">
      <CardContent className="p-0">
        <div className="space-y-0">
          {tracks.map((track, index) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            
            return (
              <div
                key={track.id}
                className={`group flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                  isCurrentTrack ? 'bg-primary/10' : ''
                }`}
                onClick={() => onTrackSelect(track)}
              >
                {/* Track number / Play indicator */}
                <div className="w-8 flex items-center justify-center">
                  {isCurrentTrack && isPlaying ? (
                    <div className="w-4 h-4 flex items-center justify-center">
                      <div className="animate-pulse-glow">
                        <Pause className="h-3 w-3 text-primary" />
                      </div>
                    </div>
                  ) : isCurrentTrack ? (
                    <Play className="h-3 w-3 text-primary" />
                  ) : (
                    <span className="text-xs text-muted-foreground group-hover:hidden">
                      {index + 1}
                    </span>
                  )}
                  
                  {!isCurrentTrack && (
                    <Play className="h-3 w-3 text-muted-foreground hidden group-hover:block" />
                  )}
                </div>

                {/* Track artwork */}
                <img
                  src={track.artwork}
                  alt={track.album}
                  className="w-10 h-10 rounded object-cover"
                />

                {/* Track info */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate ${
                    isCurrentTrack ? 'text-primary' : ''
                  }`}>
                    {track.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {track.artist} • {track.album}
                  </p>
                </div>

                {/* Like button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(track.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      likedTracks.has(track.id) ? 'fill-accent text-accent' : ''
                    }`} 
                  />
                </Button>

                {/* Duration */}
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {formatTime(track.duration)}
                </span>

                {/* More options */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}