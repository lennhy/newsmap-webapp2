class RemoveValidationIdFromArticles < ActiveRecord::Migration[5.0]
  def change
    remove_column :articles, :validation_id, :integer
  end
end
