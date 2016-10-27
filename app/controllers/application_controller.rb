class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # saves the location before loading each page so we can return to the
  # right page. If we're on a devise page, we don't want to store that as the
  # place to return to (for example, we don't want to return to the sign in page
  # after signing in), which is what the :unless prevents
  before_action  :store_current_location, :unless => :devise_controller?

  #  permits custom fields to be accepted before persisting to the database
  before_action :configure_permitted_parameters, if: :devise_controller?

  # ensure that every controller action requires a logged in user, except for the login and register actions:
  # before_action :authenticate_user!, :only => [:create, :new, :destroy]

  # tells devise where to look for the root path after signing in with facbook
  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || root_path
  end


  private
   # -- devise
  # override the devise helper to store the current location so we can
  # redirect to it after loggin in or out. This override makes signing in
  # and signing up work automatically.
  def store_current_location
    store_location_for(:user, request.url)
  end

  # -- devise
  # override the devise method for where to go after signing out because theirs
  # always goes to the root path. Because devise uses a session variable and
  # the session is destroyed on log out, we need to use request.referrer
  # root_path is there as a backup
  def after_sign_out_path_for(resource)
    request.referrer || new_user_sessions_path
  end
# ew_user_session GET      /users/sign_in(.:format)                sessions#new

  protected
    # -- devise
    # In case you want to permit additional parameters, you can do so using a simple before filter
    def configure_permitted_parameters
       devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :password, :role) }
       devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :email, :password, :role) }

    end

end
