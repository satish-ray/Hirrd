//candidate get their applied jobs but recuiter get their posted jobs
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import AppliedApplications from "../components/applied-applications";
import PostedJobs from "../components/posted-jobs";

const MyJobPage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="text-gray-300 font-extrabold text-5xl sm:text-7xl text-center pb-8">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "My Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <AppliedApplications />
      ) : (
        <PostedJobs />
      )}
    </div>
  );
};

export default MyJobPage;
