import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Classroom } from "./classes.entity";
import { Course } from "./courses.entity.ts";
import { StudentHasExercise } from "./student-has-exercises.entity";



@Entity('exercises', { schema: 'public' })
export class Exercise {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'title' })
    title: string;

    @Column('text', { name: 'file' })
    file: string;

    @Column('varchar', { name: 'content' })
    content: string;

    @Column('timestamp', { name: 'deadline' })
	deadline: Date;

    @Column('integer', { name: 'status', default: 0 })
    status: number;

	@Column('integer', { name: 'type', default: 0 })
    type: number;

	@Column('integer', { name: 'user_id', default: 0 })
    user_id: number;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@ManyToOne(() => User, ex => ex.exercises)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	user: User;

	@OneToMany(() => StudentHasExercise, ex => ex.exercise)
	@JoinColumn({ name: "exercise_id", referencedColumnName: "id"})
	student_exercises: StudentHasExercise[];

	@ManyToMany((type) => Classroom, cl => cl.exercises)
	@JoinTable({
		name: 'student_has_exercises',
		joinColumn: { name: 'exercise_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'class_id', referencedColumnName: 'id' },
	})
	classrooms: Classroom[];

	@ManyToMany((type) => User)
	@JoinTable({
		name: 'student_has_exercises',
		joinColumn: { name: 'exercise_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'student_id', referencedColumnName: 'id' },
	})
	users: User[];

	
}
