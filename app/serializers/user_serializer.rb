class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :role
  has_many :articles, serializer: UserArticleSerializer
  has_many :credits, serializer: UserCreditSerializer

end
