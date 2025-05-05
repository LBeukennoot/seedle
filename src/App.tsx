import NavigationProvider from './providers/NavigationProvider';
import TimerProvider from './providers/TimerProvider';
import Navigation from './components/navigation/Navigation';
import ModeProvider from './providers/ModeProvider';
import SettingsProvider from './providers/SettingsProvider';

export default function App() {
  return (
    <div>
      <NavigationProvider>
        <SettingsProvider>
          <ModeProvider>
            <TimerProvider>
              <Navigation />
            </TimerProvider>
          </ModeProvider>
        </SettingsProvider>
      </NavigationProvider>
    </div>
  )
}