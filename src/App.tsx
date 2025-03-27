import NavigationProvider from './providers/NavigationProvider';
import TimerProvider from './providers/TimerProvider';
import Navigation from './components/navigation/Navigation';

export default function App() {
  return (
    <div>
      <NavigationProvider>
        <TimerProvider>
          <Navigation />
        </TimerProvider>
      </NavigationProvider>
    </div>
  )
}