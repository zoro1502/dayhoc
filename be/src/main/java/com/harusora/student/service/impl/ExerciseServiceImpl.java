package com.harusora.student.service.impl;

import com.harusora.student.model.CourseModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.repository.ExerciseModelRepository;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.ExerciseReponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.ExerciseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
@AllArgsConstructor
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseModelRepository exerciseRepo;
    private final Logger log = LoggerFactory.getLogger(ExerciseServiceImpl.class);
    @Override
    public ExerciseReponse create(ExerciseModelRequest exDto) {
        try {
            ExerciseModel exercise = new ExerciseModel();
            exercise.setClass_id(exDto.getClass_id());
            exercise.setCreated_at(new Date());
            exercise.setContent(exDto.getContent());
            exercise.setFile(exDto.getFile());

            exercise.setDeadline(exDto.getDeadline());
            exercise.setContent(exDto.getContent());
            exercise.setType(exDto.getType());
            exercise.setUser_id(exDto.getUser_id());
            exercise.setStatus(1);

            var save = exerciseRepo.save(exercise);
            ExerciseReponse response = new ExerciseReponse(Optional.of(save));
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<ExerciseModel> findAll(String page, String page_size, String title) {
        List<ExerciseModel> data = exerciseRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size), title);
        return data;
    }

    @Override
    public ExerciseReponse findOne(int id) {
        return new ExerciseReponse(exerciseRepo.findById(id));
    }

    @Override
    public void deleteById(int id) {
        exerciseRepo.deleteById(id);
    }

    @Override
    public ExerciseReponse update(int id, ExerciseModelRequest exDto) {
        ExerciseModel exercise = exerciseRepo.findById(id).get();
        if(exercise == null) {
            throw new RuntimeException("Không tìm thấy bài tập tương ứng");
        }
        exercise.setContent(exDto.getContent());
        exercise.setFile(exDto.getFile());

        exercise.setDeadline(exDto.getDeadline());
        exercise.setStatus(exDto.getStatus());
        var response = exerciseRepo.save(exercise);
        return new ExerciseReponse(Optional.of(response));
    }

    @Override
    public BaseResponse.Metadata countByCondition(String page, String page_size, String title) {
        long total = (long) exerciseRepo.count(title);
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }
}
