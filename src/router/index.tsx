import { Navigate, createBrowserRouter } from "react-router-dom";

import AppShell from "@/components/layout/AppShell";
import WorkflowsPage from "@/pages/WorkflowsPage";
import RunsPage from "@/pages/RunsPage";
import RunDetailPage from "@/pages/RunDetailPage";
import { ROUTES } from "@/lib/constants";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      {
        path: "/",
        element: <Navigate to={ROUTES.WORKFLOWS} replace />,
      },
      {
        path: ROUTES.WORKFLOWS,
        element: <WorkflowsPage />,
      },
      {
        path: ROUTES.RUNS,
        element: <RunsPage />,
      },
      {
        path: `${ROUTES.RUNS}/:id`,
        element: <RunDetailPage />,
      },
    ],
  },
]);