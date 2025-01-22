import MainNavbar from '@/components/navbar/main-navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNavbar />
      {children}
    </>
  );
}
