import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playout Window - Streaming Control Room",
  description: "1920x1080 Playout Window with Rive Animations",
};

export default function PlayoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* OBS Browser Source Optimizations */}
        <meta name="viewport" content="width=1920, height=1080, initial-scale=1" />
        
        {/* Prevent scrolling and selection in OBS */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              margin: 0;
              padding: 0;
              overflow: hidden;
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              cursor: none;
            }
            
            /* Disable context menu */
            * {
              -webkit-touch-callout: none;
              -webkit-user-select: none;
              -khtml-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
            }
            
            /* Hardware acceleration */
            canvas, img, video {
              transform: translateZ(0);
              -webkit-transform: translateZ(0);
              will-change: transform, opacity;
            }
            
            /* Anti-aliasing */
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              text-rendering: optimizeLegibility;
            }
          `
        }} />
      </head>
      <body className="bg-transparent">
        {children}
      </body>
    </html>
  );
}

