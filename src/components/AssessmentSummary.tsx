import { FiInfo } from 'react-icons/fi';

interface SummaryMetrics {
  timeRecovered: number;
  productivityValue: number;
  contentGenerated: number;
  costReduction: number;
  stressReduction: number;
  revenuePotential: number;
}

interface TooltipProps {
  text: string;
}

function Tooltip({ text }: TooltipProps) {
  return (
    <div className="group relative inline-block ml-1">
      <FiInfo className="w-4 h-4 text-gray-400 hover:text-primary cursor-help" />
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 
                    bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 z-10">
        {text}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 
                      border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}

export default function AssessmentSummary({ metrics }: { metrics: SummaryMetrics }) {
  // Calculate impact levels for visual indicators
  const getImpactLevel = (value: number, type: 'time' | 'cost' | 'stress') => {
    switch (type) {
      case 'time':
        return value > 40 ? '🔥 High Impact' : value > 20 ? '📈 Medium Impact' : '📊 Notable Impact';
      case 'cost':
        return value > 50 ? '💰 Major Savings' : value > 30 ? '💵 Good Savings' : '📊 Moderate Savings';
      case 'stress':
        return value > 60 ? '🎯 Transformative' : value > 40 ? '⭐ Significant' : '📈 Positive';
    }
  };

  const getMetricColor = (value: number) => {
    if (value > 60) return 'text-green-500 dark:text-green-400';
    if (value > 40) return 'text-blue-500 dark:text-blue-400';
    return 'text-yellow-500 dark:text-yellow-400';
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-6 gradient-text text-center">
        Your Content Repurposing Potential
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">Time Value</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Time Recovered Monthly:</span>
                <Tooltip text="Monthly hours saved through optimized content repurposing workflows" />
              </div>
              <div className="mt-1">
                <span className={`font-bold text-xl ${getMetricColor(metrics.timeRecovered)}`}>
                  {metrics.timeRecovered.toLocaleString()} hours
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {getImpactLevel(metrics.timeRecovered, 'time')}
                </p>
              </div>
            </li>
            <li className="text-sm">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Productivity Value:</span>
                <Tooltip text="Financial value of recovered time based on your team's hourly rate" />
              </div>
              <div className="mt-1">
                <span className={`font-bold text-xl ${getMetricColor(metrics.productivityValue / 1000)}`}>
                  ${metrics.productivityValue.toLocaleString()}
                </span>
                <p className="text-xs text-gray-500 mt-1">Monthly Efficiency Gain</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">Content Impact</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Additional Content:</span>
                <Tooltip text="Extra content pieces generated through strategic repurposing" />
              </div>
              <div className="mt-1">
                <span className={`font-bold text-xl ${getMetricColor(metrics.contentGenerated / 10)}`}>
                  {metrics.contentGenerated.toLocaleString()} pieces
                </span>
                <p className="text-xs text-gray-500 mt-1">Monthly Content Expansion</p>
              </div>
            </li>
            <li className="text-sm">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Cost Reduction:</span>
                <Tooltip text="Percentage reduction in content creation costs through optimization" />
              </div>
              <div className="mt-1">
                <span className={`font-bold text-xl ${getMetricColor(metrics.costReduction)}`}>
                  {metrics.costReduction}%
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {getImpactLevel(metrics.costReduction, 'cost')}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-2">Overall Benefits</h3>
          <ul className="space-y-2">
            <li className="text-sm">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Stress Reduction:</span>
                <Tooltip text="Estimated decrease in content-related stress based on current workload" />
              </div>
              <div className="mt-1">
                <span className={`font-bold text-xl ${getMetricColor(metrics.stressReduction)}`}>
                  {metrics.stressReduction}%
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {getImpactLevel(metrics.stressReduction, 'stress')}
                </p>
              </div>
            </li>
            <li className="text-sm">
              <div className="flex items-center">
                <span className="text-gray-600 dark:text-gray-300">Revenue Potential:</span>
                <Tooltip text="Projected monthly revenue increase from expanded content reach" />
              </div>
              <div className="mt-1">
                <span className={`font-bold text-xl ${getMetricColor(metrics.revenuePotential / 5000)}`}>
                  ${metrics.revenuePotential.toLocaleString()}
                </span>
                <p className="text-xs text-gray-500 mt-1">Additional Monthly Revenue</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 space-x-4">
        <a
          href="https://calendly.com/rockey-repurposly/social-flip-discovery-call"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block text-lg px-8 py-3"
        >
          Book Your Free Content Audit
        </a>
        <button
          onClick={() => window.print()}
          className="btn-primary inline-block text-lg px-8 py-3"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
}