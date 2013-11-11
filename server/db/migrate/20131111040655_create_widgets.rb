class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.string :description

      t.timestamps
    end
  end
end
