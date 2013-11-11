class AddDeletedAtToWidgets < ActiveRecord::Migration
  def change
    add_column :widgets, :deleted_at, :datetime
  end
end
