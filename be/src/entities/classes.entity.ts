import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./courses.entity.ts";
import { User } from "./user.entity.js";
import { StudentHasExercise } from "./student-has-exercises.entity.js";
import { Exercise } from "./exercises.entity.js";



@Entity('classes', { schema: 'public' })
export class Classroom {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'name', length: 255 })
    name: string;

	@Column('varchar', { name: 'slot' })
    slot: string;

	@Column('varchar', { name: 'slot_date' })
    slot_date: string;

    @Column('integer', { name: 'student_max_number' })
    student_max_number: number;

	@Column('integer', { name: 'course_id' })
    course_id: number;

	@Column('integer', { name: 'status' })
    status: number;

    @Column('varchar', { name: 'code', length: 255 })
    code: string;

	@Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@ManyToOne(type => Course)
	@JoinColumn({ name: "course_id", referencedColumnName: "id"})
	course: Course;

	@ManyToMany((type) => Exercise, cl => cl.classrooms)
	@JoinTable({
		name: 'student_has_exercises',
		joinColumn: { name: 'exercise_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'class_id', referencedColumnName: 'id' },
	})
	exercises: Exercise[];


	@OneToMany(() => StudentHasExercise, ex => ex.exercise)
	@JoinColumn({ name: "class_id", referencedColumnName: "id"})
	student_exercises: StudentHasExercise[];

}
