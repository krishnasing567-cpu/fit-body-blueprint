import { useState } from 'react';
import { Dumbbell, Play, Clock, Flame, ChevronRight, Check, Calendar, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

type WorkoutCategory = 'push' | 'pull' | 'legs' | 'cardio';

interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  videoUrl: string;
  muscleGroup: string;
}

interface WorkoutDay {
  id: WorkoutCategory;
  title: string;
  description: string;
  duration: string;
  calories: string;
  exercises: Exercise[];
}

const workoutDays: WorkoutDay[] = [
  {
    id: 'push',
    title: 'Push Day',
    description: 'Chest, Shoulders & Triceps',
    duration: '60 min',
    calories: '400-500',
    exercises: [
      { name: 'Barbell Bench Press', sets: '4', reps: '8-10', rest: '90s', videoUrl: 'https://www.youtube.com/embed/rT7DgCr-3pg', muscleGroup: 'Chest' },
      { name: 'Incline Dumbbell Press', sets: '3', reps: '10-12', rest: '60s', videoUrl: 'https://www.youtube.com/embed/8iPEnn-ltC8', muscleGroup: 'Upper Chest' },
      { name: 'Overhead Press', sets: '4', reps: '8-10', rest: '90s', videoUrl: 'https://www.youtube.com/embed/2yjwXTZQDDI', muscleGroup: 'Shoulders' },
      { name: 'Lateral Raises', sets: '3', reps: '12-15', rest: '45s', videoUrl: 'https://www.youtube.com/embed/3VcKaXpzqRo', muscleGroup: 'Side Delts' },
      { name: 'Tricep Pushdowns', sets: '3', reps: '12-15', rest: '45s', videoUrl: 'https://www.youtube.com/embed/2-LAMcpzODU', muscleGroup: 'Triceps' },
      { name: 'Overhead Tricep Extension', sets: '3', reps: '10-12', rest: '45s', videoUrl: 'https://www.youtube.com/embed/YbX7Wd8jQ-Q', muscleGroup: 'Triceps' },
    ],
  },
  {
    id: 'pull',
    title: 'Pull Day',
    description: 'Back & Biceps',
    duration: '55 min',
    calories: '350-450',
    exercises: [
      { name: 'Deadlift', sets: '4', reps: '6-8', rest: '120s', videoUrl: 'https://www.youtube.com/embed/op9kVnSso6Q', muscleGroup: 'Back/Full Body' },
      { name: 'Pull-ups', sets: '4', reps: '8-12', rest: '90s', videoUrl: 'https://www.youtube.com/embed/eGo4IYlbE5g', muscleGroup: 'Lats' },
      { name: 'Barbell Rows', sets: '4', reps: '8-10', rest: '90s', videoUrl: 'https://www.youtube.com/embed/FWJR5Ve8bnQ', muscleGroup: 'Back' },
      { name: 'Face Pulls', sets: '3', reps: '15-20', rest: '45s', videoUrl: 'https://www.youtube.com/embed/rep-qVOkqgk', muscleGroup: 'Rear Delts' },
      { name: 'Barbell Curls', sets: '3', reps: '10-12', rest: '60s', videoUrl: 'https://www.youtube.com/embed/kwG2ipFRgfo', muscleGroup: 'Biceps' },
      { name: 'Hammer Curls', sets: '3', reps: '10-12', rest: '45s', videoUrl: 'https://www.youtube.com/embed/zC3nLlEvin4', muscleGroup: 'Biceps' },
    ],
  },
  {
    id: 'legs',
    title: 'Leg Day',
    description: 'Quads, Hamstrings & Glutes',
    duration: '65 min',
    calories: '500-600',
    exercises: [
      { name: 'Barbell Squats', sets: '4', reps: '8-10', rest: '120s', videoUrl: 'https://www.youtube.com/embed/ultWZbUMPL8', muscleGroup: 'Quads' },
      { name: 'Romanian Deadlifts', sets: '4', reps: '10-12', rest: '90s', videoUrl: 'https://www.youtube.com/embed/jEy_czb3RKA', muscleGroup: 'Hamstrings' },
      { name: 'Leg Press', sets: '3', reps: '12-15', rest: '90s', videoUrl: 'https://www.youtube.com/embed/IZxyjW7MPJQ', muscleGroup: 'Quads' },
      { name: 'Walking Lunges', sets: '3', reps: '12 each', rest: '60s', videoUrl: 'https://www.youtube.com/embed/L8fvypPrzzs', muscleGroup: 'Glutes/Quads' },
      { name: 'Leg Curls', sets: '3', reps: '12-15', rest: '45s', videoUrl: 'https://www.youtube.com/embed/1Tq3QdYUuHs', muscleGroup: 'Hamstrings' },
      { name: 'Calf Raises', sets: '4', reps: '15-20', rest: '45s', videoUrl: 'https://www.youtube.com/embed/-M4-G8p8fmc', muscleGroup: 'Calves' },
    ],
  },
  {
    id: 'cardio',
    title: 'Cardio & Core',
    description: 'Heart Health & Abs',
    duration: '45 min',
    calories: '300-400',
    exercises: [
      { name: 'HIIT Intervals', sets: '8', reps: '30s on/30s off', rest: '120s', videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI', muscleGroup: 'Full Body' },
      { name: 'Mountain Climbers', sets: '3', reps: '30s', rest: '30s', videoUrl: 'https://www.youtube.com/embed/nmwgirgXLYM', muscleGroup: 'Core/Cardio' },
      { name: 'Plank Hold', sets: '3', reps: '60s', rest: '45s', videoUrl: 'https://www.youtube.com/embed/ASdvN_XEl_c', muscleGroup: 'Core' },
      { name: 'Russian Twists', sets: '3', reps: '20 each', rest: '45s', videoUrl: 'https://www.youtube.com/embed/wkD8rjkodUI', muscleGroup: 'Obliques' },
      { name: 'Bicycle Crunches', sets: '3', reps: '20 each', rest: '45s', videoUrl: 'https://www.youtube.com/embed/9FGilxCbdz8', muscleGroup: 'Abs' },
      { name: 'Leg Raises', sets: '3', reps: '15', rest: '45s', videoUrl: 'https://www.youtube.com/embed/JB2oyawG9KI', muscleGroup: 'Lower Abs' },
    ],
  },
];

const weeklySchedule = [
  { day: 'Monday', workout: 'push' },
  { day: 'Tuesday', workout: 'pull' },
  { day: 'Wednesday', workout: 'legs' },
  { day: 'Thursday', workout: 'cardio' },
  { day: 'Friday', workout: 'push' },
  { day: 'Saturday', workout: 'pull' },
  { day: 'Sunday', workout: 'rest' },
];

const WorkoutPlanner = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutCategory>('push');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);

  const currentWorkout = workoutDays.find(w => w.id === selectedWorkout)!;

  const toggleExerciseComplete = (exerciseName: string) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseName) 
        ? prev.filter(e => e !== exerciseName)
        : [...prev, exerciseName]
    );
  };

  return (
    <section id="workout-planner" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            <Dumbbell className="w-4 h-4" />
            <span>Workout Planner</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Train Like a <span className="text-gradient">Champion</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow our scientifically designed workout programs with video guides and progress tracking
          </p>
        </div>

        {/* Weekly Schedule */}
        <div className="glass-card p-6 mb-8 overflow-x-auto">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Weekly Schedule</h3>
          </div>
          <div className="flex gap-3 min-w-max">
            {weeklySchedule.map((schedule, index) => {
              const workout = workoutDays.find(w => w.id === schedule.workout);
              return (
                <button
                  key={index}
                  onClick={() => workout && setSelectedWorkout(workout.id)}
                  className={`flex-1 min-w-[100px] p-4 rounded-xl transition-all duration-300 ${
                    schedule.workout === selectedWorkout
                      ? 'bg-primary text-primary-foreground'
                      : schedule.workout === 'rest'
                      ? 'bg-muted/50 text-muted-foreground cursor-default'
                      : 'bg-background hover:bg-muted/50'
                  }`}
                  disabled={schedule.workout === 'rest'}
                >
                  <div className="text-xs font-medium opacity-70">{schedule.day}</div>
                  <div className="text-sm font-semibold capitalize">
                    {schedule.workout === 'rest' ? 'Rest' : workout?.title.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Workout Selection */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Workout Types
            </h3>
            {workoutDays.map((workout) => (
              <button
                key={workout.id}
                onClick={() => {
                  setSelectedWorkout(workout.id);
                  setCompletedExercises([]);
                }}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedWorkout === workout.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${selectedWorkout === workout.id ? 'text-primary' : ''}`}>
                    {workout.title}
                  </span>
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    selectedWorkout === workout.id ? 'text-primary rotate-90' : 'text-muted-foreground'
                  }`} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{workout.description}</p>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workout.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    {workout.calories} cal
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Exercise List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                {currentWorkout.title} Exercises
              </h3>
              <div className="text-sm text-muted-foreground">
                {completedExercises.length}/{currentWorkout.exercises.length} completed
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${(completedExercises.length / currentWorkout.exercises.length) * 100}%` }}
              />
            </div>

            <div className="grid gap-4">
              {currentWorkout.exercises.map((exercise, index) => {
                const isCompleted = completedExercises.includes(exercise.name);
                return (
                  <div
                    key={index}
                    className={`glass-card p-4 transition-all duration-300 ${
                      isCompleted ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleExerciseComplete(exercise.name)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted
                            ? 'bg-primary border-primary'
                            : 'border-muted-foreground/50 hover:border-primary'
                        }`}
                      >
                        {isCompleted && <Check className="w-4 h-4 text-primary-foreground" />}
                      </button>

                      {/* Exercise Info */}
                      <div className="flex-1">
                        <div className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
                          {exercise.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {exercise.muscleGroup}
                        </div>
                      </div>

                      {/* Sets/Reps */}
                      <div className="hidden sm:flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold">{exercise.sets}</div>
                          <div className="text-xs text-muted-foreground">Sets</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{exercise.reps}</div>
                          <div className="text-xs text-muted-foreground">Reps</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{exercise.rest}</div>
                          <div className="text-xs text-muted-foreground">Rest</div>
                        </div>
                      </div>

                      {/* Video Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedExercise(exercise)}
                        className="shrink-0"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                    </div>

                    {/* Mobile Sets/Reps */}
                    <div className="flex gap-4 mt-3 sm:hidden text-sm">
                      <span>{exercise.sets} sets</span>
                      <span>{exercise.reps} reps</span>
                      <span>{exercise.rest} rest</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {completedExercises.length === currentWorkout.exercises.length && (
              <div className="glass-card p-6 text-center bg-primary/10 border-primary animate-scale-in">
                <div className="text-4xl mb-2">🎉</div>
                <h4 className="text-xl font-bold text-primary mb-1">Workout Complete!</h4>
                <p className="text-muted-foreground">
                  Great job! You burned approximately {currentWorkout.calories} calories.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Video Modal */}
        {selectedExercise && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/80 backdrop-blur-sm"
            onClick={() => setSelectedExercise(null)}
          >
            <div 
              className="bg-background rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedExercise.name}</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedExercise(null)}>
                  ✕
                </Button>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-muted mb-4">
                <iframe
                  src={selectedExercise.videoUrl}
                  title={selectedExercise.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-primary">{selectedExercise.sets}</div>
                  <div className="text-sm text-muted-foreground">Sets</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-primary">{selectedExercise.reps}</div>
                  <div className="text-sm text-muted-foreground">Reps</div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <div className="text-2xl font-bold text-primary">{selectedExercise.rest}</div>
                  <div className="text-sm text-muted-foreground">Rest</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkoutPlanner;
