import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from 'src/database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './helpers/helper';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { ClassesModule } from './modules/admin/classroom/accessory.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            })
			// validationSchema: Joi.object({
            //     MYSQL_HOST: Joi.string().required(),
            //     MYSQL_PORT: Joi.number().required(),
            //     MYSQL_USER: Joi.string().required(),
            //     MYSQL_PASSWORD: Joi.string(),
            //     MYSQL_DB: Joi.string().required(),
            //     JWT_SECRET: Joi.string().required(),
            //     JWT_EXPIRATION_TIME: Joi.string().required(),
            // })
        }),
        DatabaseModule,
        AdminModule,
        AuthModule,
        UploadModule,
		ClassesModule
    ],
    controllers: [],
    providers: [
		{
			provide: APP_FILTER,
			useClass: ExceptionsLoggerFilter,
		}
	],
})
export class AppModule { }
