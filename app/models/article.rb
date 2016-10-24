class Article < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :validations

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
