export default class VectorNodeType<T> {
  value: T | null = null;
  id: string | null = null;

  constructor(value: T) {
    this.value = value;
    this.id = crypto.randomUUID();
  }
}
