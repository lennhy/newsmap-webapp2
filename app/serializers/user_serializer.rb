class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :articles, serializer: UserArticleSerializer
  has_many :credits, serializer: UserCreditSerializer

end
