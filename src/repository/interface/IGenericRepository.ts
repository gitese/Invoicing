export interface IGenericRepository<T>{
    fetchAll(item?: T): Promise<T[]>;
};