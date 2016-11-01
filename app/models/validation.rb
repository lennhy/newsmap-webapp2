class Validation < ApplicationRecord
  belongs_to :article
  belongs_to :user #  -> { where "role = reader" }this allows for only readers to own validations
  # reader can only validate one article
  # validates_uniqueness_of :user, uniqueness: { scope: :article,
  #   message: "Only one validation per article" }
end
