module Api 
  class UserExercisesController < ApplicationController
    def index
      user_exercises = UserExercise.all
      render json: user_exercises
    end

    def show
      user_exercise = UserExercise.find(params[:id])
      render json: user_exercise
    end

    def create
      user_exercise = UserExercise.new(user_exercise_params)
      if user_exercise.save
        render json: user_exercise, status: :created
      else
        render json: { errors: user_exercise.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      user_exercise = UserExercise.find(params[:id])
      if user_exercise.update(user_exercise_params)
        render json: user_exercise
      else
        render json: { errors: user_exercise.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      user_exercise = UserExercise.find(params[:id])
      user_exercise.destroy
      head :no_content
    end
    
    private
    def user_exercise_params
      params.require(:user_exercise).permit(:user_id, :exercise_id)
    end
  end
end
