import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateExDto {

	@IsString()
    @IsOptional()
	@ApiProperty()
    title: string;

    @IsNumber()
	@IsOptional()
    @ApiProperty()
    type?: number

	@IsOptional()
	@ApiProperty()
    deadline?: Date;

	@IsOptional()
	@ApiProperty()
    file?: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
    status?: number;

	@IsOptional()
	@ApiProperty()
    class_id?: number[];

	@IsArray()
	@IsOptional()
	@ApiProperty()
    students?: number[];

	updated_at: Date = new Date();
}
