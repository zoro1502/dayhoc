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
public class ClassModelRequest {

    private String name;
    private String code;
    private Integer course_id;
    private Integer status;
}
