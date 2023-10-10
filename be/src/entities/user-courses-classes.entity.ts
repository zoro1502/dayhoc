import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('user_courses_classes', { schema: 'public' })
export class UserCoursesClasses {
    @PrimaryGeneratedColumn('increment',{name: "id"})
    id: number;

    @Column('integer', { name: 'class_id' })
    class_id: number;

	@Column('integer', { name: 'user_id' })
    user_id: number;

	@Column('integer', { name: 'course_id' })
    course_id: number;

    @Column('timestamp', { name: 'created_at', default: () => 'now()' })
	created_at: Date;

	@Column('timestamp', { name: 'updated_at', nullable: true, default: () => 'now()' })
	updated_at: Date;
}
