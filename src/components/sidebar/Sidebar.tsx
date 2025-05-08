import React from 'react';
import { 
  Home, 
  BookOpen, 
  Headphones, 
  Library, 
  BookMarked, 
  Download, 
  ListMusic,
  History,
  Star,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const Sidebar = () => {
  const isAuthenticated = false; // Replace with actual auth state
  
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 border-r border-border bg-card hidden md:block z-30">
      <ScrollArea className="h-full py-4">
        <div className="px-4 space-y-6">
          {/* Main Navigation */}
          <nav className="space-y-1">
            <NavItem href="/" icon={<Home size={18} />} label="Home" />
            <NavItem href="/browse" icon={<BookOpen size={18} />} label="Browse Surahs" />
            <NavItem href="/reciters" icon={<Headphones size={18} />} label="Reciters" />
            <NavItem href="/library" icon={<Library size={18} />} label="My Library" />
          </nav>
          
          <Separator />
          
          {/* Library Section */}
          <div>
            <h3 className="font-medium text-sm text-muted-foreground mb-3">YOUR LIBRARY</h3>
            <nav className="space-y-1">
              <NavItem href="/library/bookmarks" icon={<BookMarked size={18} />} label="Bookmarks" />
              <NavItem href="/library/downloads" icon={<Download size={18} />} label="Downloads" />
              <NavItem href="/library/history" icon={<History size={18} />} label="History" />
              <NavItem href="/library/favorites" icon={<Star size={18} />} label="Favorites" />
            </nav>
          </div>
          
          <Separator />
          
          {/* Playlists Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm text-muted-foreground">PLAYLISTS</h3>
              <Button size="icon" variant="ghost" className="h-7 w-7">
                <PlusCircle size={16} />
              </Button>
            </div>
            
            {isAuthenticated ? (
              <nav className="space-y-1">
                <NavItem href="/playlists/1" icon={<ListMusic size={18} />} label="Morning Adhkar" />
                <NavItem href="/playlists/2" icon={<ListMusic size={18} />} label="Evening Surahs" />
                <NavItem href="/playlists/3" icon={<ListMusic size={18} />} label="Short Surahs" />
              </nav>
            ) : (
              <div className="bg-muted/30 rounded-lg p-4 text-center text-sm text-muted-foreground">
                <p>Sign in to create and save playlists</p>
                <Button asChild className="mt-2 w-full" size="sm">
                  <a href="/auth/signin">Sign in</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  icon, 
  label, 
  isActive = false 
}) => {
  // Check if current path matches href
  const isCurrent = typeof window !== 'undefined' 
    ? window.location.pathname === href
    : false;
    
  const active = isActive || isCurrent;
  
  return (
    <a 
      href={href} 
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active 
          ? 'bg-primary/10 text-primary' 
          : 'text-foreground hover:bg-secondary'
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </a>
  );
};

export default Sidebar;