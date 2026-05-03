import React from 'react';

export const Skeleton = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded-md ${className}`}
      role="status"
      aria-label="Loading..."
    >
      <div className="h-full w-full bg-gray-300 rounded" />
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200">
    <Skeleton className="h-48 w-full" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  </div>
);

export default Skeleton;
