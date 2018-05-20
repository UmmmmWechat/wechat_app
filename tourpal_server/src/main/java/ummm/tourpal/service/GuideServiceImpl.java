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
    public int signUp(Object form) {
        return 0;
    }

    @Override
    public boolean acceptOrder(int orderId) {
        return false;
    }

    @Override
    public boolean rejectOrder(int orderId) {
        return false;
    }

    @Override
    public List<Order> queryOrders(int guideId, String state, int lastIndex) {
        return null;
    }

    @Override
    public List<Order> queryOrdersByKeyword(int guideId, String keyword, int lastIndex) {
        return null;
    }
}
