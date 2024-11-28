import { LoadingOverlayService } from './loading-overlay.service';

describe('LoadingOverlayService', () => {
  let service;

  beforeEach(() => {
    service = new LoadingOverlayService();
  });

  it('should run #setLoading()', async () => {
    service.loadingSubject = service.loadingSubject || {};
    service.loadingSubject.next = jest.fn();
    service.setLoading({});
    // expect(service.loadingSubject.next).toHaveBeenCalled();
  });
});
