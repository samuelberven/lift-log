class Api::ExercisesController < ApplicationController
  def index
    exercises = Exercise.all
    render json: exercises
  end

  def show
    exercise = Exercise.find(params[:id])
    render json: exercise
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Exercise not found" }, status: :not_found
  end

  def create
    exercise = Exercise.new(exercise_params)
    if exercise.save
      render json: exercise, status: :created
    else
      render json: { errors: exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    exercise = Exercise.find(params[:id])
    if exercise.update(exercise_params)
      render json: exercise
    else
      render json: { errors: exercise.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    exercise = Exercise.find(params[:id])
    exercise.destroy
    head :no_content
  end

  private
  
  def exercise_params
    params.require(:exercise).permit(:name, :description)
  end
end
