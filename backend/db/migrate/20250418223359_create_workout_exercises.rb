class CreateWorkoutExercises < ActiveRecord::Migration[7.1]
  def change
    create_table :workout_exercises do |t|
      t.references :workout, null: false, foreign_key: true
      t.references :exercise, null: false, foreign_key: true
      t.float :weight
      t.integer :reps
      t.integer :sets
      t.timestamps
    end
  end
end
