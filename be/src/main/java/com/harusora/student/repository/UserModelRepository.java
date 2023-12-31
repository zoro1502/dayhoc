package com.harusora.student.repository;

import com.harusora.student.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserModelRepository extends JpaRepository<UserModel, Integer> {

    @Query(value = "Select * from user u " +
            "WHERE TRUE AND (:email is null or :email ='' or u.email like %:email%) " +
            "AND (:phone is null or :phone ='' or u.phone like %:phone%) " +
            "AND (:role is null or :role ='' or u.role = :role) " +
            "AND (:status is null or :status ='' or u.status = :status) " +
            " LIMIT :page_size OFFSET :page",nativeQuery = true)
    List<UserModel> findAndCount(@Param("page") int page, @Param("page_size")int page_size,
                                 @Param("email") String email, @Param("role") String role,
                                 @Param("phone") String phone, @Param("status") String status);

    @Override
    Optional<UserModel> findById(Integer integer);

    @Query(value = "Select count(*) from user u " +
            "WHERE TRUE AND (:email is null or :email ='' or u.email like %:email%) " +
            "AND (:phone is null or :phone ='' or u.phone like %:phone%) " +
            "AND (:role is null or :role ='' or u.role = :role) ",nativeQuery = true)
    Integer count(@Param("email") String email, @Param("role") String role, @Param("phone")String phone);

    @Query(value = "Select * from user u " +
            "WHERE TRUE AND u.email like %:email%",nativeQuery = true)
    UserModel findByEmailUser(@Param("email") String email);

    @Query(value = "Select * from user u " +
            "WHERE TRUE AND u.phone like %:phone%",nativeQuery = true)
    UserModel findByPhone(@Param("phone") String phone);

    Optional<UserModel> findByEmail(String username);
}
