import { useState } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'select' | 'number' | 'multiselect' | 'scale';
  options?: string[] | { value: string | number; label: string }[];
}

interface Metric {
  label: string;
  value: number | string;
  color?: string;
}

interface Source {
  fact: string;
  citation: string;
  link: string;
}

interface AssessmentCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  questions: Question[];
  onUpdate: (values: Record<string, any>) => void;
  calculateMetrics: (values: Record<string, any>) => Metric[];
  warningMessages?: (values: Record<string, any>) => string[];
  sources?: Source[];
}

export default function AssessmentCard({
  icon,
  title,
  description,
  questions,
  onUpdate,
  calculateMetrics,
  warningMessages,
  sources,
}: AssessmentCardProps) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initialValues: Record<string, any> = {};
    questions.forEach(question => {
      initialValues[question.id] = question.type === 'multiselect' ? [] : '';
    });
    return initialValues;
  });
  const [showMetrics, setShowMetrics] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const handleChange = (questionId: string, value: any) => {
    const newValues = { ...values, [questionId]: value };
    setValues(newValues);
    onUpdate(newValues);
    setShowMetrics(true);
    setShowSources(true);
  };

  const renderInput = (question: Question) => {
    switch (question.type) {
      case 'select':
        return (
          <select
            value={values[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className="input-field"
          >
            <option value="">Select...</option>
            {question.options?.map((opt) => (
              <option 
                key={typeof opt === 'string' ? opt : opt.value}
                value={typeof opt === 'string' ? opt : opt.value}
              >
                {typeof opt === 'string' ? opt : opt.label}
              </option>
            ))}
          </select>
        );

      case 'scale':
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => handleChange(question.id, num)}
                className={`w-10 h-10 rounded-full ${
                  values[question.id] === num
                    ? 'bg-gradient-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-2">
            {question.options?.map((opt) => {
              const value = typeof opt === 'string' ? opt : opt.value;
              const label = typeof opt === 'string' ? opt : opt.label;
              return (
                <label key={value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={values[question.id]?.includes(value)}
                    onChange={(e) => {
                      const current = values[question.id] || [];
                      const newValue = e.target.checked
                        ? [...current, value]
                        : current.filter((v: string) => v !== value);
                      handleChange(question.id, newValue);
                    }}
                    className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{label}</span>
                </label>
              );
            })}
          </div>
        );

      default:
        return (
          <input
            type="number"
            value={values[question.id]}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className="input-field"
            placeholder="Enter value..."
            min="0"
          />
        );
    }
  };

  return (
    <div className="card group">
      <div className="flex items-center space-x-3 mb-4">
        <div className="feature-icon flex-shrink-0 w-10 h-10 rounded-full 
                      bg-gradient-primary text-white flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold gradient-text">{title}</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>

      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {question.text}
            </label>
            {renderInput(question)}
          </div>
        ))}

        {showMetrics && (
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {calculateMetrics(values).map((metric, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.label}
                  </p>
                  <p className={`text-xl font-bold ${metric.color || 'gradient-text'}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {warningMessages && warningMessages(values).length > 0 && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <h4 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">
                  Warning Indicators
                </h4>
                <ul className="space-y-2">
                  {warningMessages(values).map((message, index) => (
                    <li key={index} className="text-sm text-red-600 dark:text-red-300">
                      • {message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {showSources && sources && sources.length > 0 && (
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Industry Insights
            </h4>
            <div className="space-y-4">
              {sources.map((source, index) => (
                <div key={index} className="text-sm">
                  <p className="text-gray-700 dark:text-gray-300 mb-1">
                    {source.fact}
                  </p>
                  <a
                    href={source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary-mid hover:text-primary-start transition-colors"
                  >
                    Source: {source.citation}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}