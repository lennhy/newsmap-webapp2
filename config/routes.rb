Rails.application.routes.draw do
  root 'articles#index'

  # --home

  get '/articles', to: 'articles#index'

  # --user's articles
  get 'users/:id/articles' => 'articles#index'

  # --user can make a new article
  get 'users/:id/articles/new' => 'articles#new', as: 'new_article'

  post '/users/:id/articles/:id' => 'articles#create'

  # post '/validations/new' => 'validations#new'

  # --user_single article show page
  get 'users/:id/articles/:id' => 'articles#show', as: 'user_article'


  # -- edit article
  get 'users/:id/articles/:id/edit' => 'articles#edit', as: 'edit_article'

  patch '/users/:id/articles/:id' => 'articles#update', as: 'article_path'
  #
  # post 'users/:id/articles/:id' => 'validations#create'

  post 'users/:id/articles' => 'articles#destroy', as: 'destroy_article'

  # create a route for Omniauth to send its authentication data to:
  devise_for :users,
             :controllers => {
                                :omniauth_callbacks => 'omniauth_callbacks',
                                :sessions=> "sessions"
                              }

    resources :users, only: [:index, :new, :show,:create, :edit, :update]
    resources :validations, only: [:create]

end
