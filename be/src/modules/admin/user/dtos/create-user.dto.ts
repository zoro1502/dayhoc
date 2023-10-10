import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsArray } from "class-validator";

export class CreateUserDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	@MinLength(10)
	@MaxLength(12)
	phone?: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	@MaxLength(30)
	password: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	role?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	status: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	courseIds?: any;

	@ApiProperty()
	@IsOptional()
	birth_day?: any;


	created_at: any = new Date();
	updated_at: any = new Date();
}
