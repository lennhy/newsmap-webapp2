class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def roles
    current_user.update_user_role(params[:user][:role], current_user)
    redirect_to root_path
  end

end
