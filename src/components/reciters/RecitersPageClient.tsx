import React, { useState, useEffect, useCallback } from 'react';
import type { Reciter } from '../../Iib/types'; // Adjust path as necessary
import ReciterSearchBar from './ReciterSearchBar';
import ViewToggle from './ViewToggle';
import InfiniteScrollReciters from './InfiniteScrollReciters';

interface RecitersPageClientProps {
  allReciters: Reciter[];
}

const ITEMS_PER_LOAD = 20; // Define the number of items to load per step

const RecitersPageClient: React.FC<RecitersPageClientProps> = ({ allReciters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'grid' | 'list'>('grid');
  const [displayedReciters, setDisplayedReciters] = useState<Reciter[]>([]);
  const [nextIndex, setNextIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Filter reciters based on current criteria
  const filteredReciters = allReciters.filter(reciter => {
    const matchesSearch =
      reciter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reciter.arabicName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });
  useEffect(() => {
    setDisplayedReciters(filteredReciters.slice(0, ITEMS_PER_LOAD));
    setNextIndex(ITEMS_PER_LOAD);
    setHasMore(filteredReciters.length > ITEMS_PER_LOAD);
  }, [searchQuery, allReciters, filteredReciters.length]);

  const loadMoreReciters = useCallback(async () => {
    if (!hasMore) return;

    const nextBatch = filteredReciters.slice(nextIndex, nextIndex + ITEMS_PER_LOAD);

    setDisplayedReciters(prevReciters => [...prevReciters, ...nextBatch]);
    setNextIndex(prevIndex => prevIndex + nextBatch.length);

    if (nextIndex + nextBatch.length >= filteredReciters.length) {
      setHasMore(false);
    }
  }, [nextIndex, hasMore, filteredReciters]);

  const handleSearchQueryChange = useCallback((query: string) => setSearchQuery(query), []);

  const handleViewChange = (view: 'grid' | 'list') => {
    setCurrentView(view);  };

  const availableStyles = Array.from(new Set(allReciters.map(reciter => reciter.style).filter(Boolean))) as string[];
  const availableCountries = Array.from(new Set(allReciters.map(reciter => reciter.country).filter(Boolean))) as string[];
  const availableQualities = Array.from(new Set(allReciters.map(reciter => reciter.quality).filter(Boolean))) as string[];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Reciters</h1>
      <p className="text-lg text-muted-foreground mb-8">Explore a diverse catalog of reciters.</p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <ReciterSearchBar searchQuery={searchQuery} onSearchQueryChange={handleSearchQueryChange} reciters={allReciters} />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <ViewToggle currentView={currentView} onViewChange={handleViewChange} />
        </div>
      </div>

      <InfiniteScrollReciters reciters={displayedReciters} loadMore={loadMoreReciters} hasMore={hasMore} viewMode={currentView} />
    </div>
  );
};

export default RecitersPageClient;
