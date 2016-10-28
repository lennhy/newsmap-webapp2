class User < ApplicationRecord
  has_many :articles
  has_many :validations

  devise :database_authenticatable, :registerable,  :validatable # to enable devise authentication
  devise :omniauthable, :omniauth_providers => [:facebook] # to enable omniauth
  after_initialize :set_default_user_role

  # Here we look for a user with that (provider: :facebook, uid: your_uid) pair and create them if they aren't in the database. For Facebook users, we create a random password.

  def total_reader_validations
    total = 0
    self.validations.each do |val|
      total += val.quantity
    end
    total
  end

  def self.from_omniauth(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0,20]
      end
  end

  enum :role=> [:reader, :author]

  def set_default_user_role
    self.role  ||= 0  # --will set the default user to reader only if it's nil
  end

  def guest?
   self.persisted?
  end
  # Facebook sends us a bunch of information back, and Omniauth parses it for us and puts
  #  it in the request environment: request.env['omniauth.auth']

end
