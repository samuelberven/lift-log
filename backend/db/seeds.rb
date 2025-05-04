# Clear existing data
puts "Clearing existing data..."
WorkoutExercise.destroy_all
Workout.destroy_all
Exercise.destroy_all
User.destroy_all

# Exercise configuration
EXERCISE_CONFIGS = {
  # Compound Movements
  "Bench Press" => { weight_range: 95..225, reps: 5..12, sets: 3..5 },
  "Squat" => { weight_range: 135..315, reps: 5..8, sets: 3..5 },
  "Deadlift" => { weight_range: 135..365, reps: 3..8, sets: 3..5 },
  "Overhead Press" => { weight_range: 65..135, reps: 5..12, sets: 3..5 },
  "Barbell Row" => { weight_range: 95..185, reps: 6..12, sets: 3..4 },
  "Front Squat" => { weight_range: 95..225, reps: 5..8, sets: 3..4 },
  "Romanian Deadlift" => { weight_range: 95..225, reps: 8..12, sets: 3..4 },
  "Incline Bench Press" => { weight_range: 85..185, reps: 8..12, sets: 3..4 },
  
  # Machine Exercises
  "Leg Press" => { weight_range: 135..405, reps: 8..12, sets: 3..4 },
  "Lat Pulldown" => { weight_range: 70..160, reps: 8..15, sets: 3..4 },
  "Cable Rows" => { weight_range: 70..160, reps: 8..12, sets: 3..4 },
  "Leg Extensions" => { weight_range: 50..150, reps: 12..15, sets: 3..4 },
  
  # Isolation/Accessory Work
  "Bicep Curls" => { weight_range: 15..45, reps: 8..15, sets: 3..4 },
  "Hammer Curls" => { weight_range: 15..40, reps: 10..15, sets: 3..4 },
  "Lateral Raises" => { weight_range: 5..20, reps: 12..15, sets: 3..4 },
  "Face Pulls" => { weight_range: 20..50, reps: 12..20, sets: 3..4 },
  "Cable Tricep Extensions" => { weight_range: 20..50, reps: 10..15, sets: 3..4 },
  
  # Bodyweight + Weight
  "Pull-ups" => { weight_range: 0..45, reps: 5..12, sets: 3..4 },
  "Dips" => { weight_range: 0..45, reps: 8..12, sets: 3..4 },
  
  # Lower Body Accessories
  "Lunges" => { weight_range: 0..95, reps: 10..15, sets: 3..4 },
  "Calf Raises" => { weight_range: 0..225, reps: 12..20, sets: 3..4 },
  "Hip Thrust" => { weight_range: 95..225, reps: 8..15, sets: 3..4 },
  
  # Core Work
  "Plank" => { weight_range: 0..0, reps: 30..90, sets: 3..4 }, # reps in seconds
  "Cable Woodchoppers" => { weight_range: 20..50, reps: 12..15, sets: 3..4 }
}.freeze

EXERCISE_DESCRIPTIONS = {
  "Bench Press" => "Primary chest exercise targeting pectorals, front deltoids, and triceps. Fundamental upper body pushing movement.",
  "Squat" => "King of lower body exercises. Builds overall strength and muscle in legs, core, and back.",
  "Deadlift" => "Full-body compound movement emphasizing posterior chain development. Builds tremendous overall strength.",
  "Overhead Press" => "Vertical pressing movement building shoulder strength and stability. Key for upper body development.",
  "Barbell Row" => "Horizontal pulling movement for back development. Builds upper body thickness and pulling strength.",
  "Front Squat" => "Quad-dominant squat variation that demands upper back stability and core strength.",
  "Romanian Deadlift" => "Hip-hinge movement targeting hamstrings and lower back. Essential for posterior chain development.",
  "Lat Pulldown" => "Vertical pulling movement targeting the lats. Great for building back width.",
  "Cable Rows" => "Controlled horizontal pulling for back development. Excellent for maintaining constant tension.",
  "Pull-ups" => "Premier upper body pulling exercise. Builds lat strength and width using bodyweight and optional added weight.",
  "Dips" => "Advanced pushing movement for chest, shoulders, and triceps. Can be loaded for progression.",
  "Face Pulls" => "Posterior deltoid and upper back exercise crucial for shoulder health and posture.",
  "Hip Thrust" => "Targeted glute development exercise. Essential for hip strength and power.",
  "Plank" => "Core stability exercise engaging the entire anterior chain. Builds isometric strength.",
  "Cable Woodchoppers" => "Rotational core exercise that builds functional strength and stability."
}.freeze

# Create Demo User first (ensuring ID #1)
puts "Creating Demo User..."
User.create!(name: "Demo User")

# Create additional users
puts "Creating other users..."
25.times do
  User.create!(name: Faker::Name.unique.name)
end

# Create exercises with descriptions
puts "Creating exercises..."
EXERCISE_CONFIGS.each do |exercise_name, config|
  Exercise.create!(
    name: exercise_name,
    description: EXERCISE_DESCRIPTIONS[exercise_name] || "#{exercise_name} is a #{['compound', 'isolation', 'functional'].sample} exercise targeting #{['upper body', 'lower body', 'core', 'full body'].sample} strength and muscle development."
  )
end

# Helper method to determine workout frequency
def workout_frequency_for_user
  case rand(100)
  when 0..20 then 2..4    # 20% work out 2-4 times per month (casual)
  when 21..70 then 8..10  # 50% work out 8-10 times per month (regular)
  else 12..16            # 30% work out 12-16 times per month (dedicated)
  end
end

# Helper method to generate realistic exercise data
def generate_exercise_data(exercise_name)
  config = EXERCISE_CONFIGS[exercise_name] || { 
    weight_range: 20..100, 
    reps: 8..12, 
    sets: 3..4 
  }
  
  {
    weight: rand(config[:weight_range]),
    reps: rand(config[:reps]),
    sets: rand(config[:sets])
  }
end

# Workout split templates
WORKOUT_SPLITS = {
  "Push Day" => ["Bench Press", "Overhead Press", "Incline Bench Press", "Dips", "Lateral Raises", "Cable Tricep Extensions"],
  "Pull Day" => ["Barbell Row", "Pull-ups", "Lat Pulldown", "Cable Rows", "Face Pulls", "Bicep Curls", "Hammer Curls"],
  "Leg Day" => ["Squat", "Romanian Deadlift", "Leg Press", "Leg Extensions", "Calf Raises", "Hip Thrust"],
  "Upper Body" => ["Bench Press", "Barbell Row", "Overhead Press", "Pull-ups", "Dips", "Face Pulls"],
  "Lower Body" => ["Squat", "Romanian Deadlift", "Hip Thrust", "Leg Press", "Calf Raises"],
  "Full Body" => ["Squat", "Bench Press", "Barbell Row", "Overhead Press", "Romanian Deadlift"]
}

puts "Creating workouts and exercises..."
User.all.each do |user|
  # Determine how long ago this user started (3-15 months)
  months_active = rand(3..15)
  workouts_per_month = workout_frequency_for_user

  (1..months_active).each do |months_ago|
    # Create workouts for this month
    workout_count = rand(workouts_per_month)
    
    workout_count.times do
      # Create workout with a date in this month
      start_date = months_ago.months.ago.beginning_of_month.to_date
      end_date = months_ago.months.ago.end_of_month.to_date
      workout_date = rand(start_date..end_date)
      
      # Select workout type
      workout_type = WORKOUT_SPLITS.keys.sample
      
      workout = Workout.create!(
        user: user,
        name: workout_type,
        date: workout_date
      )
      
      # Select workout type
      workout_type = WORKOUT_SPLITS.keys.sample
      
      workout = Workout.create!(
        user: user,
        name: workout_type,
        date: workout_date
      )

      # Get base exercises for this workout type
      base_exercises = WORKOUT_SPLITS[workout_type]
      
      # Add some random additional exercises
      additional_exercises = (EXERCISE_CONFIGS.keys - base_exercises).sample(rand(0..2))
      workout_exercises = (base_exercises + additional_exercises).sample(rand(4..8))

      # Create workout exercises
      workout_exercises.each do |exercise_name|
        exercise = Exercise.find_by(name: exercise_name)
        exercise_data = generate_exercise_data(exercise_name)
        
        WorkoutExercise.create!(
          workout: workout,
          exercise: exercise,
          weight: exercise_data[:weight],
          reps: exercise_data[:reps],
          sets: exercise_data[:sets]
        )
      end
    end
  end
end

puts "Seeding completed!"
puts "Created:"
puts "  #{User.count} users"
puts "  #{Exercise.count} exercises"
puts "  #{Workout.count} workouts"
puts "  #{WorkoutExercise.count} workout exercises"