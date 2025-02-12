require 'rails_helper'

RSpec.describe Product, type: :model do
  it 'is valid with a name' do
    product = Product.new(name: 'test')
    expect(product).to be_valid
  end

  it 'is invalid without a name' do
    product = Product.new(name: nil)

    expect(product).to_not be_valid
  end
end
