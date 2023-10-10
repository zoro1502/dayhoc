import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Classroom } from "./classes.entity";
import { User } from "./user.entity";



@Entity('courses', { schema: 'public' })
export class Course {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('varchar', { name: 'name' })
    name: string;

    @Column('varchar', { name: 'content' })
    content: string;

	@Column('varchar', { name: 'code' })
    code: string;

    @Column('int', { name: 'status', default: 0 })
    status: number;

	@Column('int', { name: 'user_id', default: 0 })
    user_id: number;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;

	@OneToMany(() =>Classroom, c => c.course)
	@JoinColumn({ name: "course_id", referencedColumnName: "id"})
	classrooms: Classroom[];

	@ManyToOne(() => User, ex => ex.courses)
	@JoinColumn({ name: "user_id", referencedColumnName: "id"})
	user: User;
}
