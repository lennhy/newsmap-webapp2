class CreditSerializer < ActiveModel::Serializer
  attributes :id, :user
  has_one :user
end