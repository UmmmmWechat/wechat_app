package ummm.tourpal.dao;

import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Spot;

import java.util.List;

@CacheConfig(cacheNames = "spot")
@Repository
public interface SpotRepository extends JpaRepository<Spot, Integer> {
//    @Query(nativeQuery = true, value = "select * from spot where province = ?1 and city = ?2 and region = ?3 order by recommend_level desc limit ?4")
//    List<Spot> findByProvinceAndCityAndRegion(String province, String city, String region, int limit);

    @Cacheable(key = "(#p0).concat('-').concat(#p1)")
    @Query(nativeQuery = true, value = "select * from spot where province = ?1 and city = ?2 order by (recommend_level*popularity) desc")
    List<Spot> findByProvinceAndCity(String province, String city);

    @Cacheable
    @Query(nativeQuery = true, value = "select * from spot where name like '%?1%' or introduction like '%?1%'")
    List<Spot> findByKeyword(String keyword);
}
