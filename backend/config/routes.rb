Rails.application.routes.draw do
  # Devise authentication routes for users
  devise_for :users, path: 'auth', controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  
  namespace :api do
    resources :users, only: [:index, :show, :create, :update, :destroy]
    resources :exercises, only: [:index, :show, :create, :update, :destroy]
    resources :workouts do
      resources :workout_exercises, only: [:create, :update, :destroy]
    end
  end

  # Health check endpoint:
  get "up" => "rails/health#show", as: :rails_health_check
end
