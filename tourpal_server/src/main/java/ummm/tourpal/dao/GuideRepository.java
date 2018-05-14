package ummm.tourpal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Guide;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Long> {

}
