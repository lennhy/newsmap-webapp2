class Seeder

  def self.create_country(country_hash)
    country_hash.each do |key, value|
      Country.create(:title=> value).save
    end
  end

  def self.create_category(category_hash)
    category_hash.each do |key, value|
      Category.create(:title=> value).save
    end
  end

  def self.create_article(article_hash)
    article_hash.each do |key, value|
      Article.create(:title=> value).save
    end
  end

  # -----------------------------------------below is executed in the seed file

  def self.create_objs(country_hash, category_hash, article_hash)
    self.create_country(country_hash)
    self.create_category(category_hash)
    self.create_article(article_hash)
  end

  def self.create_user(user_hash, country_obj, category_obj, article_obj)
      new_user = User.new
      user_hash.each do |key, value|
        saved_user = new_user.create("#{key}=", value)

        object.each do |obj|
          saved_user.articles << obj
          saved_user.articles.country = country_obj
          saved_user.articles.category = category_obj
          saved_user.articles.article = article_obj

          saved_user.save
        end
      end
  end


end
