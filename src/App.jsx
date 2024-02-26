import InvestmentTable from './Components/Pages/InvestmentTable';
import Sidebar from './Components/Sidebar/Sidebar';
import { RouterProvider, Outlet, createBrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Wrapper from './Components/Pages/Wrapper';
import Leads from './Components/Pages/Leads';
import Login from './Components/Pages/Login';
import Investments from './Components/Pages/Investments';
import Partners from './Components/Pages/Partner';
import PartnerList from './Components/Pages/PartnerList';
import LeadList from './Components/Pages/LeadList';

function AppComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppComponent />,
    errorElement: '404',
    // TODO : 404 page
    children: [
      {
        path: '/',
        element: <Wrapper />,
        children: [
          // {
          //   path: '/',
          //   element: <Home />,
          // },
          {
            path: '/investments/',
            element: <InvestmentTable />,
          },
          {
            path: '/investment/add',
            element: <Investments />,
          },
          {
            path: '/investments/:id',
            element: <Investments />,
          },
          {
            path: '/partners/',
            element: <PartnerList />,
          },
          {
            path: '/partner/add',
            element: <Partners />,
          },
          {
            path: '/partners/:id',
            element: <Partners />,
          },
          {
            path: '/leads/',
            element: <LeadList />,
          },
          {
            path: '/leads/add',
            element: <Leads />,
          },
          {
            path: '/leads/:id',
            element: <Leads />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);

export default AppComponent;
