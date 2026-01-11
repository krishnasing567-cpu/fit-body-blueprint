import { Apple, Droplets, Moon, Activity, Salad, Dumbbell } from 'lucide-react';

const tips = [
  {
    icon: Apple,
    title: 'Eat Whole Foods',
    description: 'Focus on unprocessed, nutrient-dense whole foods for optimal health.',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    icon: Droplets,
    title: 'Stay Hydrated',
    description: 'Drink at least 8 glasses of water daily for proper body function.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Moon,
    title: 'Quality Sleep',
    description: '7-9 hours of sleep is crucial for muscle recovery and metabolism.',
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    icon: Activity,
    title: 'Regular Exercise',
    description: 'Combine cardio and strength training for comprehensive fitness.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Salad,
    title: 'Balanced Macros',
    description: 'Balance proteins, carbs, and fats according to your goals.',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: Dumbbell,
    title: 'Progressive Overload',
    description: 'Gradually increase workout intensity for continuous progress.',
    color: 'bg-amber-500/10 text-amber-500',
  },
];

const NutritionTips = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Essential <span className="text-gradient">Nutrition Tips</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple habits that make a big difference in your health journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <div 
              key={tip.title}
              className="group flex gap-4 p-6 rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <tip.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold mb-2">{tip.title}</h3>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NutritionTips;
