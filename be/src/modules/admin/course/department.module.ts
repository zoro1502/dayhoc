import { Module } from '@nestjs/common';
import { CoursesController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classes.entity';
import { User } from 'src/entities/user.entity';
import { Course } from 'src/entities/courses.entity.ts';
import { StudentHasExercise } from 'src/entities/student-has-exercises.entity';
import { UserCoursesClasses } from 'src/entities/user-courses-classes.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Classroom,
			User,
			Course,
			StudentHasExercise,
			UserCoursesClasses
        ])
    ],
    controllers: [CoursesController],
    providers: [DepartmentService],
    exports: [TypeOrmModule, DepartmentService]
})
export class CoursesModule { }
