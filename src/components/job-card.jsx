import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import useFetch from "../hooks/use-fetch";
import { deleteJob, saveJob } from "../api/apiJobs";
import { BarLoader } from "react-spinners";

/**
 * A Card component to display concise information about a single job listing.
 * It provides functionality to view details, and to save/unsave the job (if not `isMyJob`).
 */
const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  // State to track whether the job is currently saved by the user.
  const [saved, setSaved] = useState(savedInit);

  // useFetch hook for handling the API call to save or unsave the job.
  const {
    fn: fnSavedJobs,
    data: savedJob,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, { alreadySaved: saved });

  // Get the current authenticated user's details from Clerk.
  const { user } = useUser();

  /**
   * Handles the click event for saving/unsaving the job.
   * It executes the saveJob API function with the user and job IDs.
   */
  const handleSaveJob = async () => {
    // Only proceed if user is available
    if (!user) return;

    await fnSavedJobs({
      user_id: user.id,
      job_id: job.id,
    });
    // Execute callback to potentially refresh the parent list
    onJobSaved();
  };

  //delete posted job be recruiter
  const { loading: loadingDeleteJob, fn: fnDelelteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDelelteJob();
    onJobSaved();
  };
  /**
   * useEffect hook to update the `saved` state when the result of the saveJob API call changes.
   */
  useEffect(() => {
    // Check if `savedJob` has data to determine the new saved state
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {/* Conditional Delete Icon for 'My Jobs' view (Recruiter) */}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {/* Display Company Logo */}
          {job.company && (
            <img
              src={job.company.logo_url}
              className="h-6"
              alt={`${job.company.name} logo`}
            />
          )}
          {/* Display Job Location */}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
        <hr />
        {/* Display a truncated version of the job description (up to the first period) */}
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      <CardFooter className="flex gap-2">
        {/* Link to the Job Details Page */}
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {/* Save Job Button (Hidden for 'My Jobs' view) */}
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJobs}
          >
            {/* Heart Icon: filled red if saved, outline if unsaved */}
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
