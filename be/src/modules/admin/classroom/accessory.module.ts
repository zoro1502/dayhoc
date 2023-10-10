import { Module } from '@nestjs/common';
import { AccessoryController } from './accessory.controller';
import { AccessoryService } from './accessory.service';
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
        ]),
    ],
    controllers: [AccessoryController],
    providers: [AccessoryService],
    exports: [AccessoryService],
})
export class ClassesModule {}
