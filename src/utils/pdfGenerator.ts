import jsPDF from 'jspdf';

interface SummaryMetrics {
  timeRecovered: number;
  productivityValue: number;
  contentGenerated: number;
  costReduction: number;
  stressReduction: number;
  revenuePotential: number;
}

export const generatePDF = (metrics: SummaryMetrics) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  
  // Add gradient header background
  pdf.setFillColor(157, 92, 255); // #9D5CFF
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Add SocialFlip.io logo text
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('SocialFlip.io', 20, 25);
  
  // Title
  pdf.setTextColor(75, 158, 255); // #4B9EFF
  pdf.setFontSize(24);
  pdf.text('Content Repurposing', pageWidth / 2, 60, { align: 'center' });
  pdf.text('Assessment Report', pageWidth / 2, 75, { align: 'center' });
  
  // Add current date
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(12);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 90, { align: 'center' });
  
  // Metrics Section
  pdf.setTextColor(157, 92, 255); // #9D5CFF
  pdf.setFontSize(18);
  pdf.text('Your Content Optimization Potential', 20, 110);
  
  // Metrics with custom formatting
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(12);
  const metrics_list = [
    { label: 'Time Recovered Monthly:', value: `${metrics.timeRecovered} hours` },
    { label: 'Productivity Value:', value: `$${metrics.productivityValue.toLocaleString()}` },
    { label: 'Additional Content Generated:', value: `${metrics.contentGenerated} pieces` },
    { label: 'Cost Reduction:', value: `${metrics.costReduction}%` },
    { label: 'Stress Reduction:', value: `${metrics.stressReduction}%` },
    { label: 'Additional Monthly Revenue:', value: `$${metrics.revenuePotential.toLocaleString()}` }
  ];
  
  let y = 125;
  metrics_list.forEach(metric => {
    pdf.setFont('helvetica', 'normal');
    pdf.text(metric.label, 25, y);
    pdf.setFont('helvetica', 'bold');
    pdf.text(metric.value, 140, y);
    y += 12;
  });
  
  // Recommendations section
  pdf.setTextColor(157, 92, 255); // #9D5CFF
  pdf.setFontSize(18);
  pdf.text('Key Recommendations', 20, y + 10);
  
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(12);
  const recommendations = [
    '1. Implement a content repurposing strategy to maximize existing content',
    '2. Use automation tools to reduce manual content adaptation time',
    '3. Focus on high-performing content formats for better ROI',
    '4. Streamline your content workflow to reduce team stress',
    '5. Regularly measure and adjust your content strategy based on metrics'
  ];
  
  y += 25;
  recommendations.forEach(rec => {
    pdf.setFont('helvetica', 'normal');
    pdf.text(rec, 25, y);
    y += 12;
  });
  
  // CTA Button
  const ctaY = y + 20;
  pdf.setFillColor(75, 158, 255); // #4B9EFF
  pdf.roundedRect(pageWidth / 2 - 80, ctaY - 15, 160, 30, 3, 3, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text('Book Your Free Discovery Call', pageWidth / 2, ctaY, { align: 'center' });
  
  // Add CTA link
  pdf.link(pageWidth / 2 - 80, ctaY - 15, 160, 30, 
    { url: 'https://calendly.com/rockey-repurposly/social-flip-discovery-call' });
  
  // Footer with gradient
  pdf.setFillColor(157, 92, 255); // #9D5CFF
  pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.text('Generated by SocialFlip.io - Your Content Repurposing Partner', 
    pageWidth / 2, pageHeight - 8, { align: 'center' });
  
  return pdf;
};