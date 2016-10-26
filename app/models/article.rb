class Article < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :country
  has_many :validations

  # We want to run this whenever someone tries to save to the database. Also to make sure it saves to the databse
  # before_action :make_title_case
  # Whenever you are modifying an attribute of the model, use before_validation. If you are doing some other action, then use before_save.


  # --These setter methods are called whenever an Article is initialized with a category_title or country_title field.
  # "virtuals"

  def category_title
    self.category
  end

  def country_title
    self.category
  end

  def category_title=(title)
    self.category = Category.find_or_create_by(:title=>title)
  end

  def country_title=(title)
    self.country = Country.find_or_create_by(:title=>title)
  end

  def total_validations
    total = 0
    self.validations.each do |val|
      total += val.quantity
    end
    total
  end

  # add a validation when user clicks button on article show page
  def add_validation(article_id)
    validation =  Validation.find_or_create_by(:article_id=> article_id)
    if validation
      validation.quantity += 1
      validation.save
      self.validations << validation
      self.save
    end
  end

  private
    # --callbacks are defined in the object models and called in the controller
    def is_title_case
      if title.split.any?{|w|w[0].upcase != w[0]}
       errors.add(:title, "Title must be in title case")
      end
    end

    def make_title_case
      self.title = self.title.titlecase
    end



end
#
# User
# has_many :articles
# has_many :Validations, through: :articles
#
# Article ( join table 1)
# belong_to :users
# belong_to :categories
# has_many :validations, through: :users (many to many)
#
# Category
# has_many :articles
#
# Validation ( join table 2)
# belongs_to :user
# belongs_to :article
#
