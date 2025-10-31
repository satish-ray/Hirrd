import supabaseClient from "@/utils/supabase";
import { supabaseUrl } from "../utils/supabase";

/**
 * Handles the application process for a job, which includes uploading the resume 
 * to Supabase storage and then inserting the application record into the 'applications' table.
 */
export async function applyToJob(token, _, jobData) {
    // 1. Initialize the Supabase client with the provided token for RLS
    const supabase = await supabaseClient(token);

    // 2. Generate a unique file name for the resume to prevent collisions
    const random = Math.floor(Math.random() * 90000);
    // Construct the file name using a random number and the candidate's ID
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    // 3. Upload the resume file to the 'resumes' storage bucket
    const { error: storageError } = await supabase
        .storage("resumes")
        // The second argument `jobData.resume` is the file content.
        .upload(fileName, jobData.resume);

    // 4. Handle errors during the resume upload
    if (storageError) {
        console.error("Error uploading Resume", storageError); // The log message seems mismatched
        return null;
    }

    // 5. Construct the public URL for the uploaded resume
    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    // 6. Insert the application data (including the public resume URL) into the 'applications' table
    const { data, error } = await supabase.from("applications").insert([
        {
            // Spread all application data (like job_id, candidate_id, etc.)
            ...jobData,
            // Overwrite or add the 'resume' field with the public URL
            resume,
        }
    ])
        // Request the newly inserted record(s) back
        .select();

    // 7. Handle errors during the database insertion
    if (error) {
        console.error("Error Submitting Application:", error);
        return null;
    }
    // 8. Return the inserted application data
    return data;
}

export async function updateApplicationStatus(token, { job_id }, status) {
    const supabase = await supabaseClient(token);

    // 2. Query the 'applications' table to retrieve all columns ('*').
    //#####################
    const { data, error } = await supabase
        .from("applications").update({ status }).eq("job_id", job_id)
        .select();

    // 3. Handle any potential errors during the data fetching process.
    if (error || data.length === 0) {
        console.error("Error updating Application Status:", error);
        return null;
    }

    // 4. Return the successfully retrieved company data.
    return data;

}