export const metadata = {
  title: "IdeaGPT - Sign In",
  description: "Sign in page for IdeaGPT web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
