package com.harusora.student.response;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import com.harusora.student.model.UserModel;
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
public class UserCourseClassReponse {
    private int id;
    private int cousre_id;
    private int class_id;
    private int user_id;
    private UserModel user;
    private ClassModel classroom;
    private CourseModel course;
    private Date created_at;
    private Date updated_at;
}
