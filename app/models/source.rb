class Source < ApplicationRecord
  has_many :articles, through: :article_sources
  has_many :article_sources

end
