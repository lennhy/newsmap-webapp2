Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'articles#index'
  # get '/articles', to: 'articles#index'
  post "users/:id/articles/:id"=> "validations#create"
  # create a route for Omniauth to send its authentication data to:
  devise_for :users,
             :controllers => {
                                :omniauth_callbacks => "omniauth_callbacks",
                                :sessions=> "sessions"
                              }
  resources :users, only: [:show] do
    # nested resource for articles
    resources :articles, only: [:show, :index]
  end
    # we still have our regular resourced :articles routes because we still want to let people see all articles, create and edit articles, and so on outside of the context of an user.
    resources :users, only: [:index, :new, :create, :edit, :update, :delete]
    resources :articles, only: [:index, :new, :create, :edit, :update, :delete]

end

  # devise_for :users, "admin/administrators"
  #
  # devise_for :experts, :controllers => {:sessions => 'sessions'}, :skip => [:sessions] do
  #   get '/experts/sign_in' => 'sessions#new', :as => :new_expert_session
  #   post '/experts/sign_in' => 'sessions#create', :as => :expert_session
  #   get '/experts/sign_out' => 'sessions#destroy', :as => :destroy_expert_session
