class RemoveCreditFromArticles < ActiveRecord::Migration[5.0]
  def change
    remove_column :articles, :credit

  end
end
