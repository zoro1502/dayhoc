package com.harusora.student.service.interfaceService;

import com.harusora.student.model.CourseModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.ExerciseReponse;
import com.harusora.student.security.common.BaseResponse;

import java.util.List;

public interface ExerciseService {
    ExerciseReponse create (ExerciseModelRequest exDto);
    List<ExerciseModel> findAll(String page, String page_size, String title);
    ExerciseReponse findOne(int id);

    void deleteById(int id);

    ExerciseReponse update(int id, ExerciseModelRequest exDto);

    BaseResponse.Metadata countByCondition(String page, String page_size, String title);
}
