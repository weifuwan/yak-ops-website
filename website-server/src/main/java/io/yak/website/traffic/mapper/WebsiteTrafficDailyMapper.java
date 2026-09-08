package io.yak.website.traffic.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.yak.website.traffic.domain.WebsiteTrafficDaily;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface WebsiteTrafficDailyMapper extends BaseMapper<WebsiteTrafficDaily> {

    @Insert("""
            INSERT INTO website_traffic_daily (
                stat_date,
                visitor_id,
                path,
                user_id,
                pv_count,
                first_seen_at,
                last_seen_at
            ) VALUES (
                #{statDate},
                #{visitorId},
                #{path},
                #{userId},
                1,
                #{seenAt},
                #{seenAt}
            )
            ON DUPLICATE KEY UPDATE
                pv_count = pv_count + 1,
                user_id = COALESCE(#{userId}, user_id),
                last_seen_at = #{seenAt}
            """)
    int recordPageView(
            @Param("statDate") LocalDate statDate,
            @Param("visitorId") String visitorId,
            @Param("path") String path,
            @Param("userId") Long userId,
            @Param("seenAt") LocalDateTime seenAt);
}
