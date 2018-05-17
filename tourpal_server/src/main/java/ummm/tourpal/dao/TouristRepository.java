package ummm.tourpal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Tourist;

@Repository
public interface TouristRepository extends JpaRepository<Tourist, Integer> {
    Tourist findByOpenId(String openId);
}
