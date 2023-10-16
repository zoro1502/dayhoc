package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.model.StudentHasExModel;
import com.harusora.student.model.UserModel;
import com.harusora.student.response.IStudentExResponse;
import com.harusora.student.response.StudentExResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface StudentHasExModelRepository extends JpaRepository<StudentHasExModel, Integer> {
    @Query(value = "Select * from student_has_exercises u " +
            "WHERE TRUE AND u.student_id=:user_id && u.exercise_id=:exercise_id",nativeQuery = true)
    StudentHasExModel findOneByCondition(@Param("user_id") String user_id, @Param("exercise_id") String exercise_id);


    @Query(value = "SELECT sh.id" +
            " ,e.title, e.file as question, sh.file as answer, u.email as student_email, e.status as exercise_status, " +
            " u.full_name as student_name, c.name as class_name, c.code as class_code, t.full_name as teacher_name, " +
            " e.deadline, e.created_at as exercise_created_at, sh.created_at, sh.mark, " +
            " t.email as teacher_email, u.id as student_id, t.id as teacher_id, sh.exercise_id " +
            " from student_has_exercises sh " +
            " LEFT JOIN user u on sh.student_id = u.id " +
            " LEFT JOIN classes c on sh.class_id = c.id " +
            " LEFT JOIN courses co on c.course_id = c.id " +
            " LEFT JOIN user t on co.user_id = t.id " +
            " LEFT JOIN exercises e on sh.exercise_id = e.id " +
            " WHERE TRUE AND (:title is null or :title ='' or e.title like %:title%) " +
            " LIMIT :page_size OFFSET :page"

            ,nativeQuery = true)
    List<IStudentExResponse> findAndCount(@Param("page") int page, @Param("page_size")int page_size,
                                               @Param("title") String title
    );

    @Query(value = "SELECT count(*) " +
            "   from student_has_exercises sh " +
            "   LEFT JOIN user u on sh.student_id = u.id " +
            "   LEFT JOIN classes c on sh.class_id = c.id " +
            "   LEFT JOIN courses co on c.course_id = c.id " +
            "   LEFT JOIN user t on co.user_id = t.id " +
            "   LEFT JOIN exercises e on sh.exercise_id = e.id "
            ,nativeQuery = true)
    int count(
                         @Param("title") String title
//            ,
//                                     @Param("status") String status
//            ,
//                                     @Param("class_id") String class_id,@Param("user_id") String user_id
    );
}
