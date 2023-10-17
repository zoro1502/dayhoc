package com.harusora.student.security.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.harusora.student.exception.BusinessErrorCode;
import com.harusora.student.exception.BusinessException;
import com.harusora.student.repository.UserModelRepository;
import com.harusora.student.security.common.BaseResponse;
import com.harusora.student.security.token.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final UserDetailsService userDetailsService;
  private final UserModelRepository userRepo;
  private final TokenRepository tokenRepository;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain
  ) throws ServletException, IOException {
      if (request.getServletPath().contains("/api/v1/auth/**")) {
        filterChain.doFilter(request, response);
        return;
      }
      final String authHeader = request.getHeader("Authorization");
      final String jwt;
      final String userEmail;
      if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
        filterChain.doFilter(request, response);
        return;
      } else {
        try {
          logger.debug("config auth=========> ");
          jwt = authHeader.substring(7);
          logger.debug("config auth1=========> ");
          userEmail = jwtService.extractUsername(jwt);
          if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            logger.debug("config auth2=========> ");
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
            logger.debug("config auth3=========> " + userDetails.getUsername());
            if (jwtService.isTokenValid(jwt, userDetails)) {
              request.setAttribute("user", userDetails);
              UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                      userDetails,
                      null,
                      userDetails.getAuthorities()
              );
              logger.debug("config auth4=========> ");
              authToken.setDetails(
                      new WebAuthenticationDetailsSource().buildDetails(request)
              );
              SecurityContextHolder.getContext().setAuthentication(authToken);

            } else {
              response.setStatus(401);
              throw  new ServletException("Hết thời gian đăng nhập");
            }
          }
        }
        catch (Exception e) {
          response.setStatus(401);
          response.setHeader("error", "Unauthorized");
          Map<String, String> error = new HashMap<>();
          error.put("message", "Unauthorized");
          error.put("code", "LG401");
          response.setContentType(ALREADY_FILTERED_SUFFIX);
          new ObjectMapper().writeValue(response.getOutputStream(), error);
        }
      }

      filterChain.doFilter(request, response);
    }
}
