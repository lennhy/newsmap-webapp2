class AddValidationIdToArticles < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :validation_id, :integer
  end
end
