package ummm.tourpal.service;

import ummm.tourpal.entity.Feedback;
import ummm.tourpal.entity.Guide;
import ummm.tourpal.entity.Order;
import ummm.tourpal.entity.Tourist;

import java.util.List;

public interface TouristService {
    long login(String code);

    Tourist queryById(long id);

    List<Guide> queryGuideBySpot(long spotId, long lastIndex);

    List<Guide> queryGuideByKeyword(String keyword, long lastIndex);

    long inviteGuide(long touristId, long spotId, long guideId, String message);

    List<Order> queryOrders(long touristId, String state, long lastIndex);

    List<Order> queryOrdersByKeyword(long touristId, String keyword, long lastIndex);

    boolean cancelOrder(long orderId, String cancelMessage);

    boolean commendOrder(long orderId, Feedback feedback);
}
