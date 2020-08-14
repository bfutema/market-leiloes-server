import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('identity_roles')
class IdentityRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default IdentityRole;
