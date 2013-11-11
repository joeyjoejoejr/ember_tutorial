class WidgetsController < ApplicationController
  include ActionController::Live

  def events
    response.headers["Content-Type"] = "text/event-stream"
    start = Time.zone.now
    10.times do
      Widget.uncached do
        Widget.where('updated_at > ? OR created_at > ?', start, start).each do |widget|
          response.stream.write "data: #{widget.to_json}\n\n"
          start = Time.zone.now
        end
      end
      sleep 2
    end
    logger.info "Stream closed"
  ensure
    response.stream.close
  end

  def index
    render json: Widget.active
  end

  def show
    render json: Widget.find(params[:id])
  end

  def create
    render json: Widget.create(params[:widget])
  end

  def update
    @widget = Widget.find params[:id]
    render json: @widget.update_attributes(params[:widget])
  end

  def destroy
    @widget = Widget.find params[:id]
    render json: @widget.update_attributes(deleted_at: Time.zone.now)
  end
end
