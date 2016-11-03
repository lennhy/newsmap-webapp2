class Credit < ApplicationRecord
  belongs_to :article
  belongs_to :user

  validates_uniqueness_of :article, scope: :user_id
end
