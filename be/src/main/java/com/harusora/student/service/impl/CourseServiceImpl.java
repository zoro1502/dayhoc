package com.harusora.student.service.impl;

import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.model.ClassModel;
import com.harusora.student.model.CourseModel;
import com.harusora.student.model.UserModel;
import com.harusora.student.repository.ClassModelRepository;
import com.harusora.student.repository.CourseModelRepository;
import com.harusora.student.repository.UserModelRepository;
import com.harusora.student.request.CourseModelRequest;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.CourseReponse;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.service.interfaceService.CourseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.lang.Integer.parseInt;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {

    private final CourseModelRepository courseRepo;
    private final ClassModelRepository classRepo;
    private final UserModelRepository userRepo;
    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);
    @Override
    public CourseReponse create(CourseModelRequest courseDto) {
        try {
            CourseModel course = new CourseModel();
            course.setName(courseDto.getName());
            course.setCode(courseDto.getCode());
            course.setCreated_at(new Date());
            course.setContent(courseDto.getContent());
            course.setStatus(courseDto.getStatus());
            if(courseDto.getUser_id() != null) {
                course.setUser_id(courseDto.getUser_id());
            } else {
                course.setUser_id(0);
            }

            var save = courseRepo.save(course);
            CourseReponse response = new CourseReponse(Optional.of(save), null);
            return response;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<CourseReponse> findAll(String page, String page_size, String code, String course_id,String user_id) {
        List<CourseModel> data = courseRepo.findAndCount((parseInt(page) - 1) * parseInt(page_size), parseInt(page_size),
                code, course_id, user_id);
        List<CourseReponse> response = new ArrayList<CourseReponse>();
        if(!data.isEmpty()) {
            for (CourseModel item: data) {
                Optional<UserModel> user = userRepo.findById(item.getUser_id());
                CourseReponse itemRes = new CourseReponse();
                itemRes.setCourse(Optional.of(item));
                itemRes.setTeacher(user);
                response.add(itemRes);
            }
        }
        return response;
    }

    @Override
    public CourseReponse findOne(int id) {
        Optional<CourseModel> course = courseRepo.findById(id);
        CourseReponse response = new CourseReponse();
        if(!course.isEmpty()) {
            Optional<UserModel> user = userRepo.findById(course.get().getUser_id());
            response.setCourse(course);
            response.setTeacher(user);
        }
        return response;
    }

    @Override
    public CourseReponse update(int id, CourseModelRequest courseDto) {
        CourseModel course = courseRepo.findById(id).get();
        log.info("course find by id--------> ", course);
        if(course == null) {
            throw new RuntimeException("Không tìm thấy khóa học tương ứng");
        }
        course.setName(courseDto.getName());
        course.setCode(courseDto.getCode());
        course.setContent(courseDto.getContent());
        course.setStatus(courseDto.getStatus());
        if(courseDto.getUser_id() != null) {
            course.setUser_id(courseDto.getUser_id());
        } else {
            course.setUser_id(0);
        }

        var save = courseRepo.save(course);
        CourseReponse response = new CourseReponse(Optional.of(save), null);
        return response;
    }

    @Override
    public void deleteById(int id) {
        List<ClassModel> classByCourse = classRepo.getClassModelByCourse_id(id);
        if(!classByCourse.isEmpty()) {
            for(ClassModel classItem: classByCourse) {
                classRepo.deleteById(classItem.getId());
            }
        }
        courseRepo.deleteById(id);
    }

    @Override
    public BaseResponse.Metadata countByCondition(String page, String page_size, String code, String course_id, String user_id) {
        long total = (long) courseRepo.count(code, course_id, user_id);
        BaseResponse.Metadata paging = new BaseResponse.Metadata("", parseInt(page) ,  parseInt(page_size), total, "", null);
        return paging;
    }
}
