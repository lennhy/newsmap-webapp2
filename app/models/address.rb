class Address < ApplicationRecord
  has_many :articles
  belongs_to :country


end
