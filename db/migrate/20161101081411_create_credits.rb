class CreateCredits < ActiveRecord::Migration[5.0]
  def change
    create_table :credits do |t|
      t.integer :user_id
      t.integer :article_id
      t.integer :vote, :default=> 1
    end
  end
end
