class ArticlesController < ApplicationController
  # unregistered users (readers) only to have only read access for a selected group of actions:
  before_action :set_article, only: [:show, :edit, :update]

  def index
    if params[:id]
      @articles = User.find(params[:id]).articles
      @article.most_validated_article
    else
      @articles = Article.all
    end
  end

  def new
    @article = Article.new
    @sources = @article.sources.build
  end

  def show
  end

  def create
    @article =  Article.new(article_params)
    if @article.save
      redirect_to  user_single_article_path(@article.id), notice: "You successfully created a new article!"

    else
      redirect_to new_user_single_article_path(current_user.id), notice: @article.errors.full_messages
    end
  end

  def edit
    @article = Article.find(params[:id])
    @sources = @article.sources.build
  end

  def update
    @article =  Article.find(params[:id])
    @article.update(article_params)
      redirect_to  user_single_article_path(@article.id), notice: "You successfully updated this article!"
  end

  def destroy
    Article.find(params[:id]).destroy
      redirect_to articles_path, {notice: 'You have deleted this article!'}
  end



  private

    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit(
        :user_id,
        :country_id,
        :category_id,
        :title,
        :content,
        :source_ids=> [],
        :sources_attributes=>[:name]
        )
    end
    # ActionController::Parameters.permit_all_parameters = true
    # article.errors.full_messages
    # this is the error message I get ["User must exist"]
    # raise params.inspect
    # raise current_user.inspect
end
