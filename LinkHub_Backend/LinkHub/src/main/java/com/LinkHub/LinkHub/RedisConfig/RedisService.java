package com.LinkHub.LinkHub.RedisConfig;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@Service
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // Save or Update data with expiration time
    public void saveOrUpdateData(String key, Object value, long timeoutInSeconds) {
        redisTemplate.opsForValue().set(key, value, timeoutInSeconds, TimeUnit.SECONDS);
    }

    // Retrieve data
    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // Delete data
    public void deleteData(String key) {
        redisTemplate.delete(key);
    }

    // Check if a key exists
    public boolean exists(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}
