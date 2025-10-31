import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./application-card";
import { getMyJobs } from "../api/apiJobs";
import JobCard from "./job-card";

const PostedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnPostedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnPostedJobs();
  }, []);

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
     
    
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length ? (
            createdJobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobSaved={fnPostedJobs}
                  isMyJob
                />
              );
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      
    </div>
  );
};

export default PostedJobs;
