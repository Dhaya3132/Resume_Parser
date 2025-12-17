import React from "react";
import { X, Sparkles } from "lucide-react";

export default function ResultModal({ open, onClose, score, feedback }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white rounded shadow p-8 animate-in fade-in zoom-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            Resume Analysis Result
          </h2>
        </div>

        {/* Score */}
        <div className="text-center mb-6">
          <div className="text-6xl font-extrabold text-purple-600">
            {score}%
          </div>
          <p className="text-gray-600 mt-2">{feedback}</p>
        </div>

        {/* Info */}
        <div className="bg-gray-50 rounded-full p-4 text-sm text-gray-600">
          <p>✔ Based on keyword & ATS-style matching</p>
          <p>✔ Resume processed locally</p>
          <p>✔ No data stored</p>
        </div>

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-6 w-full h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
}
