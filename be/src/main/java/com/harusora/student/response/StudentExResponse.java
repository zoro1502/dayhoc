package com.harusora.student.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class StudentExResponse {
    private Integer id;
    private Integer exercise_status;
    private String title;
    private String question;
    private String answer;
    private String student_email;
    private String teacher_name;

    private String student_name;
    private String class_name;
    private String class_code;
    private String teacher_email;
    private Integer student_id;
    private Integer teacher_id;
    private Integer exercise_id;
    private Double mark;
    private Date deadline;
    private Date created_at;
    private Date exercise_created_at;
}
