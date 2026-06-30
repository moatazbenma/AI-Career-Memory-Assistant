import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../services/api";

export default function CareerPredictor() {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    Python: 8,
    Java: 6,
    "C++": 5,
    JavaScript: 7,
    "C#": 0,
    PHP: 0,
    Ruby: 0,
    Swift: 0,
    Go: 0,
    Rust: 0,
    Others: 0,
    Software_Development_Experience: 8,
    Database_Management: 7,
    Networking_Skills: 5,
    Web_Development_Experience: 8,
    Communication_Skills: 7,
    Problem_Solving_Abilities: 8,
    Teamwork_Collaboration: 8,
    Time_Management: 7,
    Adaptability: 8,
    GPA: 3.5,
    Coursework_Completion_Status: "Completed",
    Academic_Achievements: "Yes",
    Personal_Interests: "AI",
    Internship_Experience: "Yes",
    Certifications_Training: "Yes",
    Leadership_Experience: "No",
  });

  const handleNumberChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await apiClient.post("/predict/", formData);
      setPrediction(
        response.data.prediction ||
          response.data.career ||
          JSON.stringify(response.data)
      );
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const languageFields = [
    "Python", "Java", "C++", "JavaScript", "C#",
    "PHP", "Ruby", "Swift", "Go", "Rust", "Others",
  ];

  const skillFields = [
    "Software_Development_Experience", "Database_Management",
    "Networking_Skills", "Web_Development_Experience",
    "Communication_Skills", "Problem_Solving_Abilities",
    "Teamwork_Collaboration", "Time_Management", "Adaptability",
  ];

  const inputClass =
    "w-full bg-slate-900/60 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition";

  const labelClass = "block text-sm font-medium text-slate-300 mb-1";

  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="rounded-3xl border border-slate-700 bg-slate-800/80 p-6 shadow-lg shadow-slate-950/30">
      <h2 className="text-lg font-semibold text-slate-200 mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Career Predictor
            </h1>
            <p className="text-slate-400 mt-2 max-w-2xl">
              Rate your skills and background to get a personalized career path recommendation.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-3 rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition self-start"
          >
            Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Programming Languages */}
          <SectionCard title="Programming Languages (0–10)">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languageFields.map((field) => (
                <div key={field}>
                  <label className={labelClass}>{field}</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={(formData as any)[field]}
                    onChange={(e) => handleNumberChange(field, Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Technical & Soft Skills */}
          <SectionCard title="Technical & Soft Skills (0–10)">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillFields.map((field) => (
                <div key={field}>
                  <label className={labelClass}>{field.replaceAll("_", " ")}</label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={(formData as any)[field]}
                    onChange={(e) => handleNumberChange(field, Number(e.target.value))}
                    className={inputClass}
                  />
                </div>
              ))}
              <div>
                <label className={labelClass}>GPA (0–4)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4"
                  value={formData.GPA}
                  onChange={(e) => handleNumberChange("GPA", Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
          </SectionCard>

          {/* Background */}
          <SectionCard title="Background & Experience">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  field: "Coursework_Completion_Status",
                  options: ["Completed", "In Progress"],
                },
                {
                  field: "Academic_Achievements",
                  options: ["Yes", "No"],
                },
                {
                  field: "Personal_Interests",
                  options: ["AI", "Web Development", "Cybersecurity", "Data Science", "Mobile Development"],
                },
                {
                  field: "Internship_Experience",
                  options: ["Yes", "No"],
                },
                {
                  field: "Certifications_Training",
                  options: ["Yes", "No"],
                },
                {
                  field: "Leadership_Experience",
                  options: ["Yes", "No"],
                },
              ].map(({ field, options }) => (
                <div key={field}>
                  <label className={labelClass}>{field.replaceAll("_", " ")}</label>
                  <select
                    value={(formData as any)[field]}
                    onChange={(e) => handleSelectChange(field, e.target.value)}
                    className={inputClass}
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt} className="bg-slate-800">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 font-semibold hover:from-cyan-600 hover:to-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Predicting..." : "Predict Career"}
            </button>
          </div>
        </form>

        {/* Result */}
        {prediction && (
          <div className="mt-6 rounded-3xl border border-emerald-700 bg-slate-800/80 p-6 shadow-lg shadow-slate-950/30">
            <div className="flex flex-wrap gap-3 items-center mb-3">
              <span className="rounded-full bg-emerald-500/15 px-4 py-1 text-sm font-semibold text-emerald-300">
                RESULT
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Predicted Career Path</h2>
            <p className="text-slate-300 text-lg">{prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}