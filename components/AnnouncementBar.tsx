import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-ink px-4 py-2 text-center text-xs font-medium text-white sm:text-sm"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2">
        <span>{CONTENT_CONFIG.header.announcement}</span>
      </div>
    </aside>
  );
}
