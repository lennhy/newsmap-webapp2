class ValidationsController < ApplicationController


  def create
    # raise params.permitted?
    @article = Article.find(params[:id])
    @article.add_validation(@article.id, current_user)

    if @article.save
      render :"/articles/show", {notice: 'You have successfully validated this article!'}

    else
      flash[:error]= "You can't validate the same article more than once."
      redirect_to user_single_article_path #, {notice: 'You have already validated this article!'}
      # flash[:errors].full_messages
    end
  end

end
