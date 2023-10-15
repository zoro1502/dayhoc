package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ExerciseModelRepository extends JpaRepository<ExerciseModel, Integer> {
    @Override
    Optional<ExerciseModel> findById(Integer integer);
}
