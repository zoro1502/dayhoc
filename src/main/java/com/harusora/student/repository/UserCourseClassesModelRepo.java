package com.harusora.student.repository;

import com.harusora.student.model.UserCourseClassesModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCourseClassesModelRepo extends JpaRepository<UserCourseClassesModel, Integer> {
}
