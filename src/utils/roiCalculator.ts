interface ROIMetrics {
  monthlyRevenue: number;
  potentialRevenue: number;
  roiPercentage: number;
  roiCategory: string;
  roiColor: string;
}

export const calculateROIMetrics = (values: Record<string, any>): ROIMetrics => {
  // Base calculations
  const averageRevenue = Number(values.revenuePerPiece || 0);
  const monthlyLeads = Number(values.monthlyLeads || 0);
  const conversionRate = Number(values.conversionRate || 0);

  // Calculate current revenue
  const currentConversionRate = conversionRate / 100;
  const currentSales = monthlyLeads * currentConversionRate;
  const currentRevenue = averageRevenue * currentSales;

  // Dynamic multipliers based on input ranges
  const revenueMultiplier = averageRevenue < 1000 ? 3.2 : 
                           averageRevenue < 5000 ? 2.6 : 
                           averageRevenue < 10000 ? 2.2 : 1.8;

  const conversionMultiplier = conversionRate < 2 ? 2.8 :
                              conversionRate < 5 ? 2.4 :
                              conversionRate < 10 ? 2.0 : 1.6;

  // Calculate potential revenue with optimized conversion and revenue
  const potentialSales = monthlyLeads * (currentConversionRate * conversionMultiplier);
  const potentialRevenue = potentialSales * (averageRevenue * revenueMultiplier);

  // Calculate ROI percentage
  const roiPercentage = currentRevenue > 0 
    ? Math.round(((potentialRevenue - currentRevenue) / currentRevenue) * 100)
    : 0;

  // Dynamic ROI categorization
  let roiCategory: string;
  let roiColor: string;

  if (roiPercentage > 200) {
    roiCategory = '🔥 Exceptional ROI';
    roiColor = 'text-green-500';
  } else if (roiPercentage >= 150) {
    roiCategory = '📈 Strong ROI';
    roiColor = 'text-emerald-500';
  } else if (roiPercentage >= 100) {
    roiCategory = '⭐ Good ROI';
    roiColor = 'text-blue-500';
  } else if (roiPercentage >= 50) {
    roiCategory = '📊 Moderate ROI';
    roiColor = 'text-yellow-500';
  } else {
    roiCategory = '⚠️ Review Strategy';
    roiColor = 'text-red-500';
  }

  return {
    monthlyRevenue: Math.round(currentRevenue),
    potentialRevenue: Math.round(potentialRevenue),
    roiPercentage,
    roiCategory,
    roiColor
  };
};