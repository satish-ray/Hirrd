# 🚀 hired - Your Next Career Destination

**hirrd** is a modern, full-stack job portal designed to efficiently connect job seekers (**Candidates**) with employers (**Recruiters**). It provides a seamless platform for candidates to apply for jobs using a simple authentication process and empowers recruiters to easily post and manage their job listings.

## ✨ Key Features

| Feature | Description | Target User |
| :--- | :--- | :--- |
| **Simple Auth** | Users can sign up and log in instantly using **Google** or **Email/Password** via Clerk. | All |
| **Role-Based Access** | Users select a role (**Candidate** or **Recruiter**) on first login, which dictates their access and dashboard. | All |
| **Recruiter Dashboard** | Recruiters can easily **post new jobs**, manage their active listings, and track applications. | Recruiter |
| **Job Search & Filtering** | Candidates can browse available jobs, view detailed listings, and filter based on criteria. | Candidate |
| **Secure Application** | Candidates can **apply to jobs** directly, securely uploading their **resume** via Supabase storage. | Candidate |
| **Save & Track** | Candidates can **save favorite jobs** for later viewing and track their past applications. | Candidate |
| **Data Security** | All data and uploaded files are secured using Supabase's robust **Row Level Security (RLS)** policies. | All |

---

## 📸 Screenshots

### Landing Page
<img width="2020" height="4312" alt="landing_page" src="https://github.com/user-attachments/assets/b7bcf68a-83c4-41c4-970d-14750d1ee4d7" />


### Sign-In 
<img width="1918" height="1030" alt="Screenshot 2025-10-30 105702-Sign-In" src="https://github.com/user-attachments/assets/76bf4694-8c8a-40cc-9cd5-4b5510df177f" />


### Sign-Up
<img width="1918" height="1032" alt="Screenshot 2025-10-30 105919-Sign-Up" src="https://github.com/user-attachments/assets/20080fd9-eb76-4f2f-b6d1-c2ac1ec5ef68" />


### All_jobs
<img width="1918" height="1145" alt="Screenshot 2025-10-30 110400-jobs" src="https://github.com/user-attachments/assets/2ac88400-a3d6-41fb-978e-45d1e64faf65" />


### job_page
<img width="1918" height="1142" alt="Screenshot 2025-10-30 111720-Job_page" src="https://github.com/user-attachments/assets/51627d1e-9fec-417a-a02e-757250110901" />


### Job_Apply_Drawer
<img width="1918" height="1150" alt="Screenshot 2025-10-30 111901_Apply_Drawer" src="https://github.com/user-attachments/assets/55ecfad8-1c7a-4d60-853e-924befba8725" />

### Create a job
<img src="https://github.com/satish-ray/Hirrd/blob/main/public/Screenshoots/Screenshot%202025-10-31%20085445_post_job.png?raw=true"/>

### Saved Jobs
<img src="https://github.com/satish-ray/Hirrd/blob/main/public/Screenshoots/Screenshot%202025-10-31%20120811_Saved_jobs.png?raw=true"/>

### My jobs
#### recruiter
<img src="https://github.com/satish-ray/Hirrd/blob/main/public/Screenshoots/Screenshot%202025-10-31%20135823_my-jobs_recruiter.png?raw=true"/>
#### candidate
<img src="https://github.com/satish-ray/Hirrd/blob/main/public/Screenshoots/Screenshot%202025-10-31%20143859_my-jobs_candidate.png?raw=true"/>

---

## 🛠️ Tech Stack

**hirrd** is built as a highly scalable, secure, and modern web application leveraging the following technologies:

### Frontend
* **React:** For building a fast and dynamic user interface.
* **Vite:** As the build tool for rapid development.
* **Tailwind CSS / Shadcn UI:** For utility-first styling and pre-built, accessible components.
* **React Router:** For client-side routing.

### Backend / Database / Auth
* **Supabase:** Used as the primary **PostgreSQL** database, API, and file storage.
* **Clerk:** Used for robust and highly customizable **user authentication** and managing user roles (`unsafeMetadata`).

---

## ⚙️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

You will need the following accounts and keys:

1.  **Node.js** (v18 or higher)
2.  **npm** or **yarn**
3.  **Clerk Account:** For authentication.
4.  **Supabase Account:** For the database and file storage.

### 1. Clone the Repository

git clone [https://github.com/satish-ray/hirrd.git](https://github.com/satish-ray/hirrd.git)
cd hirrd

### 2. Install Dependencies

npm install
 or
yarn install

### 3. Setup Environment Variables

Create a file named **`.env`** in the root of the project and add your Clerk and Supabase credentials. These are essential for connecting the frontend to your services:

### Clerk Credentials
VITE_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxx"

### Supabase Credentials
VITE_SUPABASE_URL="[https://your-project-id.supabase.co](https://your-project-id.supabase.co)"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiI..."

### 4. Configure Supabase

You must configure your Supabase instance to integrate with Clerk for authentication and set up the necessary data structures:

1.  **Database Setup:** Create the necessary tables (`companies`, `jobs`, `applications`, `saved_jobs`).
2.  **Clerk JWT Integration:** Implement the **PostgreSQL function** that verifies and uses Clerk JWT tokens within Supabase. This is crucial for enabling **Row Level Security (RLS)** based on user identity.
3.  **Storage:** Create a new storage bucket named **`resumes`** for resume uploads and set the appropriate RLS policies to ensure candidates can only upload their own files securely.

### 5. Run the Project

Start the local development server:

npm run dev
 or
yarn dev
The application should now be running at http://localhost:5173.

## 💡 Future Enhancements

* **Recruiter Analytics:** Implement a dashboard for recruiters to view application statistics and funnel conversions.
* **Candidate Profile:** Allow candidates to create a detailed profile with skills, work history, and portfolio links.
* **Notifications:** Implement real-time notifications for application status changes and job alerts.

---

## 🙏 Contribution

We welcome contributions! If you have suggestions or want to improve the project, please open an issue or submit a pull request.