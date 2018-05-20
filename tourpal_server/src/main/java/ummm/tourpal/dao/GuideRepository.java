package ummm.tourpal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Guide;

import java.util.List;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Integer> {
    @Query(nativeQuery = true, value = "select * from guide where id in (select guide_id from guide_favor_spots where favor_spots=?1) order by (good_feed_back_rate*num_of_finish_order) desc limit ?2")
    List<Guide> findByFavorSpots(int spotId, int limit);

    @Query(nativeQuery = true, value = "select * from guide where (real_name like %?1% or wechat like %?1%) limit ?2")
    List<Guide> findByKeyword(String keyword, int limit);
}
