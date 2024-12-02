import { ReactNode } from "react";

export default function BlankLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            height: "0px",
          }}
        >
          {/* Empty header */}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
