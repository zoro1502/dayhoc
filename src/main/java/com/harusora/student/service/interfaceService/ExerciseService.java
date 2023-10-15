package com.harusora.student.service.interfaceService;

import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.ExerciseReponse;

import java.util.List;

public interface ExerciseService {
    ExerciseReponse create (ExerciseModelRequest exDto);
    List<ExerciseReponse> findAll(int page, int page_size, String code, int course_id);
    ExerciseReponse findOne(int id);

    ExerciseReponse update(int id, ExerciseModelRequest exDto);
}
