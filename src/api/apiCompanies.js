import { SupabaseClient } from "@supabase/supabase-js";

export async function getCompanies(token) {
    const supabase = await SupabaseClient(token);

    const { data, error } = await supabase
        .from("companies")
        .select("*");

    if (error) {
        console.error("Error fetching Companies", error);
        return null;
    }
    return data;
}