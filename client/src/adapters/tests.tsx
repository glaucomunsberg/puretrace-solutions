export interface TestData {
  lead_concentration: number;
  arsenic_concentration: number;
  cadmium_concentration: number;
  mercury_concentration: number;
}

export interface Test {
  id: number;
  product_id: number;
  data: TestData;
  created_at: string;
  updated_at: string;
}
