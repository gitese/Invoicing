export interface IRead<T> {
    fetchAll(item: T): Promise<T[]>;
    findOne(id: string): Promise<T>;
}