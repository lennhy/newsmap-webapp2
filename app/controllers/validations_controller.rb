class ValidationsController < ApplicationController

  def create
    @article = Article.find_by(params[:id])
    @article.add_validation(@article, current_user)

    if @article.add_validation(@article, current_user)
      # change to if user validation id is the same as teh article validation then do not create a new validation and do not save it
        redirect_to user_article_path(@article.id) , {notice: 'You have successfully validated this article!'}

    else
      flash[:error]= "You have already validated this article!"
      redirect_to user_article_path(@article.id) #, {notice: 'You have already validated this article!'}
      # flash[:errors].full_messages
    end
  end
  def validation_params
    params.require(:article).permit(:id)
  end

end
