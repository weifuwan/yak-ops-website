package io.yak.website.traffic.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public final class WebsiteTrafficModels {

    private WebsiteTrafficModels() {
    }

    public record PageViewRequest(
            @NotBlank
            @Size(max = 255)
            @Pattern(regexp = "^/[^?#]*$", message = "must be a pathname without query or hash")
            String path) {
    }
}
