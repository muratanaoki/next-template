interface HeaderProps {
  title?: string;
}

export function Header({ title = "Next.js App" }: HeaderProps) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
    </header>
  );
}