package com.harusora.student.response;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import com.harusora.student.request.ClassModelRequest;
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
public class ClassModelReponse {

    private Optional<ClassModel> result;
}
