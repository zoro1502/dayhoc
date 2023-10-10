import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserHasExDto {

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    exercise_id: number;

    @IsNumber()
	@IsOptional()
    @ApiProperty()
    student_id?: number

	@IsOptional()
	@ApiProperty()
    class_id: number;

	@IsOptional()
	@ApiProperty()
    file?: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    mark: number;

    created_at?: Date = new Date();
	updated_at?: Date = new Date();
}
