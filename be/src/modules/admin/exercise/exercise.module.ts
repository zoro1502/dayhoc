import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './excercise.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entities/exercises.entity';
import { Classroom } from 'src/entities/classes.entity';
import { User } from 'src/entities/user.entity';
import { Course } from 'src/entities/courses.entity.ts';
import { StudentHasExercise } from 'src/entities/student-has-exercises.entity';
import { UserCoursesClasses } from 'src/entities/user-courses-classes.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Exercise,
			Classroom,
			User,
			Course,
			StudentHasExercise,
			UserCoursesClasses
        ])
    ],
    controllers: [ExerciseController],
    providers: [ExerciseService],
    exports: [TypeOrmModule]
})
export class ExerciseModule { }
