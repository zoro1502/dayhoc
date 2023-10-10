import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCoursesDto {

    @IsString()
    @IsNotEmpty()
	@ApiProperty()
    name: string;

    @ApiProperty()
	@IsNotEmpty()
    code: string;

	@ApiProperty()
	@IsOptional()
    content?: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    status: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    user_id?: number;

    created_at: Date = new Date();
	updated_at: Date = new Date();
}
