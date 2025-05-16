import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;
}
