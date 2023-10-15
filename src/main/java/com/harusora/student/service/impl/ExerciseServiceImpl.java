package com.harusora.student.service.impl;

import com.harusora.student.model.CourseModel;
import com.harusora.student.model.ExerciseModel;
import com.harusora.student.repository.ExerciseModelRepository;
import com.harusora.student.request.ExerciseModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.ExerciseReponse;
import com.harusora.student.service.interfaceService.ExerciseService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseModelRepository exerciseRepo;
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
    public List<ExerciseReponse> findAll(int page, int page_size, String code, int course_id) {
        return null;
    }

    @Override
    public ExerciseReponse findOne(int id) {
        return null;
    }

    @Override
    public ExerciseReponse update(int id, ExerciseModelRequest exDto) {
        return null;
    }
}
