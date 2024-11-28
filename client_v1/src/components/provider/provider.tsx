import TanstackProvider from './tanstack-provider';
import { ThemeProvider } from './theme-provider';

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackProvider>{children}</TanstackProvider>
    </ThemeProvider>
  );
};

export default Provider;
