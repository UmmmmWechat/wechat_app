package ummm.tourpal.service;

import org.springframework.stereotype.Service;
import ummm.tourpal.entity.Order;

import java.util.List;

@Service
public class GuideServiceImpl implements GuideService {
    @Override
    public boolean queryIfNew(String code) {
        return false;
    }

    @Override
    public long signUp(Object form) {
        return 0;
    }

    @Override
    public boolean acceptOrder(long orderId) {
        return false;
    }

    @Override
    public boolean rejectOrder(long orderId) {
        return false;
    }

    @Override
    public List<Order> queryOrders(long guideId, String state, long lastIndex) {
        return null;
    }

    @Override
    public List<Order> queryOrdersByKeyword(long guideId, String keyword, long lastIndex) {
        return null;
    }
}
