import { AlbumCard } from "@/components/AlbumCard";
import { TrackList } from "@/components/TrackList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import album4 from "@/assets/album4.jpg";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  audioUrl: string;
}

interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year: number;
  trackCount: number;
}

interface HomePageProps {
  recentTracks: Track[];
  featuredAlbums: Album[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onAlbumPlay: (albumId: string) => void;
  onToggleLike: (id: string) => void;
  likedTracks: Set<string>;
  likedAlbums: Set<string>;
}

export function HomePage({
  recentTracks,
  featuredAlbums,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onAlbumPlay,
  onToggleLike,
  likedTracks,
  likedAlbums
}: HomePageProps) {
  return (
    <div className="p-4 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="relative">
        <Card className="player-gradient-subtle border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Good evening!</h2>
            <p className="text-foreground/80">Ready to discover some great music?</p>
          </CardContent>
        </Card>
      </div>

      {/* Recently Played */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Recently Played</h3>
        <TrackList
          tracks={recentTracks.slice(0, 5)}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTrackSelect={onTrackSelect}
          onToggleLike={onToggleLike}
          likedTracks={likedTracks}
        />
      </section>

      {/* Featured Albums */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Featured Albums</h3>
        <ScrollArea className="w-full">
          <div className="flex gap-4 pb-4">
            {featuredAlbums.map((album) => (
              <div key={album.id} className="w-40 shrink-0">
                <AlbumCard
                  album={album}
                  onPlay={onAlbumPlay}
                  onToggleLike={onToggleLike}
                  isLiked={likedAlbums.has(album.id)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Made for You</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30 hover-scale">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-1">Discover Weekly</h4>
              <p className="text-sm text-muted-foreground">Fresh picks just for you</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/20 to-primary/20 border-accent/30 hover-scale">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-1">Liked Songs</h4>
              <p className="text-sm text-muted-foreground">{likedTracks.size} tracks</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}