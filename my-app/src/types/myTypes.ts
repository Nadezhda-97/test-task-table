export interface User {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
}
      
export interface SortConfig {
  field: keyof User | null,
  direction: 'ascending' | 'descending',
}
    
export type Value = string | number;