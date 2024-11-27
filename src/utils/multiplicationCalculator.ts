interface MultiplicationMetrics {
  potentialReach: number;
  currentUsage: number;
  untappedPotential: number;
  utilizationCategory: string;
  utilizationColor: string;
}

const formatEffectiveness = {
  'Blog': 1.8,
  'Video': 2.2,
  'Podcast': 1.6,
  'Social Posts': 1.4
};

const currentUsagePercentage: Record<string, number> = {
  '0-25%': 0.25,
  '26-50%': 0.50,
  '51-75%': 0.75,
  '76-100%': 1.0
};

export const calculateMultiplicationMetrics = (values: Record<string, any>): MultiplicationMetrics => {
  // Base calculations
  const platformMultiplier = (values.platforms?.length || 0) * 1.5;
  const formatMultiplier = formatEffectiveness[values.primaryFormat as keyof typeof formatEffectiveness] || 1.4;
  const usageRate = currentUsagePercentage[values.repurposingRate as keyof typeof currentUsagePercentage] || 0.25;

  // Calculate reach potentials
  const potentialReach = Math.round(platformMultiplier * formatMultiplier * 100);
  const currentUsage = Math.round(potentialReach * usageRate);
  const untappedPotential = potentialReach - currentUsage;

  // Determine utilization category and color
  let utilizationCategory: string;
  let utilizationColor: string;

  const utilizationRate = (currentUsage / potentialReach) * 100;
  
  if (utilizationRate <= 25) {
    utilizationCategory = 'Major Opportunity';
    utilizationColor = 'text-blue-500';
  } else if (utilizationRate <= 50) {
    utilizationCategory = 'Good Potential';
    utilizationColor = 'text-green-500';
  } else if (utilizationRate <= 75) {
    utilizationCategory = 'Room for Optimization';
    utilizationColor = 'text-yellow-500';
  } else {
    utilizationCategory = 'Maximum Efficiency';
    utilizationColor = 'text-purple-500';
  }

  return {
    potentialReach,
    currentUsage,
    untappedPotential,
    utilizationCategory,
    utilizationColor
  };
};