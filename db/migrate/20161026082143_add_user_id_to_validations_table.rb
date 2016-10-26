class AddUserIdToValidationsTable < ActiveRecord::Migration[5.0]
  def change
    add_column :validations, :user_id, :integer
  end
end
