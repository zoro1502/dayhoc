import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAccessoryDto {

    @IsString()
    @IsNotEmpty()
	@ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    student_max_number: number

    @IsString()
	@IsOptional()
	@ApiProperty()
    code: string;

	@IsNumber()
	@ApiProperty()
    status: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    course_id: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
    slot?: string;

	@IsNotEmpty()
	@ApiProperty()
    slot_dates?: any[];

    created_at: Date = new Date();
	updated_at: Date = new Date();
}
