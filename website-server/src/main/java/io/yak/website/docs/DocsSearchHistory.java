package io.yak.website.docs;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.time.LocalDateTime;

@TableName("website_docs_search_history")
public class DocsSearchHistory {

    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private String historyKey;
    private String searchQuery;
    private String documentSlug;
    private String anchor;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getHistoryKey() { return historyKey; }
    public void setHistoryKey(String historyKey) { this.historyKey = historyKey; }
    public String getSearchQuery() { return searchQuery; }
    public void setSearchQuery(String searchQuery) { this.searchQuery = searchQuery; }
    public String getDocumentSlug() { return documentSlug; }
    public void setDocumentSlug(String documentSlug) { this.documentSlug = documentSlug; }
    public String getAnchor() { return anchor; }
    public void setAnchor(String anchor) { this.anchor = anchor; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
