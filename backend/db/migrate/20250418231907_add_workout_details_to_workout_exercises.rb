class AddWorkoutDetailsToWorkoutExercises < ActiveRecord::Migration[7.1]
  def change
    add_column :workout_exercises, :weight, :float
    add_column :workout_exercises, :reps, :integer
    add_column :workout_exercises, :sets, :integer
  end
end
