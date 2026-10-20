import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { PictureInPictureContextType, PictureInPictureProviderProps } from './types';
import { PictureInPictureContext } from './PictureInPictureContext';
import NoiseCanvas from '../../components/NoiseCanvas/NoiseCanvas';
import { TurbulenceFilter } from '../../components/TurbulenceFilter/TurbulenceFilter';

export const PictureInPictureProvider: React.FC<PictureInPictureProviderProps> = ({ children }) => {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const closePip = useCallback(() => {
    if (pipWindow) {
      pipWindow.close();
      setPipWindow(null);
    }
  }, [pipWindow]);

  const togglePip = useCallback(async () => {
    if (pipWindow) {
      closePip();
      return;
    }

    if (!('documentPictureInPicture' in window)) {
      alert('Document Picture-in-Picture API is not supported in this browser.');
      return;
    }

    try {
      const win = await (window as any).documentPictureInPicture.requestWindow({
        width: 500,
        height: 300
      });

      // Copy all stylesheets (crucial for Leaflet styles to carry over)
      Array.from(document.styleSheets).forEach((styleSheet) => {
        try {
          if (styleSheet.cssRules) {
            const newStyle = win.document.createElement('style');
            Array.from(styleSheet.cssRules).forEach((rule) => {
              newStyle.appendChild(win.document.createTextNode(rule.cssText));
            });
            win.document.head.appendChild(newStyle);
          }

          win.document.body.style.height = '100vh';
          win.document.body.style.width = '100vw';
          // win.document.body.style.filter = 'url(#edgeTexture)';
          // const filters = <><NoiseCanvas /> <TurbulenceFilter /></>
          // win.document.body.appendChild(filters)

          // win.document.body.classList.add('scene')
        } catch {
          if (styleSheet.href) {
            const link = win.document.createElement('link');
            link.rel = 'stylesheet';
            link.href = styleSheet.href;
            win.document.head.appendChild(link);
          }
        }
      });

      // // Copy the SVG filter definition from the main document
      // const svgFilter = document.querySelector('svg');
      // if (svgFilter) {
      //   const svgCopy = svgFilter.cloneNode(true) as SVGElement;
      //   win.document.body.appendChild(svgCopy);
      // }

      // const container = win.document.createElement('div');
      // container.className = 'app-container';
      // win.document.body.appendChild(container);

      // // Render the app structure with children inside the portal
      // createPortal(
      //   <>
      //     <TurbulenceFilter />
      //     <div style={{ filter: 'url(#edgeTexture)' }}>
      //       <NoiseCanvas />
      //       {container} {/* Render children inside the app-container */}
      //     </div>
      //   </>,
      //   container // Render everything inside the container
      // );

      // const container = win.document.createElement('div');
      // container.style.backgroundColor = '#000000'; // Or any solid color
      // container.className = 'app-container';
      // win.document.body.appendChild(container);

      // const blendModeStyle = win.document.createElement('style');
      // blendModeStyle.textContent = `
      //   .mix-blend-soft-light {
      //     mix-blend-mode: soft-light !important;
      //   }
      // `;
      // win.document.head.appendChild(blendModeStyle);

//       const style = win.document.createElement('style');
//       style.textContent = `
//   html, body {
//     max-width: 600px !important;
//     max-height: 500px !important;
//     width: 100% !important;
//     height: 100% !important;
//     overflow: hidden !important;
//   }
// `;
//       win.document.head.appendChild(style);

      // Handle user closing the PiP window directly via the OS close button
      win.addEventListener('pagehide', () => {
        setPipWindow(null);
      });

      // win.addEventListener('resize', () => {
      //   if (win.innerWidth > 500) {
      //     win.resizeTo(500, win.innerHeight);
      //   }
      // });

      setPipWindow(win);
    } catch (err) {
      console.error('Failed to open Picture-in-Picture window:', err);
    }
  }, [pipWindow, closePip, children]);

  useEffect(() => {
    const handleExternalClose = () => {
      closePip();
    };

    window.addEventListener('close-pip', handleExternalClose);
    return () => {
      window.removeEventListener('close-pip', handleExternalClose);
    };
  }, [closePip]);

  const value: PictureInPictureContextType = {
    isPip: !!pipWindow,
    pipWindow,
    togglePip,
    closePip
  };

  return (
    <PictureInPictureContext.Provider value={value}>
      {pipWindow
        ? createPortal(
            <div className="w-screen h-screen overflow-hidden">
              <TurbulenceFilter />
              <div className="w-screen h-screen" style={{ filter: 'url(#edgeTexture)' }}>
                <NoiseCanvas />
                <div className="w-full h-full relative bg-linear-to-b from-[#A4BD6D] to-light-green flex justify-center items-center">
                  {children}
                </div>
              </div>
            </div>,
            pipWindow.document.body
          )
        : children}
    </PictureInPictureContext.Provider>
  );
};
