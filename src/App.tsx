// src/App.tsx
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { MainLayout } from './components/templates/MainLayout';
import { MapPage } from './components/pages/MapPage';
import { LocationsPage } from './components/pages/LocationsPage';
import { TrailsPage } from './components/pages/TrailsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { ARPage } from './components/pages/ARPage';
import { LocationDetailPage } from './components/pages/LocationDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/explore" replace /> },
      { path: 'explore', element: <MapPage /> },
      { path: 'locations', element: <LocationsPage /> },
      { path: 'location/:locationId', element: <LocationDetailPage /> },
      { path: 'trails', element: <TrailsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
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