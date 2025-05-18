class AddDeviseFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :email, :string, null: false, default: ""
    add_column :users, :encrypted_password, :string, null: false, default: ""
    add_column :users, :reset_password_token, :string
    add_column :users, :reset_password_sent_at, :datetime
    add_column :users, :remember_created_at, :datetime
    
    # Reset column information so existing records can be updated
    User.reset_column_information

    # Assign unique emails to existing users
    User.where(email: "").find_each do |user|
      user.update_columns(email: "user_#{user.id}@example.com") # Creates temporary unique email
    end

    add_index :users, :email, unique: true  # Ensure email uniqueness
    add_index :users, :reset_password_token, unique: true  # Required for password reset
  end
  def down
    remove_index :users, :email
    remove_index :users, :reset_password_token
    remove_column :users, :email
    remove_column :users, :encrypted_password
    remove_column :users, :reset_password_token
    remove_column :users, :reset_password_sent_at
    remove_column :users, :remember_created_at
  end
end
