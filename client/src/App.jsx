import { createBrowserRouter, RouterProvider } from "react-router-dom";

// component
import LoginView from "./page/auth/LoginView";
import FormRegister from "./page/auth/RegisterView";
import PublicLayout from "./Layouts/PublicLayout";
import AdminLayout from "./Layouts/AdminLayout"; //
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
import ProfileView from "./page/ProfileView";
import AdminList from "./page/AdminListView";
import StatusKonselingView from "./page/StatusKonselingView";
import FormUpdateAkunAdmin from "./page/FormUpdateAkunAdmin";
import ResetPassword from "./page/ResetPassword";
import ForgotPassword from "./page/ForgotPasswordView";
import ProtectedRoute from "./routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LoginView />,
      },
    ],
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/register",
    element: <FormRegister />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfileView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/statuskonseling",
    element: (
      <ProtectedRoute>
        <StatusKonselingView />
      </ProtectedRoute>
    ),
  },
  {
    path: "/layanan-konseling",
    element: (
      <ProtectedRoute>
        <LayananKonseling />
      </ProtectedRoute>
    ),
  },
  {
    path: "/form-jk",
    element: (
      <ProtectedRoute>
        <FormJanjianKonseling />
      </ProtectedRoute>
    ),
  },
  {
    path: "/form-ta",
    element: (
      <ProtectedRoute>
        <FormTA />
      </ProtectedRoute>
    ),
  },
  {
    path: "/form-na",
    element: (
      <ProtectedRoute>
        <FormNA />
      </ProtectedRoute>
    ),
  },
  {
    path: "/form-sertifikat",
    element: (
      <ProtectedRoute>
        <FormSertifikat />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
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
        path: "adminlist",
        element: <AdminList />,
      },
      {
        path: "updateas/:id",
        element: <FormUpdateASView />,
      },
      {
        path: "updateadmin/:id",
        element: <FormUpdateAkunAdmin />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
