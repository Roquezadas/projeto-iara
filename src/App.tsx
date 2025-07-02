// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ExplorerPage } from './components/pages/ExplorerPage';
import { ARPage } from './components/pages/ARPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ExplorerPage />,
  },
  {
    path: '/ar/:locationId',
    element: <ARPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;