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
@Table(name = "exercises")

public class ExerciseModel {
    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String content;
    private String file;
    private Integer user_id;
    @Column(nullable = false)
    private Integer class_id;
    private Integer status;
    private Integer type;
    private Date created_at;
    private Date deadline;
    private Date updated_at = new Date();
}
