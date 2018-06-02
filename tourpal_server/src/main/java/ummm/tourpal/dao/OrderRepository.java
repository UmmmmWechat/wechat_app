package ummm.tourpal.dao;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Order;
import ummm.tourpal.entity.State;

import java.util.List;

@CacheConfig(cacheNames = "order")
@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Cacheable
    @Query(nativeQuery = true, value = "select * from my_order where guide_id = ?1")
    List<Order> findByGuideId(int guideId);

    @Cacheable(key = "T(String).valueOf(#p0).concat('-').concat(#p1)")
    @Query(nativeQuery = true, value = "select * from my_order where guide_id = ?1 and state = ?2")
    List<Order> findByGuideIdAndState(int guideId, State state);

    @Cacheable(key = "T(String).valueOf(#p0).concat('-').concat(#p1)")
    @Query(nativeQuery = true, value = "select * from my_order where guide_id = ?1 and exists (select * from spot where introduction like '%?2%')")
    List<Order> findByGuideIdAndKeyword(int guideId, String keyword);

    @Cacheable
    @Query(nativeQuery = true, value = "select * from my_order where tourist_id = ?1")
    List<Order> findByTouristId(int touristId);

    @Cacheable(key = "T(String).valueOf(#p0).concat('-').concat(#p1)")
    @Query(nativeQuery = true, value = "select * from my_order where tourist_id = ?1 and state = ?2")
    List<Order> findByTouristIdAndState(int touristId, State state);

    @Cacheable(key = "T(String).valueOf(#p0).concat('-').concat(#p1)")
    @Query(nativeQuery = true, value = "select * from my_order where tourist_id = ?1 and exists (select * from spot where introduction like '%?2%')")
    List<Order> findByTouristIdAndKeyword(int touristId, String keyword);

    @CachePut
    Order saveAndFlush(Order order);
}
