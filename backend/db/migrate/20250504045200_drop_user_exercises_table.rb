class DropUserExercisesTable < ActiveRecord::Migration[7.1]
  def change
    drop_table :user_exercises
  end
end