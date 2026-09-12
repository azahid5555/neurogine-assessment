import { getProducts } from "./productService";

describe("getProducts", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns products when the API request is successful", async () => {
    const mockResponse = {
      products: [
        {
          id: 1,
          title: "Test Product",
          price: 10,
        },
      ],
      total: 1,
      skip: 0,
      limit: 20,
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getProducts(0, 20);

    expect(result).toEqual(mockResponse);

    expect(fetch).toHaveBeenCalledWith(
      "https://dummyjson.com/products?limit=20&skip=0",
    );
  });
});
