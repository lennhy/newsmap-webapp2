class AddCreditToArticles < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :credit, :integer, :default => 0
  end
end
