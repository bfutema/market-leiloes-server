export default interface ICreateUserDTO {
  username: string;
  email: string;
  password_hash: string;
  name: string;
  surname: string;
  cpf_cnpj: string;
  rg: string;
  birth: Date;
  gender: string;
}
