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

import IdentityUserRole from '../../../../identity/infra/typeorm/entities/IdentityUserRole';
import UserAccountStatus from './UserAccountStatus';
import UserDocument from './UserDocument';
import UserAvatar from './UserAvatar';

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
  account_type: string;

  @OneToOne(() => UserAvatar, userAvatar => userAvatar.user)
  avatar: UserAvatar;

  @OneToMany(() => UserDocument, userDocument => userDocument.user)
  documents: UserDocument[];

  @OneToMany(() => IdentityUserRole, roles => roles.user)
  roles: IdentityUserRole[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
