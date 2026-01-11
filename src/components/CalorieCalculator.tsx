import { useState } from 'react';
import { Flame, Activity, Target, Scale, Ruler, User, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
type Goal = 'lose' | 'maintain' | 'gain';

interface CalorieResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const activityLevels: { id: ActivityLevel; label: string; description: string; multiplier: number }[] = [
  { id: 'sedentary', label: 'Sedentary', description: 'Little or no exercise', multiplier: 1.2 },
  { id: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week', multiplier: 1.375 },
  { id: 'moderate', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week', multiplier: 1.55 },
  { id: 'active', label: 'Very Active', description: 'Hard exercise 6-7 days/week', multiplier: 1.725 },
  { id: 'veryActive', label: 'Extra Active', description: 'Intense exercise & physical job', multiplier: 1.9 },
];

const goals: { id: Goal; label: string; description: string; adjustment: number }[] = [
  { id: 'lose', label: 'Lose Weight', description: 'Caloric deficit for fat loss', adjustment: -500 },
  { id: 'maintain', label: 'Maintain', description: 'Stay at current weight', adjustment: 0 },
  { id: 'gain', label: 'Build Muscle', description: 'Caloric surplus for muscle gain', adjustment: 500 },
];

const CalorieCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [result, setResult] = useState<CalorieResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCalories = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (weightNum > 0 && heightNum > 0 && ageNum > 0) {
      setIsCalculating(true);

      setTimeout(() => {
        // Mifflin-St Jeor Equation for BMR
        let bmr: number;
        if (gender === 'male') {
          bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
        } else {
          bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
        }

        const selectedActivity = activityLevels.find(a => a.id === activityLevel)!;
        const tdee = bmr * selectedActivity.multiplier;
        
        const selectedGoal = goals.find(g => g.id === goal)!;
        const targetCalories = Math.round(tdee + selectedGoal.adjustment);

        // Macro calculations based on goal
        let proteinRatio: number, carbRatio: number, fatRatio: number;
        
        if (goal === 'lose') {
          proteinRatio = 0.35;
          carbRatio = 0.35;
          fatRatio = 0.30;
        } else if (goal === 'gain') {
          proteinRatio = 0.30;
          carbRatio = 0.45;
          fatRatio = 0.25;
        } else {
          proteinRatio = 0.30;
          carbRatio = 0.40;
          fatRatio = 0.30;
        }

        const protein = Math.round((targetCalories * proteinRatio) / 4);
        const carbs = Math.round((targetCalories * carbRatio) / 4);
        const fats = Math.round((targetCalories * fatRatio) / 9);

        setResult({
          bmr: Math.round(bmr),
          tdee: Math.round(tdee),
          targetCalories,
          protein,
          carbs,
          fats,
        });

        setIsCalculating(false);
      }, 800);
    }
  };

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setAge('');
    setResult(null);
  };

  return (
    <section id="calorie-calculator" className="section-padding">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Flame className="w-4 h-4" />
            <span>Calorie & Macro Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Know Your <span className="text-gradient">Daily Needs</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Calculate your exact calorie and macro requirements based on your body and activity level
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="space-y-6">
            <div className="glass-card p-8">
              {/* Gender Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">Gender</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3 ${
                      gender === 'male' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Male</span>
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-3 ${
                      gender === 'female' 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Female</span>
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="25"
                      className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="70"
                      className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Height (cm)</label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="175"
                      className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  <Activity className="inline w-4 h-4 mr-2" />
                  Activity Level
                </label>
                <div className="space-y-2">
                  {activityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setActivityLevel(level.id)}
                      className={`w-full p-3 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between ${
                        activityLevel === level.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div>
                        <div className={`font-medium text-sm ${activityLevel === level.id ? 'text-primary' : ''}`}>
                          {level.label}
                        </div>
                        <div className="text-xs text-muted-foreground">{level.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        activityLevel === level.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground/50'
                      }`}>
                        {activityLevel === level.id && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full m-0.5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  <Target className="inline w-4 h-4 mr-2" />
                  Your Goal
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGoal(g.id)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 text-center ${
                        goal === g.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`font-medium text-sm ${goal === g.id ? 'text-primary' : ''}`}>
                        {g.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1"
                  onClick={calculateCalories}
                  disabled={!weight || !height || !age || isCalculating}
                >
                  {isCalculating ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Flame className="w-5 h-5" />
                      Calculate
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Main Result */}
                <div className="glass-card p-8 animate-scale-in">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-3">
                      <Zap className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="text-5xl font-bold mb-1">{result.targetCalories}</div>
                    <div className="text-muted-foreground">Daily Calories Target</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">BMR</div>
                      <div className="text-xl font-bold">{result.bmr}</div>
                      <div className="text-xs text-muted-foreground">calories/day</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-sm text-muted-foreground mb-1">TDEE</div>
                      <div className="text-xl font-bold">{result.tdee}</div>
                      <div className="text-xs text-muted-foreground">calories/day</div>
                    </div>
                  </div>
                </div>

                {/* Macros */}
                <div className="glass-card p-8 animate-scale-in" style={{ animationDelay: '100ms' }}>
                  <h4 className="font-semibold mb-4">Daily Macro Breakdown</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-primary/10">
                      <div className="text-3xl font-bold text-primary">{result.protein}g</div>
                      <div className="text-sm text-muted-foreground">Protein</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(result.protein * 4)} cal
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-accent/10">
                      <div className="text-3xl font-bold text-accent">{result.carbs}g</div>
                      <div className="text-sm text-muted-foreground">Carbs</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(result.carbs * 4)} cal
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-secondary/50">
                      <div className="text-3xl font-bold">{result.fats}g</div>
                      <div className="text-sm text-muted-foreground">Fats</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round(result.fats * 9)} cal
                      </div>
                    </div>
                  </div>

                  {/* Visual Breakdown */}
                  <div className="mt-6">
                    <div className="h-4 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-primary transition-all duration-500"
                        style={{ width: `${(result.protein * 4 / result.targetCalories) * 100}%` }}
                      />
                      <div 
                        className="bg-accent transition-all duration-500"
                        style={{ width: `${(result.carbs * 4 / result.targetCalories) * 100}%` }}
                      />
                      <div 
                        className="bg-muted-foreground transition-all duration-500"
                        style={{ width: `${(result.fats * 9 / result.targetCalories) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>Protein {Math.round((result.protein * 4 / result.targetCalories) * 100)}%</span>
                      <span>Carbs {Math.round((result.carbs * 4 / result.targetCalories) * 100)}%</span>
                      <span>Fats {Math.round((result.fats * 9 / result.targetCalories) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-card p-8 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Calculate Your Needs</h3>
                <p className="text-muted-foreground max-w-sm">
                  Enter your details and activity level to get personalized calorie and macro recommendations
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalorieCalculator;
