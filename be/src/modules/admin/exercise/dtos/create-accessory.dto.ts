import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseDto {

    @IsString()
    @IsNotEmpty()
	@ApiProperty()
    title: string;

	@IsString()
    @IsNotEmpty()
	@ApiProperty()
    content: string;

    @IsNumber()
	@IsOptional()
    @ApiProperty()
    type?: number

	@IsOptional()
	@ApiProperty()
    deadline: Date;

	@IsNotEmpty()
	@ApiProperty()
    file: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    status: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    user_id: number;

	@ApiProperty()
    class_id: number[];

	@IsArray()
	@IsOptional()
	@ApiProperty()
    students: number[];

    created_at: Date = new Date();
	updated_at: Date = new Date();
}
