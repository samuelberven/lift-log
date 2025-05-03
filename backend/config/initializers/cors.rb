# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:5173', 'http://localhost:5174'  # Change if needed, e.g., 'http://localhost:5174'
      # origins /http:\/\/localhost:\d+/, # This regex allows any port on localhost. TODO: swap it out once the specified ports above are confirmed to work.

      resource '/api/*',
        headers: :any,
        methods: [:get, :post, :put, :patch, :delete, :options, :head],
        max_age: 600, # Note: this is here because of the preflight request. It is not a security issue, as the preflight request is not sent to the server.
        credentials: true  # Ensure credentials (cookies, auth) are included in requests
    end
  end
