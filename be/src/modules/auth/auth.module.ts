import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../admin/user/user.module';
import { UserService } from '../admin/user/user.service';
import { ValidateService } from '../admin/user/services/validate.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClassesModule } from '../admin/classroom/accessory.module';
import { AccessoryService } from '../admin/classroom/accessory.service';
import { CoursesModule } from '../admin/course/department.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		UserModule,
		ConfigModule,
		forwardRef(() => ClassesModule),
		forwardRef(() => CoursesModule),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
				},
			}))
		})
	],
	controllers: [AuthController],
	providers: [AuthService, UserService, ValidateService, JwtStrategy]
})
export class AuthModule { }
