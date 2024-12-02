// "use client";

import * as React from "react";
import ProfileMenu from "@/components/navigation/ProfileMenu"; // Ensure the correct path to your ProfileMenu
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full h-16 bg-white-800 text-white flex justify-between items-center px-6">
          <div className="text-lg font-bold">
            {/* You can add a title or logo here if needed */}
          </div>
          <div>
            {/* Profile Menu */}
            <ProfileMenu />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
