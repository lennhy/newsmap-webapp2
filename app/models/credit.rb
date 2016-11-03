class Credit < ApplicationRecord
  belongs_to :article
  belongs_to :user

  validates_uniqueness_of :user_id
end
