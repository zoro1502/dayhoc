package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.model.StudentHasExModel;
import com.harusora.student.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentHasExModelRepository extends JpaRepository<StudentHasExModel, Integer> {
    @Query(value = "Select * from student_has_exercises u " +
            "WHERE TRUE AND u.student_id=:user_id && u.exercise_id=:exercise_id",nativeQuery = true)
    StudentHasExModel findOneByCondition(@Param("user_id") String user_id, @Param("exercise_id") String exercise_id);


    @Query(value = "Select * from exercises u " +
            "WHERE TRUE AND (:title is null or :title ='' or u.title like %:title%) " +
            " LIMIT :page_size OFFSET :page",nativeQuery = true)
    List<ExerciseModel> findAndCount(@Param("page") int page, @Param("page_size")int page_size,
                                     @Param("title") String title
//            ,
//                                     @Param("status") String status
//            ,
//                                     @Param("class_id") String class_id,@Param("user_id") String user_id
    );
}
