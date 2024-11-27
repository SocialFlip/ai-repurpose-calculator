interface StressMetrics {
  totalStressScore: number;
  platformLoad: number;
  overtimeImpact: number;
  stressCategory: string;
  stressColor: string;
  warningMessages: string[];
}

const overtimeStressLevels = {
  'Never': 0,
  'Rarely': 20,
  'Sometimes': 40,
  'Often': 60,
  'Always': 80
};

export const calculateStressMetrics = (values: Record<string, any>): StressMetrics => {
  // Base calculations
  const deadlineStress = Number(values.stressLevel || 0) * 20;
  const platformLoad = (values.platforms?.length || 0) * 14.3;
  const overtimeStress = overtimeStressLevels[values.overtime as keyof typeof overtimeStressLevels] || 0;

  // Calculate total stress score
  const totalStressScore = Math.min(
    Math.round((deadlineStress + platformLoad + overtimeStress) / 3),
    100
  );

  // Determine stress category and color
  let stressCategory: string;
  let stressColor: string;
  
  if (totalStressScore <= 40) {
    stressCategory = 'Sustainable';
    stressColor = 'text-green-500';
  } else if (totalStressScore <= 70) {
    stressCategory = 'Needs Optimization';
    stressColor = 'text-yellow-500';
  } else {
    stressCategory = 'Requires Intervention';
    stressColor = 'text-red-500';
  }

  // Generate warning messages
  const warningMessages: string[] = [];
  
  if (['Often', 'Always'].includes(values.overtime)) {
    warningMessages.push('High risk of burnout due to frequent overtime work');
  }
  
  if ((values.platforms?.length || 0) > 4) {
    warningMessages.push('Platform overload detected - consider consolidation');
  }
  
  if (Number(values.stressLevel) >= 4) {
    warningMessages.push('High deadline stress indicates need for workflow adjustment');
  }

  return {
    totalStressScore,
    platformLoad: Math.round(platformLoad),
    overtimeImpact: overtimeStress,
    stressCategory,
    stressColor,
    warningMessages
  };
};