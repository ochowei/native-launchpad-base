import { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { AppLayout } from "@/components/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { SearchPage } from "@/pages/SearchPage";
import { MusicPlayer } from "@/components/MusicPlayer";
import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import album4 from "@/assets/album4.jpg";

// Sample data - in a real app, this would come from an API
const sampleTracks = [
  {
    id: "1",
    title: "Electric Dreams",
    artist: "Neon Pulse",
    album: "Synthwave Future",
    duration: 245,
    artwork: album1,
    audioUrl: "https://www.soundjay.com/misc/sounds/electronic.mp3"
  },
  {
    id: "2", 
    title: "Sunset Boulevard",
    artist: "The Wanderers",
    album: "Golden Hour",
    duration: 198,
    artwork: album2,
    audioUrl: "https://www.soundjay.com/misc/sounds/electronic.mp3"
  },
  {
    id: "3",
    title: "Urban Nights",
    artist: "Metro Beats",
    album: "City Lights",
    duration: 167,
    artwork: album3,
    audioUrl: "https://www.soundjay.com/misc/sounds/electronic.mp3"
  },
  {
    id: "4",
    title: "Midnight Jazz",
    artist: "Blue Note Collective",
    album: "After Hours",
    duration: 312,
    artwork: album4,
    audioUrl: "https://www.soundjay.com/misc/sounds/electronic.mp3"
  },
  {
    id: "5",
    title: "Digital Waves",
    artist: "Cyber Symphony",
    album: "Neural Networks",
    duration: 278,
    artwork: album1,
    audioUrl: "https://www.soundjay.com/misc/sounds/electronic.mp3"
  }
];

const sampleAlbums = [
  {
    id: "1",
    title: "Synthwave Future",
    artist: "Neon Pulse",
    artwork: album1,
    year: 2024,
    trackCount: 12
  },
  {
    id: "2",
    title: "Golden Hour", 
    artist: "The Wanderers",
    artwork: album2,
    year: 2023,
    trackCount: 10
  },
  {
    id: "3",
    title: "City Lights",
    artist: "Metro Beats", 
    artwork: album3,
    year: 2024,
    trackCount: 8
  },
  {
    id: "4",
    title: "After Hours",
    artist: "Blue Note Collective",
    artwork: album4,
    year: 2023,
    trackCount: 15
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentTrack, setCurrentTrack] = useState(sampleTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState(new Set(["1", "3"]));
  const [likedAlbums, setLikedAlbums] = useState(new Set(["1"]));

  const handleTrackSelect = (track: typeof sampleTracks[0]) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleNext = () => {
    const currentIndex = sampleTracks.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % sampleTracks.length;
    setCurrentTrack(sampleTracks[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = sampleTracks.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = currentIndex === 0 ? sampleTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(sampleTracks[prevIndex]);
  };

  const handleToggleLike = (id: string) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleAlbumPlay = (albumId: string) => {
    // Find first track from the album
    const albumTrack = sampleTracks.find(track => 
      sampleAlbums.find(album => album.id === albumId)?.title === track.album
    );
    if (albumTrack) {
      handleTrackSelect(albumTrack);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <TabsContent value="home" className="mt-0">
          <HomePage
            recentTracks={sampleTracks}
            featuredAlbums={sampleAlbums}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
            onAlbumPlay={handleAlbumPlay}
            onToggleLike={handleToggleLike}
            likedTracks={likedTracks}
            likedAlbums={likedAlbums}
          />
        </TabsContent>

        <TabsContent value="search" className="mt-0">
          <SearchPage
            allTracks={sampleTracks}
            allAlbums={sampleAlbums}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackSelect={handleTrackSelect}
            onAlbumPlay={handleAlbumPlay}
            onToggleLike={handleToggleLike}
            likedTracks={likedTracks}
            likedAlbums={likedAlbums}
          />
        </TabsContent>

        <TabsContent value="library" className="mt-0">
          <div className="p-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Your Library</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sampleAlbums.map((album) => (
                <div key={album.id} className="space-y-2">
                  <img
                    src={album.artwork}
                    alt={album.title}
                    className="w-full aspect-square rounded-lg object-cover hover-scale cursor-pointer"
                    onClick={() => handleAlbumPlay(album.id)}
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{album.title}</h3>
                    <p className="text-xs text-muted-foreground">{album.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-0">
          <div className="p-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Liked Songs</h2>
            {Array.from(likedTracks).length > 0 ? (
              <div className="space-y-2">
                {sampleTracks.filter(track => likedTracks.has(track.id)).map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-3 bg-card/50 rounded-lg hover:bg-card/80 cursor-pointer transition-colors"
                    onClick={() => handleTrackSelect(track)}
                  >
                    <img
                      src={track.artwork}
                      alt={track.album}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{track.title}</h4>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No liked songs yet</p>
                <p className="text-sm text-muted-foreground mt-2">Start liking songs to see them here</p>
              </div>
            )}
          </div>
        </TabsContent>
      </AppLayout>

      <MusicPlayer
        currentTrack={currentTrack}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onToggleLike={handleToggleLike}
        likedTracks={likedTracks}
      />
    </div>
  );
};

export default Index;
