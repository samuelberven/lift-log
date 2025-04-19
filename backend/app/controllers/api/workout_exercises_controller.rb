module Api 
  class Api::WorkoutExercisesController < ApplicationController
    def index
      workout_exercises = WorkoutExercise.all
      render json: workout_exercises
    end

    def show
      workout_exercise = WorkoutExercise.find(params[:id])
      render json: workout_exercise
    end

    def create
      workout_exercise = WorkoutExercise.new(workout_exercise_params)
      if workout_exercise.save
        render json: workout_exercise, status: :created
      else
        render json: { errors: workout_exercise.errors.full_messages }, status: :unprocessable_entity
      end

      def update
        workout_exercise = WorkoutExercise.find(params[:id])
        if workout_exercise.update(workout_exercise_params)
          render json: workout_exercise
        else
          render json: { errors: workout_exercise.errors.full_messages }, status: :unprocessable_entity
        end

        def destroy
          workout_exercise = WorkoutExercise.find(params[:id])
          workout_exercise.destroy
          head :no_content
        end
        
        private
        def workout_exercise_params
          params.require(:workout_exercise).permit(:workout_id, :exercise_id, :sets, :reps, :weight)
        end
      end
    end
  end
    
end
