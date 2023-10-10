import { Max, max } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Classroom } from "./classes.entity";
import { Exercise } from "./exercises.entity";



@Entity('student_has_exercises', { schema: 'public' })
export class StudentHasExercise {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('integer', { name: 'exercise_id' })
    exercise_id: number;

	@Column('integer', { name: 'student_id' })
    student_id: number;

	@Column('integer', { name: 'class_id' })
    class_id: number;

	@Column('text', { name: 'file' })
    file: string;

	@Column('float', { name: 'mark' })
	@Max(100)
    mark: number;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@ManyToOne(() => Exercise, ex => ex.student_exercises)
	@JoinColumn({ name: "exercise_id", referencedColumnName: "id"})
	exercise: Exercise;

	@ManyToOne(() => Classroom, ex => ex.student_exercises)
	@JoinColumn({ name: "class_id", referencedColumnName: "id"})
	classroom: Classroom;

	@ManyToOne(() => User, ex => ex.student_exercises)
	@JoinColumn({ name: "student_id", referencedColumnName: "id"})
	student: User;

}
