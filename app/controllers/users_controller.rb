class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
     respond_to do |format|
       format.html { render :show }
       format.json { render json: @user}
     end
  end

  def roles
    current_user.update_user_role(params[:user][:role], current_user)
    if current_user.role == "author"
      flash[:notice]= "You are now an #{current_user.role}"
      redirect_to root_path
    else
      flash[:notice]= "You are now a #{current_user.role}"
    end
  end

end
