class Test < ApplicationRecord
  belongs_to :product

  before_save :set_data

  def set_data
    self.data = fake_test_data
  end

  def fake_test_data
    {
      lead_concentration: rand(25),
      mercury_concentration: rand(25),
      arsenic_concentration: rand(25),
      cadmium_concentration: rand(25)
    }
  end
end
