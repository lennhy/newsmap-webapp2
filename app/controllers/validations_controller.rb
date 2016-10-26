class ValidationsController < ApplicationController


  def create
    # raise params.permitted?
    article = Article.find(params[:id])
    article.add_validation(article.id)
    if article.save
      redirect_to articles_path#,
      #  {notice: 'Item added to cart!'}
    else
      flash[:notice]= current_user.article.errors.full_messages

      redirect_to articles_path #, {notice: 'Item added to cart!'}
      # flash[:errors].full_messages
    end
  end

end
