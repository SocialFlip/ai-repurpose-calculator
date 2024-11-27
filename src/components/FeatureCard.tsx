interface FeatureCardProps {
  title: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
}

export default function FeatureCard({ title, description, metric, icon }: FeatureCardProps) {
  return (
    <div className="card group">
      <div className="feature-icon flex items-center justify-center w-12 h-12 rounded-full 
                    bg-gradient-primary text-white mb-4 transform transition-transform 
                    duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="text-2xl font-bold gradient-text">{metric}</div>
    </div>
  );
}