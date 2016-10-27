class Validation < ApplicationRecord
  belongs_to :article
  belongs_to :reader, class_name: "User" # this allows for only readers to own validations
end
