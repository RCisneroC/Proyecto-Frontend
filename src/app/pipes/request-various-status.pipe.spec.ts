import { RequestVariousStatusPipe } from './request-various-status.pipe';

describe('RequestVariousStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new RequestVariousStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
