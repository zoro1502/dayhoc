package com.harusora.student.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_courses_classes")
public class UserCourseClassesModel {

    @Id
    @GeneratedValue
    private Integer id;
    private Integer course_id;
    private Integer user_id;
    private Integer class_id;
    private Date created_at;
    private Date updated_at= new Date();
}
