class ChangeValidationQuantityToDefaultInteger < ActiveRecord::Migration[5.0]
  def change
    change_column :validations, :quantity, :integer, :default => 0
  end
end
