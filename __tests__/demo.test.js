test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer'
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});
