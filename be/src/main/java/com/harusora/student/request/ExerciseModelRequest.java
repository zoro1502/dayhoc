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
public class ExerciseModelRequest {

    private String title;
    private String content;
    private String file;
    private Integer user_id;
    private Integer class_id;
    private Integer status;
    private Integer type;
    private Date deadline;
    private Date updated_at = new Date();
}
