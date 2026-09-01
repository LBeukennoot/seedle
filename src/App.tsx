import Navigation from './navigation/Navigation';
import { SettingsProvider } from './context/Settings';
import { DebugProvider } from './context/Debug';
import { NavigationProvider } from './context/Navigation';
import { ModeProvider } from './context/Mode';
import { SessionProvider } from './context/Session';
import { TimerProvider } from './context/Timer';
import { PlantDataProvider } from './context/PlantData';
import { UserDataProvider } from './context/UserData/UserDataProvider';
import { NotificationsProvider } from './context/Notifications/NavigationsProvider';
import NoiseCanvas from './components/NoiseCanvas/NoiseCanvas';

export default function App() {
  return (
    <>
      <div className='scene'>
      {/* <div className='scene'> */}
        {/* SVG Filter Definition Container */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <filter id="edgeTexture" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.3" /* Lower frequency creates larger visible ripples */
                numOctaves="6"
                seed="1"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="8" /* Increased so distortion is clearly visible */
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        <NoiseCanvas />

        <DebugProvider>
          <NotificationsProvider>
            <NavigationProvider>
              <SettingsProvider>
                <ModeProvider>
                  <SessionProvider>
                    <UserDataProvider>
                      <PlantDataProvider>
                        <TimerProvider>
                          <Navigation />
                        </TimerProvider>
                      </PlantDataProvider>
                    </UserDataProvider>
                  </SessionProvider>
                </ModeProvider>
              </SettingsProvider>
            </NavigationProvider>
          </NotificationsProvider>
        </DebugProvider>
      </div>
    </>
  );
}
