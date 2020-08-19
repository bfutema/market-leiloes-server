import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import IdentityUserRole from './IdentityUserRole';

@Entity('identity_roles')
class IdentityRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => IdentityUserRole, users => users.role)
  users: User[];
}

export default IdentityRole;
