package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.UserModel;
import com.harusora.student.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassModelRepository extends JpaRepository<ClassModel, Integer> {
    @Override
    Optional<ClassModel> findById(Integer integer);

    @Query(value = "Select * from classes u " +
            "WHERE TRUE AND (:code is null or :code ='' or u.code like %:code%) " +
            "AND (:course_id is null or :course_id ='' or u.course_id like %:course_id%) " +
            " LIMIT :page_size OFFSET :page",nativeQuery = true)
    List<ClassModel> findAndCount(@Param("page") int page, @Param("page_size")int page_size, @Param("code") String code, @Param("course_id") String course_id);


    @Query(value = "Select count(*) from classes u " +
            "WHERE TRUE AND (:code is null or :code ='' or u.code like %:code%) " +
            "AND (:course_id is null or :course_id ='' or u.course_id = :course_id) ",nativeQuery = true)
    Integer count(  @Param("code") String code, @Param("course_id") String course_id);


    @Query(value = "Delete from classes u " +
            "WHERE u.course_id=:course_id",nativeQuery = true)
    int deleteByCondition( @Param("course_id") int course_id);

    @Query(value = "Select * from classes u " +
            "WHERE u.course_id = :course_id",nativeQuery = true)
    List<ClassModel> getClassModelByCourse_id( @Param("course_id") int course_id);


    @Query(value = "Select c.* from classes c LEFT JOIN user_courses_classes uc ON c.id = uc.class_id " +
            " WHERE TRUE AND (:class_id is null or :class_id ='' or c.id = :class_id) " +
            " AND uc.user_id=:user_id",nativeQuery = true)
    List<ClassModel> findClassUser(@Param("user_id") String user_id, @Param("class_id") String class_id);
//    void deleteClassModelByCourse_id( @Param("course_id") int course_id);
}