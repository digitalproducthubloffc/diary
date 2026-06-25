"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import CommandPalette from "./search/CommandPalette";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider 
      attribute="data-theme" 
      defaultTheme="midnight" 
      enableSystem 
      themes={['dark', 'light', 'midnight', 'paper', 'forest', 'ocean', 'sepia', 'nord']}
    >
      <CommandPalette />
      {children}
    </ThemeProvider>
  );
}
