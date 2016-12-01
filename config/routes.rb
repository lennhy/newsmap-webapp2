Rails.application.routes.draw do
  root 'articles#index'
  # get '/articles/:id/article_data', to: 'articles#body'

  get '/articles', to: 'articles#index'

  # --user's articles
  # json format http://localhost:3000/users/1/articles/2.json
  get 'users/:id/articles' => 'articles#index'

  # get '/users/:id', to: 'users#show'

  # --user can make a new article
  get 'users/:id/articles/new' => 'articles#new', as: 'new_article'

  post '/users/:id/articles/:id' => 'articles#create'

  # --user_single article show page
  get 'users/:id/articles/:id' => 'articles#show', as: 'user_article'

  # -- edit article
  get 'users/:id/articles/:id/edit' => 'articles#edit', as: 'edit_article'

  patch '/users/:id/articles/:id' => 'articles#update', as: 'article_path'

  post 'users/:id/articles' => 'articles#destroy', as: 'destroy_article'


  # create a route for Omniauth to send its authentication data to:
  devise_for :users,
             :controllers => {
                                :omniauth_callbacks => 'omniauth_callbacks',
                                :sessions=> "sessions"
                              }

    resources :users, only: [:index, :show]
    resources :credits, only: [:index, :create]

  patch '/articles' => 'users#roles'
  resources :articles, only: [:show]

end
