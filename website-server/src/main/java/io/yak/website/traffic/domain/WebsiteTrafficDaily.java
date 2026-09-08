package io.yak.website.traffic.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDate;
import java.time.LocalDateTime;

@TableName("website_traffic_daily")
public class WebsiteTrafficDaily {

    @TableId(type = IdType.AUTO)
    private Long id;
    private LocalDate statDate;
    private String visitorId;
    private String path;
    private Integer pvCount;
    private LocalDateTime firstSeenAt;
    private LocalDateTime lastSeenAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LocalDate getStatDate() { return statDate; }
    public void setStatDate(LocalDate statDate) { this.statDate = statDate; }
    public String getVisitorId() { return visitorId; }
    public void setVisitorId(String visitorId) { this.visitorId = visitorId; }
    public String getPath() { return path; }
    public void setPath(String path) { this.path = path; }
    public Integer getPvCount() { return pvCount; }
    public void setPvCount(Integer pvCount) { this.pvCount = pvCount; }
    public LocalDateTime getFirstSeenAt() { return firstSeenAt; }
    public void setFirstSeenAt(LocalDateTime firstSeenAt) { this.firstSeenAt = firstSeenAt; }
    public LocalDateTime getLastSeenAt() { return lastSeenAt; }
    public void setLastSeenAt(LocalDateTime lastSeenAt) { this.lastSeenAt = lastSeenAt; }
}
