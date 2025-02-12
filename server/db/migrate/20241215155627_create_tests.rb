class CreateTests < ActiveRecord::Migration[7.1]
  def change
    create_table :tests do |t|
      t.references :product, null: false, foreign_key: true
      t.jsonb :data

      t.timestamps
    end
  end
end
