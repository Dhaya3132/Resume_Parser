import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(" ");
    fullText += pageText + "\n";
  }

  return fullText;
};

export const cleanText = (text) => {
  return text
    .replace(/\s+/g, " ")
    .replace(/[^\w\s.,]/gi, "")
    .toLowerCase()
    .trim();
};

export const calculateMatchScore = (resume, jobDesc) => {
  const resumeWords = new Set(resume.split(" "));
  const jobWords = jobDesc.split(" ");

  let matched = 0;
  jobWords.forEach(word => {
    if (resumeWords.has(word)) matched++;
  });

  return Math.round((matched / jobWords.length) * 100);
};

export const generateFeedback = (score) => {
  if (score > 80) return "Excellent match 🎯";
  if (score > 60) return "Good match 👍";
  if (score > 40) return "Needs improvement ⚠️";
  return "Low match ❌";
};
