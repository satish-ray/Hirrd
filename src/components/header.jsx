import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

/**
 * Header component for the application's navigation bar.
 * * It displays the logo, authentication buttons (Login/UserButton), and conditional links (Post a Job).
 * It uses Clerk for authentication state management and routing hooks for navigation and sign-in handling.
 */
const Header = () => {
  // State to control the visibility of the Clerk SignIn component modal.
  const [showSignIn, setShowSignIn] = useState(false);

  // Hook to manage and access URL search parameters.
  const [search, setSearch] = useSearchParams();
  // Hook to get the current user object from Clerk.
  const { user } = useUser();

  /**
   * useEffect hook to check for a 'sign-in' search parameter in the URL.
   * If present, it automatically opens the sign-in modal.
   */
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    // Only close if the click occurred directly on the overlay (not the SignIn box itself)
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      // Clear the 'sign-in' parameter from the URL
      setSearch({});
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="py-4 flex justify-between items-center">
        {/* Logo Link (currently links to the root of the app) */}
        <Link>
          <img src="logo.png" alt="" className="h-20" />
        </Link>

        {/* Right-side action buttons */}
        <div className="flex gap-8">
          {/* Component displayed when the user is signed OUT */}
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>

          {/* Component displayed when the user is signed IN */}
          <SignedIn>
            {/* Conditional rendering for Recruiters: Show 'Post a Job' button */}
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" /> Post a Job
                </Button>
              </Link>
            )}
            {/* Clerk User Button (Avatar and Dropdown Menu) */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              {/* Custom Menu Items for the User Dropdown */}
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs" // Link for posted jobs (for recruiters) or applied jobs (for candidates)
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs" // Link for job seekers' saved jobs
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {/* Sign-In Modal Overlay */}
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          {/* Clerk SignIn Component */}
          <SignIn
            // Redirect users to the onboarding page after sign-up or fallback redirect
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
