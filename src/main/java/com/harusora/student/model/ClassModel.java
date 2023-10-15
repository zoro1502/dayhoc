package com.harusora.student.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;
import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "classes")
public class ClassModel {

    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String code;
    private Integer course_id;
    private Integer status;
    private Date created_at;
    private Date updated_at = new Date();
}
