import "./App.css";
import AppLayout from "./layouts/AppLayout";
import LandingPage from "./pages/landing";
import OnboardingPage from "./pages/onboarding";
import JobListingPage from "./pages/job_listing";
import JobPage from "./pages/job";
import PostJobPage from "./pages/post_job";
import SavedJobsPage from "./pages/saved_jobs";
import MyJobPage from "./pages/my_jobs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    //All the routes will be nested here
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />,
      },
      {
        path: "/jobs", //All listed jobs
        element: <JobListingPage />,
      },
      {
        path: "/jobs/:id", //One particular job
        element: <JobPage />,
      },
      {
        path: "/post-job",
        element: <PostJobPage />,
      },
      {
        path: "/saved-jobs", //wishlisted jobs
        element: <SavedJobsPage />,
      },
      {
        path: "/my-jobs", //applied jobs
        element: <MyJobPage />,
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
