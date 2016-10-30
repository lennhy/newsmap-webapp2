class ValidationsController < ApplicationController


  def create
    # raise params.permitted?
    @article = Article.find(params[:id])
    @article.add_validation(@article.id, current_user)

    if @article.save
      render :"/articles/show", {notice: 'You have successfully validated this article!'}

    else
<<<<<<< HEAD
      flash[:error]= current_user.article.errors.full_messages
      redirect_to articles_path #, {notice: 'You have already validated this article!'}
=======
      flash[:error]= "You have already validated this article!"
      redirect_to user_single_article_path #, {notice: 'You have already validated this article!'}
>>>>>>> f072ac2ba18534ec9e83a85f33cf5e62a697be18
      # flash[:errors].full_messages
    end
  end

end
