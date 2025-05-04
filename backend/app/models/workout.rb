class Workout < ApplicationRecord
  belongs_to :user
  has_many :workout_exercises, dependent: :destroy
  has_many :exercises, through: :workout_exercises
  accepts_nested_attributes_for :workout_exercises, allow_destroy: true
end
