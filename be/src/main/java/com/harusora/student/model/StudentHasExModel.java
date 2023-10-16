package com.harusora.student.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;
import java.sql.Timestamp;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_has_exercises")
public class StudentHasExModel {
    @Id
    @GeneratedValue
    private Integer id;

    private Integer exercise_id;

    private Integer student_id;
    private Integer class_id;
    private String file;
    private Double mark;
    private Date created_at;

    private Date updated_at= new Date();
}
