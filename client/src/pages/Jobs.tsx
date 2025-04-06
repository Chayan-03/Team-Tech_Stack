import React, { useState } from "react";
import TopNav from "../components/TopNav";
import BottomNavbar from "../components/BottomNav";
import { MapPin, Briefcase, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface JobPosting {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Seasonal" | "Contract";
  category: "Farming" | "Labor" | "Agriculture" | "Harvest";
  salary: string;
  description: string;
  postedDate: string;
  contact: string;
  featured?: boolean;
}

const Jobs: React.FC = () => {
  const { t } = useTranslation("jobs");

  const jobListings: JobPosting[] = [
    {
      id: 1,
      title: "Seasonal Harvest Worker",
      company: "Sahyadri Farms",
      location: "Nashik, Maharashtra",
      type: "Seasonal",
      category: "Harvest",
      salary: "₹15,000–₹18,000/month",
      description:
        "Hiring experienced workers for the upcoming grape harvest. Must be able to work outdoors and handle physical tasks. Transportation from Nashik city provided.",
      postedDate: "Apr 2, 2025",
      contact: "jobs@sahyadrifarms.in",
    },
    {
      id: 2,
      title: "Farm Equipment Operator",
      company: "Kisan Agro Co-operative",
      location: "Ludhiana, Punjab",
      type: "Full-time",
      category: "Farming",
      salary: "₹22,000–₹28,000/month",
      description:
        "Looking for experienced tractor and harvester operators for large wheat and paddy farms. 2+ years experience with modern farm machinery and a valid driving license required.",
      postedDate: "Apr 1, 2025",
      contact: "hr@kisanagro.org",
    },
    {
      id: 3,
      title: "Organic Farm Assistant",
      company: "Prakriti Organics",
      location: "Auroville, Tamil Nadu",
      type: "Part-time",
      category: "Farming",
      salary: "₹10,000–₹12,000/month",
      description:
        "Seeking part-time help for planting, weeding, and harvesting on a certified organic farm. Ideal for students or individuals interested in sustainable agriculture.",
      postedDate: "Mar 30, 2025",
      contact: "info@prakritiorganics.in",
    },
    {
      id: 4,
      title: "Ranch Hand",
      company: "Shakti Cattle Farm",
      location: "Barmer, Rajasthan",
      type: "Full-time",
      category: "Labor",
      salary: "₹20,000–₹25,000/month + lodging",
      description:
        "General livestock care, fence repairs, and equipment handling. On-site accommodation available. Prior cattle farm experience preferred.",
      postedDate: "Mar 29, 2025",
      contact: "+91-9876543210",
    },
    {
      id: 5,
      title: "Greenhouse Worker",
      company: "FloraGrow India",
      location: "Bengaluru, Karnataka",
      type: "Full-time",
      category: "Agriculture",
      salary: "₹18,000–₹22,000/month",
      description:
        "Year-round position in a climate-controlled greenhouse. Tasks include caring for plants, harvesting, and packaging organic vegetables and flowers.",
      postedDate: "Mar 28, 2025",
      contact: "careers@floragrow.in",
    },
    {
      id: 6,
      title: "Viticulture Laborer",
      company: "Grover Zampa Vineyards",
      location: "Nandi Hills, Karnataka",
      type: "Seasonal",
      category: "Agriculture",
      salary: "₹16,000–₹20,000/month",
      description:
        "Seasonal grapevine work including pruning, canopy training, and harvesting. Prior vineyard work a plus. Training provided on-site.",
      postedDate: "Mar 27, 2025",
      contact: "jobs@groverzampa.in",
    },
    {
      id: 7,
      title: "Irrigation Specialist",
      company: "JalRakshak Irrigation Services",
      location: "Anantapur, Andhra Pradesh",
      type: "Contract",
      category: "Agriculture",
      salary: "₹25,000–₹35,000/month",
      description:
        "Contract-based role for installing and maintaining drip and sprinkler systems. Must have working knowledge of micro-irrigation equipment and water conservation techniques.",
      postedDate: "Mar 25, 2025",
      contact: "apply@jalrakshak.in",
    },
  ];

  // State for job filtering and search
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter jobs based on category selection and search term
  const filteredJobs = jobListings
    .filter(
      (job) =>
        filter === "all" || job.category.toLowerCase() === filter.toLowerCase()
    )
    .filter(
      (job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <TopNav />

      <div className="sticky top-0 z-10 bg-emerald-600 text-white p-4">
        <h1 className="text-xl font-bold mb-3">{t("jobBoardTitle")}</h1>

        {/* Search bar */}
        <div className="relative mb-2">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full bg-white/20 border border-white/30 rounded-lg py-2 pl-9 pr-3 text-white placeholder-emerald-100 focus:outline-none focus:ring-1 focus:ring-white/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-emerald-100" />
        </div>
      </div>

      {/* Filter chips */}
      <div className="px-4 py-2 overflow-x-auto flex gap-2 bg-gray-50">
        {["all", "farming", "labor", "agriculture", "harvest"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-lg text-sm whitespace-nowrap ${
              filter === cat
                ? "bg-emerald-600 text-white"
                : "bg-white border border-gray-200 text-gray-700"
            }`}
          >
            {t(`category.${cat}`)}
          </button>
        ))}
      </div>

      <main className="px-4 pb-20 pt-2">
        {/* Results count */}
        <div className="mb-3">
          <p className="text-gray-500 text-xs">
            {filteredJobs.length}{" "}
            {filteredJobs.length === 1 ? t("job") : t("jobs")} {t("found")}
          </p>
        </div>

        {/* Job listings */}
        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg p-4 text-center">
              <p className="text-gray-500">{t("noJobsFound")}</p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                }}
                className="mt-2 text-emerald-600 text-sm"
              >
                {t("clearFilters")}
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white rounded-lg shadow-sm border-l-4 ${
                  job.featured ? "border-emerald-500" : "border-transparent"
                }`}
              >
                <div className="p-3">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="text-base font-medium text-gray-800">
                        {job.title}
                      </h2>
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ${
                          job.type === "Full-time"
                            ? "bg-blue-50 text-blue-700"
                            : job.type === "Part-time"
                            ? "bg-purple-50 text-purple-700"
                            : job.type === "Seasonal"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Briefcase className="mr-1 h-3 w-3" />
                        {t(`jobType.${job.type.toLowerCase()}`)}
                      </span>
                    </div>

                    <div className="mt-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{job.company}</span>
                        <span className="mx-1">•</span>
                        <span className="flex items-center text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </span>
                      </div>
                      <div className="mt-1 font-medium text-emerald-600">
                        {job.salary}
                      </div>
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {t("posted")}: {job.postedDate}
                    </span>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-sm">
                      {t("apply")}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <BottomNavbar activeTab="find" />
    </div>
  );
};

export default Jobs;
