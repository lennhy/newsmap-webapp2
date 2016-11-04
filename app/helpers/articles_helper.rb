module ArticlesHelper
  def most_popular_article
    Article.most_credited_article
  end
end
