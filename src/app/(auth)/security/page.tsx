"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../layout";

interface Question {
  id: number;
  text: string;
}

interface AvailableQuestionsResponse {
  minimumRequired: number;
  maximumAllowed: number;
  instructions: string;
  questions: Question[];
}

export default function SecurityQuestionsPage() {
  const router = useRouter();

  const [data, setData] = useState<AvailableQuestionsResponse | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch available questions from backend
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/security-questions/available`,
          { credentials: "include" }
        );
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("Unable to load security questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, []);

  const toggleQuestion = (question: Question) => {
    setError(null);
    setSuccess(false);

    const alreadySelected = selectedQuestions.find((q) => q.id === question.id);
    if (alreadySelected) {
      setSelectedQuestions((prev) => prev.filter((q) => q.id !== question.id));
      const updated = { ...answers };
      delete updated[question.id];
      setAnswers(updated);
    } else if (
      selectedQuestions.length < (data?.maximumAllowed ?? 5)
    ) {
      setSelectedQuestions((prev) => [...prev, question]);
    } else {
      setError(`You can only select up to ${data?.maximumAllowed} questions.`);
    }
  };

  const handleAnswerChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!data) return;

    const { minimumRequired, maximumAllowed } = data;

    if (
      selectedQuestions.length < minimumRequired ||
      selectedQuestions.length > maximumAllowed
    ) {
      setError(`Please select between ${minimumRequired} and ${maximumAllowed} questions.`);
      return;
    }

    for (const q of selectedQuestions) {
      if (!answers[q.id] || answers[q.id].trim().length < 3) {
        setError("All answers must be at least 3 characters long.");
        return;
      }
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = selectedQuestions.map((q) => ({
        questionId: q.id,
        answer: answers[q.id].trim(),
      }));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/security-questions/setup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ questions: payload }),
        }
      );

      if (!res.ok) throw new Error(`Failed (${res.status})`);

      setSuccess(true);
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while saving your answers.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-3 text-gray-800">Security Questions</h1>

        {loading && <p className="text-gray-600">Loading available questions...</p>}

        {!loading && data && (
          <>
            <p className="text-gray-600 mb-6">{data.instructions}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                {data.questions.map((q) => {
                  const isSelected = selectedQuestions.some((sq) => sq.id === q.id);
                  return (
                    <div
                      key={q.id}
                      className={`p-3 border rounded-lg cursor-pointer transition ${
                        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-300"
                      }`}
                      onClick={() => toggleQuestion(q)}
                    >
                      <div className="flex items-center justify-between">
                        <label className="font-medium text-gray-800">{q.text}</label>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="h-4 w-4 accent-blue-600"
                        />
                      </div>

                      {isSelected && (
                        <input
                          type="text"
                          placeholder="Your answer"
                          value={answers[q.id] || ""}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          className="mt-2 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {error && <p className="text-red-600 text-sm text-center">{error}</p>}
              {success && (
                <p className="text-green-600 text-sm text-center">
                  Security questions saved successfully!
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : "Save & Continue"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

  );
}
