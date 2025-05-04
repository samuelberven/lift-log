class Api::WorkoutExercisesController < ApplicationController
  before_action :set_workout

  def create
    workout_exercise = @workout.workout_exercises.new(workout_exercise_params)
    if workout_exercise.save
      render json: workout_exercise, status: :created, include: :exercise
    else
      render json: { errors: workout_exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    workout_exercise = @workout.workout_exercises.find(params[:id])
    if workout_exercise.update(workout_exercise_params)
      render json: workout_exercise, include: :exercise
    else
      render json: { errors: workout_exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    workout_exercise = @workout.workout_exercises.find(params[:id])
    workout_exercise.destroy
    head :no_content
  end

  private

  def set_workout
    @workout = Workout.find(params[:workout_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Workout not found" }, status: :not_found
  end

  def workout_exercise_params
    params.require(:workout_exercise).permit(:exercise_id, :weight, :reps, :sets)
  end
end
