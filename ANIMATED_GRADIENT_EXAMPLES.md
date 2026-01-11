# Animated Gradient Component - Integration Examples

Quick examples showing how to integrate the animated gradient component into your FitBodyBlueprint app.

---

## 📍 Where to Use This Component

### 1. Hero Section Enhancement

Add animated gradient as background to existing HeroSection:

```tsx
// src/components/HeroSection.tsx
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <AnimatedGradient 
        colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
        speed={0.05}
        blur="medium"
      />
      
      {/* Existing hero content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">FitBodyBlueprint</h1>
        <p className="text-xl mb-8">Your personalized fitness journey starts here</p>
      </div>
    </section>
  )
}
```

---

### 2. New StatsSection Component

Create a new section to showcase fitness metrics:

```tsx
// src/components/StatsSection.tsx
import { AnimatedGradientDemo } from "@/components/animated-gradient-demo"

const StatsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-12">Your Progress Metrics</h2>
        <AnimatedGradientDemo />
      </div>
    </section>
  )
}

export default StatsSection
```

Then add to `src/pages/Index.tsx`:
```tsx
import StatsSection from '@/components/StatsSection'

const Index = () => {
  return (
    <>
      {/* ... existing components ... */}
      <StatsSection />
      {/* ... more components ... */}
    </>
  )
}
```

---

### 3. Custom Fitness-Themed Bento Cards

Create fitness-specific cards:

```tsx
// src/components/FitnessBentoDemo.tsx
import { BentoCard } from "@/components/animated-gradient-demo"
import React from "react"

const FitnessBentoDemo: React.FC = () => {
  return (
    <div className="w-full bg-background h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BentoCard
          title="Calories Burned"
          value="2,450"
          subtitle="kcal today"
          colors={["#FF6B6B", "#FF8E72", "#FFA07A"]}
          delay={0}
        />
        <BentoCard
          title="Workouts Completed"
          value={24}
          subtitle="this month"
          colors={["#4ECDC4", "#45B7D1", "#3BA8D4"]}
          delay={0.2}
        />
        <BentoCard
          title="Muscle Gained"
          value="2.5 kg"
          subtitle="3 months progress"
          colors={["#95E1D3", "#80CED1", "#6DBEAA"]}
          delay={0.4}
        />
        <div className="md:col-span-2">
          <BentoCard
            title="Current Weight"
            value="82 kg"
            subtitle="Target: 78 kg - 4 kg to go"
            colors={["#F9CA24", "#F0932B", "#EB984E"]}
            delay={0.6}
          />
        </div>
        <BentoCard
          title="Hydration Level"
          value="8/8 cups"
          subtitle="Daily water intake goal met"
          colors={["#6C63FF", "#7B68EE", "#8B7FFF"]}
          delay={0.8}
        />
      </div>
    </div>
  )
}

export { FitnessBentoDemo }
```

---

### 4. Feature Cards with Gradient

Highlight app features:

```tsx
// src/components/FeatureCard.tsx
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  colors: string[]
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  colors
}) => {
  return (
    <div className="relative rounded-lg overflow-hidden h-64 bg-card">
      <AnimatedGradient colors={colors} blur="light" speed={3} />
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="text-4xl mb-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
          <p className="text-sm text-foreground/80">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard

// Usage
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <FeatureCard
    title="BMI Calculator"
    description="Calculate your BMI in seconds"
    icon="📊"
    colors={["#3B82F6", "#60A5FA"]}
  />
  <FeatureCard
    title="Meal Planning"
    description="Personalized nutrition plans"
    icon="🍎"
    colors={["#10B981", "#34D399"]}
  />
  <FeatureCard
    title="Workouts"
    description="Custom exercise routines"
    icon="💪"
    colors={["#F59E0B", "#FBBF24"]}
  />
</div>
```

---

### 5. Dashboard with Animated Cards

Create a user dashboard:

```tsx
// src/pages/Dashboard.tsx
import { AnimatedGradientDemo } from "@/components/animated-gradient-demo"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import Navbar from "@/components/Navbar"

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-12">Your Fitness Dashboard</h1>
          <AnimatedGradientDemo />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Dashboard

// Add to App.tsx routes
<Route path="/dashboard" element={<Dashboard />} />
```

---

## 🎨 Color Palettes for Fitness App

### Health & Wellness
```tsx
colors={["#10B981", "#34D399", "#6EE7B7"]} // Green palette
```

### Energy & Performance
```tsx
colors={["#F59E0B", "#FBBF24", "#FCD34D"]} // Gold/Orange palette
```

### Strength & Power
```tsx
colors={["#EF4444", "#F87171", "#FCA5A5"]} // Red/Pink palette
```

### Endurance & Stamina
```tsx
colors={["#3B82F6", "#60A5FA", "#93C5FD"]} // Blue palette
```

### Muscle Gain
```tsx
colors={["#A78BFA", "#C4B5FD", "#E9D5FF"]} // Purple palette
```

### Recovery & Rest
```tsx
colors={["#4F46E5", "#6366F1", "#818CF8"]} // Indigo palette
```

---

## 📊 Fitness Metrics Examples

### BMI Calculation Display
```tsx
<BentoCard
  title="Your BMI"
  value={22.5}
  subtitle="Normal weight - Great job!"
  colors={["#10B981", "#34D399", "#6EE7B7"]}
  delay={0}
/>
```

### Weekly Stats
```tsx
<BentoCard
  title="Weekly Workouts"
  value={5}
  subtitle="of 7 goal completed"
  colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
  delay={0.2}
/>
```

### Nutrition Goals
```tsx
<BentoCard
  title="Daily Protein"
  value="145g / 150g"
  subtitle="Almost at target!"
  colors={["#F59E0B", "#FBBF24", "#FCD34D"]}
  delay={0.4}
/>
```

---

## 🔧 Speed Recommendations

### Slow & Relaxing (Health-focused)
```tsx
speed={0.02} // Very slow, calming effect
blur="heavy"
```

### Medium (Default)
```tsx
speed={0.05} // Good for dashboards
blur="medium"
```

### Fast & Energetic (Performance-focused)
```tsx
speed={0.1} // Quick animation
blur="light"
```

---

## 🎬 Animation Timing

Use delay to stagger cards:

```tsx
// Fitness metrics with staggered animation
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <BentoCard title="Weight" value="82 kg" colors={colors1} delay={0} />
  <BentoCard title="BMI" value="22.5" colors={colors2} delay={0.2} />
  <BentoCard title="Muscle %" value="35%" colors={colors3} delay={0.4} />
  <BentoCard title="Fat %" value="18%" colors={colors4} delay={0.6} />
</div>
```

---

## ✅ Integration Checklist

- [ ] Component files created and imported
- [ ] Tailwind animation styles applied
- [ ] Use in at least one existing section
- [ ] Create new stats/dashboard section
- [ ] Test on mobile and desktop
- [ ] Adjust colors to match brand
- [ ] Optimize animation speed
- [ ] Add to your pages as needed

---

## 🚀 Quick Integration Steps

1. **Choose a location** - Pick one of the examples above
2. **Import components**:
   ```tsx
   import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"
   import { AnimatedGradientDemo } from "@/components/animated-gradient-demo"
   ```
3. **Copy the code** - Use examples above
4. **Test it** - Run `npm run dev` and check it out
5. **Customize** - Adjust colors, speed, and blur
6. **Deploy** - Everything is ready for production!

---

**Status**: Ready for Integration
**Complexity**: Low (just copy-paste examples)
**Time to Integrate**: 5-15 minutes
