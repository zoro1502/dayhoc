package com.harusora.student.service.interfaceService;

import com.harusora.student.model.UserModel;
import com.harusora.student.request.UserModelRequest;
import com.harusora.student.response.UserModelResponse;
import com.harusora.student.security.common.BaseResponse;

import java.util.List;

public interface UserModelService {
    UserModelResponse create(UserModelRequest userDto);
    List<?> findAll(String page, String page_size, String email, String phone,String status, String role);
    UserModelResponse findOne(int id);

    UserModel update(int id, UserModelRequest userDto);

    BaseResponse.Metadata countByCondition(String page, String page_size, String email, String phone,String status, String role);
}
