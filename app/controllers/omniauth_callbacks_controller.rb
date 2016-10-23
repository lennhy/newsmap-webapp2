class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    #  get user from signin with omniauth
    @user = User.from_omniauth(request.env["omniauth.auth"])
    sign_in_and_redirect @user
  end

end
