class AddNameToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :name, :string
    change_column :widgets, :description, :text
  end
end
