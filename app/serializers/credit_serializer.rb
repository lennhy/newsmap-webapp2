class CreditSerializer < ActiveModel::Serializer
  attributes :id, :user, :errors
  has_one :user, serializer: UserSerializer
  has_one :article

end
