class User < ApplicationRecord
  has_many :articles
  has_many :validations, through: :articles #(has many to through relationship - join table: articles)

  devise :database_authenticatable, :registerable,  :validatable # to enable devise authentication
  devise :omniauthable, :omniauth_providers => [:facebook] # to enable omniauth
  after_initialize :set_default_user_role

  # Here we look for a user with that (provider: :facebook, uid: your_uid) pair and create them if they aren't in the database. For Facebook users, we create a random password.
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


# Facebook sends us a bunch of information back, and Omniauth parses it for us and puts it in the request environment: request.env['omniauth.auth']

# Here's a sample of the auth hash Facebook sends us:
# {
#   :provider => 'facebook',
#   :uid => '1234567',
#   :info => {
#     :email => 'joe@bloggs.com',
#     :name => 'Joe Bloggs',
#     :first_name => 'Joe',
#     :last_name => 'Bloggs',
#     :image => 'http://graph.facebook.com/1234567/picture?type=square',
#     :urls => { :Facebook => 'http://www.facebook.com/jbloggs' },
#     :location => 'Palo Alto, California',
#     :verified => true
#   },
#   :credentials => {
#     :token => 'ABCDEF...', # OAuth 2.0 access_token, which you may wish to store
#     :expires_at => 1321747205, # when the access token expires
#     :expires => true # this will always be true
#   },
#   :extra => {
#     :raw_info => {
#       :id => '1234567',
#       :name => 'Joe Bloggs',
#       :first_name => 'Joe',
#       :last_name => 'Bloggs',
#       :link => 'http://www.facebook.com/jbloggs',
#       :username => 'jbloggs',
#       :location => { :id => '123456789', :name => 'Palo Alto, California' },
#       :gender => 'male',
#       :email => 'joe@bloggs.com',
#       :timezone => -8,
#       :locale => 'en_US',
#       :verified => true,
#       :updated_time => '2011-11-11T06:21:03+0000'
#     }
#   }
# }
end
