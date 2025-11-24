"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface UserSecurityQuestion {
  questionId: number;
  questionText: string;
}

interface SecurityQuestionsStatus {
  isSetup: boolean;
  questions?: UserSecurityQuestion[];
  userId: string;
}

interface VerifyRequest {
  identifier: string;
  answers: Array<{
    questionId: number;
    answer: string;
  }>;
}

export default function AnswerSecurityQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const identifier = searchParams.get("identifier");
  const userId = searchParams.get("userId");

  const [userQuestions, setUserQuestions] = useState<UserSecurityQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function checkAndLoadQuestions() {
      if (!userId) {
        toast.error("Missing user information.");
        setLoading(false);
        return;
      }

      try {
        // Check if user has security questions setup
        const statusRes = await fetch(`/auth/security-questions/status/${userId}`, {
          credentials: "include",
        });

        if (!statusRes.ok) {
          if (statusRes.status === 404) {
            toast.error("Security questions not setup for this account.");
            router.push("/auth/forgot-password");
            return;
          }
          throw new Error(`Failed to check status (${statusRes.status})`);
        }

        const statusData: SecurityQuestionsStatus = await statusRes.json();
        
        if (!statusData.isSetup || !statusData.questions || statusData.questions.length === 0) {
          toast.error("Security questions not setup for this account.");
          router.push("/auth/forgot-password");
          return;
        }

        setUserQuestions(statusData.questions);

      } catch (err) {
        console.error("Error loading security questions:", err);
        toast.error("Unable to load security questions. Please try again.");
        router.push("/auth/forgot-password");
      } finally {
        setLoading(false);
      }
    }

    checkAndLoadQuestions();
  }, [userId, router]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!identifier && !userId) {
      toast.error("Missing user identifier.");
      return;
    }

    // Validate all questions are answered
    const unansweredQuestions = userQuestions.filter(q => 
      !answers[q.questionId] || answers[q.questionId].trim().length === 0
    );

    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all security questions.");
      return;
    }

    setSubmitting(true);

    try {
      const payload: VerifyRequest = {
        identifier: identifier || userId!,
        answers: userQuestions.map(q => ({
          questionId: q.questionId,
          answer: answers[q.questionId].trim(),
        })),
      };

      const res = await fetch("/auth/security-questions/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Verification failed (${res.status})`);

      toast.success("Security questions verified successfully!");
      
      // Redirect to password reset page
      const params = new URLSearchParams();
      if (identifier) params.append("identifier", identifier);
      if (userId) params.append("userId", userId);
      router.push(`/new?${params.toString()}`);

    } catch (err) {
      console.error(err);
      toast.error("Incorrect answers. Please try again.");
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
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
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
        Answer Security Questions
      </h1>

      <p className="text-gray-600 text-center mb-6">
        Please answer your security questions to verify your identity.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {userQuestions.map((userQuestion, index) => (
            <div key={userQuestion.questionId} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Question {index + 1}:
                <span className="ml-1 font-semibold text-gray-900">
                  {userQuestion.questionText}
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter your answer"
                value={answers[userQuestion.questionId] || ""}
                onChange={(e) => handleAnswerChange(userQuestion.questionId, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submitting}
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify Answers"
          )}
        </button>
      </form>
    </div>
  );
}