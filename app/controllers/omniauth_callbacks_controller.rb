class OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    # --get user from signin with omniauth
    # --this helper is for the after_sign_in_path_for(resource) method in appplication controller to work
    @user = User.from_omniauth(request.env["omniauth.auth"])
    @user.save
    binding.pry
    puts @user
    sign_in_and_redirect @user
  end

end
