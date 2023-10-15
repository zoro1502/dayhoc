package com.harusora.student.repository;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.StudentHasExModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentHasExModelRepository extends JpaRepository<StudentHasExModel, Integer> {
}
