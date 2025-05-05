import NavigationProvider from './providers/NavigationProvider';
import TimerProvider from './providers/TimerProvider';
import Navigation from './components/navigation/Navigation';
import ModeProvider from './providers/ModeProvider';

export default function App() {
  return (
    <div>
      <NavigationProvider>
        <ModeProvider>
          <TimerProvider>
            <Navigation />
          </TimerProvider>
        </ModeProvider>
      </NavigationProvider>
    </div>
  )
}