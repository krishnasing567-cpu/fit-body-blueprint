import { useState } from 'react';
import { Utensils, Dumbbell, Flame, Apple, Clock, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mealPrepImage from '@/assets/meal-prep.jpg';
import bulkingImage from '@/assets/bulking.jpg';

type Goal = 'bulking' | 'cutting' | 'maintain';

interface MealPlan {
  title: string;
  calories: string;
  protein: string;
  meals: {
    time: string;
    name: string;
    description: string;
  }[];
  tips: string[];
}

const mealPlans: Record<Goal, MealPlan> = {
  bulking: {
    title: 'Muscle Building Plan',
    calories: '3000-3500',
    protein: '180-220g',
    meals: [
      { time: '7:00 AM', name: 'Power Breakfast', description: '4 eggs, oatmeal with banana, Greek yogurt' },
      { time: '10:00 AM', name: 'Morning Snack', description: 'Protein shake with peanut butter' },
      { time: '1:00 PM', name: 'Muscle Lunch', description: 'Grilled chicken, brown rice, vegetables' },
      { time: '4:00 PM', name: 'Pre-Workout', description: 'Banana, almonds, protein bar' },
      { time: '7:00 PM', name: 'Recovery Dinner', description: 'Salmon, sweet potato, quinoa salad' },
      { time: '9:00 PM', name: 'Night Fuel', description: 'Cottage cheese with berries' },
    ],
    tips: [
      'Eat every 2-3 hours to maximize muscle protein synthesis',
      'Consume 1g protein per pound of body weight',
      'Include complex carbs in every meal',
      'Stay hydrated with at least 1 gallon of water daily',
    ],
  },
  cutting: {
    title: 'Fat Loss Plan',
    calories: '1800-2200',
    protein: '150-180g',
    meals: [
      { time: '7:00 AM', name: 'Lean Breakfast', description: 'Egg whites, spinach, whole grain toast' },
      { time: '10:00 AM', name: 'Light Snack', description: 'Greek yogurt with berries' },
      { time: '1:00 PM', name: 'Clean Lunch', description: 'Grilled fish, mixed greens, lemon dressing' },
      { time: '4:00 PM', name: 'Protein Boost', description: 'Protein shake, apple slices' },
      { time: '7:00 PM', name: 'Light Dinner', description: 'Turkey breast, steamed vegetables, quinoa' },
    ],
    tips: [
      'Create a 500-calorie deficit for steady fat loss',
      'Prioritize protein to preserve muscle mass',
      'Drink water before meals to control appetite',
      'Include fiber-rich vegetables in every meal',
    ],
  },
  maintain: {
    title: 'Maintenance Plan',
    calories: '2200-2600',
    protein: '140-160g',
    meals: [
      { time: '7:00 AM', name: 'Balanced Breakfast', description: '2 eggs, avocado toast, fruit' },
      { time: '10:00 AM', name: 'Mid-Morning', description: 'Mixed nuts, protein bar' },
      { time: '1:00 PM', name: 'Wholesome Lunch', description: 'Chicken salad, whole grain wrap' },
      { time: '4:00 PM', name: 'Afternoon Fuel', description: 'Hummus with vegetables' },
      { time: '7:00 PM', name: 'Family Dinner', description: 'Lean beef, roasted vegetables, rice' },
    ],
    tips: [
      'Balance macros: 40% carbs, 30% protein, 30% fats',
      'Listen to your body\'s hunger signals',
      'Allow occasional treats in moderation',
      'Focus on nutrient-dense whole foods',
    ],
  },
};

const MealPlanner = () => {
  const [selectedGoal, setSelectedGoal] = useState<Goal>('bulking');
  const currentPlan = mealPlans[selectedGoal];

  return (
    <section id="meal-plans" className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            <Utensils className="w-4 h-4" />
            <span>Personalized Nutrition</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient-accent">Goal</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Select your fitness goal and get a customized meal plan designed for your success
          </p>
        </div>

        {/* Goal Selection */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { id: 'bulking' as Goal, icon: Dumbbell, title: 'Bulking', desc: 'Build muscle mass', image: bulkingImage },
            { id: 'cutting' as Goal, icon: Flame, title: 'Cutting', desc: 'Burn fat, stay lean', image: mealPrepImage },
            { id: 'maintain' as Goal, icon: Apple, title: 'Maintain', desc: 'Stay healthy', image: mealPrepImage },
          ].map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover-lift ${
                selectedGoal === goal.id 
                  ? 'ring-4 ring-primary shadow-glow' 
                  : 'ring-1 ring-border'
              }`}
            >
              <div className="absolute inset-0">
                <img src={goal.image} alt={goal.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
              </div>
              <div className="relative p-8 text-left h-48 flex flex-col justify-end">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  selectedGoal === goal.id ? 'bg-primary' : 'bg-card/20 backdrop-blur-sm'
                }`}>
                  <goal.icon className={`w-6 h-6 ${selectedGoal === goal.id ? 'text-primary-foreground' : 'text-card'}`} />
                </div>
                <h3 className="text-xl font-bold text-card">{goal.title}</h3>
                <p className="text-card/80 text-sm">{goal.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Meal Plan Display */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Overview */}
          <div className="space-y-6 animate-fade-in">
            <div className="glass-card p-6">
              <h3 className="text-2xl font-bold mb-4">{currentPlan.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="text-sm text-muted-foreground mb-1">Daily Calories</div>
                  <div className="text-2xl font-bold text-gradient">{currentPlan.calories}</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="text-sm text-muted-foreground mb-1">Daily Protein</div>
                  <div className="text-2xl font-bold text-gradient">{currentPlan.protein}</div>
                </div>
              </div>
            </div>

            {/* Meals Timeline */}
            <div className="glass-card p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Daily Meal Schedule
              </h4>
              <div className="space-y-4">
                {currentPlan.meals.map((meal, index) => (
                  <div 
                    key={index} 
                    className="flex gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-sm font-medium text-primary w-20 shrink-0">{meal.time}</div>
                    <div className="flex-1">
                      <div className="font-medium">{meal.name}</div>
                      <div className="text-sm text-muted-foreground">{meal.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tips & Image */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-64">
              <img 
                src={mealPrepImage} 
                alt="Healthy meal prep" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-2xl font-bold text-card mb-2">Ready to Start?</h4>
                <p className="text-card/80">Follow this plan consistently for best results</p>
              </div>
            </div>

            <div className="glass-card p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Apple className="w-5 h-5 text-accent" />
                Pro Tips for Success
              </h4>
              <ul className="space-y-3">
                {currentPlan.tips.map((tip, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-3 animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="accent" size="lg" className="w-full">
              Download Full Meal Plan
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanner;
