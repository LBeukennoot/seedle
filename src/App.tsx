import Navigation from './navigation/Navigation';
import { SettingsProvider } from './context/Settings';
import { DebugProvider } from './context/Debug';
import { NavigationProvider } from './context/Navigation';
import { ModeProvider } from './context/Mode';
import { SessionProvider } from './context/Session';
import { TimerProvider } from './context/Timer';
import { PlantDataProvider } from './context/PlantData';
import { UserDataProvider } from './context/UserData/UserDataProvider';

export default function App() {
  return (
    <>
      <DebugProvider>
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
      </DebugProvider>
    </>
  );
}
