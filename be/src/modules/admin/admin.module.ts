import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { AccountMiddleware } from './middleware/account.middleware';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CoursesModule } from './course/department.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ClassesModule } from './classroom/accessory.module';

@Module({
    imports: [
        UserModule,
		JwtModule,
		CoursesModule,
		ExerciseModule,
		ClassesModule
    ],
    providers: [
		JwtService
	],
    controllers: []
})
export class AdminModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AccountMiddleware)
		.forRoutes('user', 'devices', 'providers', 'accessory, department')
	}
 }
