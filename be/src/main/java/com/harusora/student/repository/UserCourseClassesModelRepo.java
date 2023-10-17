package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.UserCourseClassesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCourseClassesModelRepo extends JpaRepository<UserCourseClassesModel, Integer> {
    @Query(value = "Select * from user_courses_classes u " +
            "WHERE u.user_id = :student_id AND u.class_id = :class_id" ,nativeQuery = true)
    UserCourseClassesModel findByStudentIdAndClassId(@Param("student_id") int student_id, @Param("class_id") int class_id);
}
