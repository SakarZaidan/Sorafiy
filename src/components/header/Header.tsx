import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  Moon, 
  Sun, 
  BookOpen,
  LogIn 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import SorafiyLogo from './SorafiyLogo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/90 backdrop-blur-sm border-b border-border' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <a href="/" className="flex items-center space-x-2">
            <SorafiyLogo size={32} />
            <span className="font-bold text-xl hidden sm:inline-block">
              Sorafiy
            </span>
          </a>
        </div>

        {/* Search */}
        <div className="hidden md:flex relative max-w-md w-full mx-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            type="text" 
            placeholder="Search reciters, surahs..." 
            className="pl-10 bg-secondary/50 border-none focus-visible:ring-primary/20"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-foreground"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="text-foreground md:hidden"
            asChild
          >
            <a href="/search">
              <Search size={20} />
            </a>
          </Button>
  
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <User size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a href="/profile" className="flex items-center w-full">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/settings" className="flex items-center w-full">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" asChild className="hidden sm:flex">
              <a href="/auth/signin">
                <LogIn size={18} className="mr-2" />
                Sign in
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      <div 
        className={`md:hidden absolute w-full bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0 py-0 overflow-hidden'
        }`}
      >
        <nav className="container px-4">
          <ul className="space-y-3">
            <li>
              <a 
                href="/" 
                className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                onClick={toggleMobileMenu}
              >
                <span className="ml-2">Home</span>
              </a>
            </li>
            <li>
              <a 
                href="/browse" 
                className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                onClick={toggleMobileMenu}
              >
                <BookOpen size={18} className="mr-2" />
                <span>Browse Surahs</span>
              </a>
            </li>
            <li>
              <a 
                href="/library" 
                className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                onClick={toggleMobileMenu}
              >
                <span className="ml-2">My Library</span>
              </a>
            </li>
            {!isAuthenticated && (
              <li>
                <a 
                  href="/auth/signin" 
                  className="flex items-center p-2 rounded-md hover:bg-secondary transition-colors"
                  onClick={toggleMobileMenu}
                >
                  <LogIn size={18} className="mr-2" />
                  <span>Sign in</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;