import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-5">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-lime-300/30 border-t-lime-300" />
    </div>
  );
}
