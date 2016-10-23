Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root 'welcome#home'
  # get '/about' => 'welcome#about'
  # create a route for Omniauth to send its authentication data to:
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
end
