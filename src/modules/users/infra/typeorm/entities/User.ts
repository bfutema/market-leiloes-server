import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import UserDocument from './UserDocument';
import UserAccountStatus from './UserAccountStatus';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  rg: string;

  @Column()
  birth: Date;

  @Column()
  gender: string;

  @Column()
  status_id: number;

  @OneToOne(() => UserAccountStatus)
  @JoinColumn({ name: 'status_id' })
  status: UserAccountStatus;

  @Column()
  avatar: string;

  // @OneToMany(() => UserDocument, document => document.id)
  // documents: UserDocument[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
