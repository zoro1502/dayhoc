package com.harusora.student.response;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class StudentExReponse {
    private Optional<ExerciseModel> exercise;
    private Optional<UserModel>  teacher;
    private Optional<ClassModel>  classroom;
    private Optional<UserModel>  student;
}
