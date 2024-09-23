import "../styles/globals.scss";
import { Background } from "@/components/background/Background";
import ReduxProvider from "@/redux/redux-provider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex-auto h-screen w-screen">
          <ReduxProvider>{children}</ReduxProvider>
          <Background />
        </div>
      </body>
    </html>
  );
}
