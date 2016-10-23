Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#home'

  get '/articles', to: 'articles#index'

  # create a route for Omniauth to send its authentication data to:
  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks", sessions: "sessions" }
end
