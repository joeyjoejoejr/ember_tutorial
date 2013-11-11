class WidgetsController < ApplicationController
  def index
    render json: Widget.all
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
    render json: @widget.destroy
  end
end
