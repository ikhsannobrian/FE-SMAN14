import { createBrowserRouter, RouterProvider } from "react-router-dom";

// component
import HomeView from "./page/HomeView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./Layouts/PublicLayout";
import AdminLayout from "./Layouts/AdminLayout"; // ✅ Import AdminLayout
import DashboardView from "./page/DashboardView";
import LayananKonseling from "./page/LayananKonseling";
import FormJanjianKonseling from "./page/FormJkView";
import FormTA from "./page/FormTAView";
import FormNA from "./page/FormNAView";
import TabelJK from "./page/TabelJKView";
import TabelTA from "./page/TabelTAView";
import TabelNA from "./page/TabelNAView";
import FormKesiswaan from "./page/FormKesiswaanView";
import FormSertifikat from "./page/FormSertifikatView";
import TabelSertifikat from "./page/TabelSertifikatView";
import TabelPelanggaran from "./page/TabelPelanggaranView";
import CreateAkunAdmin from "./page/CreateAkunAdminView";
import FormUpdateJK from "./page/FormUpdateJK";
import FormUpdateTA from "./page/FormUpdateTA";
import FormUpdateNA from "./page/FormUpdateNA";
import FormUpdateSertifikat from "./page/FormUpdateSertifikat";
import FormUpdateKesiswaan from "./page/FormUpdateKesiswaan";
import UserList from "./components/UserList";
import FormUpdateASView from "./page/FormUpdateASView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/login-admin",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/layanan-konseling",
    element: <LayananKonseling />,
  },
  {
    path: "/form-jk",
    element: <FormJanjianKonseling />,
  },
  {
    path: "/form-ta",
    element: <FormTA />,
  },
  {
    path: "/form-na",
    element: <FormNA />,
  },
  {
    path: "/form-sertifikat",
    element: <FormSertifikat />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true, // ✅ Tambahkan ini untuk redirect default
        element: <DashboardView />,
      },
      {
        path: "dashboard",
        element: <DashboardView />,
      },
      {
        path: "tabeljk",
        element: <TabelJK />,
      },
      {
        path: "tabelta",
        element: <TabelTA />,
      },
      {
        path: "tabelna",
        element: <TabelNA />,
      },
      {
        path: "formkesiswaan",
        element: <FormKesiswaan />,
      },
      {
        path: "tabelsertifikat",
        element: <TabelSertifikat />,
      },
      {
        path: "tabelpelanggaran",
        element: <TabelPelanggaran />,
      },
      {
        path: "createadmin",
        element: <CreateAkunAdmin />,
      },
      {
        path: "updatejk/:id",
        element: <FormUpdateJK />,
      },
      {
        path: "updateta/:id",
        element: <FormUpdateTA />,
      },
      {
        path: "updatena/:id",
        element: <FormUpdateNA />,
      },
      {
        path: "updatesertifikat/:id",
        element: <FormUpdateSertifikat />,
      },
      {
        path: "updatekesiswaan/:id",
        element: <FormUpdateKesiswaan />,
      },
      {
        path: "userlist",
        element: <UserList />,
      },
      {
        path: "updateas/:id",
        element: <FormUpdateASView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
