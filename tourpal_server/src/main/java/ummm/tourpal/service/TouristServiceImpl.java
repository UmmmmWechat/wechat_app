package ummm.tourpal.service;

import org.springframework.stereotype.Service;
import ummm.tourpal.entity.Feedback;
import ummm.tourpal.entity.Guide;
import ummm.tourpal.entity.Order;
import ummm.tourpal.entity.Tourist;

import java.util.List;

@Service
public class TouristServiceImpl implements TouristService {
    @Override
    public long login(String code) {
        return 0;
    }

    @Override
    public Tourist queryById(long id) {
        return null;
    }

    @Override
    public List<Guide> queryGuideBySpot(long spotId, long lastIndex) {
        return null;
    }

    @Override
    public List<Guide> queryGuideByKeyword(String keyword, long lastIndex) {
        return null;
    }

    @Override
    public long inviteGuide(long touristId, long spotId, long guideId, String message) {
        return 0;
    }

    @Override
    public List<Order> queryOrders(long touristId, String state, long lastIndex) {
        return null;
    }

    @Override
    public List<Order> queryOrdersByKeyword(long touristId, String keyword, long lastIndex) {
        return null;
    }

    @Override
    public boolean cancelOrder(long orderId, String cancelMessage) {
        return false;
    }

    @Override
    public boolean commendOrder(long orderId, Feedback feedback) {
        return false;
    }
}
