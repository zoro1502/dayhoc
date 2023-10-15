package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseModelRepository extends JpaRepository<ExerciseModel, Integer> {
    @Override
    Optional<ExerciseModel> findById(Integer integer);


    @Query(value = "Select * from exercises u " +
            "WHERE TRUE AND (:title is null or :title ='' or u.title like %:title%) " +
            " LIMIT :page_size OFFSET :page",nativeQuery = true)
    List<ExerciseModel> findAndCount(@Param("page") int page, @Param("page_size")int page_size, @Param("title") String title);


    @Query(value = "Select count(*) from courses u " +
            "WHERE TRUE AND (:title is null or :title ='' or u.title like %:title%) " +
            " AND (:course_id is null or :course_id ='' or u.id = :course_id)",nativeQuery = true)
    Integer count(  @Param("title") String title);
}
