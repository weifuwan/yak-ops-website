package io.yak.website.account.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.yak.website.account.entity.WebsiteSession;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WebsiteSessionMapper extends BaseMapper<WebsiteSession> {
}
