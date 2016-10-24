class ArticlesController < ApplicationController
  # unregistered users (readers) only to have only read access for a selected group of actions:
  before_filter :authenticate_user!, except: [ :index, :show ]

  # nested routes
  def index
    if params[:author_id]
      @article = User.find(params[:user_id]).article
    else
      @articles = Articles.all
    end
  end

  def show
    @article = Article.find(params[:id])
  end

  def new

  end

  def create

  end

  def delete

  end


  private
    def article_params
      params.require(:articles).permit(

      )
    end


end
