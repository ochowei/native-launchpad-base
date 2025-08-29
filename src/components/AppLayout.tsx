import { useState } from "react";
import { Home, Search, Library, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppLayout({ children, activeTab, onTabChange }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background pb-[180px]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg player-gradient flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">♫</span>
            </div>
            <h1 className="text-lg font-bold">TuneFlow</h1>
          </div>
          
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          {children}
          
          {/* Bottom Navigation */}
          <div className="fixed bottom-[80px] left-0 right-0 z-30">
            <Card className="mx-4 mb-2 bg-card/80 backdrop-blur-xl border-border/50">
              <TabsList className="grid w-full grid-cols-4 bg-transparent p-2">
                <TabsTrigger
                  value="home"
                  className="flex flex-col gap-1 py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Home className="h-4 w-4" />
                  <span className="text-xs">Home</span>
                </TabsTrigger>
                
                <TabsTrigger
                  value="search"
                  className="flex flex-col gap-1 py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Search className="h-4 w-4" />
                  <span className="text-xs">Search</span>
                </TabsTrigger>
                
                <TabsTrigger
                  value="library"
                  className="flex flex-col gap-1 py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Library className="h-4 w-4" />
                  <span className="text-xs">Library</span>
                </TabsTrigger>
                
                <TabsTrigger
                  value="liked"
                  className="flex flex-col gap-1 py-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">Liked</span>
                </TabsTrigger>
              </TabsList>
            </Card>
          </div>
        </Tabs>
      </main>
    </div>
  );
}