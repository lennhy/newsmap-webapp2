class ArticlesController < ApplicationController
  before_action :set_article, only: [:show, :update, :edit]

  def index
    if params[:id]
      @articles = User.find(params[:id]).articles
      # respond_to do |format|
      #   format.html { render :index }
      #   format.json { render json: @articles}
      # end
    else
      @articles = Article.all
      # respond_to do |format|
      #   format.html { render :index }
      #   format.json { render json: @articles}
      # end
    end
  end


  def new
    @article = Article.new
    @sources = @article.sources.build
  end

  def show
    @article = Article.find(params[:id])
     respond_to do |format|
       format.html { render :show }
       format.json { render json: @article}
     end
  end

  def create
    @article =  Article.new(article_params)
    if @article.save
      redirect_to  user_article_path(@article.id), notice: "You successfully created a new article!"
    else
      redirect_to new_article_path(current_user.id), notice: @article.errors.full_messages
    end
  end

  # via ajax request
  # def body
  #   article = Article.find(params[:id])
  #   render plain: article.content
  # end

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
        :country_id,
        :category_id,
        :title,
        :content,
        :user_id,
        :source_ids=> [],
        :sources_attributes=>[:name]
        )
      end

end
