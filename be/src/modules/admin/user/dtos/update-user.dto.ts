import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsEmail, MinLength, MaxLength, IsArray } from "class-validator";

export class UpdateUserDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	full_name?: string;

	@ApiProperty()
	@IsEmail()
	@IsOptional()
	@IsString()
	email?: string;

	@ApiProperty()
	@IsOptional()
	@MinLength(10)
	@MaxLength(12)
	@IsString()
	phone?: string;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	role?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	status?: number;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	avatar?: string;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	courseIds?: any;

	@ApiProperty()
	@IsOptional()
	birth_day?: any;
	

	updated_at?: any = new Date();
}
