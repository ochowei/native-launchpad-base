import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { AlbumCard } from "@/components/AlbumCard";
import { TrackList } from "@/components/TrackList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  year: number;
  trackCount: number;
}

interface SearchPageProps {
  allTracks: Track[];
  allAlbums: Album[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
  onAlbumPlay: (albumId: string) => void;
  onToggleLike: (id: string) => void;
  likedTracks: Set<string>;
  likedAlbums: Set<string>;
}

export function SearchPage({
  allTracks,
  allAlbums,
  currentTrack,
  isPlaying,
  onTrackSelect,
  onAlbumPlay,
  onToggleLike,
  likedTracks,
  likedAlbums
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTracks = allTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.album.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredAlbums = allAlbums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <SearchBar onSearch={setSearchQuery} />
      
      {searchQuery ? (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">
            Search results for "{searchQuery}"
          </h2>
          
          <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tracks">
                Tracks ({filteredTracks.length})
              </TabsTrigger>
              <TabsTrigger value="albums">
                Albums ({filteredAlbums.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracks" className="mt-4">
              {filteredTracks.length > 0 ? (
                <TrackList
                  tracks={filteredTracks}
                  currentTrack={currentTrack}
                  isPlaying={isPlaying}
                  onTrackSelect={onTrackSelect}
                  onToggleLike={onToggleLike}
                  likedTracks={likedTracks}
                />
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No tracks found</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="albums" className="mt-4">
              {filteredAlbums.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredAlbums.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      onPlay={onAlbumPlay}
                      onToggleLike={onToggleLike}
                      isLiked={likedAlbums.has(album.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No albums found</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Browse</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {["Electronic", "Rock", "Hip-Hop", "Jazz", "Pop", "Classical"].map((genre) => (
              <Card key={genre} className="hover-scale cursor-pointer bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg">{genre}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}