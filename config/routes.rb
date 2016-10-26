Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root 'articles#index'
  get '/articles', to: 'articles#index'
  get "users/:id/articles/:id"=> "articles#show", as: "user_single_article"
  post "users/:id/articles/:id"=> "validations#create"

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
    resources :articles, only: [:new, :create, :edit, :update, :delete]

end

  # devise_for :users, "admin/administrators"
  #
  # devise_for :experts, :controllers => {:sessions => 'sessions'}, :skip => [:sessions] do
  #   get '/experts/sign_in' => 'sessions#new', :as => :new_expert_session
  #   post '/experts/sign_in' => 'sessions#create', :as => :expert_session
  #   get '/experts/sign_out' => 'sessions#destroy', :as => :destroy_expert_session

 #  Prefix Verb     URI Pattern                             Controller#Action
 #                         articles GET      /articles(.:format)                     articles#index
 #                                  POST     /users/:id/articles/:id(.:format)       validations#create
 #                 new_user_session GET      /users/sign_in(.:format)                sessions#new
 #                     user_session POST     /users/sign_in(.:format)                sessions#create
 #             destroy_user_session DELETE   /users/sign_out(.:format)               sessions#destroy
 #         cancel_user_registration GET      /users/cancel(.:format)                 devise/registrations#cancel
 #                user_registration POST     /users(.:format)                        devise/registrations#create
 #            new_user_registration GET      /users/sign_up(.:format)                devise/registrations#new
 #           edit_user_registration GET      /users/edit(.:format)                   devise/registrations#edit
 #                                  PATCH    /users(.:format)                        devise/registrations#update
 #                                  PUT      /users(.:format)                        devise/registrations#update
 #                                  DELETE   /users(.:format)                        devise/registrations#destroy
 # user_facebook_omniauth_authorize GET|POST /users/auth/facebook(.:format)          omniauth_callbacks#passthru
 #  user_facebook_omniauth_callback GET|POST /users/auth/facebook/callback(.:format) omniauth_callbacks#facebook
 #                     user_article GET      /users/:user_id/articles/:id(.:format)  articles#show
 #                             user GET      /users/:id(.:format)                    users#show
 #                            users GET      /users(.:format)                        users#index
 #                                  POST     /users(.:format)                        users#create
 #                         new_user GET      /users/new(.:format)                    users#new
 #                        edit_user GET      /users/:id/edit(.:format)               users#edit
 #                                  PATCH    /users/:id(.:format)                    users#update
 #                                  PUT      /users/:id(.:format)                    users#update
 #                                  POST     /articles(.:format)                     articles#create
 #                      new_article GET      /articles/new(.:format)                 articles#new
 #                     edit_article GET      /articles/:id/edit(.:format)            articles#edit
 #                          article PATCH    /articles/:id(.:format)                 articles#update
 #                                  PUT      /articles/:id(.:format)                 articles#update
