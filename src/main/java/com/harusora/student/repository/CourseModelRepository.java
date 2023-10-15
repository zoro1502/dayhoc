package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseModelRepository extends JpaRepository<CourseModel, Integer> {

    @Override
    Optional<CourseModel> findById(Integer integer);


}
