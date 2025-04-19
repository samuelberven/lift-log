module Api
  class Api::WorkoutsController < ApplicationController
    def index
      render json: Workout.all
    end
    def show
      workout = Workout.find(params[:id])
      render json: workout
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
      params.require(:workout).permit(:name, :description) 
    
    end
  end
end
