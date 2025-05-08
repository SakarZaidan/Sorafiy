import React, { useEffect, useState } from 'react';
import type { Reciter } from '../../Iib/types'; // Adjust the import path if needed
import ReciterCard from './ReciterCard'; // Assuming ReciterCard is in the same directory

interface InfiniteScrollRecitersProps {
  reciters: Reciter[];
  loadMore: () => Promise<void>;
  hasMore: boolean; // Add a prop to indicate if there are more items to load
  viewMode: 'grid' | 'list'; // Add the viewMode prop
}

const InfiniteScrollReciters: React.FC<InfiniteScrollRecitersProps> = ({
  reciters,
  loadMore,
  hasMore,
  viewMode,
}) => {
  const handleScroll = () => {
    const scrollThreshold = 300; // Load more when user is 300px from the bottom
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - scrollThreshold &&
      hasMore
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loadMore]); // Re-run effect if hasMore or loadMore changes

  // Determine the appropriate grid or list classes based on viewMode
  const containerClasses = viewMode === 'grid'
    ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
    : 'flex flex-col gap-4';


  return (
    <div className={containerClasses}>
      {reciters.map((reciter) => (
        <ReciterCard key={reciter.id} reciter={reciter} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default InfiniteScrollReciters;