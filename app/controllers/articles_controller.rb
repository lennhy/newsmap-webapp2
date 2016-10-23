class ArticlesController < ApplicationController
  # unregistered users (readers) only to have only read access for a selected group of controllers:
  before_filer :authenticate_user!, except: [ :index, :show ]
 end

  def show

  end

  def index

  end


end
