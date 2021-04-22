package ch.amphytrion.project.dto;

import java.io.Serializable;

public class AuthenticationDto {
    private String tokenId;

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }
}
