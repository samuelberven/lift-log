class ExercisesController < ApplicationController
  # GET / exercises
  def index
    @exercises = Exercise.all
    render json: @exercises
  end

  # GET /exercises/:id
  def show
    @exercise = Exercise.find(params[:id])
    render json: @exercise
  end

  # POST exercises/:od
  def create
    @exercise = Exercise.new(exercise_params)
    if @exercise.save
      render json: @exercise, status: :created, location: @exercise
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /exercises/:id
  def update
    @exercise = Exercise.find(params[:id])
    if @exercise.update(exercise_params)
      render json: @exercise
    else
      render json: @exercise.errors, status: :unprocessable_entity
    end
  end

  # DELETE /exercises/:id
  def destroy
    @exercise = Exercise.find(params[:id])
    @exercise.destroy
  end

  private

  # Only allow a trusted parameter "white list" through.
  def exercise_params
    params.require(:exercise).permit(:name, :reps, :sets, :weight, :unit, :date)
  end
end
