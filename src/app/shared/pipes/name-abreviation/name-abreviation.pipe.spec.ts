import { NameAbreviationPipe } from './name-abreviation.pipe';

describe('NameAbreviationPipe', () => {
  let pipe: NameAbreviationPipe;

  beforeEach(() => {
    pipe = new NameAbreviationPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should abbreviate two-word name', () => {
    const result = pipe.transform('John Doe');
    expect(result).toEqual('JD');
  });

  it('should handle empty string', () => {
    const result = pipe.transform('');
    expect(result).toEqual('');
  });

  it('should handle longer names and ignore extra words', () => {
    const result = pipe.transform('Alice Bob Carol');
    expect(result).toEqual('AB');
  });

  it('should handle names with non-alphabet characters', () => {
    const result = pipe.transform('123 John');
    expect(result).toEqual('1J');
  });
});
