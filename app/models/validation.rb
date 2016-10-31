class Validation < ApplicationRecord
  belongs_to :article
  belongs_to :user, optional: true # this allows for only readers to own validations
  # reader can only validate one article
  validates_uniqueness_of :article, uniqueness: { scope: :user,
    message: "Only one validation per article" }
end
