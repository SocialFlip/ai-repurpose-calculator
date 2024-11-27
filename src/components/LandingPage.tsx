import { useState } from 'react';
import { FiClock, FiTrendingUp, FiDollarSign, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FeatureCard from './FeatureCard';

interface FormData {
  name: string;
  email: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  submit?: string;
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://hook.us2.make.com/uy0yllw6gxpx6j1blr91dlqmx8ry6itg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      navigate('/assessment');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ ...errors, submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 gradient-text">
            Content Repurposing AI Assessment Tool
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover real savings, in real-time, for content ROI & repurposing
          </p>
        </section>

        {/* Form Section */}
        <section className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="card">
            <h2 className="text-2xl font-semibold mb-6 text-center">Get Your Free Assessment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="w-full btn-primary relative"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <FiLoader className="animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  'Start Assessment'
                )}
              </button>
              {errors.submit && (
                <p className="mt-2 text-sm text-red-500 text-center">{errors.submit}</p>
              )}
            </form>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Time Savings"
              description="Reduce your content creation time significantly with focused repurposing workflows"
              metric="30-60% Time Reduction"
              icon={<FiClock className="w-6 h-6" />}
            />
            <FeatureCard
              title="Increased Output"
              description="Multiply your content output across different platforms"
              metric="7-21x Content Multiplication"
              icon={<FiTrendingUp className="w-6 h-6" />}
            />
            <FeatureCard
              title="Cost Efficiency"
              description="Maximize your content marketing ROI with smart repurposing"
              metric="10x ROI Potential"
              icon={<FiDollarSign className="w-6 h-6" />}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <span className="text-xl font-bold gradient-text mb-4 md:mb-0">SocialFlip.io</span>
            <div className="flex items-center space-x-6">
              <a
                href="mailto:team@socialflip.io"
                className="text-gray-600 dark:text-gray-300 hover:text-primary"
              >
                Contact Us
              </a>
              <p className="text-gray-500">© 2024 SocialFlip.io. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}