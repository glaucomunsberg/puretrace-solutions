require 'rails_helper'

RSpec.describe Test, type: :model do
  it 'is valid with product and test' do
    product = Product.create(name: 'test')
    expect(product).to be_valid
    test = Test.create(product_id: product.id)
    expect(test).to be_valid
  end

  it 'is invalid without product' do
    test = Test.new(product_id: nil)

    expect(test).to_not be_valid
  end
end
