import { Heart, Brain, Zap, Shield, Leaf, Timer } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Heart Health',
    description: 'Improve cardiovascular health with balanced nutrition and proper macros',
  },
  {
    icon: Brain,
    title: 'Mental Clarity',
    description: 'Boost cognitive function with brain-healthy nutrients and superfoods',
  },
  {
    icon: Zap,
    title: 'Energy Boost',
    description: 'Fuel your workouts and daily activities with sustained energy',
  },
  {
    icon: Shield,
    title: 'Immune Support',
    description: 'Strengthen your immune system with vitamin-rich meal plans',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'All recommendations use whole, unprocessed natural foods',
  },
  {
    icon: Timer,
    title: 'Quick Results',
    description: 'See visible changes in just 4-8 weeks with consistent effort',
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">NutriLife</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Science-backed nutrition guidance tailored to your unique body and goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group glass-card p-8 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
