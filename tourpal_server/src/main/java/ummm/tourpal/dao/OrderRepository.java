package ummm.tourpal.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ummm.tourpal.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
