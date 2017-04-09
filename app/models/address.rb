class Address < ApplicationRecord
  has_many :articles
  has_one :country, :dependent => :destroy


end
