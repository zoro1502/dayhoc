import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto {

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	full_name: string;

	@ApiProperty()
	@IsOptional()
	@IsEmail()
	email: string;

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
	classIds?: any;

	@ApiProperty()
	@IsOptional()
	birth_day?: any;


	created_at: any = new Date();
	updated_at: any = new Date();
}
