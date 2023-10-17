package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseModelRepository extends JpaRepository<CourseModel, Integer> {

    @Override
    Optional<CourseModel> findById(Integer integer);

    @Query(value = "Select * from courses u " +
            "WHERE TRUE AND (:code is null or :code ='' or u.code like %:code%) " +
            " AND (:course_id is null or :course_id ='' or u.id = :course_id) " +
            " AND (:user_id is null or :user_id ='' or u.user_id = :user_id) " +
            " LIMIT :page_size OFFSET :page",nativeQuery = true)
    List<CourseModel> findAndCount(@Param("page") int page, @Param("page_size")int page_size,
                                   @Param("code") String code, @Param("course_id") String course_id,
                                   @Param("user_id") String user_id
                                   );


    @Query(value = "Select c.* from courses c LEFT JOIN user_courses_classes uc ON c.id = uc.course_id " +
            "WHERE TRUE AND c.id = :course_id " +
            " AND uc.user_id = :user_id" ,nativeQuery = true)
    List<CourseModel> findStudentCourse(@Param("user_id") String user_id, @Param("course_id") Integer course_id);

    @Query(value = "Select * from courses c " +
            "WHERE TRUE AND c.id IN (:course_id)" ,nativeQuery = true)
    List<CourseModel> findTeacherCourse(@Param("course_id") String course_id);


    @Query(value = "Select * from courses c " +
            "WHERE TRUE AND c.user_id = :user_id" ,nativeQuery = true)
    List<CourseModel> findCourses(@Param("user_id") Integer user_id);





    @Query(value = "Select count(*) from courses u " +
            "WHERE TRUE AND (:code is null or :code ='' or u.code like %:code%) " +
            " AND (:user_id is null or :user_id ='' or u.user_id = :user_id) " +
            " AND (:course_id is null or :course_id ='' or u.id = :course_id)",nativeQuery = true)
    Integer count(  @Param("code") String code, @Param("course_id") String course_id,  @Param("user_id") String user_id);


}
