"use client";

// Uncomment all the commented code to add a gear icon to the header (but the setOptions doesnt work currently)

import * as React from "react";
import ProfileMenu from "@/components/navigation/ProfileMenu"; // Ensure the correct path to your ProfileMenu
import "@/app/globals.css";
// import GearIcon from "@/components/chat/GearIcon";
import QuestionIcon from "@/components/chat/QuestionIcon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [options, setOptions] = React.useState({
  //   numIdeas: 10,
  //   modelType: "gpt-4o-mini",
  // });

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full h-16 bg-white-800 text-white flex justify-between items-center px-6">
          <div className="text-lg font-bold">
            {/* You can add a title or logo here if needed */}
          </div>
          {/* <div className="flex items-center justify-left w-full">
            <GearIcon setOptions={setOptions} options={options} />
          </div> */}
          <div className="flex items-center space-x-4">
            <QuestionIcon />
            <ProfileMenu />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}
