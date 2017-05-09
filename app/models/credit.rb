class Credit < ApplicationRecord
  belongs_to :article
  belongs_to :user

  validates_uniqueness_of :article, scope: :user_id
  validate :role_cannot_be_author


  def role_cannot_be_author
      if user.id === article.user.id
        errors.add(:role, "You can't credit your own article")
      end
    end
end
