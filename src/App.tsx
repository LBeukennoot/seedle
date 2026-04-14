import NavigationProvider from './providers/NavigationProvider';
import TimerProvider from './providers/TimerProvider';
import Navigation from './navigation/Navigation';
import ModeProvider from './providers/ModeProvider';
import SettingsProvider from './providers/SettingsProvider';
import DevProvider from './providers/DevProvider';
import SessionProvider from './providers/SessionProvider';
import { UserDataProvider } from './context/UserData';

export default function App() {
  return (
    <div>
      <DevProvider>
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
      </DevProvider>
    </div>
  )
}