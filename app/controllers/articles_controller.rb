class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :edit]

  def index
    if params[:id]
      @articles = User.find(params[:id]).articles
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
      redirect_to  user_article_path(@article.id), notice: "You successfully created a new article!"

    else
      redirect_to new_article_path(current_user.id), notice: @article.errors.full_messages
    end
  end

  def edit
    @sources = @article.sources.build
  end

  def update
    if @article.update(article_params)
      redirect_to  user_article_path(@article.id), notice: "You successfully updated this article!"
    else
      redirect_to edit_article_path(@article.user_id, @article.id), notice: @article.errors.full_messages
    end
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

    # def create
    #   raise params.inspect
    #   @article = Article.find_by(params[:id])
    #   @article.add_validation(@article, current_user)
    #
    #   if @article.save
    #     # change to if user validation id is the same as teh article validation then do not create a new validation and do not save it
    #       redirect_to user_article_path(@article.id) , {notice: 'You have successfully validated this article!'}
    #
    #   else
    #     flash[:error]= "You have already validated this article!"
    #     redirect_to user_article_path(@article.id) #, {notice: 'You have already validated this article!'}
    #     # flash[:errors].full_messages
    #   end
    # end
end
