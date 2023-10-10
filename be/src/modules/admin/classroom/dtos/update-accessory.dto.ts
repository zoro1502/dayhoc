import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAccessoryDto {

	@IsString()
    @IsOptional()
	@ApiProperty()
    name?: string;

    @IsNumber()
    @ApiProperty()
	@IsOptional()
    student_max_number?: number;

	@IsNumber()
    @ApiProperty()
	@IsOptional()
    status?: number;

	@IsNumber()
	@ApiProperty()
	@IsOptional()
    course_id?: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
    slot?: string;

	@IsOptional()
	@ApiProperty()
	
    slot_dates?: any[];

	updated_at: Date = new Date();
}
