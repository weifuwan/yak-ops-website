package io.yak.website.docs;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import java.time.LocalDateTime;
import java.util.List;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface DocsSearchHistoryMapper extends BaseMapper<DocsSearchHistory> {

    @Select("""
            SELECT id, user_id, history_key, search_query, document_slug, anchor, created_at, updated_at
            FROM website_docs_search_history
            WHERE user_id = #{userId} AND updated_at >= #{since}
            ORDER BY updated_at DESC, id DESC
            LIMIT 10
            """)
    List<DocsSearchHistory> recent(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    @Insert("""
            INSERT INTO website_docs_search_history
                (user_id, history_key, search_query, document_slug, anchor, created_at, updated_at)
            VALUES
                (#{userId}, #{historyKey}, #{query}, #{slug}, #{anchor}, #{now}, #{now})
            ON DUPLICATE KEY UPDATE
                search_query = #{query},
                anchor = #{anchor},
                updated_at = #{now}
            """)
    int save(
            @Param("userId") Long userId,
            @Param("historyKey") String historyKey,
            @Param("query") String query,
            @Param("slug") String slug,
            @Param("anchor") String anchor,
            @Param("now") LocalDateTime now);

    @Delete("DELETE FROM website_docs_search_history WHERE user_id = #{userId}")
    int clear(@Param("userId") Long userId);

    @Delete("DELETE FROM website_docs_search_history WHERE updated_at < #{cutoff}")
    int pruneExpired(@Param("cutoff") LocalDateTime cutoff);
}
