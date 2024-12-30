import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InstitucionProvider } from './context/InstitucionContext';
import { store } from './redux/store';
import Rutas from './routes/Rutas';

const client = new QueryClient()

function App() {

  return (
    <InstitucionProvider>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <ToastContainer />
          <Rutas />
        </QueryClientProvider>
      </Provider>
    </InstitucionProvider>
  )
}

export default App
