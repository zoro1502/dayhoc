package com.harusora.student.service.impl;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.model.CourseModel;
import com.harusora.student.repository.CourseModelRepository;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.service.interfaceService.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService {

    private final CourseModelRepository courseRepo;
    @Override
    public CourseReponse create(CourseModelRequest courseDto) {
        try {
            CourseModel course = new CourseModel();
            course.setName(courseDto.getName());
            course.setCode(courseDto.getCode());
            course.setCreated_at(new Date());
            course.setContent(courseDto.getContent());
            course.setStatus(courseDto.getStatus());
            course.setUser_id(courseDto.getUser_id());

            var save = courseRepo.save(course);
            CourseReponse response = new CourseReponse(Optional.of(save));
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<CourseReponse> findAll(int page, int page_size, String code, int course_id) {
        return null;
    }

    @Override
    public CourseReponse findOne(int id) {
        return null;
    }

    @Override
    public CourseReponse update(int id, CourseModelRequest courseDto) {
        return null;
    }
}
