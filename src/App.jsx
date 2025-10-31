import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OnboardingPage from "./pages/onboarding";
import LandingPage from "./pages/landing";
import AppLayout from "./layouts/AppLayout";
import JobPage from "./pages/job";
import PostJobPage from "./pages/post_job";
import SavedJobsPage from "./pages/saved_jobs";
import MyJobPage from "./pages/my_jobs";
import JobListingPage from "./pages/job_listing";
import { ThemeProvider } from "./theme-provider";
import ProtectedRoute from "./components/protected-routes";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    //all the routes that use the app layout
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnboardingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs", //All listed jobs
        element: (
          <ProtectedRoute>
            <JobListingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id", //Specific job details
        element: (
          <ProtectedRoute>
            <JobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJobPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJobsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJobPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
