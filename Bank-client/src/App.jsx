import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
