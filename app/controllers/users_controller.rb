class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    if user_signed_in?
       @user = User.find(params[:id])
     else redirect_to articles_path, notice: "To see this you must first sign in."
     end
  end

end
