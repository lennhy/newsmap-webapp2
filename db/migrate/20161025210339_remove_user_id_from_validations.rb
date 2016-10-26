class RemoveUserIdFromValidations < ActiveRecord::Migration[5.0]
  def change
    remove_column :validations, :user_id
  end
end
