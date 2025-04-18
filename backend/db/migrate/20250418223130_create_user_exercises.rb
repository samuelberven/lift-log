class CreateUserExercises < ActiveRecord::Migration[7.1]
  def change
    create_table :user_exercises do |t|
      t.references :user, null: false, foreign_key: true
      t.references :exercise, null: false, foreign_key: true
      t.float :weight
      t.integer :reps
      t.integer :sets

      t.timestamps
    end
  end
end
