require 'rails_helper'

RSpec.describe 'Analytics', type: :request do
  describe 'GET /products empty' do
    it 'returns no products' do
      get '/products.json'

      expect(response).to have_http_status(200)

      posts = JSON.parse(response.body)
      expect(posts.length).to eq(0)
    end
  end
  describe 'GET /products with 3 products' do
    before do
      ['Baby Food', 'Protein Powder', 'Popcorn'].each do |product_name|
        Product.find_or_create_by!(name: product_name)
      end
    end
    it ' returns 3 products' do
      get '/products.json'

      expect(response).to have_http_status(200)

      posts = JSON.parse(response.body)
      expect(posts.length).to eq(3)
    end
  end
  describe 'GET /tests empty' do
    it ' returns 0 tests' do
      get "/tests?products_ids=#{Product.all.map(&:id).join(',')}"

      expect(response).to have_http_status(200)

      posts = JSON.parse(response.body)
      expect(posts.length).to eq(0)
    end
  end
  describe 'GET /tests with 3 products and empty' do
    before do
      ['Baby Food', 'Protein Powder', 'Popcorn'].each do |product_name|
        Product.find_or_create_by!(name: product_name)
      end
    end
    it ' returns 0 tests' do
      get "/tests?products_ids=#{Product.all.map(&:id).join(',')}"

      expect(response).to have_http_status(200)

      posts = JSON.parse(response.body)
      expect(posts.length).to eq(0)
    end
  end
  describe 'GET /tests with 3 products and 1 test' do
    before do
      ['Baby Food', 'Protein Powder', 'Popcorn'].each do |product_name|
        Product.create(name: product_name)
      end
      Test.create(product_id: Product.first.id)
    end
    it 'returns 1 tests' do
      get "/tests?products_ids=#{Product.all.map(&:id).join(',')}"

      expect(response).to have_http_status(200)

      tests = JSON.parse(response.body)

      expect(tests.length).to eq(1)
    end
  end
end
