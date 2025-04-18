class CreateExercises < ActiveRecord::Migration[7.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.integer :sets
      t.integer :reps
      t.float :weight
      t.string :unit
      t.date :date

      t.timestamps
    end
  end
end
