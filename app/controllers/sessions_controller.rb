class SessionsController < Devise::SessionsController

  def destroy

    flash[:message]="you are signed out"
    flash[:errors]
    session.destroy
    # redirect_to articles_path
  end

end
