package com.harusora.student.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class StudentHasExModelRequest {

    private Integer exercise_id;
    private Integer student_id;
    private Integer class_id;
    private Double mark;
    private Date updated_at;
}
