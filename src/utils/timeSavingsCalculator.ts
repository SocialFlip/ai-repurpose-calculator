interface TimeSavingsMetrics {
  currentHours: number;
  currentCost: number;
  savedHours: number;
  savedCosts: number;
  savingsCategory: string;
  savingsColor: string;
  warningMessages: string[];
}

export const calculateTimeSavingsMetrics = (values: Record<string, any>): TimeSavingsMetrics => {
  // Base calculations
  const hoursPerPlatform = Number(values.adaptationTime || 0);
  const teamSize = Number(values.teamSize || 0);
  const hourlyRate = Number(values.hourlyRate || 0);

  // Monthly calculations
  const monthlyHoursPerPlatform = hoursPerPlatform * 4.33; // Average weeks per month
  const currentMonthlyHours = monthlyHoursPerPlatform * teamSize;
  const currentMonthlyCost = currentMonthlyHours * hourlyRate;

  // Time savings calculation with dynamic multiplier
  const timeSavingsMultiplier = teamSize <= 2 ? 0.65 : 
                               teamSize <= 5 ? 0.55 : 0.45;

  const potentialHoursSaved = currentMonthlyHours * timeSavingsMultiplier;
  const potentialCostSavings = potentialHoursSaved * hourlyRate;

  // Determine savings category and color
  let savingsCategory: string;
  let savingsColor: string;

  if (potentialHoursSaved > 50) {
    savingsCategory = '🔥 Significant Savings';
    savingsColor = 'text-green-500';
  } else if (potentialHoursSaved > 20) {
    savingsCategory = '📈 Good Efficiency';
    savingsColor = 'text-blue-500';
  } else {
    savingsCategory = '📊 Moderate Savings';
    savingsColor = 'text-yellow-500';
  }

  // Generate warning messages
  const warningMessages: string[] = [];
  
  if (currentMonthlyHours > 160) {
    warningMessages.push('High monthly hours indicate potential workflow inefficiency');
  }
  
  if (teamSize > 5 && hoursPerPlatform > 10) {
    warningMessages.push('Large team size with high adaptation time suggests optimization opportunity');
  }
  
  if (currentMonthlyCost > 10000) {
    warningMessages.push('High monthly costs indicate need for automation and optimization');
  }

  return {
    currentHours: Math.round(currentMonthlyHours),
    currentCost: Math.round(currentMonthlyCost),
    savedHours: Math.round(potentialHoursSaved),
    savedCosts: Math.round(potentialCostSavings),
    savingsCategory,
    savingsColor,
    warningMessages
  };
};