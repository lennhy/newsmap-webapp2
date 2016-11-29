class CreateArticles < ActiveRecord::Migration[5.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :content

      t.integer :user_id
      t.integer :category_id
      t.integer :country_id

      t.timestamps
    end
  end
end
