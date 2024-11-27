interface AssessmentData {
  contentBaseline?: Record<string, any>;
  workloadAssessment?: Record<string, any>;
  repurposingCalculator?: Record<string, any>;
  roiProjector?: Record<string, any>;
  timeEstimator?: Record<string, any>;
}

export const calculateSummaryMetrics = (assessmentData: AssessmentData) => {
  const baseline = assessmentData.contentBaseline || {};
  const workload = assessmentData.workloadAssessment || {};
  const roi = assessmentData.roiProjector || {};
  const time = assessmentData.timeEstimator || {};

  // Calculate monthly hours and costs from baseline
  const weeklyHours = Number(baseline.weeklyHours || 0);
  const monthlyHours = weeklyHours * 4.33;
  const monthlyPieces = Number(baseline.monthlyContent || 0);
  const costPerPiece = Number(baseline.costPerPiece || 0);
  
  // Calculate current costs
  const currentMonthlyInvestment = monthlyPieces * (monthlyHours / monthlyPieces) * costPerPiece;
  const teamCost = Number(time.hourlyRate || 0) * Number(time.teamSize || 0) * Number(time.adaptationTime || 0);
  const totalCurrentCost = currentMonthlyInvestment + teamCost;
  
  // Calculate the reduced cost (estimated 40% of current costs)
  const reducedCost = totalCurrentCost * 0.4;
  const costReduction = totalCurrentCost > 0 
    ? Math.round(((totalCurrentCost - reducedCost) / totalCurrentCost) * 100)
    : 0;

  return {
    timeRecovered: Number(time.adaptationTime || 0) * 4 || 0,
    productivityValue: Number(time.hourlyRate || 0) * Number(time.adaptationTime || 0) * 4 || 0,
    contentGenerated: monthlyPieces * 7 || 0,
    costReduction: costReduction || 0,
    stressReduction: Number(workload.stressLevel || 0) * 20 || 0,
    revenuePotential: Number(roi.revenuePerPiece || 0) * Number(roi.monthlyLeads || 0) * 2 || 0
  };
};