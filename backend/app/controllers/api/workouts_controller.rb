class Api::WorkoutsController < ApplicationController
  before_action :set_workout, only: [:show, :update, :destroy]

  def index
    # Filtering by user_id – e.g., /api/workouts?user_id=1
    workouts = Workout
      .where(user_id: params[:user_id])
      .includes(workout_exercises: :exercise)
      .order(date: :desc)

    render json: workouts,
           include: { 
             workout_exercises: { 
               include: { exercise: { only: [:id, :name] } },
               except: [:created_at, :updated_at]
             }
           }
  end

  def show
    render json: @workout,
           include: { workout_exercises: { include: { exercise: { only: [:id, :name] } } } }
  end

  def create
    @workout = Workout.new(workout_params)
    if @workout.save
      render json: @workout, status: :created,
             include: { workout_exercises: { include: :exercise } }
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @workout.update(workout_params)
      render json: @workout,
             include: { workout_exercises: { include: :exercise } }
    else
      render json: { errors: @workout.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @workout.destroy
    head :no_content
  end

  private

  def set_workout
    @workout = Workout.includes(workout_exercises: :exercise).find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Workout not found" }, status: :not_found
  end

  def workout_params
    params.require(:workout).permit(
      :name, :date, :user_id,
      workout_exercises_attributes: [:id, :exercise_id, :weight, :reps, :sets, :_destroy]
    )
  end
end
