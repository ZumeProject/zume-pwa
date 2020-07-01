import partPreview from './partPreview';

const stringSample = { t: 'hello', d: 'world' };
const arraySample = { t: 'array', d: ['sample'] };
const arrayWithObjectSample = { t: 'third', d: [{ t: 'bye', d: 'for now' }] };
const infoSample = { t: 'hello', info: 'world' };

it('returns a simple string', () => {
  let { t, d } = partPreview(stringSample);
  expect(t).toBe('hello');
  expect(d).toBe('world');
});

it('uppercases type when t is not set', () => {
  let { t, d } = partPreview({ type: 'watch', d: 'world' });
  expect(t).toBe('WATCH');
  expect(d).toBe('world');
});

it('processes an array', () => {
  let { t, d } = partPreview(arraySample);
  expect(t).toBe('array');
  expect(d).toBe('sample');
});

it('processes an array with an object element', () => {
  let { t, d } = partPreview(arrayWithObjectSample);
  expect(t).toBe('third');
  expect(d).toBe('bye');
});

it('processes a nested array with a string first element', () => {
  let { t, d } = partPreview({ t: '', d: [['first']] });
  expect(t).toBe('');
  expect(d).toBe('first');
});

it('processes a nested array with an object', () => {
  let { t, d } = partPreview({ t: '', d: [stringSample] });
  expect(t).toBe('');
  expect(d).toBe('hello');
});

it('uses info when description is absent', () => {
  let { t, d } = partPreview(infoSample);
  expect(t).toBe('hello');
  expect(d).toBe('world');
});
