class MakeNameAndDescriptionNotNullOnExercise < ActiveRecord::Migration[7.1]
  def up
    # For any exercises where the name is null, update it to a default value.
    Exercise.where(name: nil).update_all(name: 'Fill in a Name Here')
    
    # For any exercises where the description is null, update it to a default value.
    Exercise.where(description: nil).update_all(description: 'No description')
    
    # Change the columns to not allow null values.
    change_column_null :exercises, :name, false
    change_column_null :exercises, :description, false
  end

  def down
    # In the rollback, allow both columns to be nullable again.
    change_column_null :exercises, :name, true
    change_column_null :exercises, :description, true
  end
end