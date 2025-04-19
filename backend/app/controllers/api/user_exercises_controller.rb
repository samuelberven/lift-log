module Api
  class Api::UserExercisesController < ApplicationController
    def index
      user = User.find(params[:user_id])
      exercises = user.exercises
      render json: exercises
    end

    def show
      user = User.find(params[:user_id])
      exercise = user.exercises.find(params[:id])
      render json: exercise
    end

    def create
      user = User.find(params[:user_id])
      exercise = user.exercises.new(exercise_params)
      if exercise.save
        render json: exercise, status: :created
      else
        render json: { errors: exercise.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      user = User.find(params[:user_id])
      exercise = user.exercises.find(params[:id])
      if exercise.update(exercise_params)
        render json: exercise
      else
        render json: { errors: exercise.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    def destroy
      user = User.find(params[:user_id])
      exercise = user.exercises.find(params[:id])
      exercise.destroy
      head :no_content
    end

    private
    def exercise_params
      params.require(:exercise).permit(:name, :description)
    end
  end    
end