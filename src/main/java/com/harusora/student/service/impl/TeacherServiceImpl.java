package com.harusora.student.service.impl;

import com.harusora.student.repository.TeacherRepository;
import com.harusora.student.request.CreateTeacherRequest;
import com.harusora.student.response.TeacherResponse;
import com.harusora.student.service.interfaceService.TeacherService;
import com.harusora.student.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    @Override
    public TeacherResponse create(CreateTeacherRequest createTeacherRequest) {
        log.debug(createTeacherRequest.getName());
        User user = new User();
        user.setFirstname(createTeacherRequest.getName());
        var save = teacherRepository.save(user);
        return new TeacherResponse().setName(save.getFirstname());
    }
}
