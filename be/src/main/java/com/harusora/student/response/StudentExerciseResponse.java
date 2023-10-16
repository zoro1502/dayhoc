package com.harusora.student.response;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.ExerciseModel;
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
public class StudentExerciseResponse {

    private Integer id;

    private Integer exercise_id;

    private Integer student_id;

    private Integer class_id;

    private Double mark;

    private Date created_at;

    private Date updated_at;

    private ExerciseModel exercise;

    private UserModel student;

    private ClassModel classroom;
}
