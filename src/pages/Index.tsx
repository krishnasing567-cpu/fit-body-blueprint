import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BMICalculator from '@/components/BMICalculator';
import CalorieCalculator from '@/components/CalorieCalculator';
import MealPlanner from '@/components/MealPlanner';
import WorkoutPlanner from '@/components/WorkoutPlanner';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NutritionTips from '@/components/NutritionTips';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>NutriLife - Calculate BMI & Get Personalized Meal Plans for Bulking & Fitness</title>
        <meta name="description" content="Transform your health with NutriLife. Calculate your BMI, get personalized meal plans for bulking, cutting, or maintaining weight. Science-backed nutrition guidance for your fitness goals." />
        <meta name="keywords" content="BMI calculator, meal plans, nutrition, bulking diet, fitness, health, diet plan, muscle building, workout planner, calorie calculator" />
        <link rel="canonical" href="https://nutrilife.com" />
        
        {/* Open Graph */}
        <meta property="og:title" content="NutriLife - Your Health & Nutrition Partner" />
        <meta property="og:description" content="Calculate your BMI and get personalized meal plans for bulking and fitness goals." />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "NutriLife",
            "description": "Health and nutrition platform with BMI calculator, calorie calculator, workout planner and personalized meal plans",
            "url": "https://nutrilife.com"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main>
          <HeroSection />
          <BMICalculator />
          <CalorieCalculator />
          <MealPlanner />
          <WorkoutPlanner />
          <section id="features">
            <FeaturesSection />
          </section>
          <TestimonialsSection />
          <NutritionTips />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
