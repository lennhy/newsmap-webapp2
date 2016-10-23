class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  # tells devise where to look for the root path after signing in with facbook
  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || root_path
  end
end
