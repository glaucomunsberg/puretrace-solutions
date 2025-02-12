class AnalyticsController < ApplicationController
  def index
    # redirect to the localhost:4000
    redirect_to ENV.fetch('APP_BASE_URL') {
      'http://localhost:3000/'
    }, allow_other_host: true
  end

  def products
    # Return all products in json format
    render json: Product.all
  end

  def tests
    # Return all tests in json format
    render json: Test.where(product_id: analytics_params[:products_ids].split(',')).order(:created_at)
  end

  def analytics_params
    params.permit([:products_ids])
  end
end
