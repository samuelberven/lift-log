module Api
  class UsersController < ApplicationController
    def index
      render json: User.all
    end

    def show
      user = User.find(params[:id])
      render json: user
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :not_found
    end
  end
end