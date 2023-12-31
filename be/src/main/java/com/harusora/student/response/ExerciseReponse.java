package com.harusora.student.response;

import com.harusora.student.model.ExerciseModel;
import com.harusora.student.model.UserModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ExerciseReponse {
   private Optional<ExerciseModel>  exercise;
   private Optional<UserModel>  teacher;
//   private Optional<ExerciseModel>  exercise;
}
