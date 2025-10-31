import supabaseClient from "@/utils/supabase";

//Fetch Jobs
export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, company: companies(name, logo_url),saved:saved_jobs(id)");

    if (location) {
        query = query.eq("location", location);
    }
    if (company_id) {
        query = query.eq("company_id", company_id);
    }
    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }
    const { data, error } = await query;
    if (error) {
        console.error("Error fetching Jobs", error);
        return null;
    }
    return data;

}
// -Add / Remove Saved Job
export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        // If the Job is already saved, delete it from saved_jobs
        const { data, error: deleteError } = await supabase
            .from("saved_jobs")
            .delete()
            .eq("job_id", saveData.job_id);

        if (deleteError) {
            console.error("Error Deleting Saved Jobs", deleteError);
            return null;
        }
        return data;
    }
    else {
        // If the Job is not saved, add it to saved_jobs
        const { data, error: insertError } = await supabase
            .from("saved_jobs")
            .insert([saveData])
            .select();

        if (insertError) {
            console.error("Error inserting Jobs", insertError);
            return null;
        }
        return data;
    }
}

//fetch single job

export async function getSingleJob(token, { job_id }) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("jobs").select("*,company:companies(name,logo_url),applications:applications(*)").eq("id", job_id).single();

    if (error) {
        console.error("Error fetching job", error);
        return null;
    }
    return data;
}
//hiring status update from recruiter
export async function updateHirirngStatus(token, { job_id }, isOpen) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("jobs").update({ isOpen }).eq("id", job_id).select();

    if (error) {
        console.error("Error updating job status", error);
        return null;
    }
    return data;
}

//creation of new job from recruiter
export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("jobs").insert([jobData]).select();

    if (error) {
        console.error("Error creating job", error);
        return null;
    }
    return data;
}
//saved jobs
export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase
        .from("saved_jobs")
        .select("*,job:jobs(*,company:companies(name,logo_url))");
    // .select("*, job: jobs(*, company: companies(name,logo_url))");
    if (error) {
        console.error("Error Fetching Saved job", error);
        return null;
    }
    return data;
}