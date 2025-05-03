# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


require 'faker'

# Create 3 Users
users = 3.times.map { User.create!(name: Faker::Name.name) }

# Define Example Exercises
EXERCISES = ["Bench Press", "Squat", "Deadlift", "Pull-ups", "Overhead Press", "Bicep Curls", "Tricep Dips", "Lunges", "Plank", "Leg Press", "Lat Pulldown", "Push-ups", "Rows", "Leg Raises", "Shoulder Press", "Chest Fly", "Cable Crossover", "Leg Extensions", "Hamstring Curls", "Calf Raises", "Seated Rows", "Face Pulls", "Dumbbell Flyes", "Incline Bench Press", "Decline Bench Press", "Chest Press", "Incline Dumbbell Press", "Decline Dumbbell Press", "Cable Rows", "Dumbbell Rows", "Kettlebell Swings", "Medicine Ball Slams", "Battle Ropes", "Box Jumps", "Burpees", "Jump Squats", "Mountain Climbers", "Russian Twists", "Side Plank", "Hip Thrusts"]

# Generate Workouts Over the Last Month
users.each do |user|
  (1..12).each do |day| # Roughly 3 workouts per week (randomized)
    workout = Workout.create!(
      user: user,
      name: "Workout #{day}",
      date: Date.today - rand(1..30)
    )

    # Assign Random Exercises
    EXERCISES.sample(5).each do |exercise_name|
      exercise = Exercise.find_or_initialize_by(name: exercise_name)
      if exercise.new_record? || exercise.description.blank?
        exercise.description = "#{exercise_name} is a classic exercise to build strength."
        exercise.save!
      end

      WorkoutExercise.create!(
        workout: workout,
        exercise: exercise,
        weight: rand(100..250),
        reps: rand(6..12),
        sets: rand(3..5)
      )
    end
  end
end

# Create 10 additional random exercises using Faker.
# Note: Here we're using create! directly,
# which means if Faker generates a name that already exists, a duplicate will be created.
# Using find_or_create_by! avoids creating duplicates.
# Create 10 additional random exercises using Faker.
10.times do
  # Generate a random exercise name; if it exists, update if necessary.
  exercise_name = Faker::Lorem.sentence(word_count: 3)
  exercise = Exercise.find_or_initialize_by(name: exercise_name)
  if exercise.new_record? || exercise.description.blank?
    exercise.description = Faker::Lorem.paragraph
    exercise.save!
  end
end