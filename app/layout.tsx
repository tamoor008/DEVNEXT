import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TechniFuse - Premium Development Agency",
  description: "We provide app development, website design, UI/UX, software solutions and cutting-edge tech services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Suppress Spline runtime errors before Next.js error overlay catches them
                const originalOnError = window.onerror;
                window.onerror = function(message, source, lineno, colno, error) {
                  if (
                    (typeof message === 'string' && 
                     (message.includes('position') || 
                      message.includes('Cannot read properties of undefined'))) &&
                    (source && (source.includes('spline') || source.includes('runtime.js')))
                  ) {
                    return true; // Suppress the error
                  }
                  if (originalOnError) {
                    return originalOnError(message, source, lineno, colno, error);
                  }
                  return false;
                };
                
                // Also catch unhandled errors
                window.addEventListener('error', function(e) {
                  if (
                    e.message && 
                    (e.message.includes('position') || 
                     e.message.includes('Cannot read properties of undefined')) &&
                    (e.filename && (e.filename.includes('spline') || e.filename.includes('runtime.js')))
                  ) {
                    e.preventDefault();
                    e.stopPropagation();
                    return true;
                  }
                }, true);
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

