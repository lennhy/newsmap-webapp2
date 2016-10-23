Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static_pages#home'

  get '/articles', to: 'articles#index'

  # create a route for Omniauth to send its authentication data to:
  devise_for :users,
              :controllers => {
                                :omniauth_callbacks => "omniauth_callbacks",
                                :sessions=> "sessions",
                                :registrations=> 'registrations'
                              }

  # devise_for :users, "admin/administrators"
  #
  # devise_for :experts, :controllers => {:sessions => 'sessions'}, :skip => [:sessions] do
  #   get '/experts/sign_in' => 'sessions#new', :as => :new_expert_session
  #   post '/experts/sign_in' => 'sessions#create', :as => :expert_session
  #   get '/experts/sign_out' => 'sessions#destroy', :as => :destroy_expert_session
end
