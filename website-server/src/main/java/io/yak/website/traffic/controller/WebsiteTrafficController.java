package io.yak.website.traffic.controller;

import io.yak.website.traffic.domain.WebsiteVisitorCookie;
import io.yak.website.traffic.mapper.WebsiteTrafficDailyMapper;
import io.yak.website.traffic.model.WebsiteTrafficModels.PageViewRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Public page-view entry point for lightweight website PV/UV metrics. */
@RestController
@RequestMapping("/api/v1/traffic")
public class WebsiteTrafficController {

    private final WebsiteTrafficDailyMapper trafficMapper;
    private final WebsiteVisitorCookie visitorCookie;

    public WebsiteTrafficController(
            WebsiteTrafficDailyMapper trafficMapper,
            WebsiteVisitorCookie visitorCookie) {
        this.trafficMapper = trafficMapper;
        this.visitorCookie = visitorCookie;
    }

    @PostMapping("/page-view")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void recordPageView(
            @Valid @RequestBody PageViewRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) {
        String visitorId = visitorCookie.resolve(httpRequest, httpResponse);
        LocalDateTime seenAt = LocalDateTime.now();

        trafficMapper.recordPageView(
                seenAt.toLocalDate(),
                visitorId,
                request.path(),
                seenAt);
    }
}
