package io.yak.website.account.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import io.yak.website.account.domain.WebsiteUser;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface WebsiteUserMapper extends BaseMapper<WebsiteUser> {
}
