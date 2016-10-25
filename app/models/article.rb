class Article < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :country
  has_many :validations

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
