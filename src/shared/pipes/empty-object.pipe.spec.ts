import { EmptyObjectPipe } from './empty-object.pipe';

describe('EmptyObjectPipe', () => {
  let pipe: EmptyObjectPipe;

  beforeEach(() => {
    pipe = new EmptyObjectPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for an empty object', () => {
    expect(pipe.transform({})).toBe(true);
  });

  it('should return false for a non-empty object', () => {
    expect(pipe.transform({ key: 'value' })).toBe(false);
  });
});
