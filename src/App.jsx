import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store';
import Rutas from './routes/Rutas';
import { InstitucionProvider } from './context/InstitucionContext';

function App() {

  return (
    <InstitucionProvider>
      <Provider store={store}>
        <ToastContainer />
        <Rutas />
      </Provider>
    </InstitucionProvider>
  )
}

export default App
