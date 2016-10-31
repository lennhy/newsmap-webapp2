# class Seeder
#   attr_accessor :create_country
#
#   def self.create_country(country_hash)
#     country_hash.each do |key, value|
#       Country.create(:title=> value).save
#     end
#   end
#
#   def self.create_category(category_hash)
#     category_hash.each do |key, value|
#       Category.create(:title=> value).save
#     end
#   end
#
#   def self.create_article(article_hash)
#     article_hash.each do |key, value|
#       Article.create(:title=> value).save
#     end
#   end
#
#   # -----------------------------------------below is executed in the seed file
#
#   def self.create_objs(country_hash, category_hash, article_hash)
#     self.create_country(country_hash)
#     self.create_category(category_hash)
#     self.create_article(article_hash)
#   end
#
#   def self.create_user(user_hash, country_obj, category_obj, article_obj)
#       new_user = User.new
#       user_hash.each do |key, value|
#         saved_user = new_user.send("#{key}=", value)
#
#         object.each do |obj|
#           saved_user.articles << obj
#           saved_user.articles.country = country_obj
#           saved_user.articles.category = category_obj
#           saved_user.articles.article = article_obj
#
#           saved_user.save
#         end
#       end
#   end
#
#
# end

# Prefix Verb     URI Pattern                             Controller#Action
#                            root GET      /                                       static_pages#home
#                new_user_session GET      /users/sign_in(.:format)                sessions#new
#                    user_session POST     /users/sign_in(.:format)                sessions#create
#            destroy_user_session DELETE   /users/sign_out(.:format)               sessions#destroy
#        cancel_user_registration GET      /users/cancel(.:format)                 devise/registrations#cancel
#               user_registration POST     /users(.:format)                        devise/registrations#create
#           new_user_registration GET      /users/sign_up(.:format)                devise/registrations#new
#          edit_user_registration GET      /users/edit(.:format)                   devise/registrations#edit
#                                 PATCH    /users(.:format)                        devise/registrations#update
#                                 PUT      /users(.:format)                        devise/registrations#update
#                                 DELETE   /users(.:format)                        devise/registrations#destroy
# user_facebook_omniauth_authorize GET|POST /users/auth/facebook(.:format)          omniauth_callbacks#passthru
# user_facebook_omniauth_callback GET|POST /users/auth/facebook/callback(.:format) omniauth_callbacks#facebook
#                   user_articles GET      /users/:user_id/articles(.:format)      articles#index
#                    user_article GET      /users/:user_id/articles/:id(.:format)  articles#show
#                            user GET      /users/:id(.:format)                    users#show
#                        articles GET      /articles(.:format)                     articles#index
#                                 POST     /articles(.:format)                     articles#create
#                     new_article GET      /articles/new(.:format)                 articles#new
#                    edit_article GET      /articles/:id/edit(.:format)            articles#edit
#                         article GET      /articles/:id(.:format)                 articles#show
#                                 PATCH    /articles/:id(.:format)                 articles#update
#                                 PUT      /articles/:id(.:format)                 articles#update  
