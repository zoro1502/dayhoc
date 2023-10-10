import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ValidateService } from './services/validate.service';
import { ClassesModule } from '../classroom/accessory.module';
import { CoursesModule } from '../course/department.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => ClassesModule),
		forwardRef(() => CoursesModule)
	],
	controllers: [UserController],
	providers: [UserService, ValidateService],
	exports: [UserService, ValidateService]
})
export class UserModule { }
