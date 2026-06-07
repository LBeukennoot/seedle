import Navigation from './navigation/Navigation';
import { SettingsProvider } from './context/Settings';
import { DebugProvider } from './context/Debug';
import { NavigationProvider } from './context/Navigation';
import { ModeProvider } from './context/Mode';
import { SessionProvider } from './context/Session';
import { TimerProvider } from './context/Timer';
import { PlantDataProvider } from './context/PlantData';

export default function App() {
  return (
    <div>
      <DebugProvider>
        <NavigationProvider>
          <SettingsProvider>
            <ModeProvider>
              <SessionProvider>
                <PlantDataProvider>
                  <TimerProvider>
                    <Navigation />
                  </TimerProvider>
                </PlantDataProvider>
              </SessionProvider>
            </ModeProvider>
          </SettingsProvider>
        </NavigationProvider>
      </DebugProvider>
    </div>
  )
}