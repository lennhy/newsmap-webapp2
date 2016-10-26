class ValidationsController < ApplicationController


  def create
    # raise params.permitted?
    article = Article.find(params[:id])
    article.add_validation(article.id)
    if article.save
      redirect_to user_articles_path(article), {notice: 'You have validated this article!'}
    else
      flash[:notice]= current_user.article.errors.full_messages
      redirect_to articles_path #, {notice: 'You have already validated this article!'}
      # flash[:errors].full_messages
    end
  end

end
