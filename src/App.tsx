import NavigationProvider from './providers/NavigationProvider';
import TimerProvider from './providers/TimerProvider';
import Navigation from './components/navigation/Navigation';
import ModeProvider from './providers/ModeProvider';
import SettingsProvider from './providers/SettingsProvider';
import DevProvider from './providers/DevProvider';

export default function App() {
  return (
    <div>
      <DevProvider>
        <NavigationProvider>
          <SettingsProvider>
            <ModeProvider>
              <TimerProvider>
                <Navigation />
              </TimerProvider>
            </ModeProvider>
          </SettingsProvider>
        </NavigationProvider>
      </DevProvider>
    </div>
  )
}