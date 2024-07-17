export default interface IController {
  setOptions(options: {}): void;

  getOptions(): {};

  setPosition(posX: number, posY: number): void;

  getPosition(): {
    posX: number | undefined;
    posY: number | undefined;
  };

  clone<T>(instance: T): T;
}
