class UserSerializer < ActiveModel::Serializer
  has_many :articles, serializer: UserArticleSerializer
  has_many :credits

end
