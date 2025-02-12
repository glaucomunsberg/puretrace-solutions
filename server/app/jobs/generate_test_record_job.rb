class GenerateTestRecordJob < ApplicationJob
  queue_as :default

  def perform(*_args)
    Test.create(product_id: Product.all.sample.id)
  end
end
