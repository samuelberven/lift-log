export interface User {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDto {
  name: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
