package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.UserModel;
import com.harusora.student.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClassModelRepository extends JpaRepository<ClassModel, Integer> {
    @Override
    Optional<ClassModel> findById(Integer integer);
}