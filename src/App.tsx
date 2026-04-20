import Navigation from './navigation/Navigation';
import { UserDataProvider } from './context/UserData';
import { SettingsProvider } from './context/Settings';
import { DebugProvider } from './context/Debug';
import { NavigationProvider } from './context/Navigation';
import { ModeProvider } from './context/Mode';
import { SessionProvider } from './context/Session';
import { TimerProvider } from './context/Timer';

export default function App() {
  return (
    <div>
      <DebugProvider>
        <NavigationProvider>
          <SettingsProvider>
            <ModeProvider>
              <SessionProvider>
                <UserDataProvider>
                  <TimerProvider>
                    <Navigation />
                  </TimerProvider>
                </UserDataProvider>
              </SessionProvider>
            </ModeProvider>
          </SettingsProvider>
        </NavigationProvider>
      </DebugProvider>
    </div>
  )
}