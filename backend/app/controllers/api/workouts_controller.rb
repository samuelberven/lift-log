module Api
  class WorkoutsController < ApplicationController
    def index
      workouts = if params[:user_id]
                  Workout.where(user_id: params[:user_id])
                else
                  Workout.all
                end
      render json: workouts, include: { workout_exercises: { include: :exercise } }
    end

    def show
      workout = Workout.find(params[:id])
      render json: workout, include: { workout_exercises: { include: :exercise } }
    end

    def create
      workout = Workout.new(workout_params)
      if workout.save
        render json: workout, status: :created
      else
        render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      workout = Workout.find(params[:id])
      if workout.update(workout_params)
        render json: workout
      else
        render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      workout = Workout.find(params[:id])
      workout.destroy
      head :no_content
    end

    private

    def workout_params
      # Add user_id and date to permitted params
      params.require(:workout).permit(:name, :description, :user_id, :date)
    end
  end
end
