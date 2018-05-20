package ummm.tourpal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Spot;

@Repository
public interface SpotRepository extends JpaRepository<Spot, Integer> {
}
