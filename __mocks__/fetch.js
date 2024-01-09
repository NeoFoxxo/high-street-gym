export function fetchMock(response) {
  global.fetch = jest.fn(() =>
    Promise.resolve(response)
  );
}

export function fetchMockJson(response) {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
    })
  );
}

export function fetchMockFail() {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('Test error'))
  );
}