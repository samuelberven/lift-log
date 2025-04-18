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
EXERCISES = ["Bench Press", "Squat", "Deadlift", "Pull-ups", "Overhead Press", "Bicep Curls"]

# Generate Workouts Over the Last Month
users.each do |user|
  (1..12).each do |day| # Roughly 3 workouts per week (randomized)
    workout = Workout.create!(
      user: user,
      name: "Workout #{day}",
      date: Date.today - rand(1..30)
    )

    # Assign Random Exercises
    EXERCISES.sample(3).each do |exercise_name|
      exercise = Exercise.find_or_create_by!(name: exercise_name)
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
