export default function CursosGratuitosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container py-8">
        {children}
      </div>
    </div>
  );
}
