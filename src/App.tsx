import NavigationProvider from './providers/NavigationProvider';
import TimerProvider from './providers/TimerProvider';
import Navigation from './components/navigation/Navigation';
import ModeProvider from './providers/ModeProvider';
import SettingsProvider from './providers/SettingsProvider';
import DevProvider from './providers/DevProvider';
import SessionProvider from './providers/SessionProvider';

export default function App() {
  return (
    <div>
      <DevProvider>
        <NavigationProvider>
          <SettingsProvider>
            <ModeProvider>
              <SessionProvider>
                <TimerProvider>
                  <Navigation />
                </TimerProvider>
              </SessionProvider>
            </ModeProvider>
          </SettingsProvider>
        </NavigationProvider>
      </DevProvider>
    </div>
  )
}