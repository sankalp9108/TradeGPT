import React from 'react';

export function SkeletonCard() {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-5">
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton mt-4 h-8 w-3/4 rounded" />
      <div className="skeleton mt-5 h-20 w-full rounded-2xl" />
      <div className="skeleton mt-4 h-9 w-28 rounded-xl" />
    </div>
  );
}
