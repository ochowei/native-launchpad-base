import { Play, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year: number;
  trackCount: number;
}

interface AlbumCardProps {
  album: Album;
  onPlay: (albumId: string) => void;
  onToggleLike: (albumId: string) => void;
  isLiked: boolean;
}

export function AlbumCard({ album, onPlay, onToggleLike, isLiked }: AlbumCardProps) {
  return (
    <Card className="group bg-card/50 hover:bg-card/80 transition-all duration-300 hover-scale hover-glow">
      <CardContent className="p-4">
        <div className="relative mb-3">
          <img
            src={album.artwork}
            alt={album.title}
            className="w-full aspect-square object-cover rounded-lg"
          />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center">
            <Button
              size="sm"
              className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 player-gradient glow-primary"
              onClick={() => onPlay(album.id)}
            >
              <Play className="h-4 w-4 ml-0.5" />
            </Button>
          </div>
          
          {/* Like button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 hover:bg-black/40"
            onClick={() => onToggleLike(album.id)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-accent text-accent' : 'text-white'}`} />
          </Button>
        </div>
        
        <div className="space-y-1">
          <h3 className="font-semibold text-sm truncate">{album.title}</h3>
          <p className="text-xs text-muted-foreground truncate">{album.artist}</p>
          <p className="text-xs text-muted-foreground">
            {album.year} • {album.trackCount} tracks
          </p>
        </div>
      </CardContent>
    </Card>
  );
}