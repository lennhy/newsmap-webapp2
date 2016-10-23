class CreateValidations < ActiveRecord::Migration[5.0]
  def change
    create_table :validations do |t|
      t.article_id :integer
      t.quantity :integer
      
      t.timestamps
    end
  end
end
