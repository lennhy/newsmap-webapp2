class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :articles
  has_many :credits

end
