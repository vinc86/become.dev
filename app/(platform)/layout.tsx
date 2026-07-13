export default async function ModuleLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <section>{children}</section>
    </div>
  );
}
