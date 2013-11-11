class WidgetSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :deleted_at
end
