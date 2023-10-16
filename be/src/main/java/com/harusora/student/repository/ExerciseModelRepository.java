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
    List<ExerciseModel> findAndCount(@Param("page") int page, @Param("page_size")int page_size,
                                     @Param("title") String title
//            ,
//                                     @Param("status") String status
//            ,
//                                     @Param("class_id") String class_id,@Param("user_id") String user_id
    );


//            " AND (:class_id is null or :class_id ='' or u.class_id = :class_id) " +
//            " AND (:status is null or :status ='' or u.status = :status) " +
//            " AND (:user_id is null or :user_id ='' or u.user_id = :user_id " +




    @Query(value = "Select count(*) from exercises u " +
            "WHERE TRUE AND (:title is null or :title ='' or u.title like %:title%) "
//            +
//            "AND (:class_id is null or :class_id ='' or u.class_id =:class_id) " +
//            "AND (:status is null or :status ='' or u.status = :status) " +
//            "AND (:user_id is null or :user_id ='' or u.user_id =:user_id "
            ,nativeQuery = true)
    Integer count(  @Param("title") String title
//            , @Param("status") String status,
//                    @Param("class_id") String class_id,@Param("user_id") String user_id
    );
}
