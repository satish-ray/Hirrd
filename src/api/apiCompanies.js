import supabaseClient from "@/utils/supabase";
import { supabaseUrl } from "../utils/supabase";

export async function getCompanies(token) {
    // 1. Initialize the Supabase client with the provided token.
    const supabase = await supabaseClient(token);

    // 2. Query the 'companies' table to retrieve all columns ('*').
    const { data, error } = await supabase
        .from("companies")
        .select("*");

    // 3. Handle any potential errors during the data fetching process.
    if (error) {
        console.error("Error fetching Companies:", error);
        return null;
    }

    // 4. Return the successfully retrieved company data.
    return data;
}
// Add Company
export async function addNewCompany(token, _, companyData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;

    const { error: storageError } = await supabase.storage
        .from("company_logo")
        .upload(fileName, companyData.logo);

    if (storageError) {
        console.error("Error uploading Company Logo:", error);
        return null;
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

    const { data, error } = await supabase
        .from("companies")
        .insert([
            {
                name: companyData.name,
                logo_url: logo_url,
            },
        ])
        .select();

    if (error) {
        console.error("Error submitting Companys", error);
        return null;
    }

    return data;
}