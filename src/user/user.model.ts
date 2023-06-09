import { Column, Model, Table } from 'sequelize-typescript';
@Table({tableName: 'Users'})
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;
  
  @Column
  mobile: string;

  @Column
  addressCode: string;

  @Column
  password: string;
}