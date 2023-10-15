package com.harusora.student.service.impl;

import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import com.harusora.student.repository.ClassModelRepository;
import com.harusora.student.repository.CourseModelRepository;
import com.harusora.student.request.ClassModelRequest;
import com.harusora.student.response.ClassModelReponse;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.service.interfaceService.ClassModelService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class ClassModelServiceimpl implements ClassModelService {

    private final ClassModelRepository classModelRepo;
    private final CourseModelRepository courseRepo;
    @Override
    public ClassModelReponse create(ClassModelRequest classDto) {
        try {
            int course_id = classDto.getCourse_id();
            Optional<CourseModel> course = courseRepo.findById(course_id);
            log.info("course find by id--------> ", course);
            if(course.isEmpty()) {
                throw new RuntimeException("Không tìm thấy course tương ứng");
            }
            ClassModel classModel = new ClassModel();
            classModel.setName(classDto.getName());
            classModel.setCode(classDto.getCode());
            classModel.setCreated_at(new Date());
            classModel.setStatus(classDto.getStatus());
            classModel.setCourse_id(classDto.getCourse_id());

            var save = classModelRepo.save(classModel);
            ClassModelReponse response = new ClassModelReponse(Optional.of(save));
            return response;

        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<ClassModelReponse> findAll(int page, int page_size, String code, int course_id) {
        return null;
    }

    @Override
    public ClassModelReponse findOne(int id) {
        return null;
    }

    @Override
    public ClassModelReponse update(int id, ClassModelRequest classDto) {
        return null;
    }
}
