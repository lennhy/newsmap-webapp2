class CreditSerializer < ActiveModel::Serializer
  attributes :id, :user
  has_one :user, serializer: UserSerializer
  has_one :article

end
