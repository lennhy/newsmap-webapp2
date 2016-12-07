class UserArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :credits, :total_credits

end
