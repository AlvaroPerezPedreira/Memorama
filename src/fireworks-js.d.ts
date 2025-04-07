declare module "fireworks-js" {
  export default class Fireworks {
    constructor(container: HTMLElement, options?: object);
    start(): void;
    stop(): void;
  }
}
