class ValidationsController < ApplicationController


  def create
    # raise params.permitted?
    article = Article.find(params[:id])
    article.add_validation(article.id)
    if article.save
      redirect_to user_article_path(current_user.id, @validation.article_id) #,
      #  {notice: 'Item added to cart!'}
    else
      flash[:notice]= current_user.article.errors.full_messages

      redirect_to user_article_path(@validation.user_id, @validation.article_id) #, {notice: 'Item added to cart!'}
      # flash[:errors].full_messages
    end
  end
  def validation_params
    params.require(:validation).permit(
      :article_id,
      :quantity
    )
  end

end
