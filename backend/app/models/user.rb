class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable
  has_many :workouts, dependent: :destroy
end
