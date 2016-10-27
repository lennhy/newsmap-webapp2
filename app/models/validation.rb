class Validation < ApplicationRecord
  belongs_to :article
  belongs_to :user, optional: true # this allows for only readers to own validations
end
