"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface Question {
  id: number;
  text: string;
}

interface AvailableQuestionsResponse {
  questions: Question[];
  minimumRequired: number;
  maximumAllowed: number;
  instructions: string;
}

interface SetupRequest {
  userId: string;
  answers: Array<{
    questionId: number;
    answer: string;
  }>;
}

export default function SecurityQuestionsSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [data, setData] = useState<AvailableQuestionsResponse | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/auth/security-questions/available", {
          credentials: "include",
        });

        if (!res.ok) throw new Error(`Failed to load questions (${res.status})`);

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        toast.error("Unable to load security questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  const toggleQuestion = (question: Question) => {
    const alreadySelected = selectedQuestions.find((q) => q.id === question.id);

    if (alreadySelected) {
      setSelectedQuestions((prev) => prev.filter((q) => q.id !== question.id));
      const updated = { ...answers };
      delete updated[question.id];
      setAnswers(updated);
    } else if (selectedQuestions.length < (data?.maximumAllowed ?? 5)) {
      setSelectedQuestions((prev) => [...prev, question]);
    } else {
      toast.error(`You can only select up to ${data?.maximumAllowed} questions.`);
    }
  };

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data || !userId) {
      toast.error("Missing user information. Please try again.");
      return;
    }

    const { minimumRequired, maximumAllowed } = data;

    if (selectedQuestions.length < minimumRequired) {
      toast.error(`Please select at least ${minimumRequired} questions.`);
      return;
    }

    if (selectedQuestions.length > maximumAllowed) {
      toast.error(`Please select no more than ${maximumAllowed} questions.`);
      return;
    }

    // Validate answers
    for (const q of selectedQuestions) {
      if (!answers[q.id] || answers[q.id].trim().length < 2) {
        toast.error("All answers must be at least 2 characters long.");
        return;
      }
    }

    setSubmitting(true);

    try {
      const payload: SetupRequest = {
        userId,
        answers: selectedQuestions.map((q) => ({
          questionId: q.id,
          answer: answers[q.id].trim(),
        })),
      };

      const res = await fetch("/auth/security-questions/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Setup failed (${res.status})`);

      const result = await res.json();
      
      if (result.securityQuestionSet) {
        toast.success("Security questions setup successfully!");
        router.push("/dashboard");
      } else {
        throw new Error("Setup failed");
      }

    } catch (err) {
      console.error(err);
      toast.error("Failed to setup security questions. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full mx-auto">
      <h1 className="text-2xl font-semibold mb-2 text-center text-gray-800">
        Setup Security Questions
      </h1>

      <p className="text-gray-600 text-center mb-6">
        {data?.instructions || `Select ${data?.minimumRequired}-${data?.maximumAllowed} security questions and provide answers.`}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              Select {data?.minimumRequired} to {data?.maximumAllowed} questions
            </span>
            <span className="text-blue-600 font-medium">
              {selectedQuestions.length} selected
            </span>
          </div>

          {data?.questions.map((q) => {
            const isSelected = selectedQuestions.some((sq) => sq.id === q.id);
            return (
              <div
                key={q.id}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => toggleQuestion(q)}
              >
                <div className="flex items-start justify-between">
                  <label className="font-medium text-gray-800 text-sm leading-tight">
                    {q.text}
                  </label>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="h-4 w-4 accent-blue-600 mt-0.5"
                  />
                </div>

                {isSelected && (
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Your answer"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      minLength={2}
                      required
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={submitting || selectedQuestions.length < (data?.minimumRequired || 3)}
          className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Setting Up...
            </span>
          ) : (
            "Setup Security Questions"
          )}
        </button>
      </form>
    </div>
  );
}