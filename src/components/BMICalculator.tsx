import { useState } from 'react';
import { Calculator, Scale, Ruler, User, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
  icon: React.ReactNode;
  message: string;
}

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert cm to m

    if (weightNum > 0 && heightNum > 0) {
      setIsCalculating(true);
      
      setTimeout(() => {
        const bmi = weightNum / (heightNum * heightNum);
        let category: string;
        let color: string;
        let icon: React.ReactNode;
        let message: string;

        if (bmi < 18.5) {
          category = 'Underweight';
          color = 'text-blue-500';
          icon = <TrendingDown className="w-8 h-8" />;
          message = 'You may need to gain some healthy weight. Consider a bulking meal plan.';
        } else if (bmi < 25) {
          category = 'Normal Weight';
          color = 'text-primary';
          icon = <Minus className="w-8 h-8" />;
          message = 'Great job! Maintain your healthy lifestyle with balanced nutrition.';
        } else if (bmi < 30) {
          category = 'Overweight';
          color = 'text-accent';
          icon = <TrendingUp className="w-8 h-8" />;
          message = 'Consider a calorie-controlled diet to reach a healthier weight.';
        } else {
          category = 'Obese';
          color = 'text-destructive';
          icon = <TrendingUp className="w-8 h-8" />;
          message = 'We recommend consulting a healthcare provider and following a structured diet plan.';
        }

        setResult({ bmi, category, color, icon, message });
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
    <section id="bmi-calculator" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Calculator className="w-4 h-4" />
            <span>BMI Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Know Your <span className="text-gradient">Body Mass Index</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Understanding your BMI is the first step towards achieving your fitness goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Calculator Form */}
          <div className="glass-card p-8 animate-scale-in">
            <div className="space-y-6">
              {/* Gender Selection */}
              <div>
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

              {/* Age Input */}
              <div>
                <label className="block text-sm font-medium mb-3">Age (years)</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Weight Input */}
              <div>
                <label className="block text-sm font-medium mb-3">Weight (kg)</label>
                <div className="relative">
                  <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Height Input */}
              <div>
                <label className="block text-sm font-medium mb-3">Height (cm)</label>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter your height"
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1"
                  onClick={calculateBMI}
                  disabled={!weight || !height || isCalculating}
                >
                  {isCalculating ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      Calculate BMI
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="space-y-6">
            {result ? (
              <div className="glass-card p-8 animate-scale-in">
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4 ${result.color}`}>
                    {result.icon}
                  </div>
                  <div className="text-6xl font-bold mb-2">{result.bmi.toFixed(1)}</div>
                  <div className={`text-2xl font-semibold ${result.color}`}>{result.category}</div>
                </div>

                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                  <p className="text-muted-foreground text-center">{result.message}</p>
                </div>

                {/* BMI Scale */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Underweight</span>
                    <span>Normal</span>
                    <span>Overweight</span>
                    <span>Obese</span>
                  </div>
                  <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-primary via-50% via-accent to-destructive relative">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg transition-all duration-500"
                      style={{ 
                        left: `${Math.min(Math.max((result.bmi - 15) / 25 * 100, 0), 100)}%`,
                        transform: 'translateX(-50%) translateY(-50%)'
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>15</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enter Your Details</h3>
                <p className="text-muted-foreground">
                  Fill in your information to calculate your BMI and get personalized recommendations
                </p>
              </div>
            )}

            {/* BMI Categories Info */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { range: '< 18.5', label: 'Underweight', color: 'bg-blue-500' },
                { range: '18.5 - 24.9', label: 'Normal', color: 'bg-primary' },
                { range: '25 - 29.9', label: 'Overweight', color: 'bg-accent' },
                { range: '≥ 30', label: 'Obese', color: 'bg-destructive' },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div>
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">BMI {item.range}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BMICalculator;
