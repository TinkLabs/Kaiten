import Unit from './Unit';

it('printDistance', () => {
  expect(Unit.printDistance(1000)).toEqual({ unit: 'km', distance: 1 });
  expect(Unit.printDistance(400)).toEqual({ unit: 'm', distance: 400 });
  expect(Unit.printDistance(467)).toEqual({ unit: 'm', distance: 467 });
  expect(Unit.printDistance(890)).toEqual({ unit: 'm', distance: 890 });

  expect(Unit.printDistance(1730)).toEqual({ unit: 'km', distance: 1.7 });
  expect(Unit.printDistance(1758)).toEqual({ unit: 'km', distance: 1.8 });
  expect(Unit.printDistance(1753)).toEqual({ unit: 'km', distance: 1.8 });
  
  expect(Unit.printDistance(2730)).toEqual({ unit: 'km', distance: 2.7 });
  expect(Unit.printDistance(2758)).toEqual({ unit: 'km', distance: 2.8 });
  expect(Unit.printDistance(2753)).toEqual({ unit: 'km', distance: 2.8 });
});