class RemoveWorkoutDetailsFromUserExercises < ActiveRecord::Migration[7.1]
  def change
    remove_column :user_exercises, :weight, :float
    remove_column :user_exercises, :reps, :integer
    remove_column :user_exercises, :sets, :integer
  end
end
