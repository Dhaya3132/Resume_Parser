import React, { useState } from "react";
import { Upload, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import {
  extractTextFromPDF,
  cleanText,
  calculateMatchScore,
  generateFeedback,
} from "../../utils/helper/Helper";
import ResultModal from "../../components/modals/Result-modal";

export default function Home() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [desc, setDesc] = useState("");
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setFileName(uploadedFile.name);
  };

  const analyseResume = async () => {
    if (!file) {
      return;
    }

    if (!desc.trim() && desc.length === 0) {
      return;
    }

    try {
      setLoading(true);

      const resumeText = await extractTextFromPDF(file);
      const cleanedResume = cleanText(resumeText);
      const cleanedJD = cleanText(desc);

      const calculatedScore = calculateMatchScore(cleanedResume, cleanedJD);

      const feedbackText = generateFeedback(calculatedScore);

      setScore(calculatedScore);
      setFeedback(feedbackText);
      setOpenModal(true);
    } catch (error) {
      console.error(error);
      alert("Error analyzing resume");
    } finally {
      setLoading(false);
    }
  };

  const handleRest = () => {
    setFile(null);
    setFileName("");
    setDesc("");
    setScore(null);
    setFeedback("");
    setLoading(false);
    setOpenModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-8 lg:p-12 flex flex-col justify-between">
            {/* Animated blobs */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply blur-3xl animate-blob" />
              <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000" />
              <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/20">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white">Powered Analysis</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mt-8">
                Resume Analyzer
              </h1>

              <p className="text-lg text-blue-100 mt-6 max-w-xl">
                Upload your resume and compare it with any job description. Get
                ATS scores and improvement suggestions instantly.
              </p>

              <div className="mt-10 space-y-4">
                {[
                  "ATS-friendly scoring",
                  "Keyword gap detection",
                  "Skill match analysis",
                  "Frontend-only & free",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-blue-50">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
            <div className="w-full max-w-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Get Started
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Upload your resume and job description
                  </p>
                </div>

                { file && desc && score && (<button
                  className="py-2 bg-light rounded-full border px-5 cursor-pointer"
                  onClick={handleRest}
                >
                  Reset
                </button>)}
              </div>

              <div className="space-y-6 mt-8">
                {/* Upload */}
                <div>
                  <label className="text-sm font-semibold text-gray-800 mb-3 block">
                    Upload Resume
                  </label>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    id="resume-upload"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <label
                    htmlFor="resume-upload"
                    className="flex items-center justify-center h-32 border-2 border-dashed rounded cursor-pointer hover:border-purple-500 transition"
                  >
                    <div className="text-center">
                      {fileName ? (
                        <>
                          <FileText className="mx-auto w-8 h-8 text-purple-600 mb-2" />
                          <p className="text-sm font-medium">{fileName}</p>
                        </>
                      ) : (
                        <>
                          <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm font-medium">Click to upload</p>
                          <p className="text-xs text-gray-400">
                            PDF, DOC, DOCX
                          </p>
                        </>
                      )}
                    </div>
                  </label>
                </div>

                {/* Job Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-800 mb-3 block">
                    Job Description
                  </label>
                  <textarea
                    value={desc}
                    className="w-full h-48 p-4 rounded border focus:ring-2 focus:ring-purple-500 resize-none"
                    placeholder="Paste job description here..."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                {/* Button */}
                <button
                  onClick={analyseResume}
                  disabled={loading}
                  className="w-full h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Sparkles className="w-5 h-5" />
                  {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

                {/* Result */}
                {/* {score !== null && (
                <div className="p-6 rounded-xl border bg-gray-50">
                  <h3 className="text-xl font-bold">
                    ATS Match Score
                  </h3>
                  <p className="text-4xl font-extrabold text-purple-600 mt-2">
                    {score}%
                  </p>
                  <p className="text-gray-600 mt-2">{feedback}</p>
                </div>
              )} */}

                <p className="text-xs text-center text-gray-400">
                  Your data is processed locally and never stored
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResultModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        score={score}
        feedback={feedback}
      />
    </>
  );
}
