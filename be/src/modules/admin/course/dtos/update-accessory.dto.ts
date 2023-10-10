import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCoursesDto {

	@IsString()
    @IsOptional()
	@ApiProperty()
    name?: string;

	@IsNumber()
    @ApiProperty()
	@IsOptional()
    status?: number;

    @ApiProperty()
	@IsOptional()
    code?: string;

	@ApiProperty()
	@IsOptional()
    content?: string;

	@IsNumber()
	@ApiProperty()
    user_id?: number;
	
	updated_at: Date = new Date();
}
