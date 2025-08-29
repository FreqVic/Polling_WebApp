// Placeholder for creating a new poll
'use client';
import { Card } from "@/components/ui/card";


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/authcontext';

const CreatePollPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      router.replace('/auth');
    }
  }, [user, router]);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions(opts => opts.map((opt, i) => (i === idx ? value : opt)));
  };

  const addOption = () => setOptions(opts => [...opts, '']);
  const removeOption = (idx: number) =>
    setOptions(opts => opts.length > 2 ? opts.filter((_, i) => i !== idx) : opts);

  const validate = () => {
    const filteredOptions = options.map(opt => opt.trim()).filter(Boolean);
    if (!question.trim()) return 'Please enter a question.';
    if (filteredOptions.length < 2) return 'Please enter at least two options.';
    if (new Set(filteredOptions).size !== filteredOptions.length) return 'Options must be unique.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationMsg = validate();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }
    setSubmitting(true);
    const filteredOptions = options.map(opt => opt.trim()).filter(Boolean);
    const res = await fetch('/api/polls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, options: filteredOptions }),
    });
    setSubmitting(false);
    if (res.ok) {
      setSuccess('Poll created successfully!');
      setQuestion('');
      setOptions(['', '']);
      setTimeout(() => router.push('/polls'), 1200);
    } else {
      let errorMsg = 'Failed to create poll.';
      try {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await res.json();
          errorMsg = data.error || errorMsg;
        }
      } catch {}
      setError(errorMsg);
    }
  };

  if (!user) return null;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Create a New Poll</h1>
        <form onSubmit={handleSubmit} aria-label="Create Poll" className="space-y-6">
          <div>
            <label htmlFor="question" className="block font-medium mb-1">
              Question
            </label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              autoFocus
              maxLength={200}
              aria-describedby="question-help"
            />
            <div id="question-help" className="text-xs text-gray-500 mt-1">
              Enter the poll question (max 200 characters).
            </div>
          </div>
          <fieldset>
            <legend className="font-medium mb-2">Options</legend>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <label htmlFor={`option-${idx}`} className="sr-only">
                  Option {idx + 1}
                </label>
                <input
                  id={`option-${idx}`}
                  type="text"
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  required
                  className="flex-1 border rounded px-3 py-2"
                  maxLength={100}
                  aria-label={`Option ${idx + 1}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(idx)}
                    aria-label={`Remove option ${idx + 1}`}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="mt-2 text-blue-600 hover:underline"
              aria-label="Add another option"
              disabled={options.length >= 10}
            >
              + Add Option
            </button>
            <div className="text-xs text-gray-500 mt-1">
              Minimum 2, maximum 10 options. Options must be unique.
            </div>
          </fieldset>
          {error && <div role="alert" className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Poll'}
          </button>
        </form>
      </Card>
    </main>
  );
};

export default CreatePollPage;
