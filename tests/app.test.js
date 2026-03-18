const { products } = require('../src/data');

describe('Products Data', () => {
  test('should have 3 products', () => {
    expect(products).toHaveLength(3);
  });

  test('each product should have id, name, price, description', () => {
    products.forEach(product => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('description');
    });
  });
});

describe('Search Functionality', () => {
  test('should filter products by name', () => {
    const query = 'laptop';
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Laptop');
  });

  test('should filter products by description', () => {
    const query = 'powerful';
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Laptop');
  });

  test('should return empty for no match', () => {
    const query = 'nonexistent';
    const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    expect(filtered).toHaveLength(0);
  });
});