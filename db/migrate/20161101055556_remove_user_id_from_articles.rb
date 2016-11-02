class RemoveUserIdFromArticles < ActiveRecord::Migration[5.0]
  def change
    remove_column :articles, :user_id
  end
end
