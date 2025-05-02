module Api
  class ExercisesController < ApplicationController
    def index

      response.headers['Access-Control-Allow-Origin'] = request.headers['Origin']
      response.headers['Access-Control-Allow-Credentials'] = 'true'
      # Note: these headers are set to allow CORS requests from the frontend app.
      
      render json: Exercise.all
    end

    def show
      exercise = Exercise.find(params[:id])
      render json: exercise
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
end
