import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../users/infra/typeorm/entities/User';
import IdentityRole from './IdentityRole';

@Entity('identity_user_roles')
class IdentityUserRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  role_id: number;

  @ManyToOne(() => IdentityRole)
  @JoinColumn({ name: 'role_id' })
  role: IdentityRole;

  @CreateDateColumn()
  created_at: Date;
}

export default IdentityUserRole;
