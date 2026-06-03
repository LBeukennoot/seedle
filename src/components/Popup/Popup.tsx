import { ScreenCard } from '../ScreenCard/ScreenCard';
import type { PopupProps } from './types';

export const Popup = ({ children }: PopupProps) => {
  return (
    <div className="absolute z-50 w-screen h-screen">
      <div className="relative">
        <div className="absolute w-screen h-screen bg-green opacity-50"></div>

        <div className="absolute w-screen h-screen flex items-center justify-center font-lexend text-dark-blue">
          <div className="bg-white mx-auto w-full max-w-xl rounded-[3.5rem] max-h-120 px-10 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
