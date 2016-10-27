class Article < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true
  belongs_to :country
  has_many :validations
  attr_accessor :category_title
  # We want to run this whenever someone tries to save to the database. Also to make sure it saves to the databse
  # before_action :make_title_case
  # Whenever you are modifying an attribute of the model, use before_validation. If you are doing some other action, then use before_save.


  # --This custom setter method is called whenever an Article is initialized with a category_name field.
  # "virtuals"
  def category_title=(title)
      category = Category.find_or_create_by(:title=> title)
      self.update(:category_id=>category.id)
  end

  def total_validations
    total = 0
    self.validations.each do |val|
      total += val.quantity
    end
    total
  end

  # add a validation when user clicks button on article show page

  def add_validation(article_id, user)
    validation =  Validation.find_or_create_by(:article_id=> article_id)
    if validation
      validation.quantity += 1
      validation.save
      self.validations << validation
      # -- user below is the reader not the author
      self.user = User.find(user.id)
      self.user.save
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
