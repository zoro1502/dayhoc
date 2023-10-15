package com.harusora.student.request;

import com.harusora.student.user.Role;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.CreatedDate;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserModelRequest {

    private String full_name;
    private String phone;
    private String email;
    private String password;
    private String address;
    private String avatar;
    private String gender;
    private Integer role;

    private Integer status;
    private Timestamp updated_at;
}
