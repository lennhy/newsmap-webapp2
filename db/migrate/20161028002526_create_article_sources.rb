class CreateArticleSources < ActiveRecord::Migration[5.0]
  def change
    create_table :article_sources do |t|
      t.integer :article_id
      t.integer :source_id

    end
  end
end
