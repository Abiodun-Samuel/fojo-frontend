'use client';

import { useSidebar } from '@/context/SidebarContext';
import AppHeader from '@/layout/dashboard/AppHeader';
import AppSidebar from '@/layout/dashboard/AppSidebar';
import Backdrop from '@/layout/dashboard/Backdrop';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? 'ml-0'
    : isExpanded || isHovered
    ? 'lg:ml-[290px]'
    : 'lg:ml-[90px]';

  return (
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-6 mx-auto md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
