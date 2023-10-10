import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	full_name: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	phone: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	address: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	avatar?: string;

	updated_at: Date = new Date();
}
