// TODO: This fixture might be too large, and if so should be split up.

export abstract class AbstractSocket {
  createSocket?(): Promise<string>;
}
