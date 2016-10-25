class ArticlesController < ApplicationController
  # unregistered users (readers) only to have only read access for a selected group of actions:
  before_action :authenticate_user!, except: [ :index, :show ]
  # when we want to run this whenever someone tries to save to the database. Also to make sure it saves to the databse
  before_validation :make_title_case
  # Whenever you are modifying an attribute of the model, use before_validation. If you are doing some other action, then use before_save.
  
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
