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
public class CourseModelRequest {
    private String name;
    private String code;
    private String content;
    private Integer user_id;
    private Integer status;
    private Date created_at;
}
