import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

/**
 * * This page prompts a newly signed-up user to select their role (Candidate or Recruiter).
 * It updates the user's role in Clerk's metadata and redirects them to the appropriate dashboard.
 * It also handles automatic redirection if the user already has a role assigned.
 */
const OnboardingPage = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  /**
   * Handles the selection of a user role.
   * * It updates the user's `unsafeMetadata` in Clerk and redirects them.
   */
  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } }) //update user metadata in clerk
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };
  /**
   * useEffect hook for immediate redirection if the user already has a role set.
   * * This prevents users from seeing the onboarding page after their initial setup.
   */
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        // Navigate to the job posting page for recruiters, or the jobs list for candidates
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  });
  // Display a loading spinner while the user data is being fetched by Clerk.
  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  // Main component rendering the role selection interface.
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold">I am a...</h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        {/* Button for selecting the 'Candidate' role */}
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>

        {/* Button for selecting the 'Recruiter' role */}
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
