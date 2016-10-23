class CreateValidations < ActiveRecord::Migration[5.0]
  def change
    create_table :validations do |t|
      t.integer :article_id
      t.integer :quantity

      t.timestamps
    end
  end
end
