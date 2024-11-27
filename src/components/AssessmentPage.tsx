import { useState } from 'react';
import { FiBarChart2, FiActivity, FiRepeat, FiDollarSign, FiClock } from 'react-icons/fi';
import Header from './Header';
import AssessmentCard from './AssessmentCard';
import AssessmentSummary from './AssessmentSummary';
import { calculateStressMetrics } from '../utils/stressCalculator';
import { calculateMultiplicationMetrics } from '../utils/multiplicationCalculator';
import { calculateROIMetrics } from '../utils/roiCalculator';
import { calculateTimeSavingsMetrics } from '../utils/timeSavingsCalculator';
import { calculateSummaryMetrics } from '../utils/calculationUtils';
import {
  contentBaselineSources,
  workloadAssessmentSources,
  repurposingCalculatorSources,
  roiProjectorSources,
  timeEstimatorSources
} from '../data/assessmentSources';

interface AssessmentData {
  contentBaseline?: Record<string, any>;
  workloadAssessment?: Record<string, any>;
  repurposingCalculator?: Record<string, any>;
  roiProjector?: Record<string, any>;
  timeEstimator?: Record<string, any>;
}

export default function AssessmentPage() {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({});
  const [showSummary, setShowSummary] = useState(false);

  const handleSectionUpdate = (section: keyof AssessmentData, values: Record<string, any>) => {
    setAssessmentData(prev => ({
      ...prev,
      [section]: values
    }));
    
    const sections = ['contentBaseline', 'workloadAssessment', 'repurposingCalculator', 'roiProjector', 'timeEstimator'];
    const isComplete = sections.every(s => assessmentData[s as keyof AssessmentData]);
    setShowSummary(isComplete);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-12 text-center gradient-text">
          Content Repurposing Assessment
        </h1>

        <div className="space-y-8">
          <AssessmentCard
            icon={<FiBarChart2 className="w-5 h-5" />}
            title="Measure Your Current Content Investment"
            description="Let's establish your content creation baseline"
            questions={[
              {
                id: "weeklyHours",
                text: "How many hours per week do you spend creating original content?",
                type: "number"
              },
              {
                id: "costPerPiece",
                text: "What's your average cost per piece of content (USD)?",
                type: "number"
              },
              {
                id: "monthlyContent",
                text: "How many content pieces do you create monthly?",
                type: "number"
              }
            ]}
            onUpdate={(values) => handleSectionUpdate("contentBaseline", values)}
            calculateMetrics={(values) => {
              const weeklyHours = Number(values.weeklyHours || 0);
              const monthlyHours = weeklyHours * 4.33;
              const monthlyPieces = Number(values.monthlyContent || 0);
              const costPerPiece = Number(values.costPerPiece || 0);
              
              const monthlyInvestment = monthlyPieces * costPerPiece;
              
              return [
                {
                  label: "Monthly Time Investment",
                  value: `${Math.round(monthlyHours)}h`,
                  color: 'text-blue-500'
                },
                {
                  label: "Monthly Content Cost",
                  value: `$${monthlyInvestment.toLocaleString()}`,
                  color: 'text-green-500'
                },
                {
                  label: "Cost Per Piece",
                  value: `$${costPerPiece.toLocaleString()}`,
                  color: 'text-purple-500'
                }
              ];
            }}
            sources={contentBaselineSources}
          />

          <AssessmentCard
            icon={<FiActivity className="w-5 h-5" />}
            title="Evaluate Your Content Creation Stress Level"
            description="Measure your current workload and stress factors"
            questions={[
              {
                id: "stressLevel",
                text: "How often do you feel overwhelmed by content creation deadlines?",
                type: "scale"
              },
              {
                id: "platforms",
                text: "How many platforms do you need to create unique content for?",
                type: "multiselect",
                options: ["Blog", "Instagram", "LinkedIn", "YouTube", "TikTok", "Twitter", "Facebook"]
              },
              {
                id: "overtime",
                text: "Do you frequently work outside business hours to keep up with content demands?",
                type: "select",
                options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
              }
            ]}
            onUpdate={(values) => handleSectionUpdate("workloadAssessment", values)}
            calculateMetrics={(values) => {
              const metrics = calculateStressMetrics(values);
              return [
                {
                  label: "Stress Level",
                  value: `${metrics.totalStressScore}%`,
                  color: metrics.stressColor
                },
                {
                  label: "Platform Load",
                  value: `${metrics.platformLoad}%`,
                  color: metrics.stressColor
                },
                {
                  label: "Status",
                  value: metrics.stressCategory,
                  color: metrics.stressColor
                }
              ];
            }}
            warningMessages={(values) => calculateStressMetrics(values).warningMessages}
            sources={workloadAssessmentSources}
          />

          <AssessmentCard
            icon={<FiRepeat className="w-5 h-5" />}
            title="Discover Your Content Multiplication Potential"
            description="Calculate your content repurposing opportunities"
            questions={[
              {
                id: "primaryFormat",
                text: "What's your primary content format?",
                type: "select",
                options: ["Blog", "Video", "Podcast", "Social Posts"]
              },
              {
                id: "platforms",
                text: "Which platforms generate the most engagement for your business?",
                type: "multiselect",
                options: ["Website/Blog", "LinkedIn", "Instagram", "YouTube", "TikTok", "Twitter"]
              },
              {
                id: "repurposingRate",
                text: "What percentage of your content gets repurposed currently?",
                type: "select",
                options: ["0-25%", "26-50%", "51-75%", "76-100%"]
              }
            ]}
            onUpdate={(values) => handleSectionUpdate("repurposingCalculator", values)}
            calculateMetrics={(values) => {
              const metrics = calculateMultiplicationMetrics(values);
              return [
                {
                  label: "Potential Reach",
                  value: `${metrics.potentialReach}%`,
                  color: metrics.utilizationColor
                },
                {
                  label: "Current Usage",
                  value: `${metrics.currentUsage}%`,
                  color: metrics.utilizationColor
                },
                {
                  label: "Status",
                  value: metrics.utilizationCategory,
                  color: metrics.utilizationColor
                }
              ];
            }}
            sources={repurposingCalculatorSources}
          />

          <AssessmentCard
            icon={<FiDollarSign className="w-5 h-5" />}
            title="Calculate Your Repurposing ROI"
            description="Project your potential return on investment"
            questions={[
              {
                id: "revenuePerPiece",
                text: "What's your average revenue per content piece (USD)? Ex: $1000 revenue from 10 posts = $100 per piece",
                type: "number"
              },
              {
                id: "monthlyLeads",
                text: "How many leads does your content generate monthly?",
                type: "number"
              },
              {
                id: "conversionRate",
                text: "What's your content-to-sale conversion rate (%)?",
                type: "number"
              }
            ]}
            onUpdate={(values) => handleSectionUpdate("roiProjector", values)}
            calculateMetrics={(values) => {
              const metrics = calculateROIMetrics(values);
              return [
                {
                  label: "Current Revenue",
                  value: `$${metrics.monthlyRevenue.toLocaleString()}`,
                  color: metrics.roiColor
                },
                {
                  label: "Potential Revenue",
                  value: `$${metrics.potentialRevenue.toLocaleString()}`,
                  color: metrics.roiColor
                },
                {
                  label: "ROI Potential",
                  value: `${metrics.roiPercentage}%`,
                  color: metrics.roiColor
                }
              ];
            }}
            sources={roiProjectorSources}
          />

          <AssessmentCard
            icon={<FiClock className="w-5 h-5" />}
            title="See Your Time-Saving Potential"
            description="Calculate time and resources saved through automation"
            questions={[
              {
                id: "adaptationTime",
                text: "How long does it take to adapt content for each platform? (hours)",
                type: "number"
              },
              {
                id: "teamSize",
                text: "How many team members are involved in content creation?",
                type: "number"
              },
              {
                id: "hourlyRate",
                text: "What's the hourly cost of your content team? (USD)",
                type: "number"
              }
            ]}
            onUpdate={(values) => handleSectionUpdate("timeEstimator", values)}
            calculateMetrics={(values) => {
              const metrics = calculateTimeSavingsMetrics(values);
              return [
                {
                  label: "Current Monthly Hours",
                  value: `${metrics.currentHours}h`,
                  color: 'text-gray-600 dark:text-gray-300'
                },
                {
                  label: "Potential Hours Saved",
                  value: `${metrics.savedHours}h`,
                  color: metrics.savingsColor
                },
                {
                  label: "Cost Savings",
                  value: `$${metrics.savedCosts.toLocaleString()}`,
                  color: metrics.savingsColor
                }
              ];
            }}
            warningMessages={(values) => calculateTimeSavingsMetrics(values).warningMessages}
            sources={timeEstimatorSources}
          />
        </div>

        {showSummary && (
          <div className="mt-12">
            <AssessmentSummary metrics={calculateSummaryMetrics(assessmentData)} />
          </div>
        )}
      </main>
    </div>
  );
}