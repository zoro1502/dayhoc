package com.harusora.student.repository;

import com.harusora.student.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<User, Integer> {
}
