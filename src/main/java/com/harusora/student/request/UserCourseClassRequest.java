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
public class UserCourseClassRequest {
    private Integer course_id;
    private Integer user_id;
    private Integer class_id;
    private Date updated_at;
}
