package ummm.tourpal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Order;
import ummm.tourpal.entity.State;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query(nativeQuery = true, value = "select * from my_order where guide_id = ?1 limit ?2")
    List<Order> findByGuideId(int guideId, int limit);

    @Query(nativeQuery = true, value = "select * from my_order where guide_id = ?1 and state = ?2 limit ?3")
    List<Order> findByGuideIdAndState(int guideId, State state, int limit);

    @Query(nativeQuery = true, value = "select * from my_order where guide_id = ?1 and exists (select * from spot where introduction like '%?2%') limit ?3")
    List<Order> findByGuideIdAndKeyword(int guideId, String keyword, int limit);

    @Query(nativeQuery = true, value = "select * from my_order where tourist_id = ?1 limit ?2")
    List<Order> findByTouristId(int touristId, int limit);

    @Query(nativeQuery = true, value = "select * from my_order where tourist_id = ?1 and state = ?2 limit ?3")
    List<Order> findByTouristIdAndState(int touristId, State state, int limit);

    @Query(nativeQuery = true, value = "select * from my_order where tourist_id = ?1 and exists (select * from spot where introduction like '%?2%') limit ?3")
    List<Order> findByTouristIdAndKeyword(int touristId, String keyword, int limit);
}
