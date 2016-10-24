class CreateCountry < ActiveRecord::Migration[5.0]
  def change
    create_table :countries do |t|
      t.string :title
    end
  end
end
