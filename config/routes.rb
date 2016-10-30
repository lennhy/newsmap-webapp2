Rails.application.routes.draw do
  root 'articles#index'

  # --home
  get '/articles', to: 'articles#index'

  # --user's articles
  get 'users/:id/articles' => 'articles#index'

  # --user can make a new article
  get 'users/:id/articles/new' => 'articles#new', as: 'new_article'

  # --user_single article show page
  get 'users/:id/articles/:id' => 'articles#show', as: 'user_article'

<<<<<<< HEAD
  # -- edit article
  get 'users/:id/articles/:id/edit' => 'articles#edit', as: 'edit_article'
=======
  get 'users/:id/articles/:id/edit' => 'articles#edit', as: 'edit_user_article'

>>>>>>> f072ac2ba18534ec9e83a85f33cf5e62a697be18

  post 'users/:id/articles/:id' => 'articles#create'

<<<<<<< HEAD
  # patch 'users/:id/articles/:id' => 'articles#update'
  #
  # post 'users/:id/articles/:id' => 'validations#create'

=======
>>>>>>> f072ac2ba18534ec9e83a85f33cf5e62a697be18
  post 'users/:id/articles' => 'articles#destroy', as: 'destroy_article'

  # create a route for Omniauth to send its authentication data to:
  devise_for :users,
             :controllers => {
                                :omniauth_callbacks => 'omniauth_callbacks',
                                :sessions=> "sessions"
                              }

    resources :users, only: [:index, :new, :show,:create, :edit, :update]
    resources :articles, only: [:create, :update]

end
