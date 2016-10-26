Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root 'articles#index'
  get '/articles', to: 'articles#index'
  get "users/:id/articles/:id"=> "articles#show", as: "user_single_article"
  post "users/:id/articles/:id"=> "validations#create"
post "users/:id/articles" => "articles#delete", as: "delete_article"
  # create a route for Omniauth to send its authentication data to:
  devise_for :users,
             :controllers => {
                                :omniauth_callbacks => "omniauth_callbacks",
                                :sessions=> "sessions"
                              }
  # resources :users, only: [:show] do
  #   # nested resource for articles
  #   resources :articles, only: [:show,:create]
  # end
    # we still have our regular resourced :articles routes because we still want to let people see all articles, create and edit articles, and so on outside of the context of an user.
    resources :users, only: [:index, :new, :create, :edit, :update, :delete]
    resources :articles, only: [:new, :create, :edit, :update, :destroy]

end
