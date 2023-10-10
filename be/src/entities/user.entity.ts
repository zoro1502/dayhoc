import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Classroom } from "./classes.entity";
import { Course } from "./courses.entity.ts";
import { UserCoursesClasses } from "./user-courses-classes.entity";
import { StudentHasExercise } from "./student-has-exercises.entity";
import { Exercise } from "./exercises.entity";


@Entity('users', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

	@Column('varchar', { name: 'full_name', length: 255, nullable: false })
    full_name: string;

    @Column('varchar', { name: 'email', length: 255, nullable: false })
    email: string;

    @Column('varchar', { name: 'gender' })
    gender: string;

	@Column('varchar', { name: 'phone' })
    phone: string;

    @Column('varchar', { name: 'password', nullable: false })
    password: string;

    @Column('int', { name: 'role' })
    role: number;

    @Column('varchar', { name: 'address' })
    address: string;

    @Column('text', { name: 'avatar', nullable: true })
    avatar: string;

    @Column('timestamp', { name: 'birth_day' })
    birth_day: Date;

    @Column('int', { name: 'status', default: 0 })
    status: number;

    @Column('timestamp', { name: 'created_at' })
	created_at: Date;

    @Column('timestamp', { name: 'updated_at' })
	updated_at: Date;

	@OneToMany(() => Course, ex => ex.user)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	courses: User[];

	@OneToMany(() => Exercise, ex => ex.user)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	exercises: Exercise[];

	@ManyToMany(type => UserCoursesClasses)
	@JoinTable({
		name: 'user_courses_classes',
		joinColumn: { name: 'user_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'class_id', referencedColumnName: 'id' },
	})
	classrooms: Classroom[];

	@OneToMany(() => StudentHasExercise, ex => ex.student)
	@JoinColumn({ name: "student_id", referencedColumnName: "id"})
	student_exercises: StudentHasExercise[];
}
