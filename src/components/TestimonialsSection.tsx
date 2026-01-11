import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  age: number;
  location: string;
  beforeWeight: string;
  afterWeight: string;
  duration: string;
  story: string;
  rating: number;
  beforeImage: string;
  afterImage: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Chen',
    age: 28,
    location: 'Los Angeles, CA',
    beforeWeight: '195 lbs',
    afterWeight: '165 lbs',
    duration: '6 months',
    story: 'NutriLife completely transformed my approach to nutrition. The personalized meal plans made it easy to stay on track, and the BMI calculator helped me set realistic goals. I never thought I could lose 30 pounds while still enjoying delicious food!',
    rating: 5,
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=300&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 34,
    location: 'Austin, TX',
    beforeWeight: '145 lbs',
    afterWeight: '135 lbs',
    duration: '4 months',
    story: 'As a busy mom, I never had time to plan healthy meals. NutriLife made it simple with ready-to-follow meal plans. I not only lost weight but gained so much energy. My whole family now eats healthier thanks to this platform!',
    rating: 5,
    beforeImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'James Rodriguez',
    age: 25,
    location: 'Miami, FL',
    beforeWeight: '155 lbs',
    afterWeight: '180 lbs',
    duration: '8 months',
    story: 'I wanted to bulk up but struggled to eat enough clean calories. The bulking meal plan was a game-changer! I gained 25 pounds of lean muscle and finally achieved the physique I always dreamed of. The progress tracking kept me motivated every step of the way.',
    rating: 5,
    beforeImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=300&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Emily Thompson',
    age: 31,
    location: 'Seattle, WA',
    beforeWeight: '170 lbs',
    afterWeight: '140 lbs',
    duration: '7 months',
    story: 'After years of yo-yo dieting, NutriLife taught me sustainable eating habits. The macro calculator showed me exactly what my body needed. I lost 30 pounds and kept it off for over a year now. This is the last diet I will ever need!',
    rating: 5,
    beforeImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            <Star className="w-4 h-4" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real <span className="text-gradient-accent">Transformations</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See how NutriLife has helped thousands achieve their health and fitness goals
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Background Quote */}
            <Quote className="absolute -top-4 -left-4 w-32 h-32 text-primary/5 rotate-180" />
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Before/After Images */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative group">
                    <img
                      src={current.beforeImage}
                      alt={`${current.name} before`}
                      className="w-full aspect-[3/4] object-cover rounded-xl grayscale"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                      <span className="text-xs text-muted-foreground">Before</span>
                      <div className="font-bold text-sm">{current.beforeWeight}</div>
                    </div>
                  </div>
                  <div className="relative group">
                    <img
                      src={current.afterImage}
                      alt={`${current.name} after`}
                      className="w-full aspect-[3/4] object-cover rounded-xl"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                      <span className="text-xs text-primary-foreground/80">After</span>
                      <div className="font-bold text-sm text-primary-foreground">{current.afterWeight}</div>
                    </div>
                  </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {current.duration} Transformation
                </div>
              </div>

              {/* Story */}
              <div className="space-y-6">
                <div className="flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="text-lg text-muted-foreground leading-relaxed">
                  "{current.story}"
                </blockquote>

                <div className="pt-4 border-t border-border">
                  <div className="font-bold text-xl">{current.name}</div>
                  <div className="text-muted-foreground">
                    {current.age} years old • {current.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
          {[
            { value: '50K+', label: 'Happy Users' },
            { value: '2M+', label: 'Pounds Lost' },
            { value: '98%', label: 'Success Rate' },
            { value: '4.9/5', label: 'Average Rating' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
