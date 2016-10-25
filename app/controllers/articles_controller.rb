class ArticlesController < ApplicationController
  # unregistered users (readers) only to have only read access for a selected group of actions:


  # nested routes
  def index
    if params[:author_id]
      @article = User.find(params[:user_id]).article
    else
      @articles = Article.all
    end
  end

  def show
    @article = Article.find(params[:id])
  end

  def new
    @article = Article.new
  end

  def create
  @article =  Article.new(article_params)
    if @article.save
      redirect_to user_article_url(current_user.id, @article.id)
    else
      redirect_to new_article_path, notice: @article.errors.full_messages
    end
  end

  def delete

  end


  # we're now accepting a category name, rather than a category id. Even though you don't have an ActiveRecord field for category_name, because there is a key in the post_params hash for category_name it still calls the ccountry_title= & ategory_title= method.


    def article_params
      # ActionController::Parameters.permit_all_parameters = true
      # article.errors.full_messages
      # this is the error message I get ["User must exist"]
      # raise params.inspect
      # raise current_user.inspect
      params.require(:article).permit(
      :user_id,
      :country_title,
      :category_title,
      :title,
      :content
      )


    end


end
