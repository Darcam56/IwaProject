package com.example.iwaproject.security.jwt;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.example.iwaproject.security.services.UserPrinciple;

import java.util.Date;

@Component
public class JwtProvider {

    @Value("${com.example.iwaproject.jwtSecretKey}")
    private String jwtSecret;

    @Value("${com.example.iwaproject.jwtExpiration}")
    private int jwtExpiration;

    public String generateJwtToken(Authentication authentication) {
        UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrinciple.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpiration*1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid JWT signature -> Message: {} " + e);
        } catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token -> Message: {}" + e);
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token -> Message: {}" + e);
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token -> Message: {}" + e);
        } catch (IllegalArgumentException e) {
            System.out.println("JWT claims string is empty -> Message: {}" + e);
        }

        return false;
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody().getSubject();
    }

}
