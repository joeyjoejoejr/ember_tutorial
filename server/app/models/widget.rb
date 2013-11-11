class Widget < ActiveRecord::Base
  scope :active, -> { where(deleted_at: nil) }
end
